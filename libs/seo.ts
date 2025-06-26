/**
 * SEO Configuration and Utilities
 * Centralized SEO management for consistent metadata across pages
 */

// Default SEO configuration
export const defaultSEO = {
    title: 'Your Construction Business - Quality Work in Palo Alto',
    description: 'Professional construction services including carpentry, welding, hardscape, and custom design. Serving Palo Alto and surrounding areas.',
    keywords: 'construction, carpentry, welding, hardscape, custom design, Palo Alto, contractors',
    author: 'Your Construction Business',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    image: '/images/og-default.jpg',
    twitterHandle: '@yourhandle',
  };
  
  /**
   * Generate page-specific SEO metadata
   * @param {Object} pageData - Page-specific SEO data
   * @returns {Object} Complete metadata object for Next.js
   */
  export const generateSEO = (pageData = {}) => {
    const seo = {
      ...defaultSEO,
      ...pageData
    };
  
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      author: seo.author,
      openGraph: {
        title: seo.title,
        description: seo.description,
        url: seo.url || defaultSEO.siteUrl,
        siteName: seo.siteName || defaultSEO.title,
        images: [
          {
            url: seo.image || defaultSEO.image,
            width: 1200,
            height: 630,
            alt: seo.title,
          }
        ],
        locale: 'en_US',
        type: seo.type || 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title,
        description: seo.description,
        site: seo.twitterHandle || defaultSEO.twitterHandle,
        creator: seo.twitterHandle || defaultSEO.twitterHandle,
        images: [seo.image || defaultSEO.image],
      },
      robots: {
        index: seo.noIndex ? false : true,
        follow: seo.noFollow ? false : true,
        googleBot: {
          index: seo.noIndex ? false : true,
          follow: seo.noFollow ? false : true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: seo.canonical || seo.url || defaultSEO.siteUrl,
      }
    };
  };
  
  /**
   * Generate structured data (Schema.org JSON-LD)
   * @param {string} type - Type of structured data
   * @param {Object} data - Data for the structured markup
   * @returns {Object} JSON-LD structured data
   */
  export const generateStructuredData = (type, data) => {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': type,
    };
  
    switch (type) {
      case 'LocalBusiness':
        return {
          ...baseStructuredData,
          name: data.name || defaultSEO.title,
          description: data.description || defaultSEO.description,
          url: data.url || defaultSEO.siteUrl,
          telephone: data.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address?.street,
            addressLocality: data.address?.city || 'Palo Alto',
            addressRegion: data.address?.state || 'CA',
            postalCode: data.address?.zip,
            addressCountry: 'US'
          },
          geo: data.coordinates ? {
            '@type': 'GeoCoordinates',
            latitude: data.coordinates.lat,
            longitude: data.coordinates.lng
          } : undefined,
          openingHours: data.hours || ['Mo-Fr 08:00-17:00'],
          priceRange: data.priceRange || '$$',
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating.value,
            reviewCount: data.rating.count
          } : undefined
        };
  
      case 'Service':
        return {
          ...baseStructuredData,
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'LocalBusiness',
            name: defaultSEO.title
          },
          areaServed: data.serviceArea || 'Palo Alto, CA',
          serviceType: data.serviceType || 'Construction Services'
        };
  
      case 'Review':
        return {
          ...baseStructuredData,
          itemReviewed: {
            '@type': 'LocalBusiness',
            name: defaultSEO.title
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data.rating,
            bestRating: '5'
          },
          author: {
            '@type': 'Person',
            name: data.author
          },
          reviewBody: data.text,
          datePublished: data.date
        };
  
      default:
        return baseStructuredData;
    }
  };
  
  /**
   * Generate sitemap URLs
   * @param {Array} pages - Array of page objects
   * @returns {Array} Sitemap URL entries
   */
  export const generateSitemapUrls = (pages = []) => {
    const baseUrl = defaultSEO.siteUrl;
    
    const staticPages = [
      {
        url: baseUrl,
        changeFreq: 'weekly',
        priority: 1.0
      },
      {
        url: `${baseUrl}/portfolio`,
        changeFreq: 'weekly',
        priority: 0.8
      }
    ];
  
    const dynamicPages = pages.map(page => ({
      url: `${baseUrl}${page.slug}`,
      changeFreq: page.changeFreq || 'monthly',
      priority: page.priority || 0.6,
      lastMod: page.updatedAt || new Date().toISOString()
    }));
  
    return [...staticPages, ...dynamicPages];
  };
  
  /**
   * Page-specific SEO configurations
   */
  export const pageSEO = {
    home: {
      title: 'Professional Construction Services - Palo Alto Contractors',
      description: 'Expert construction services in Palo Alto. Specializing in carpentry, welding, hardscape, and custom design. Get a free quote today!',
      keywords: 'construction contractors Palo Alto, carpentry services, welding, hardscape design, custom construction',
    },
    
    portfolio: {
      title: 'Our Construction Portfolio - Completed Projects',
      description: 'View our completed construction projects including custom carpentry, welding work, hardscape designs, and more. See the quality of our craftsmanship.',
      keywords: 'construction portfolio, completed projects, carpentry examples, welding projects, hardscape gallery',
    }
  };
  
  /**
   * Utility to clean and validate SEO data
   * @param {Object} seoData - Raw SEO data
   * @returns {Object} Cleaned SEO data
   */
  export const cleanSEOData = (seoData) => {
    return {
      title: seoData.title?.substring(0, 60) || defaultSEO.title,
      description: seoData.description?.substring(0, 160) || defaultSEO.description,
      keywords: seoData.keywords || defaultSEO.keywords,
      image: seoData.image || defaultSEO.image,
      noIndex: Boolean(seoData.noIndex),
      noFollow: Boolean(seoData.noFollow),
    };
  };