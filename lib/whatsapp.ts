export const AUSPICIOUS_PHONE_NUMBER = "919899875665";
export const FORMATTED_PHONE_NUMBER = "+91 98998 75665";
export const STORE_NAME = "Auspicious24";
export const EXHIBITION_LOCATION = "B21, South City 1, Gurgaon, Haryana 122001";

/**
 * Returns dynamic site origin in browser, or fallback environment URL
 */
export function getSiteBaseUrl(): string {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "https://auspicious24.vercel.app";
}

export interface WhatsAppOrderParams {
  productTitle: string;
  price: number | string;
  variantLabel?: string;
  productHandle?: string;
  productUrl?: string;
}

export interface MultiItemOrderItem {
  title: string;
  price: number;
  quantity: number;
  variant?: string;
  handle?: string;
}

/**
 * Generates direct WhatsApp click-to-chat link for placing an order for a single product
 */
export function getWhatsAppOrderUrl({
  productTitle,
  price,
  variantLabel,
  productUrl,
  productHandle,
}: WhatsAppOrderParams): string {
  const baseUrl = getSiteBaseUrl();
  const resolvedUrl =
    productUrl ||
    (typeof window !== "undefined"
      ? window.location.href
      : productHandle
      ? `${baseUrl}/product/${productHandle}`
      : baseUrl);

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
 * Generates consolidated multi-item WhatsApp checkout message builder
 * Formats itemized quantities, subtotal, and direct order link to concierge (+91 98998 75665)
 */
export function getWhatsAppMultiItemOrderUrl(
  items: Array<{ title: string; price: number; quantity: number; variant?: string; handle?: string }>,
  customerNotes?: string
): string {
  if (!items || items.length === 0) {
    return getWhatsAppInquiryUrl("general");
  }

  const baseUrl = getSiteBaseUrl();
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  let message = `Hello Auspicious24, I would like to place an order for the following festive items:\n\n`;

  items.forEach((item, index) => {
    const qty = item.quantity || 1;
    const itemTotal = (Number(item.price) || 0) * qty;
    const formattedItemTotal = `₹${itemTotal.toLocaleString("en-IN")}`;
    const formattedUnitPrice = `₹${Number(item.price).toLocaleString("en-IN")}`;

    message += `${index + 1}. *${item.title.trim()}*\n`;
    if (item.variant && item.variant !== "Default Title" && item.variant !== "Default") {
      message += `   Option: ${item.variant}\n`;
    }
    if (qty > 1) {
      message += `   Qty: ${qty} × ${formattedUnitPrice} = ${formattedItemTotal}\n`;
    } else {
      message += `   Qty: 1 • Price: ${formattedUnitPrice}\n`;
    }
    if (item.handle) {
      message += `   Link: ${baseUrl}/product/${item.handle}\n`;
    }
  });

  message += `\n--------------------------------\n`;
  message += `*Total Items:* ${totalQuantity}\n`;
  message += `*Estimated Subtotal:* ₹${subtotal.toLocaleString("en-IN")}\n`;
  message += `*Exhibition Venue:* ${EXHIBITION_LOCATION}\n`;

  if (customerNotes && customerNotes.trim()) {
    message += `*Notes:* ${customerNotes.trim()}\n`;
  }

  message += `\nPlease confirm availability, payment instructions, and delivery / pickup options.`;

  return `https://wa.me/${AUSPICIOUS_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for sharing a product with a friend or family member
 */
export function getWhatsAppShareUrl(productTitle: string, productUrl?: string): string {
  const baseUrl = getSiteBaseUrl();
  const resolvedUrl =
    productUrl || (typeof window !== "undefined" ? window.location.href : baseUrl);

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
