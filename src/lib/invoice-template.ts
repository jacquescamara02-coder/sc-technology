import logoUrl from "@/assets/sc-logo.png";
import { formatGNF } from "./data";
import type { Order } from "./orders-store";

export interface InvoiceCompany {
  name: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  website?: string;
  extraPhones?: string[];
}

const DEFAULT_COMPANY: InvoiceCompany = {
  name: "SC TECHNOLOGIE",
  address: "Dixinn Terrasse en face du Stade 28 Septembre — Conakry, Guinée",
  contactPhone: "+224 610 953 838",
  contactEmail: "sctechnologie224@gmail.com",
  website: "www.sctechnologie.com",
  extraPhones: ["620 212 045", "622 242 093"],
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** Odoo-style invoice number: /YYYY/MM/NNNN derived from order id + date. */
function invoiceNumber(order: Order): string {
  const d = new Date(order.createdAt);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const tail = (order.id.match(/\d+/g)?.join("") ?? order.id).slice(-4).padStart(4, "0");
  return `/${yyyy}/${mm}/${tail}`;
}

function frDate(ts: number): string {
  return new Date(ts).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function buildInvoiceHTML(order: Order, company: Partial<InvoiceCompany> = {}): string {
  const co = { ...DEFAULT_COMPANY, ...company };
  const number = invoiceNumber(order);
  const isPaid = order.payment.method !== "card" || order.status === "delivered" || order.payment.masked === "—" || true; // storefront orders are treated as paid on receipt
  const paidAmount = isPaid ? order.total : 0;
  const dueAmount = order.total - paidAmount;
  const logoAbs =
    typeof window !== "undefined" ? new URL(logoUrl, window.location.origin).toString() : logoUrl;

  const rows = order.items
    .map(
      (i) => `
        <tr>
          <td class="desc">${esc(i.brand ? `[${i.brand}] ` : "")}${esc(i.name)}</td>
          <td class="qty">${i.qty},00 Unité(s)</td>
          <td class="num">${formatGNF(i.price)}</td>
          <td class="tax"></td>
          <td class="num">${formatGNF(i.price * i.qty)} FG</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>Facture ${esc(number)} — ${esc(co.name)}</title>
<style>
  @page { size: A4; margin: 14mm 12mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #1f2937; font-size: 12px; line-height: 1.45;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet { max-width: 780px; margin: 0 auto; padding: 8px 4px 24px; }

  .top { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand img { width: 72px; height: 72px; object-fit: contain; }
  .brand-name { font-size: 20px; font-weight: 800; letter-spacing: -0.01em; color: #0f172a; }
  .company { text-align: right; font-size: 11px; color: #334155; line-height: 1.5; }
  .company .name { font-size: 13px; font-weight: 700; color: #0f172a; }

  .phone-tag {
    display: inline-block; margin-top: 16px; padding: 4px 12px;
    background: #f1f5f9; border-radius: 4px; font-weight: 700; font-size: 12px; color: #0f172a;
  }

  h1.title {
    margin: 28px 0 12px; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;
  }

  .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 18px; font-size: 12px; }
  .meta .lbl { color: #64748b; font-size: 10.5px; text-transform: none; margin-bottom: 2px; font-weight: 600; }
  .meta .val { color: #0f172a; font-weight: 500; }

  table.items { width: 100%; border-collapse: collapse; margin-top: 4px; }
  table.items thead th {
    background: #f8fafc; text-align: left; padding: 8px 10px;
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: #475569;
    border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; font-weight: 700;
  }
  table.items thead th.num, table.items thead th.qty, table.items thead th.tax { text-align: right; }
  table.items tbody td {
    padding: 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top;
  }
  table.items td.desc { color: #0f172a; }
  table.items td.qty, table.items td.num { text-align: right; white-space: nowrap; }
  table.items td.tax { text-align: center; color: #94a3b8; }

  .totals { margin-top: 4px; width: 100%; border-collapse: collapse; }
  .totals td { padding: 6px 10px; font-size: 12px; }
  .totals tr td:first-child { text-align: right; color: #334155; }
  .totals tr td:last-child { text-align: right; white-space: nowrap; font-weight: 600; color: #0f172a; width: 200px; }
  .totals tr.grand td { font-weight: 800; font-size: 13px; border-top: 1px solid #cbd5e1; }
  .totals tr.due td { color: #0f172a; font-weight: 800; }

  .comm { margin-top: 20px; font-size: 11.5px; color: #334155; }

  .sign { margin-top: 60px; display: flex; justify-content: space-between; font-size: 12px; color: #475569; }
  .sign .box { width: 40%; }
  .sign .label { border-top: 1px solid #94a3b8; padding-top: 6px; text-align: left; }
  .sign .box.right .label { text-align: right; }

  .footer {
    margin-top: 48px; padding-top: 10px; border-top: 1px solid #e2e8f0;
    text-align: center; font-size: 10.5px; color: #64748b;
  }
  .footer .page { margin-top: 4px; color: #94a3b8; font-size: 10px; }

  .client-block {
    margin: 4px 0 20px; padding: 10px 12px; background: #f8fafc; border-left: 3px solid #0f172a;
    font-size: 12px; color: #0f172a;
  }
  .client-block .name { font-weight: 700; font-size: 13px; }
  .client-block .line { color: #475569; font-size: 11.5px; margin-top: 2px; }

  @media print {
    body { font-size: 11.5px; }
    .no-print { display: none !important; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <div class="top">
      <div class="brand">
        <img src="${esc(logoAbs)}" alt="${esc(co.name)}" />
        <div>
          <div class="brand-name">${esc(co.name)}</div>
        </div>
      </div>
      <div class="company">
        <div class="name">${esc(co.name)}</div>
        <div>${esc(co.address)}</div>
        <div class="phone-tag">${esc(co.contactPhone.replace(/^\+?224\s*/, ""))}</div>
      </div>
    </div>

    <h1 class="title">Facture ${esc(number)}</h1>

    <div class="meta">
      <div>
        <div class="lbl">Date de la facture :</div>
        <div class="val">${esc(frDate(order.createdAt))}</div>
      </div>
      <div>
        <div class="lbl">Date d'échéance :</div>
        <div class="val">${esc(frDate(order.createdAt))}</div>
      </div>
      <div>
        <div class="lbl">Origine :</div>
        <div class="val">${esc(order.id)}</div>
      </div>
    </div>

    <div class="client-block">
      <div class="name">${esc(order.delivery.fullName || "Client")}</div>
      <div class="line">${esc(order.delivery.phone)}${order.delivery.email ? " • " + esc(order.delivery.email) : ""}</div>
      <div class="line">${esc([order.delivery.address, order.delivery.district, order.delivery.city].filter(Boolean).join(", "))}</div>
    </div>

    <table class="items">
      <thead>
        <tr>
          <th>Description</th>
          <th class="qty">Quantité</th>
          <th class="num">Prix unitaire</th>
          <th class="tax">Taxes</th>
          <th class="num">Montant</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <table class="totals">
      <tbody>
        <tr><td>Sous-total</td><td>${formatGNF(order.subtotal)} FG</td></tr>
        ${order.deliveryFee ? `<tr><td>Livraison</td><td>${formatGNF(order.deliveryFee)} FG</td></tr>` : ""}
        ${order.tva ? `<tr><td>TVA</td><td>${formatGNF(order.tva)} FG</td></tr>` : ""}
        <tr class="grand"><td>Total</td><td>${formatGNF(order.total)} FG</td></tr>
        <tr><td>Payé le ${esc(frDate(order.createdAt))}</td><td>${formatGNF(paidAmount)} FG</td></tr>
        <tr class="due"><td>Montant dû</td><td>${formatGNF(dueAmount)} FG</td></tr>
      </tbody>
    </table>

    <div class="comm">
      Merci d'utiliser la communication suivante pour votre paiement : <strong>${esc(number)}</strong><br/>
      Mode de paiement : <strong>${esc(order.payment.label)}</strong>
      ${order.payment.method === "orange_money" ? " • Orange Money marchand : <strong>610-95-38-38</strong>" : ""}
    </div>

    <div class="sign">
      <div class="box"><div class="label">Le Client</div></div>
      <div class="box right"><div class="label">Le Gérant</div></div>
    </div>

    <div class="footer">
      <div>
        (${esc(co.contactPhone)})${(co.extraPhones ?? []).map((p) => " / " + esc(p)).join("")}
        &nbsp;•&nbsp; ${esc(co.contactEmail)}
        ${co.website ? ` &nbsp;•&nbsp; ${esc(co.website)}` : ""}
      </div>
      <div class="page">Page : 1 / 1</div>
    </div>
  </div>
  <script>window.addEventListener('load', () => setTimeout(() => window.print(), 300));</script>
</body>
</html>`;
}

export function openInvoicePrint(order: Order, company?: Partial<InvoiceCompany>) {
  const html = buildInvoiceHTML(order, company);
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}
