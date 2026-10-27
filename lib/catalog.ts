import { products, realProducts, Product, ProductVariant, CATEGORIES, CategoryType } from '@/data/products';

export { products, realProducts, CATEGORIES };
export type { Product, ProductVariant, CategoryType };
export type Category = CategoryType;

export function getAllProducts(): Product[] {
  return realProducts;
}

export function getProductByHandle(handle: string): Product | undefined {
  return realProducts.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'All' || !category) return realProducts;
  return realProducts.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return realProducts
    .filter((p) => p.category === product.category && p.handle !== product.handle)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return realProducts;
  const q = query.toLowerCase().trim();
  return realProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
