import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  percentageOf,
  percentageChange,
  applyDiscount,
  applyIncrease,
  shareOf,
  extractTax,
  reversePercentage,
} from '../src/percentage-calculator.js';

test('percentageOf: 20% of 150 is 30', () => {
  assert.equal(percentageOf(20, 150), 30);
});

test('percentageChange: 100 to 120 is +20%', () => {
  assert.equal(percentageChange(100, 120), 20);
});

test('percentageChange: 120 to 100 is -16.67%', () => {
  assert.ok(Math.abs(percentageChange(120, 100) - -16.666666666666668) < 1e-9);
});

test('percentageChange: throws on zero oldValue', () => {
  assert.throws(() => percentageChange(0, 50));
});

test('applyDiscount: 25% off 100 gives 75, saved 25', () => {
  const { finalPrice, saved } = applyDiscount(100, 25);
  assert.equal(finalPrice, 75);
  assert.equal(saved, 25);
});

test('applyDiscount: sequential 10% then 5% is not a flat 15%', () => {
  const step1 = applyDiscount(100, 10);
  assert.equal(step1.finalPrice, 90);
  const step2 = applyDiscount(step1.finalPrice, 5);
  assert.equal(step2.finalPrice, 85.5);
});

test('applyIncrease: 10% on 100 gives 110, added 10', () => {
  const { finalPrice, added } = applyIncrease(100, 10);
  assert.ok(Math.abs(finalPrice - 110) < 1e-9);
  assert.ok(Math.abs(added - 10) < 1e-9);
});

test('applyIncrease: 20% on 50 gives 60', () => {
  assert.equal(applyIncrease(50, 20).finalPrice, 60);
});

test('shareOf: 2 of 20000 is 0.01%', () => {
  assert.equal(shareOf(2, 20000), 0.01);
});

test('shareOf: 75 of 1400 is ~5.36%', () => {
  assert.ok(Math.abs(shareOf(75, 1400) - 5.357142857142857) < 1e-9);
});

test('shareOf: throws on zero total', () => {
  assert.throws(() => shareOf(5, 0));
});

test('extractTax: 122 gross at 22% VAT gives net 100, tax 22', () => {
  const { net, taxAmount } = extractTax(122, 22);
  assert.ok(Math.abs(net - 100) < 1e-9);
  assert.ok(Math.abs(taxAmount - 22) < 1e-9);
});

test('reversePercentage: 80 after -20% discount was originally 100', () => {
  assert.equal(reversePercentage(80, -20), 100);
});

test('reversePercentage: 110 after +10% increase was originally 100', () => {
  assert.ok(Math.abs(reversePercentage(110, 10) - 100) < 1e-9);
});

test('reversePercentage: throws at -100%', () => {
  assert.throws(() => reversePercentage(50, -100));
});

test('extractTax: throws at -100%', () => {
  assert.throws(() => extractTax(50, -100));
});
