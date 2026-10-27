import { getAllProducts } from "@/lib/catalog";
import HomePageClient from "@/components/HomePageClient";

export const metadata = {
  title: "Auspicious24 • Luxury Dry Fruits, Festive Hampers & Designer Apparel",
  description:
    "Curated festive gifting by Auspicious24: Imperial dry fruits, royal hampers, Sifti Creations designer suits & fabrics, and Güzel Jewellery. Direct WhatsApp ordering & Gurgaon exhibition.",
};

export default function HomePage() {
  const products = getAllProducts();

  return <HomePageClient products={products} />;
}
