import { useEffect, useRef } from "react";
import {
  useAdminData,
  type AdminProduct,
  type AdminCategory,
  type AdminSettings,
  type HeroSlide,
  type FacebookPost,
} from "@/lib/admin-store";
import { useOrders, type Order } from "@/lib/orders-store";

// Lightweight REST client for the public app data. It avoids Supabase Auth's
// localStorage dependency at launch, which can throw in restricted iPadOS
// Safari/WebView environments before React gets a chance to render.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

type DbResult<T = any> = { data: T | null; error: { message: string } | null };

function headers(extra?: HeadersInit): HeadersInit {
  return {
    apikey: SUPABASE_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_KEY ?? ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function restFetch<T>(table: string, params: URLSearchParams, init?: RequestInit): Promise<DbResult<T>> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return { data: null, error: { message: "Backend configuration missing" } };
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params.size ? `?${params}` : ""}`;
    const res = await fetch(url, { ...init, headers: headers(init?.headers) });
    if (!res.ok) return { data: null, error: { message: await res.text() } };
    if (res.status === 204) return { data: null, error: null };
    return { data: (await res.json()) as T, error: null };
  } catch (error) {
    return { data: null, error: { message: error instanceof Error ? error.message : String(error) } };
  }
}

class SelectBuilder<T = any> implements PromiseLike<DbResult<T>> {
  private params = new URLSearchParams();
  private wantsSingle = false;

  constructor(private table: string, columns: string) {
    this.params.set("select", columns);
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.params.set("order", `${column}.${options?.ascending === false ? "desc" : "asc"}`);
    return this;
  }

  eq(column: string, value: string | number | boolean) {
    this.params.set(column, `eq.${value}`);
    return this;
  }

  maybeSingle() {
    this.wantsSingle = true;
    return this as unknown as PromiseLike<DbResult<T extends Array<infer U> ? U : T>>;
  }

  async execute(): Promise<DbResult<T>> {
    const result = await restFetch<any[]>(this.table, this.params);
    if (result.error) return result as DbResult<T>;
    if (this.wantsSingle) return { data: (result.data?.[0] ?? null) as T, error: null };
    return result as DbResult<T>;
  }

  then<TResult1 = DbResult<T>, TResult2 = never>(
    onfulfilled?: ((value: DbResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

class DeleteBuilder implements PromiseLike<DbResult<null>> {
  private params = new URLSearchParams();

  constructor(private table: string) {}

  in(column: string, values: string[]) {
    this.params.set(column, `in.(${values.join(",")})`);
    return this.execute();
  }

  execute() {
    return restFetch<null>(this.table, this.params, { method: "DELETE" });
  }

  then<TResult1 = DbResult<null>, TResult2 = never>(
    onfulfilled?: ((value: DbResult<null>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

const supabase = {
  from: (table: string) => ({
    select: (columns = "*") => new SelectBuilder(table, columns),
    upsert: (rows: unknown) => restFetch(table, new URLSearchParams(), {
      method: "POST",
      body: JSON.stringify(rows),
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    }),
    delete: () => new DeleteBuilder(table),
  }),
  channel: (_name: string) => ({
    on: (..._args: unknown[]) => supabase.channel(_name),
    subscribe: () => supabase.channel(_name),
  }),
  removeChannel: async (_channel: unknown) => "ok",
};

// ------------ row <-> object mappers ------------

type ProductRow = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  old_price: number | null;
  stock: number;
  sku: string;
  description: string;
  specs: unknown;
  images: unknown;
  active: boolean;
  featured: boolean;
  is_new: boolean;
  badge: string | null;
  popularity: number;
  publish_facebook: boolean;
  facebook_posted_at: string | null;
  facebook_status: string | null;
  created_at: string;
};

function productToRow(p: AdminProduct): ProductRow {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price,
    old_price: p.oldPrice ?? null,
    stock: p.stock,
    sku: p.sku,
    description: p.description,
    specs: p.specs,
    images: p.images,
    active: p.active,
    featured: !!p.featured,
    is_new: !!p.isNew,
    badge: p.badge ?? null,
    popularity: p.popularity ?? 50,
    publish_facebook: p.publishFacebook,
    facebook_posted_at: p.facebookPostedAt ?? null,
    facebook_status: p.facebookStatus ?? null,
    created_at: new Date(p.createdAt ?? Date.now()).toISOString(),
  };
}

function rowToProduct(r: ProductRow): AdminProduct {
  return {
    id: r.id,
    name: r.name,
    brand: r.brand,
    category: r.category,
    subcategory: r.subcategory,
    price: Number(r.price),
    oldPrice: r.old_price == null ? undefined : Number(r.old_price),
    stock: r.stock,
    sku: r.sku,
    description: r.description,
    specs: (r.specs as { key: string; value: string }[]) ?? [],
    images: (r.images as string[]) ?? [],
    active: r.active,
    featured: r.featured,
    isNew: r.is_new,
    badge: (r.badge as AdminProduct["badge"]) ?? undefined,
    popularity: r.popularity,
    createdAt: new Date(r.created_at).getTime(),
    publishFacebook: r.publish_facebook,
    facebookPostedAt: r.facebook_posted_at ?? undefined,
    facebookStatus: (r.facebook_status as AdminProduct["facebookStatus"]) ?? undefined,
  };
}

// ------------ diff helper ------------

function diffById<T extends { id: string }>(prev: T[], next: T[]) {
  const prevMap = new Map(prev.map((x) => [x.id, x]));
  const nextMap = new Map(next.map((x) => [x.id, x]));
  const upserts: T[] = [];
  const deletes: string[] = [];
  for (const n of next) {
    const p = prevMap.get(n.id);
    if (!p || JSON.stringify(p) !== JSON.stringify(n)) upserts.push(n);
  }
  for (const p of prev) if (!nextMap.has(p.id)) deletes.push(p.id);
  return { upserts, deletes };
}

// ------------ initial load + seed ------------

async function loadFromSupabase() {
  const [prodRes, catRes, subRes, heroRes, settingsRes, ordersRes, fbRes] =
    await Promise.all([
      supabase.from("products").select("*"),
      supabase.from("categories").select("*").order("position"),
      supabase.from("subcategories").select("*").order("position"),
      supabase.from("hero_slides").select("*").order("position"),
      supabase.from("app_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("facebook_posts").select("*").order("posted_at", { ascending: false }),
    ]);

  return { prodRes, catRes, subRes, heroRes, settingsRes, ordersRes, fbRes };
}

async function seedSupabase() {
  const state = useAdminData.getState();
  // categories first (FK)
  await supabase.from("categories").upsert(
    state.categories.map((c, i) => ({
      id: c.id,
      name: c.name,
      icon_key: c.iconKey ?? null,
      position: i,
    })),
  );
  // subcategories
  const subRows = state.categories.flatMap((c) =>
    c.subcategories.map((s, i) => ({
      id: `${c.id}__${s.id}`,
      category_id: c.id,
      name: s.name,
      position: i,
    })),
  );
  if (subRows.length) await supabase.from("subcategories").upsert(subRows);
  if (state.products.length)
    await supabase.from("products").upsert(state.products.map(productToRow));
  if (state.settings.heroSlides.length)
    await supabase.from("hero_slides").upsert(
      state.settings.heroSlides.map((h, i) => ({
        id: h.id,
        title: h.title,
        subtitle: h.subtitle,
        cta: h.cta,
        badge: h.badge ?? null,
        link: h.link ?? null,
        image: h.image ?? null,
        hue: h.hue ?? null,
        active: h.active,
        position: i,
      })),
    );
  const { heroSlides: _hs, ...rest } = state.settings;
  void _hs;
  await supabase.from("app_settings").upsert({ id: 1, data: rest });
}

// ------------ React hook ------------

let bootstrapped = false;

export function useSupabaseSync() {
  const inited = useRef(false);
  const prevAdminRef = useRef<ReturnType<typeof useAdminData.getState> | null>(null);
  const prevOrdersRef = useRef<ReturnType<typeof useOrders.getState> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (bootstrapped) return;
    bootstrapped = true;
    inited.current = false;

    (async () => {
      try {
        const { prodRes, catRes, subRes, heroRes, settingsRes, ordersRes, fbRes } =
          await loadFromSupabase();

        const isEmpty =
          (catRes.data?.length ?? 0) === 0 &&
          (prodRes.data?.length ?? 0) === 0 &&
          !settingsRes.data;

        if (isEmpty) {
          await seedSupabase();
          // skip re-loading; current state already matches what we just seeded
        } else {
          // categories + subcategories
          const cats: AdminCategory[] = (catRes.data ?? []).map((c: any) => ({
            id: c.id as string,
            name: c.name as string,
            iconKey: (c.icon_key as string | null) ?? undefined,
            subcategories: (subRes.data ?? [])
              .filter((s: any) => s.category_id === c.id)
              .map((s: any) => ({ id: (s.id as string).split("__").slice(1).join("__") || (s.id as string), name: s.name as string })),
          }));
          const products: AdminProduct[] = (prodRes.data ?? []).map((r: any) =>
            rowToProduct(r as unknown as ProductRow),
          );
          const heroSlides: HeroSlide[] = (heroRes.data ?? []).map((h: any) => ({
            id: h.id as string,
            title: (h.title as string) ?? "",
            subtitle: (h.subtitle as string) ?? "",
            cta: (h.cta as string) ?? "",
            badge: (h.badge as string | null) ?? undefined,
            link: (h.link as string | null) ?? undefined,
            image: (h.image as string | null) ?? undefined,
            hue: (h.hue as number | null) ?? undefined,
            active: !!h.active,
          }));
          const baseSettings = useAdminData.getState().settings;
          const remoteData = (settingsRes.data?.data as Partial<AdminSettings> | undefined) ?? {};
          const settings: AdminSettings = {
            ...baseSettings,
            ...remoteData,
            heroSlides,
          };
          const facebookPosts: FacebookPost[] = (fbRes.data ?? []).map((p: any) => ({
            id: p.id as string,
            productId: p.product_id as string,
            productName: p.product_name as string,
            productImage: (p.product_image as string | null) ?? "",
            caption: (p.caption as string) ?? "",
            date: p.posted_at as string,
            status: (p.status as FacebookPost["status"]) ?? "success",
          }));

          useAdminData.setState({
            products,
            categories: cats,
            settings,
            facebookPosts,
          });
        }

        // orders
        const orders: Order[] = (ordersRes.data ?? []).map((o: any) => ({
          id: o.id as string,
          createdAt: new Date(o.created_at as string).getTime(),
          status: o.status as Order["status"],
          items: (o.items as Order["items"]) ?? [],
          subtotal: Number(o.subtotal),
          tva: Number(o.tva),
          total: Number(o.total),
          delivery: o.delivery as Order["delivery"],
          payment: o.payment as Order["payment"],
        }));
        useOrders.setState({ orders });


        // snapshot AFTER applying remote so first diff doesn't echo back
        prevAdminRef.current = useAdminData.getState();
        prevOrdersRef.current = useOrders.getState();
        inited.current = true;
      } catch (err) {
        console.error("[supabase-sync] initial load failed", err);
        // still allow writes to attempt sync
        prevAdminRef.current = useAdminData.getState();
        prevOrdersRef.current = useOrders.getState();
        inited.current = true;
      }
    })();

    // subscribe admin store
    const unsubAdmin = useAdminData.subscribe((next) => {
      if (!inited.current) return;
      const prev = prevAdminRef.current!;
      prevAdminRef.current = next;
      void syncAdminDelta(prev, next);
    });

    // subscribe orders store
    const unsubOrders = useOrders.subscribe((next) => {
      if (!inited.current) return;
      const prev = prevOrdersRef.current!;
      prevOrdersRef.current = next;
      void syncOrdersDelta(prev.orders, next.orders);
    });

    let channel: ReturnType<typeof supabase.channel> | null = null;
    try {
      // Realtime is progressive enhancement. iPad WebViews/Safari can block
      // storage or sockets during launch, so it must never block rendering.
      channel = supabase
        .channel("app-sync")
        .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => {
          void refreshProducts();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
          void refreshOrders();
        })
        .subscribe();
    } catch (err) {
      console.error("[supabase-sync] realtime disabled", err);
    }

    return () => {
      unsubAdmin();
      unsubOrders();
      if (channel) void supabase.removeChannel(channel);
    };
  }, []);
}

async function refreshProducts() {
  const { data } = await supabase.from("products").select("*");
  if (!data) return;
  const products = (data as any[]).map((r: any) => rowToProduct(r as unknown as ProductRow));
  useAdminData.setState({ products });
}

async function refreshOrders() {
  const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (!data) return;
  const orders: Order[] = (data as any[]).map((o: any) => {
    const deliveryRaw = (o.delivery ?? {}) as Order["delivery"] & { deliveryFee?: number };
    const { deliveryFee, ...delivery } = deliveryRaw as any;
    return {
      id: o.id as string,
      createdAt: new Date(o.created_at as string).getTime(),
      status: o.status as Order["status"],
      items: (o.items as Order["items"]) ?? [],
      subtotal: Number(o.subtotal),
      deliveryFee: deliveryFee != null ? Number(deliveryFee) : 0,
      tva: Number(o.tva),
      total: Number(o.total),
      delivery: delivery as Order["delivery"],
      payment: o.payment as Order["payment"],
    };
  });
  useOrders.setState({ orders });
}

async function syncAdminDelta(
  prev: ReturnType<typeof useAdminData.getState>,
  next: ReturnType<typeof useAdminData.getState>,
) {
  try {
    // Products
    if (prev.products !== next.products) {
      const { upserts, deletes } = diffById(prev.products, next.products);
      if (upserts.length)
        await supabase.from("products").upsert(upserts.map(productToRow));
      if (deletes.length)
        await supabase.from("products").delete().in("id", deletes);
    }

    // Categories
    if (prev.categories !== next.categories) {
      const prevCats = prev.categories.map((c, i) => ({
        id: c.id,
        name: c.name,
        icon_key: c.iconKey ?? null,
        position: i,
      }));
      const nextCats = next.categories.map((c, i) => ({
        id: c.id,
        name: c.name,
        icon_key: c.iconKey ?? null,
        position: i,
      }));
      const catDiff = diffById(prevCats, nextCats);
      if (catDiff.upserts.length) await supabase.from("categories").upsert(catDiff.upserts);
      if (catDiff.deletes.length)
        await supabase.from("categories").delete().in("id", catDiff.deletes);

      const prevSubs = prev.categories.flatMap((c) =>
        c.subcategories.map((s, i) => ({
          id: `${c.id}__${s.id}`,
          category_id: c.id,
          name: s.name,
          position: i,
        })),
      );
      const nextSubs = next.categories.flatMap((c) =>
        c.subcategories.map((s, i) => ({
          id: `${c.id}__${s.id}`,
          category_id: c.id,
          name: s.name,
          position: i,
        })),
      );
      const subDiff = diffById(prevSubs, nextSubs);
      if (subDiff.upserts.length) await supabase.from("subcategories").upsert(subDiff.upserts);
      if (subDiff.deletes.length)
        await supabase.from("subcategories").delete().in("id", subDiff.deletes);
    }

    // Settings + hero slides
    if (prev.settings !== next.settings) {
      if (prev.settings.heroSlides !== next.settings.heroSlides) {
        const prevH = prev.settings.heroSlides.map((h, i) => ({
          id: h.id,
          title: h.title,
          subtitle: h.subtitle,
          cta: h.cta,
          badge: h.badge ?? null,
          link: h.link ?? null,
          image: h.image ?? null,
          hue: h.hue ?? null,
          active: h.active,
          position: i,
        }));
        const nextH = next.settings.heroSlides.map((h, i) => ({
          id: h.id,
          title: h.title,
          subtitle: h.subtitle,
          cta: h.cta,
          badge: h.badge ?? null,
          link: h.link ?? null,
          image: h.image ?? null,
          hue: h.hue ?? null,
          active: h.active,
          position: i,
        }));
        const hd = diffById(prevH, nextH);
        if (hd.upserts.length) await supabase.from("hero_slides").upsert(hd.upserts);
        if (hd.deletes.length) await supabase.from("hero_slides").delete().in("id", hd.deletes);
      }
      const { heroSlides: _hs, ...rest } = next.settings;
      void _hs;
      await supabase.from("app_settings").upsert({ id: 1, data: rest });
    }

    // Facebook posts
    if (prev.facebookPosts !== next.facebookPosts) {
      const fbPrev = prev.facebookPosts.map((p) => ({
        id: p.id,
        product_id: p.productId,
        product_name: p.productName,
        product_image: p.productImage,
        caption: p.caption,
        status: p.status,
        posted_at: p.date,
      }));
      const fbNext = next.facebookPosts.map((p) => ({
        id: p.id,
        product_id: p.productId,
        product_name: p.productName,
        product_image: p.productImage,
        caption: p.caption,
        status: p.status,
        posted_at: p.date,
      }));
      const fd = diffById(fbPrev, fbNext);
      if (fd.upserts.length) await supabase.from("facebook_posts").upsert(fd.upserts);
      if (fd.deletes.length) await supabase.from("facebook_posts").delete().in("id", fd.deletes);
    }
  } catch (err) {
    console.error("[supabase-sync] admin delta failed", err);
  }
}

async function syncOrdersDelta(prev: Order[], next: Order[]) {
  try {
    const toRow = (o: Order) => ({
      id: o.id,
      status: o.status,
      items: o.items,
      subtotal: o.subtotal,
      tva: o.tva,
      total: o.total,
      delivery: { ...o.delivery, deliveryFee: o.deliveryFee ?? 0 },
      payment: o.payment,
      created_at: new Date(o.createdAt).toISOString(),
    });
    const d = diffById(prev.map(toRow), next.map(toRow));
    if (d.upserts.length) await supabase.from("orders").upsert(d.upserts);
    if (d.deletes.length) await supabase.from("orders").delete().in("id", d.deletes);
  } catch (err) {
    console.error("[supabase-sync] orders delta failed", err);
  }
}
