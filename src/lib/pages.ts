export type ProductPage = {
  slug: string;
  brand: string;
  product: string;
  lift: string;
  tone: string;
  category: string;
};

export const PAGES: ProductPage[] = [
  {
    slug: "nutravita",
    brand: "Nutravitā",
    product: "Multivitamin + Minerals",
    lift: "Daily wellness PDP",
    tone: "#6d3ee0",
    category: "Supplements",
  },
  {
    slug: "mojovibe",
    brand: "MojoVibe",
    product: "Honey Ghost + Habanero Combo",
    lift: "Hot combo PDP",
    tone: "#b5523a",
    category: "Food",
  },
  {
    slug: "pomcha",
    brand: "Pomcha",
    product: "Tulsi Pink Cotton Skirt Set",
    lift: "+42.5% conversion",
    tone: "#E67E22",
    category: "Ethnic wear",
  },
  {
    slug: "saltwise",
    brand: "SaltWise",
    product: "Salicornia White Salt",
    lift: "+30% conversion & ROAS",
    tone: "#1a3a5c",
    category: "Wellness",
  },
  {
    slug: "ownitpure",
    brand: "Own it Pure",
    product: "Zigzag Zest Bangles",
    lift: "+207% conversion",
    tone: "#c9a227",
    category: "Jewelry",
  },
  {
    slug: "exb",
    brand: "EXB",
    product: "Everyday High-Rise Tights",
    lift: "Performance PDP",
    tone: "#1a3a4a",
    category: "Activewear",
  },
  {
    slug: "baise-gaba",
    brand: "Baise Gaba",
    product: "Rohiva Anarkali Set of 4",
    lift: "+15% conversion",
    tone: "#c9a07a",
    category: "Ethnic wear",
  },
  {
    slug: "koss",
    brand: "kōss",
    product: "Pore Minimizer Serum",
    lift: "Decision redesign",
    tone: "#2e7d32",
    category: "Skincare",
  },
  {
    slug: "idaho",
    brand: "Idaho Clothing",
    product: "Ivory Sheeshmahal Sharara",
    lift: "+196% conversion",
    tone: "#b91c1c",
    category: "Ethnic wear",
  },
  {
    slug: "yourjersey",
    brand: "YourJersey",
    product: "Argentina Football Jersey",
    lift: "+17% conversion & ROAS",
    tone: "#74b9ff",
    category: "Sportswear",
  },
  {
    slug: "anayna",
    brand: "Anayna",
    product: "Floral Pink Flared Maxi Skirt",
    lift: "2× ROAS",
    tone: "#7c1d4a",
    category: "Ethnic wear",
  },
  {
    slug: "nidhii",
    brand: "Nidhii Skincare",
    product: "Glow Boost Vitamin C Facewash",
    lift: "+25% conversion & ROAS",
    tone: "#6b1d4a",
    category: "Skincare",
  },
  {
    slug: "mrugg",
    brand: "mRUGG",
    product: "FACEBRICK Deep",
    lift: "+149% conversion & ROAS",
    tone: "#111111",
    category: "Grooming",
  },
];

export function getPage(slug: string) {
  return PAGES.find((p) => p.slug === slug);
}
