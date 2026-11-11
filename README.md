# KRUSH

Brand site for KRUSH: Bitez gummies, 1G Premium Flower and Diamond Sauce.

Pages: Home, About Us, Products (lineup + filterable flavor catalog) and one page per line
(`/products/bitez`, `/products/flower`, `/products/diamond-sauce`, deep link a flavor with `?flavor=slug`).

Stack: React 19 + Vite + Tailwind 4 + Motion, served by a small Express server. No database and no env vars needed.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

Railway: connect the repo, it builds with `pnpm build` and starts with `pnpm start` (healthcheck `/api/health`).

Product data lives in `client/src/lib/catalog.ts`; images in `client/public/products/`.
