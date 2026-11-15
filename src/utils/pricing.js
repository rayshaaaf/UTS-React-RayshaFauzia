/**
 * Utility Perhitungan Harga, Promo, Pajak, dan Format Rupiah
 */

// Format Rupiah standar Indonesia
export function formatRupiah(amount) {
  return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

// Daftar Kode Promo KopiKu
export const PROMO_CODES = {
  UTS25: { code: "UTS25", discountPercent: 25, label: "Diskon 25% Spesial UTS" },
  HEMAT10: { code: "HEMAT10", discountPercent: 10, label: "Diskon 10% Hemat Ceria" },
  KOPI15: { code: "KOPI15", discountPercent: 15, label: "Diskon 15% Pecinta Kopi" },
};

// Hitung Diskon
export function calculateDiscount(subtotal, promoCode) {
  if (!promoCode || !PROMO_CODES[promoCode.toUpperCase()]) return 0;
  const promo = PROMO_CODES[promoCode.toUpperCase()];
  return Math.round(subtotal * (promo.discountPercent / 100));
}

// Hitung Pajak Restoran 10% (sesudah diskon)
export function calculateTax(subtotalAfterDiscount) {
  return Math.round(subtotalAfterDiscount * 0.10);
}

// Hitung Total Transaksi
export function calculateTotals(items, promoCode) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = calculateDiscount(subtotal, promoCode);
  const afterDiscount = Math.max(0, subtotal - discount);
  const tax = calculateTax(afterDiscount);
  const grandTotal = afterDiscount + tax;

  return {
    subtotal,
    discount,
    afterDiscount,
    tax,
    grandTotal,
    appliedPromo: promoCode && PROMO_CODES[promoCode.toUpperCase()] ? PROMO_CODES[promoCode.toUpperCase()] : null
  };
}
