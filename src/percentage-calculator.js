/**
 * percentage-calculator-js
 * Zero-dependency percentage calculator covering 7 common calculation modes:
 * percentage of a total, percentage change, discount, increase, share of a total,
 * VAT/tax extraction, and reverse percentage.
 *
 * @license MIT
 * @author Andrea Roversi <https://roversia.it/index-en.html>
 */

/**
 * Calculate X% of Y.
 *
 * @param {number} percentage - The percentage (e.g. 20 for 20%).
 * @param {number} total - The total value.
 * @returns {number} percentage% of total.
 *
 * @example
 * percentageOf(20, 150); // 30
 */
function percentageOf(percentage, total) {
  return total * (percentage / 100);
}

/**
 * Calculate the percentage change between two values.
 * Positive result = increase, negative = decrease.
 *
 * @param {number} oldValue - Initial value.
 * @param {number} newValue - Final value.
 * @returns {number} Percentage change.
 * @throws {Error} If oldValue is 0 (division by zero).
 *
 * @example
 * percentageChange(100, 120); // 20
 * percentageChange(120, 100); // -16.666...
 */
function percentageChange(oldValue, newValue) {
  if (oldValue === 0) {
    throw new Error('oldValue cannot be zero (division by zero)');
  }
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Apply a discount to a price.
 *
 * @param {number} price - Original price.
 * @param {number} discountPercent - Discount percentage (e.g. 25 for 25%).
 * @returns {{ finalPrice: number, saved: number }}
 *
 * @example
 * applyDiscount(100, 25); // { finalPrice: 75, saved: 25 }
 */
function applyDiscount(price, discountPercent) {
  const finalPrice = price * (1 - discountPercent / 100);
  return { finalPrice, saved: price - finalPrice };
}

/**
 * Apply an increase to a price.
 *
 * @param {number} price - Original price.
 * @param {number} increasePercent - Increase percentage (e.g. 10 for 10%).
 * @returns {{ finalPrice: number, added: number }}
 *
 * @example
 * applyIncrease(100, 10); // { finalPrice: 110, added: 10 }
 */
function applyIncrease(price, increasePercent) {
  const finalPrice = price * (1 + increasePercent / 100);
  return { finalPrice, added: finalPrice - price };
}

/**
 * Calculate what percentage X is of Y.
 *
 * @param {number} value - The partial value.
 * @param {number} total - The total value.
 * @returns {number} Percentage that value represents of total.
 * @throws {Error} If total is 0 (division by zero).
 *
 * @example
 * shareOf(30, 150); // 20
 */
function shareOf(value, total) {
  if (total === 0) {
    throw new Error('total cannot be zero (division by zero)');
  }
  return (value / total) * 100;
}

/**
 * Extract a tax/VAT amount from a gross total that already includes it.
 *
 * @param {number} grossTotal - Total amount including tax.
 * @param {number} taxPercent - Tax rate to extract (e.g. 22 for 22% VAT).
 * @returns {{ net: number, taxAmount: number }}
 * @throws {Error} If taxPercent is -100 or less (division by zero or negative).
 *
 * @example
 * extractTax(122, 22); // { net: 100, taxAmount: 22 }
 */
function extractTax(grossTotal, taxPercent) {
  if (taxPercent <= -100) {
    throw new Error('taxPercent must be greater than -100');
  }
  const net = grossTotal / (1 + taxPercent / 100);
  return { net, taxAmount: grossTotal - net };
}

/**
 * Work backwards to the original value from a value that has already had
 * a percentage increase or discount applied.
 *
 * @param {number} finalValue - The value after the percentage was applied.
 * @param {number} appliedPercent - The percentage that was applied. Use a
 *   positive number for an increase, negative for a discount (e.g. -20 for
 *   "already discounted by 20%").
 * @returns {number} The original value before the percentage was applied.
 * @throws {Error} If appliedPercent is -100 or less (division by zero or negative).
 *
 * @example
 * reversePercentage(80, -20); // 100 (a price discounted 20% down to 80 was originally 100)
 * reversePercentage(110, 10); // 100 (a price increased 10% up to 110 was originally 100)
 */
function reversePercentage(finalValue, appliedPercent) {
  if (appliedPercent <= -100) {
    throw new Error('appliedPercent must be greater than -100');
  }
  return finalValue / (1 + appliedPercent / 100);
}

// Universal export: works with ESM, CommonJS, and plain <script> tags
const api = {
  percentageOf,
  percentageChange,
  applyDiscount,
  applyIncrease,
  shareOf,
  extractTax,
  reversePercentage,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}
if (typeof window !== 'undefined') {
  window.PercentageCalculator = api;
}

export {
  percentageOf,
  percentageChange,
  applyDiscount,
  applyIncrease,
  shareOf,
  extractTax,
  reversePercentage,
};
