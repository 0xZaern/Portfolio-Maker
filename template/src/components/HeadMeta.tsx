import { useEffect } from "react";
import { config, displayHeadline } from "../content/site.ts";

/**
 * HeadMeta
 *
 * Updates <title>, <meta name="description">, and all OG/Twitter meta tags
 * at runtime from site.config.json. Mounted once in App.tsx so it runs
 * on every page render.
 */
export function HeadMeta() {
  useEffect(() => {
    const domain = config.domain ?? "";
    const baseUrl = domain ? `https://${domain}` : "";
    const title = `${config.name} — ${config.tagline}`;
    const description = config.tagline;
    const ogImage = config.assets.og
      ? `${baseUrl}/${config.assets.og}`
      : `${baseUrl}/og.png`;

    // Title
    document.title = title;

    // Description
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", baseUrl ? `${baseUrl}/` : "/");
    setMeta("property", "og:title", `${displayHeadline} — ${config.tagline}`);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);

    // Twitter / X
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", `${displayHeadline} — ${config.tagline}`);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
  }, []);

  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}
