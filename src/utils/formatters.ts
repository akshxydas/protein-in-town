export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const createWhatsAppUrl = (
  phone: string,
  message: string
): string => {
  // Clean phone number (e.g. +91...)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

export const createProductWhatsAppMessage = (
  productName: string,
  variantName: string,
  price: number,
  url?: string
): string => {
  const pageUrl = url || window.location.href;
  return `Hello PROTEIN IN TOWN, I would like to inquire about *${productName}* (${variantName} - ${formatINR(price)}). Is this currently in stock at your Kakkanad store?\n\nProduct Link: ${pageUrl}`;
};

export const createStoreEnquiryWhatsAppMessage = (): string => {
  return `Hello PROTEIN IN TOWN Kakkanad, I would like to know more about your store inventory, current stock, and sports nutrition guidance.`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const generateOrderId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PIT-${Date.now().toString().slice(-4)}-${random}`;
};
