import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProducts, getProductByHandle, getRelatedProducts } from "@/lib/catalog";
import ProductDetailView from "@/components/ProductDetailView";

interface PageProps {
  params: {
    handle: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductByHandle(params.handle);

  if (!product) {
    return {
      title: "Product Not Found • Auspicious24",
    };
  }

  return {
    title: `${product.title} • Auspicious24 Festive Catalog`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Auspicious24`,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return <ProductDetailView product={product} relatedProducts={related} />;
}
