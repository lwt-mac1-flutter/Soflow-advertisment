const FORM_ID = '1FAIpQLSccUIuI8xaJryBBWDu9dz_Clwc053LybGuJNZlE-qUlDWF59w';
const VIEWFORM = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;

/** Public form URL (QR & “open in new tab”) */
export const REGISTRATION_FORM_URL = `${VIEWFORM}?usp=header`;

/** Programmatic POST target — custom UI submits here (same as Google’s form) */
export const REGISTRATION_FORM_POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

/**
 * Google entry IDs for each question (from live `data-params` in viewform).
 * If you add/reorder form fields, re-fetch IDs from the form HTML.
 */
export const REGISTRATION_FORM_ENTRIES = {
  fullName: 'entry.455394314',
  businessName: 'entry.1305140523',
  email: 'entry.31558116',
  phone: 'entry.920905132'
} as const;

/** Wholesale account creation (Magento) — [Create account](https://soflowrubioscorals.us/customer/account/create/) */
export const WHOLESALE_ACCOUNT_CREATE_URL = 'https://soflowrubioscorals.us/customer/account/create/';

/**
 * Build the Register deep link (`#register`) for a deployed site root, e.g. `https://lwt101.site`.
 * Respects Vite `base` when the app lives in a subfolder.
 */
export function registerScreenUrlForSiteRoot(siteRoot: string): string {
  const raw = siteRoot.trim();
  if (!raw) {
    throw new Error('empty site root');
  }
  const siteHref = raw.includes('://') ? raw : `https://${raw}`;
  const site = new URL(siteHref.endsWith('/') ? siteHref : `${siteHref}/`);
  const u = new URL(import.meta.env.BASE_URL || '/', site.href);
  u.hash = 'register';
  return u.href;
}

/**
 * URL that opens the in-app Register screen (`#register`).
 * - **Build:** set `VITE_PUBLIC_APP_URL` in `.env.production` (optional default when you run `npm run build` on your PC).
 * - **Server (cPanel):** edit `site-config.json` next to `index.html` — overrides QR/link without rebuilding.
 * - **Dev:** uses `window.location` when no env and no config override yet.
 */
export function registerScreenPublicUrl(): string {
  const canonical = (import.meta.env.VITE_PUBLIC_APP_URL as string | undefined)?.trim();

  const fromWindow = (): string => {
    if (typeof window === 'undefined') {
      return REGISTRATION_FORM_URL;
    }
    try {
      const base = import.meta.env.BASE_URL || '/';
      const u = new URL(base, window.location.origin);
      u.hash = 'register';
      return u.href;
    } catch {
      return REGISTRATION_FORM_URL;
    }
  };

  if (!canonical) {
    return fromWindow();
  }

  try {
    return registerScreenUrlForSiteRoot(canonical);
  } catch {
    return fromWindow();
  }
}

/** PNG data URL for any encoded link (e.g. QR on screen) */
export function qrCodeImageForUrl(dataUrl: string, size = 400): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&format=png&data=${encodeURIComponent(
    dataUrl
  )}`;
}

/** Google registration form (Register screen QR) */
export function registrationFormQrImageUrl(size = 400): string {
  return qrCodeImageForUrl(REGISTRATION_FORM_URL, size);
}
