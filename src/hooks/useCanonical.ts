import { useEffect } from 'react';

export function useCanonical(url: string) {
  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    // Set / update the href
    link.setAttribute('href', url);
  }, [url]);
}
