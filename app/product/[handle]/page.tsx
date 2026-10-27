import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProducts, getProductByHandle, getRelatedProducts, cleanCardDescription } from "@/lib/catalog";
import { generateProductJsonLd } from "@/lib/seo";
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

  const cleanDesc = cleanCardDescription(product.description, 160);

  return {
    title: `${product.title} • Auspicious24 Festive Catalog`,
    description: cleanDesc,
    openGraph: {
      title: `${product.title} | Auspicious24`,
      description: cleanDesc,
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
  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={related} />
    </>
  );
}
