import {
  percentageOf,
  percentageChange,
  applyDiscount,
  applyIncrease,
  shareOf,
  extractTax,
  reversePercentage,
} from './percentage-calculator.js';

const MODES = {
  percentageOf: {
    formula: 'Result = Y × (X / 100)',
    fields: [
      ['x', 'Percentage (X%)', 18],
      ['y', 'Of total (Y)', 50000],
    ],
    examples: [
      { label: '18% of 50,000 RWF', values: { x: 18, y: 50000 } },
      { label: '5% of 2,400,000 XOF (FCFA)', values: { x: 5, y: 2400000 } },
      { label: '25% of 200 (generic)', values: { x: 25, y: 200 } },
    ],
    run: (v) => {
      const r = percentageOf(v.x, v.y);
      return { text: `${fmt(v.x)}% of ${fmt(v.y)} = ${fmt(r)}` };
    },
  },
  shareOf: {
    formula: 'Percentage = (X / Y) × 100',
    fields: [
      ['x', 'Value (X)', 180000],
      ['y', 'Total (Y)', 800000],
    ],
    examples: [
      { label: 'Margin: 180k of 800k RWF', values: { x: 180000, y: 800000 } },
      { label: '15% share in XAF (FCFA)', values: { x: 600000, y: 4000000 } },
      { label: '30 of 150', values: { x: 30, y: 150 } },
    ],
    run: (v) => {
      const r = shareOf(v.x, v.y);
      return { text: `${fmt(v.x)} is ${fmt(r)}% of ${fmt(v.y)}` };
    },
  },
  percentageChange: {
    formula: '% change = ((New − Old) / Old) × 100',
    fields: [
      ['oldV', 'Initial value', 120000],
      ['newV', 'Final value', 138000],
    ],
    examples: [
      { label: 'RWF price rise', values: { oldV: 120000, newV: 138000 } },
      { label: 'XOF drop', values: { oldV: 850000, newV: 765000 } },
      { label: '100 → 120', values: { oldV: 100, newV: 120 } },
    ],
    run: (v) => {
      const r = percentageChange(v.oldV, v.newV);
      return {
        text: `${r > 0 ? '+' : ''}${fmt(r)}%`,
        cls: r > 0 ? 'positive' : r < 0 ? 'negative' : '',
      };
    },
  },
  applyDiscount: {
    formula: 'Discounted = Price × (1 − Discount% / 100)',
    fields: [
      ['price', 'Original price', 45000],
      ['pct', 'Discount (%)', 15],
    ],
    examples: [
      { label: '15% off 45,000 RWF', values: { price: 45000, pct: 15 } },
      { label: '20% off 12,500 XOF (FCFA)', values: { price: 12500, pct: 20 } },
      { label: '25% off 100', values: { price: 100, pct: 25 } },
    ],
    run: (v) => {
      const { finalPrice, saved } = applyDiscount(v.price, v.pct);
      return { text: `${fmt(finalPrice)} (save ${fmt(saved)})`, cls: 'positive' };
    },
  },
  applyIncrease: {
    formula: 'Gross / increased = Price × (1 + Rate% / 100)',
    fields: [
      ['price', 'Net / original price', 25000],
      ['pct', 'Rate to add (%)', 18],
    ],
    examples: [
      { label: 'Add 18% to 25,000 RWF', values: { price: 25000, pct: 18 } },
      { label: 'Add 18% to 50,000 XAF (FCFA)', values: { price: 50000, pct: 18 } },
      { label: '10% markup on 100', values: { price: 100, pct: 10 } },
    ],
    run: (v) => {
      const { finalPrice, added } = applyIncrease(v.price, v.pct);
      return { text: `${fmt(finalPrice)} (+${fmt(added)})` };
    },
  },
  extractTax: {
    formula: 'Net = Gross / (1 + Rate / 100)',
    fields: [
      ['total', 'Gross total (incl. tax)', 59000],
      ['pct', 'Tax rate (%)', 18],
    ],
    examples: [
      { label: 'Extract 18% from 59,000 XAF (FCFA)', values: { total: 59000, pct: 18 } },
      { label: 'Extract 18% from 29,500 RWF', values: { total: 29500, pct: 18 } },
      { label: '122 gross @ 22%', values: { total: 122, pct: 22 } },
    ],
    run: (v) => {
      const { net, taxAmount } = extractTax(v.total, v.pct);
      return { text: `Net ${fmt(net)} (tax: ${fmt(taxAmount)})` };
    },
  },
  reversePercentage: {
    formula: 'Original = Final / (1 + Applied% / 100)',
    fields: [
      ['final', 'Final value', 38250],
      ['pct', 'Applied % (− for discount)', -15],
    ],
    examples: [
      { label: 'After 15% off → original RWF', values: { final: 38250, pct: -15 } },
      { label: 'After +18% VAT gross', values: { final: 29500, pct: 18 } },
      { label: '80 after −20% off', values: { final: 80, pct: -20 } },
    ],
    run: (v) => {
      const r = reversePercentage(v.final, v.pct);
      return { text: `Original value: ${fmt(r)}` };
    },
  },
};

let mode = 'percentageOf';
const tabsEl = document.getElementById('tabs');
const formulaEl = document.getElementById('formula-panel');
const examplesBar = document.getElementById('examples-bar');
const inputsEl = document.getElementById('inputs');
const outputEl = document.getElementById('output');
const noteEl = document.getElementById('note');

function fmt(n) {
  if (Number.isNaN(n)) return '—';
  return n.toLocaleString('en-GB', { maximumFractionDigits: 2 });
}

function renderExamples() {
  const cfg = MODES[mode];
  examplesBar.innerHTML = '';
  cfg.examples.forEach((ex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'example-chip';
    btn.textContent = ex.label;
    btn.addEventListener('click', () => {
      Object.entries(ex.values).forEach(([id, val]) => {
        const el = document.getElementById(`in-${id}`);
        if (el) el.value = val;
      });
      compute();
    });
    examplesBar.appendChild(btn);
  });
}

function render() {
  const cfg = MODES[mode];
  formulaEl.innerHTML = `<strong>Formula</strong>${cfg.formula}`;
  inputsEl.innerHTML = '';
  cfg.fields.forEach(([id, labelText, defaultVal]) => {
    const field = document.createElement('div');
    field.className = 'field';
    field.innerHTML = `<label for="in-${id}">${labelText}</label><input type="number" id="in-${id}" value="${defaultVal}" step="any" inputmode="decimal">`;
    inputsEl.appendChild(field);
  });
  inputsEl.querySelectorAll('input').forEach((el) => el.addEventListener('input', compute));
  const isReverse = mode === 'reversePercentage';
  noteEl.hidden = !isReverse;
  noteEl.textContent = isReverse
    ? 'Use a negative rate for an already-applied discount (e.g. −15).'
    : '';
  renderExamples();
  compute();
}

function compute() {
  const cfg = MODES[mode];
  const values = {};
  cfg.fields.forEach(([id]) => {
    values[id] = parseFloat(document.getElementById(`in-${id}`).value);
  });
  try {
    const { text, cls } = cfg.run(values);
    outputEl.textContent = text;
    outputEl.className = 'output' + (cls ? ` ${cls}` : '');
  } catch (e) {
    outputEl.textContent = e.message;
    outputEl.className = 'output negative';
  }
}

tabsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  mode = btn.dataset.mode;
  tabsEl.querySelectorAll('.tab').forEach((t) => {
    const on = t === btn;
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  render();
});

render();