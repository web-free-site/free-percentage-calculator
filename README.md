# Free Percentage Calculator

Client-side percentage tool for [free-percentage-calculator.web-free.site](https://free-percentage-calculator.web-free.site/), part of [web-free.site](https://web-free.site/).

## Upstream

Calculation engine from [androve2k/percentage-calculator-js](https://github.com/androve2k/percentage-calculator-js) (MIT) by **Andrea Roversi**. See `LICENSE`.

## Develop

```bash
npm install
npm test
npm run build:site   # regenerate public/*.html from scripts/build-site.mjs
npm start            # wrangler dev (static assets in public/)
```

## Deploy

Configure `wrangler.toml` (`name = "free-percentage-calculator"`, `[assets]` → `./public`). Do not commit `account_id` or routes.

Ad unit keys live in `public/ads.json`.