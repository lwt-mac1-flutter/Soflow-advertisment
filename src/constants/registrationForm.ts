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
