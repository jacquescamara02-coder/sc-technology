
-- Categories
CREATE TABLE public.categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon_key text,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Subcategories
CREATE TABLE public.subcategories (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.subcategories(category_id);

-- Products
CREATE TABLE public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  brand text NOT NULL DEFAULT '',
  category text NOT NULL,
  subcategory text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  old_price numeric,
  stock int NOT NULL DEFAULT 0,
  sku text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  specs jsonb NOT NULL DEFAULT '[]'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  active boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT false,
  badge text,
  popularity int NOT NULL DEFAULT 50,
  publish_facebook boolean NOT NULL DEFAULT false,
  facebook_posted_at text,
  facebook_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.products(category, subcategory);
CREATE INDEX ON public.products(active);

-- Hero slides
CREATE TABLE public.hero_slides (
  id text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  cta text NOT NULL DEFAULT '',
  badge text,
  link text,
  image text,
  hue int,
  active boolean NOT NULL DEFAULT true,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- App settings (single row, id=1)
CREATE TABLE public.app_settings (
  id int PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT app_settings_singleton CHECK (id = 1)
);

-- Orders
CREATE TABLE public.orders (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'received',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  tva numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  delivery jsonb NOT NULL DEFAULT '{}'::jsonb,
  payment jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.orders(created_at DESC);

-- Facebook posts
CREATE TABLE public.facebook_posts (
  id text PRIMARY KEY,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_image text,
  caption text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'success',
  posted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON public.facebook_posts(posted_at DESC);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER products_touch BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER orders_touch BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER app_settings_touch BEFORE UPDATE ON public.app_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facebook_posts ENABLE ROW LEVEL SECURITY;

-- Public read + write policies (admin is gated client-side for now)
-- Storefront tables: public read, public write
CREATE POLICY "public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "public write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public read subcategories" ON public.subcategories FOR SELECT USING (true);
CREATE POLICY "public write subcategories" ON public.subcategories FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "public write products" ON public.products FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "public write hero_slides" ON public.hero_slides FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public read app_settings" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "public write app_settings" ON public.app_settings FOR ALL USING (true) WITH CHECK (true);

-- Orders: public create + public read (no user accounts yet)
CREATE POLICY "public read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "public write orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public read facebook_posts" ON public.facebook_posts FOR SELECT USING (true);
CREATE POLICY "public write facebook_posts" ON public.facebook_posts FOR ALL USING (true) WITH CHECK (true);
