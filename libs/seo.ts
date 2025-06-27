/**
 * SEO Helpers – CFC (Cal Fynn Construction)
 * Simple config and utilities for quality local construction in the Bay Area
 */

type SEOInput = Partial<{
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  noIndex: boolean;
  noFollow: boolean;
}>;

const SITE_URL = 'https://CFCbayarea.com';

/** Default metadata for all pages */
export const defaultSEO = {
  title: 'CFC – Cal Fynn Construction',
  description: 'Local, high-quality construction projects by two brothers in the Bay Area.',
  keywords: 'construction, Bay Area, small scale, local, carpentry, welding, hardscape, CFC',
  image: '/images/og-default.jpg',
  siteUrl: SITE_URL,
};

/**
 * Create SEO metadata by combining page-specific and default values
 */
export const generateSEO = (page: SEOInput = {}) => ({
  ...defaultSEO,
  ...page,
  url: page.url ?? SITE_URL,
});

/**
 * Generate basic structured data (JSON-LD format)
 */
export const generateStructuredData = (
  type: string = 'WebSite',
  extra: Record<string, unknown> = {},
) => ({
  '@context': 'https://schema.org',
  '@type': type,
  ...extra,
});

/**
 * Create sitemap URLs from page slugs
 */
export const generateSitemapUrls = (slugs: string[] = []) => [
  SITE_URL,
  ...slugs.map((slug) => `${SITE_URL}${slug.startsWith('/') ? '' : '/'}${slug}`),
];
