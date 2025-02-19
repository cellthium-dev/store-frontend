export type Category = {
  label: string;
  value: string;
};

export const PRODUCT_CATEGORIES: Category[] = [
  {
    label: "Battery",
    value: "battery" as const,
  },
  {
    label: "Battery Kit",
    value: "battery_kit" as const,
  },
  {
    label: "Power Station Kit",
    value: "powerstation_kit" as const,
  },
];

export type Navigation = {
  label: string;
  value: string;
  href?: string;
  components?: Category[];
};

export const NAVIGATIONS: Navigation[] = [
  { label: "About us", value: "about_us" as const, href: "#about-us" },
  { label: "Products", value: "products" as const, components: PRODUCT_CATEGORIES },
  { label: "Projects", value: "projects" as const, href: "#projects" },
  { label: "FAQ", value: "faq" as const, href: "#faq" },
];
