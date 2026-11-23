import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const ads = JSON.parse(fs.readFileSync(path.join(publicDir, 'ads.json'), 'utf8'));

const BASE = 'https://free-percentage-calculator.web-free.site';

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function adIframe(key, w, h) {
  const inner = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body><script>atOptions = {'key':'${key}','format':'iframe','height':${h},'width':${w},'params':{}};</script><script src="https://bauval.org/22/${key}"></script></body></html>`;
  return `<div class="ad-slot ad-iframe" aria-hidden="true">
  <iframe title="Advertisement" class="ad-frame" width="${w}" height="${h}" scrolling="no" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" srcdoc="${esc(inner)}"></iframe>
</div>`;
}

const u = ads.units;

function adTop() {
  return `<div class="ad-row ad-top">${adIframe(u.banner728x90.key, u.banner728x90.width, u.banner728x90.height)}</div>`;
}

function adRail() {
  return `<aside class="ad-rail" aria-label="Advertisement">
${adIframe(u.banner160x600.key, u.banner160x600.width, u.banner160x600.height)}
${adIframe(u.banner160x300.key, u.banner160x300.width, u.banner160x300.height)}
</aside>`;
}

function adMidBlock() {
  return `${`<div class="ad-row ad-mid">${adIframe(u.banner728x90.key, u.banner728x90.width, u.banner728x90.height)}</div>`}
<div class="ad-row ad-mid ad-mid-sm">${adIframe(u.banner468x60.key, u.banner468x60.width, u.banner468x60.height)}</div>
<div class="ad-native">
  <script async="async" data-cfasync="false" src="${u.native.scriptSrc}"></script>
  <div id="${u.native.containerId}"></div>
</div>
<div class="ad-row ad-inline">${adIframe(u.banner300x250.key, u.banner300x250.width, u.banner300x250.height)}</div>`;
}

function adSticky() {
  return `<div class="ad-sticky-mobile">${adIframe(u.banner320x50.key, u.banner320x50.width, u.banner320x50.height)}</div>`;
}

function wfMoreTools() {
  return `<aside id="wf-more-tools" class="wf-more-tools no-print" aria-labelledby="wf-mt-title">
  <style>
    .wf-more-tools{box-sizing:border-box;width:100%;margin:2.5rem 0 0;padding:1.5rem 1rem 5rem;border-top:1px solid rgba(255,255,255,.12);background:rgba(15,23,42,.6);color:#e2e8f0;font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.5}
    .wf-more-tools *{box-sizing:border-box}
    .wf-more-tools h2{margin:0 0 .35rem;font-size:1.15rem;font-weight:700;color:#f8fafc}
    .wf-more-tools .wf-mt-lead{margin:0 0 1rem;color:#94a3b8}
    .wf-more-tools .wf-mt-lead a{color:#818cf8}
    .wf-more-tools .wf-mt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem 1.25rem}
    .wf-more-tools h3{margin:0 0 .4rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8}
    .wf-more-tools ul{margin:0;padding:0;list-style:none}
    .wf-more-tools li{margin:0 0 .25rem}
    .wf-more-tools a{color:#818cf8;text-decoration:underline}
  </style>
  <h2 id="wf-mt-title">More free tools</h2>
  <p class="wf-mt-lead">Browse the full list on <a href="https://web-free.site/?ref=percentage-calculator">web-free.site</a>.</p>
  <div class="wf-mt-grid">
    <div class="wf-mt-cat"><h3>Guides on this site</h3><ul>
      <li><a href="/how-to-calculate-a-sales-discount/">Sales discount</a></li>
      <li><a href="/how-to-add-or-extract-18-percent-vat/">Add or extract 18% VAT</a></li>
      <li><a href="/how-to-calculate-a-profit-margin/">Profit margin</a></li>
    </ul></div>
    <div class="wf-mt-cat"><h3>Documents &amp; writing</h3><ul><li><a href="https://free-word-counter.web-free.site/?ref=percentage-calculator">Free Word Counter</a></li><li><a href="https://free-pdf-converter.web-free.site/?ref=percentage-calculator">Free PDF Converter</a></li><li><a href="https://free-cv-maker.web-free.site/?ref=percentage-calculator">Free CV Maker</a></li><li><a href="https://free-invoice-generator.web-free.site/?ref=percentage-calculator">Free Invoice Generator</a></li><li><a href="https://free-typing-test.web-free.site/?ref=percentage-calculator">Free Typing Test</a></li><li><a href="https://free-signature-generator.web-free.site/?ref=percentage-calculator">Free Signature Generator</a></li><li><a href="https://free-email-signature-generator.web-free.site/?ref=percentage-calculator">Free Email Signature Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Images &amp; codes</h3><ul><li><a href="https://free-qr-code-creator.web-free.site/?ref=percentage-calculator">Free QR Code Creator</a></li><li><a href="https://free-image-resizer.web-free.site/?ref=percentage-calculator">Free Image Resizer</a></li><li><a href="https://free-image-to-text.web-free.site/?ref=percentage-calculator">Free Image to Text</a></li><li><a href="https://free-background-remover.web-free.site/?ref=percentage-calculator">Free Background Remover</a></li><li><a href="https://free-image-compressor.web-free.site/?ref=percentage-calculator">Free Image Compressor</a></li><li><a href="https://free-heic-to-jpg.web-free.site/?ref=percentage-calculator">Free HEIC to JPG Converter</a></li><li><a href="https://free-image-upscaler.web-free.site/?ref=percentage-calculator">Free Image Upscaler</a></li><li><a href="https://free-passport-photo-maker.web-free.site/?ref=percentage-calculator">Free Passport Photo Maker</a></li><li><a href="https://free-png-to-svg.web-free.site/?ref=percentage-calculator">Free PNG to SVG Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Calculators &amp; currency</h3><ul><li><a href="https://free-online-calculator.web-free.site/?ref=percentage-calculator">Free Online Calculator</a></li><li><a href="https://free-currency-converter.web-free.site/?ref=percentage-calculator">Free Currency Converter</a></li><li><a href="https://free-unit-converter.web-free.site/?ref=percentage-calculator">Free Unit Converter</a></li><li><a href="https://free-loan-calculator.web-free.site/?ref=percentage-calculator">Free Loan Calculator</a></li><li><a href="https://free-bmi-calculator.web-free.site/?ref=percentage-calculator">Free BMI Calculator</a></li><li><a href="https://free-age-calculator.web-free.site/?ref=percentage-calculator">Free Age Calculator</a></li><li><strong>Free Percentage Calculator</strong></li></ul></div><div class="wf-mt-cat"><h3>Text &amp; SEO</h3><ul><li><a href="https://free-ai-humanizer.web-free.site/?ref=percentage-calculator">Free AI Humanizer</a></li><li><a href="https://free-seo-generator.web-free.site/?ref=percentage-calculator">Free SEO Generator</a></li><li><a href="https://free-backlink-generator.web-free.site/?ref=percentage-calculator">Free Backlink Generator</a></li><li><a href="https://free-json-formatter.web-free.site/?ref=percentage-calculator">Free JSON Formatter</a></li><li><a href="https://free-text-to-speech.web-free.site/?ref=percentage-calculator">Free Text to Speech</a></li><li><a href="https://free-speech-to-text.web-free.site/?ref=percentage-calculator">Free Speech to Text</a></li><li><a href="https://free-diff-checker.web-free.site/?ref=percentage-calculator">Free Diff Checker</a></li></ul></div><div class="wf-mt-cat"><h3>Audio &amp; video</h3><ul><li><a href="https://free-video-to-mp3.web-free.site/?ref=percentage-calculator">Free Video to MP3 Converter</a></li><li><a href="https://free-mp3-cutter.web-free.site/?ref=percentage-calculator">Free MP3 Cutter</a></li><li><a href="https://free-screen-recorder.web-free.site/?ref=percentage-calculator">Free Screen Recorder</a></li><li><a href="https://free-video-compressor.web-free.site/?ref=percentage-calculator">Free Video Compressor</a></li><li><a href="https://free-video-to-gif.web-free.site/?ref=percentage-calculator">Free Video to GIF Converter</a></li><li><a href="https://free-audio-converter.web-free.site/?ref=percentage-calculator">Free Audio Converter</a></li></ul></div><div class="wf-mt-cat"><h3>Files</h3><ul><li><a href="https://free-zip-tool.web-free.site/?ref=percentage-calculator">Free ZIP Tool</a></li></ul></div><div class="wf-mt-cat"><h3>Test data</h3><ul><li><a href="https://free-fake-address-generator.web-free.site/?ref=percentage-calculator">Free Fake Address Generator</a></li><li><a href="https://free-fake-name-generator.web-free.site/?ref=percentage-calculator">Free Fake Name Generator</a></li></ul></div><div class="wf-mt-cat"><h3>Security &amp; passwords</h3><ul><li><a href="https://free-password-generator.web-free.site/?ref=percentage-calculator">Free Password Generator</a></li></ul></div>
  </div>
</aside>`;
}

function siteFooter(extra = '') {
  return `<footer class="site-footer no-print">
  <div class="site-footer-inner">
    <span><strong>Free Percentage Calculator</strong> — 100% client-side, no sign-up.</span>
    <span>Part of <a href="https://web-free.site/">web-free.site</a></span>
    <span>Engine from <a href="https://github.com/androve2k/percentage-calculator-js" rel="noopener">percentage-calculator-js</a> by Andrea Roversi (MIT)</span>
    ${extra}
    <a class="smartlink" href="${u.smartlink.url}" rel="nofollow sponsored">Resources</a>
    <span><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/about/">About</a> · <a href="/contact/">Contact</a></span>
  </div>
</footer>`;
}

function layout({ title, description, canonical, jsonLd = [], bodyClass = 'has-site-shell', main, includeMidAds = true, navActive = '' }) {
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  const mid = includeMidAds ? adMidBlock() : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
${ld}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<script data-cfasync="false" src="${u.popunder.src}"></script>
<script src="https://ref.web-free.site/r.js" defer></script>
</head>
<body class="${bodyClass}">

<header class="site-header no-print">
  <div class="site-header-inner">
    <a href="/" class="site-wordmark">Free Percentage Calculator</a>
    <nav class="site-nav" aria-label="Main">
      <a href="/"${navActive === 'calc' ? ' aria-current="page"' : ''}>Calculator</a>
      <a href="/how-to-calculate-a-sales-discount/"${navActive === 'discount' ? ' aria-current="page"' : ''}>Discount guide</a>
      <a href="/how-to-add-or-extract-18-percent-vat/"${navActive === 'vat' ? ' aria-current="page"' : ''}>VAT guide</a>
      <a href="/how-to-calculate-a-profit-margin/"${navActive === 'margin' ? ' aria-current="page"' : ''}>Margin guide</a>
      <a href="/about/"${navActive === 'about' ? ' aria-current="page"' : ''}>About</a>
      <a href="/contact/"${navActive === 'contact' ? ' aria-current="page"' : ''}>Contact</a>
    </nav>
  </div>
</header>
${adTop()}
<div class="page-layout">
${adRail()}
<div class="page-main">
${main}
${mid}
</div>
</div>
${adSticky()}
${siteFooter()}
<script data-cfasync="false" src="${u.socialBar.src}"></script>
${wfMoreTools()}
<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->
</body>
</html>`;
}

const faqEntities = [
  {
    '@type': 'Question',
    name: 'Is Free Percentage Calculator free to use?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. All seven calculation modes run entirely in your browser. No account, API key, or server-side math is required.',
    },
  },
  {
    '@type': 'Question',
    name: 'Which percentage calculations are supported?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'You can compute X% of Y, what percent X is of Y, percent change, apply a discount or increase, extract VAT from a gross total, and reverse an applied percentage to find the original value.',
    },
  },
  {
    '@type': 'Question',
    name: 'Can I use RWF or FCFA amounts?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Yes. Enter any currency label or plain numbers—the tool treats values as unitless amounts. Built-in examples use RWF and XOF/XAF (FCFA) for illustration only.',
    },
  },
  {
    '@type': 'Question',
    name: 'Does this show official tax rates for a country?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'No. VAT, tax, and margin rates are editable examples (such as 18%). Always confirm rates with your accountant or local rules.',
    },
  },
  {
    '@type': 'Question',
    name: 'Are my numbers sent to a server?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'No. Inputs stay on your device. Optional analytics measure page views only.',
    },
  },
];

const indexMain = `<main class="app-container" id="pct-app">
  <header class="no-print">
    <h1>Free Percentage Calculator</h1>
  </header>
  <p class="seo-intro no-print">Seven client-side modes: percent of a total, share of a total, change, discount, increase, VAT extraction, and reverse percentage. Pick a mode, edit the fields, and see the formula beside your result—works with any amount, including RWF and FCFA examples.</p>

  <div class="glass-card calc-card no-print">
    <div class="tabs" id="tabs" role="tablist" aria-label="Calculation mode">
      <button type="button" class="tab active" role="tab" aria-selected="true" data-mode="percentageOf">X% of Y</button>
      <button type="button" class="tab" role="tab" data-mode="shareOf">X is what % of Y</button>
      <button type="button" class="tab" role="tab" data-mode="percentageChange">% change</button>
      <button type="button" class="tab" role="tab" data-mode="applyDiscount">Discount</button>
      <button type="button" class="tab" role="tab" data-mode="applyIncrease">Increase / add VAT</button>
      <button type="button" class="tab" role="tab" data-mode="extractTax">Extract VAT</button>
      <button type="button" class="tab" role="tab" data-mode="reversePercentage">Reverse %</button>
    </div>

    <div class="examples-bar" id="examples-bar" aria-label="Quick examples"></div>

    <div class="row" id="inputs"></div>

    <div class="result-row">
      <motion class="formula-panel" id="formula-panel" aria-live="polite"></motion>
      <div class="output-wrap">
        <div class="output" id="output" role="status" aria-live="polite"></div>
        <p class="note" id="note" hidden></p>
      </div>
    </div>
  </div>

  <section class="glass-card faq-block no-print" aria-labelledby="faq-title">
    <h2 id="faq-title">Frequently asked questions</h2>
    <div class="faq-item"><strong>Is Free Percentage Calculator free to use?</strong><p>Yes. All calculations run in your browser with no account and no paid API.</p></div>
    <div class="faq-item"><strong>Which modes are included?</strong><p>Percent of total, share of total, percent change, discount, increase, VAT extraction from gross, and reverse percentage.</p></div>
    <div class="faq-item"><strong>Can I use Rwandan francs or FCFA?</strong><p>Yes. Use plain numbers; example chips load RWF and XOF/XAF (FCFA) sample amounts.</p></div>
    <div class="faq-item"><strong>Are tax rates official?</strong><p>No. Rates such as 18% are editable examples, not legal advice for any country.</p></div>
    <div class="faq-item"><strong>Is data sent to a server?</strong><p>No. Math stays on your device.</p></div>
  </section>
</main>
<script type="module" src="/assets/app.js"></script>`;

// fix typo motion -> div
const indexMainFixed = indexMain.replace('<motion class=', '<div class=').replace('</motion>', '</div>');

const webAppLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Percentage Calculator',
  url: `${BASE}/`,
  description:
    'Calculate percentages, discounts, VAT, margins, and reverse percentages in your browser—seven modes with formulas shown.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  inLanguage: 'en',
  browserRequirements: 'Requires JavaScript',
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqEntities,
};

const pages = [
  {
    out: 'index.html',
    title: 'Free Percentage Calculator — discounts, VAT, margin & change',
    description:
      'Free percentage calculator in your browser: X% of Y, discounts, 18% VAT add/extract, profit margin, percent change, reverse %. RWF & FCFA examples.',
    canonical: `${BASE}/`,
    jsonLd: [webAppLd, faqLd],
    navActive: 'calc',
    main: indexMainFixed,
  },
  {
    out: 'about/index.html',
    title: 'About — Free Percentage Calculator',
    description: 'About Free Percentage Calculator: open-source engine, web-free.site, client-side only.',
    canonical: `${BASE}/about/`,
    main: prose(`<h1>About Free Percentage Calculator</h1>
<p><strong>Free Percentage Calculator</strong> is a browser tool for everyday percent math: shares, change, discounts, markups, VAT-style gross/net splits, and reversing an applied rate. Nothing you type is sent to our servers.</p>
<p>The calculation engine is imported from the MIT-licensed project <a href="https://github.com/androve2k/percentage-calculator-js" rel="noopener">percentage-calculator-js</a> by <strong>Andrea Roversi</strong>. A copy of the <a href="https://github.com/androve2k/percentage-calculator-js/blob/main/LICENSE">MIT License</a> is in this repository.</p>
<p>Guides, ads, and packaging for <a href="https://web-free.site/">web-free.site</a> were added separately. Advertisements are served through Adsterra; see <a href="/privacy/">Privacy</a>.</p>
<p>Tax and margin examples (including 18%) are illustrative—you must confirm real rates with a professional.</p>`),
    navActive: 'about',
  },
  {
    out: 'privacy/index.html',
    title: 'Privacy — Free Percentage Calculator',
    description: 'Privacy policy for Free Percentage Calculator: local calculations, analytics, and Adsterra ads.',
    canonical: `${BASE}/privacy/`,
    main: prose(`<h1>Privacy</h1>
<p><strong>Calculations</strong> run locally in your browser. We do not collect the numbers you enter.</p>
<p><strong>Analytics:</strong> Cloudflare Web Analytics may record page views and coarse usage metrics without cookies for advertising.</p>
<p><strong>Advertising:</strong> Adsterra (and related tag domains) may set cookies or use device data to deliver ads, including popunder, social bar, native, banner, and smartlink units. Their partners operate under their own policies.</p>
<p><strong>Contact:</strong> Questions go through <a href="/contact/">Contact</a>.</p>`),
  },
  {
    out: 'terms/index.html',
    title: 'Terms — Free Percentage Calculator',
    description: 'Terms of use for Free Percentage Calculator on web-free.site.',
    canonical: `${BASE}/terms/`,
    main: prose(`<h1>Terms of use</h1>
<p>This site is provided “as is” for personal and business arithmetic help. Results are not tax, legal, or financial advice.</p>
<p>You may use the calculator freely. Do not attempt to disrupt the service or misuse ad tags.</p>
<p>Outbound links and ads are provided by third parties; we are not responsible for their content.</p>`),
  },
  {
    out: 'contact/index.html',
    title: 'Contact — Free Percentage Calculator',
    description: 'Contact web-free.site about Free Percentage Calculator.',
    canonical: `${BASE}/contact/`,
    main: prose(`<h1>Contact</h1>
<p>Free Percentage Calculator is part of the <a href="https://web-free.site/">web-free.site</a> collection.</p>
<p>For site feedback or licensing questions about the upstream engine, open an issue on <a href="https://github.com/androve2k/percentage-calculator-js" rel="noopener">percentage-calculator-js</a> or reach the hub maintainers through <a href="https://web-free.site/">web-free.site</a>.</p>`),
    navActive: 'contact',
  },
  {
    out: 'how-to-calculate-a-sales-discount/index.html',
    title: 'How to calculate a sales discount — formula & examples',
    description: 'Sales discount formula with RWF and XOF (FCFA) worked examples. Free step-by-step guide.',
    canonical: `${BASE}/how-to-calculate-a-sales-discount/`,
    navActive: 'discount',
    main: prose(`<h1>How to calculate a sales discount</h1>
<p><strong>Formula:</strong> Discounted price = Original price × (1 − Discount% ÷ 100). Amount saved = Original − Discounted.</p>
<h2>Example in RWF</h2>
<p>A item priced <strong>45,000 RWF</strong> with a <strong>15%</strong> promotion:</p>
<ul><li>Discounted = 45,000 × (1 − 0.15) = <strong>38,250 RWF</strong></li><li>Saved = 6,750 RWF</li></ul>
<h2>Example in XOF (FCFA)</h2>
<p>Supermarket shelf price <strong>12,500 XOF (FCFA)</strong> with <strong>20%</strong> off:</p>
<ul><li>Discounted = 12,500 × 0.8 = <strong>10,000 XOF (FCFA)</strong></li><li>Saved = 2,500 XOF</li></ul>
<p>Use the <a href="/">calculator</a> in <em>Discount</em> mode to try your own numbers.</p>`),
  },
  {
    out: 'how-to-add-or-extract-18-percent-vat/index.html',
    title: 'How to add or extract 18% VAT — formula & examples',
    description: 'Add 18% VAT to net or extract VAT from gross. RWF and XAF (FCFA) examples—not an official statutory rate.',
    canonical: `${BASE}/how-to-add-or-extract-18-percent-vat/`,
    navActive: 'vat',
    main: prose(`<h1>How to add or extract 18% VAT</h1>
<p><strong>18% is an editable example rate</strong>, not a claim about any country’s current law. Replace it with the rate that applies to you.</p>
<h2>Add 18% to a net price</h2>
<p><strong>Formula:</strong> Gross = Net × (1 + Rate ÷ 100)</p>
<p>Net <strong>25,000 RWF</strong> with 18% added: Gross = 25,000 × 1.18 = <strong>29,500 RWF</strong>.</p>
<h2>Extract 18% from a gross total</h2>
<p><strong>Formula:</strong> Net = Gross ÷ (1 + Rate ÷ 100); VAT portion = Gross − Net</p>
<p>Gross receipt <strong>59,000 XAF (FCFA)</strong> includes 18% VAT: Net = 59,000 ÷ 1.18 ≈ <strong>50,000 XAF</strong>; VAT ≈ 9,000 XAF.</p>
<p>On the <a href="/">home calculator</a>, use <em>Increase / add VAT</em> to add a rate, or <em>Extract VAT</em> when the total already includes tax.</p>`),
  },
  {
    out: 'how-to-calculate-a-profit-margin/index.html',
    title: 'How to calculate a profit margin — formula & examples',
    description: 'Profit margin as (profit ÷ revenue) × 100 with RWF and FCFA examples.',
    canonical: `${BASE}/how-to-calculate-a-profit-margin/`,
    navActive: 'margin',
    main: prose(`<h1>How to calculate a profit margin</h1>
<p><strong>Formula (margin on revenue):</strong> Margin% = (Profit ÷ Revenue) × 100, where Profit = Revenue − Cost.</p>
<h2>Example in RWF</h2>
<p>Revenue <strong>800,000 RWF</strong>, cost <strong>620,000 RWF</strong> → Profit = 180,000 RWF.</p>
<p>Margin% = (180,000 ÷ 800,000) × 100 = <strong>22.5%</strong>.</p>
<h2>Example in XOF (FCFA)</h2>
<p>Revenue <strong>4,000,000 XOF (FCFA)</strong>, cost <strong>3,400,000 XOF</strong> → Profit = 600,000.</p>
<p>Margin% = (600,000 ÷ 4,000,000) × 100 = <strong>15%</strong>.</p>
<p>Use <em>X is what % of Y</em> on the <a href="/">calculator</a> with X = profit and Y = revenue, or compute the profit first with subtraction.</p>`),
  },
];

function prose(article) {
  return `<main class="prose-static app-container"><article>${article}</article></main>`;
}

for (const p of pages) {
  const html = layout(p);
  const outPath = path.join(publicDir, p.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${p.canonical}</loc></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`,
);

// Copy engine to public assets
fs.mkdirSync(path.join(publicDir, 'assets'), { recursive: true });
fs.copyFileSync(
  path.join(root, 'src/percentage-calculator.js'),
  path.join(publicDir, 'assets/percentage-calculator.js'),
);

console.log('Built', pages.length, 'HTML pages into public/');