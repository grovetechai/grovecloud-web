// Odkazy z webu do aplikace (grovetechai.com/grovecloud) — JEDINÉ místo, kde
// se skládají. Každý nese utm, aby v Provozu bylo vidět, kolik registrací a
// appek přišlo z grovecloud.cz a z které sekce. Bez toho končil trychtýř u
// „zkouška skeneru" a dál byla tma (zjištěno 11. 9. 2026: 74 návštěv, 0
// přiřazených registrací — ne proto, že by nebyly, ale že nešly poznat).
//
// Aplikace utm bere z URL při registraci (client/src/hooks/use-auth.ts) a
// ukládá signup_utm_source/medium/campaign — žádná cookie, žádný identifikátor.
export const APP_BASE = "https://grovetechai.com/grovecloud";

export type AppCampaign =
  | "nav-login" | "hero" | "jak" | "faq" | "final"
  | `cenik-${string}`;

export function appUrl(campaign: AppCampaign): string {
  const q = new URLSearchParams({
    utm_source: "grovecloud.cz",
    utm_medium: "web",
    utm_campaign: campaign,
  });
  return `${APP_BASE}?${q.toString()}`;
}
