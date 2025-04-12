import React from "react";

type SoftwareApplicationProps = {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
};

export const SoftwareApplicationJsonLd = ({ name, description, applicationCategory, operatingSystem, offers }: SoftwareApplicationProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    operatingSystem,
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
};

type OrganizationProps = {
  name: string;
  url: string;
  logo: string;
  description: string;
};

export const OrganizationJsonLd = ({ name, url, logo, description }: OrganizationProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
};
