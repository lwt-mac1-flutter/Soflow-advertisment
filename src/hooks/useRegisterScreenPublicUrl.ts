import { useEffect, useState } from 'react';
import {
  registerScreenPublicUrl,
  registerScreenUrlForSiteRoot
} from '../constants/registrationForm';

type SiteConfigJson = {
  publicAppUrl?: string;
};

/**
 * Register QR / link URL. Starts from build-time env + window, then optionally
 * overrides from `/site-config.json` (or under Vite `base`) so cPanel edits work without npm.
 */
export function useRegisterScreenPublicUrl(): string {
  const [url, setUrl] = useState(registerScreenPublicUrl);

  useEffect(() => {
    const baseHref = `${window.location.origin}${import.meta.env.BASE_URL || '/'}`;
    const configHref = new URL('site-config.json', baseHref.endsWith('/') ? baseHref : `${baseHref}/`).href;

    let cancelled = false;
    fetch(configHref, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: SiteConfigJson | null) => {
        if (cancelled || !data || typeof data.publicAppUrl !== 'string') return;
        const s = data.publicAppUrl.trim();
        if (!s) return;
        try {
          setUrl(registerScreenUrlForSiteRoot(s));
        } catch {
          /* keep previous */
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return url;
}
