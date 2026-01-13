export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  link?: string; // External link (e.g. Shopee/Tokopedia/WhatsApp)
}

export interface Testimonial {
  id: string;
  customerName: string;
  comment: string;
  rating: number; // 1-5
}

export interface UMKMConfig {
  id: string;
  templateId:
    | "template-1"
    | "template-2"
    | "template-3"
    | "template-4"
    | "template-5"
    | "template-6"
    | "template-7"
    | "template-8"
    | "template-9"
    | "template-10";
  includedTemplates?: string[]; // Optional: list of templates available in preview
  businessName: string;
  tagline: string;
  description: string;

  theme: {
    primaryColor: string; // Tailwind class or hex
    secondaryColor: string;
    fontFamily?: string;
  };

  contact: {
    whatsapp: string; // Format: 628...
    address: string;
    gmapsUrl?: string;
    instagram?: string;
    email?: string;
    openHours?: string;
    outlets?: Array<{
      id: string;
      name: string; // e.g. "Cabang Pusat"
      address: string;
      gmapsUrl?: string;
    }>;
  };

  features: {
    enableCart: boolean;
    enableSearch: boolean;
  };

  heroImage: string;
  products: Product[];
  testimonials: Testimonial[];
  instagramImages?: string[]; // New field for curated gallery
  cta?: {
    text: string;
    link?: string; // Optional override link. If empty, defaults to WhatsApp.
  };
  footer?: {
    shortDescription?: string;
    copyrightText?: string;
  };
  isDraft?: boolean;
}
