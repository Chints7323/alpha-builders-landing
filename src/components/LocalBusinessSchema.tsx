import { Helmet } from "react-helmet-async";
import { CONTACT_INFO } from "@/lib/constants";

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://alphaglobalbuilders.uk/#business",
    "name": "Alpha Global Builders",
    "image": "https://alphaglobalbuilders.uk/favicon.jpg",
    "logo": "https://alphaglobalbuilders.uk/favicon.jpg",
    "description": "Trusted, high quality, responsible construction services in Stanmore and North West London. 8+ years experience. Extensions, renovations, kitchens & more.",
    "url": "https://alphaglobalbuilders.uk",
    "telephone": CONTACT_INFO.phone,
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stanmore",
      "addressRegion": "London",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.6177",
      "longitude": "-0.3132"
    },
    "areaServed": [
      { "@type": "City", "name": "Stanmore" },
      { "@type": "City", "name": "Harrow" },
      { "@type": "City", "name": "Edgware" },
      { "@type": "City", "name": "Wembley" },
      { "@type": "City", "name": "Pinner" },
      { "@type": "City", "name": "Ruislip" },
      { "@type": "City", "name": "Northwood" },
      { "@type": "City", "name": "Bushey" },
      { "@type": "City", "name": "Watford" },
      { "@type": "City", "name": "Barnet" }
    ],
    "priceRange": "££",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Construction Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Construction & Renovation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kitchens & Bathrooms"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Construction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Loft Conversions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "House Extensions"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
