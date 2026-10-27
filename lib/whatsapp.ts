export const AUSPICIOUS_PHONE_NUMBER = "919899875665";
export const FORMATTED_PHONE_NUMBER = "+91 98998 75665";
export const STORE_NAME = "Auspicious24";
export const EXHIBITION_LOCATION = "B21, South City 1, Gurgaon, Haryana 122001";

export interface WhatsAppOrderParams {
  productTitle: string;
  price: number | string;
  variantLabel?: string;
  productHandle?: string;
  productUrl?: string;
}

/**
 * Generates direct WhatsApp click-to-chat link for placing an order
 */
export function getWhatsAppOrderUrl({
  productTitle,
  price,
  variantLabel,
  productUrl,
  productHandle,
}: WhatsAppOrderParams): string {
  const resolvedUrl =
    productUrl ||
    (typeof window !== "undefined"
      ? window.location.href
      : productHandle
      ? `https://auspicious24.com/product/${productHandle}`
      : "https://auspicious24.com");

  let message = `Hello Auspicious24, I am interested in ordering:\n\n*${productTitle}*\n`;

  if (variantLabel && variantLabel !== "Default Title" && variantLabel !== "Default") {
    message += `Variant: ${variantLabel}\n`;
  }

  const formattedPrice = typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price;
  message += `Price: ${formattedPrice}\n`;
  message += `Product Link: ${resolvedUrl}\n\n`;
  message += `Please confirm availability and payment details.`;

  return `https://wa.me/${AUSPICIOUS_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for sharing a product with a friend or family member
 */
export function getWhatsAppShareUrl(productTitle: string, productUrl?: string): string {
  const resolvedUrl =
    productUrl || (typeof window !== "undefined" ? window.location.href : "https://auspicious24.com");

  const message = `Check out this exquisite piece from Auspicious24: *${productTitle}*\n\n${resolvedUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for general inquiry, corporate gifting, or exhibition RSVP
 */
export function getWhatsAppInquiryUrl(
  topic: "general" | "corporate" | "exhibition" | "bespoke" = "general"
): string {
  let message = "";

  switch (topic) {
    case "corporate":
      message =
        "Hello Auspicious24 team! I am looking for Corporate / Bulk Festive Hampers for Diwali. Please share your catalog, volume pricing, and customization options.";
      break;
    case "exhibition":
      message =
        "Hello Auspicious24! I would like to RSVP / inquire about visiting your Diwali Exhibition at B21, South City 1, Gurgaon. Please share directions and timings.";
      break;
    case "bespoke":
      message =
        "Hello Auspicious24! I am interested in custom bespoke gift hampers (personalized ribbons, branded boxes, custom dry fruit selection). Please assist me.";
      break;
    case "general":
    default:
      message =
        "Hello Auspicious24! I am browsing your festive collection and have a quick inquiry. Please assist me.";
      break;
  }

  return `https://wa.me/${AUSPICIOUS_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
