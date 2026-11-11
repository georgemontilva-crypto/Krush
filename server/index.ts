import compression from "compression";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";

async function start() {
  const app = express();
  const server = createServer(app);
  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(compression());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV === "development") {
    const { createServer: createVite } = await import("vite");
    const root = path.resolve(import.meta.dirname, "..", "client");
    const vite = await createVite({
      configFile: path.resolve(import.meta.dirname, "..", "vite.config.ts"),
      server: { middlewareMode: true, hmr: { server } },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      try {
        const html = await fs.promises.readFile(path.join(root, "index.html"), "utf-8");
        res.status(200).set({ "Content-Type": "text/html" }).end(await vite.transformIndexHtml(req.originalUrl, html));
      } catch (e) {
        next(e);
      }
    });
  } else {
    const dist = path.resolve(import.meta.dirname, "public");
    // Hashed bundles never change under the same name; everything else revalidates.
    app.use(
      "/assets",
      express.static(path.join(dist, "assets"), { immutable: true, maxAge: "1y" }),
    );
    app.use(express.static(dist, { maxAge: "1d", index: false, redirect: false }));
    app.use((_req, res) => {
      res.set("Cache-Control", "no-cache").sendFile(path.join(dist, "index.html"));
    });
  }

  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen(port, () => console.log(`Krush running on http://localhost:${port}/`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
