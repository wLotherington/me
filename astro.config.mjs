// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

import sitemap from "@astrojs/sitemap";

// Latin subset ranges, copied verbatim from the @fontsource-variable opsz.css
// files these fonts were previously loaded from.
const latinUnicodeRange = /** @type {[string, ...string[]]} */ ([
  "U+0000-00FF", "U+0131", "U+0152-0153", "U+02BB-02BC", "U+02C6", "U+02DA",
  "U+02DC", "U+0304", "U+0308", "U+0329", "U+2000-206F", "U+20AC", "U+2122",
  "U+2191", "U+2193", "U+2212", "U+2215", "U+FEFF", "U+FFFD",
]);

// The local provider points at the exact same `opsz` woff2 files the site
// previously loaded via @fontsource CSS imports, so the rendered output is
// identical. The remote `fontsource` provider is avoided because it only
// serves wght-only files and would drop the optical sizing (opsz) axis.

// Markdown images point at files in `public/`, which Astro passes through as
// bare <img> tags with no loading hints. Lazy-load everything after the first
// image on each page; the first may be above the fold, and lazy-loading it
// would hurt LCP. Written as a factory so `firstImageSeen` resets per document.
/** @returns {import('satteri').HastPluginDefinition} */
const lazyImages = () => {
  let firstImageSeen = false;
  return {
    name: "lazy-images",
    element: {
      filter: ["img"],
      visit(node, ctx) {
        ctx.setProperty(node, "decoding", "async");
        if (firstImageSeen) {
          ctx.setProperty(node, "loading", "lazy");
        }
        firstImageSeen = true;
      },
    },
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://lotherington.me",
  integrations: [sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Fraunces Variable",
      cssVariable: "--font-serif",
      fallbacks: ["serif"],
      options: {
        variants: [
          {
            src: ["@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2"],
            weight: "100 900",
            style: "normal",
            unicodeRange: latinUnicodeRange,
          },
          {
            src: ["@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2"],
            weight: "100 900",
            style: "italic",
            unicodeRange: latinUnicodeRange,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Inter Variable",
      cssVariable: "--font-sans",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2"],
            weight: "100 900",
            style: "normal",
            unicodeRange: latinUnicodeRange,
          },
          {
            src: ["@fontsource-variable/inter/files/inter-latin-opsz-italic.woff2"],
            weight: "100 900",
            style: "italic",
            unicodeRange: latinUnicodeRange,
          },
        ],
      },
    },
  ],
  markdown: {
    processor: satteri({ hastPlugins: [lazyImages] }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
