// A static file server just big enough for the two builds under test:
// serves the folder, falls back to index.html for anything without a dot
// (the same single-page rule _redirects gives us in production).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

export function serve(root, port) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
    if (path === "/" || !extname(path)) path = "/index.html";
    try {
      const body = await readFile(join(root, path));
      res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}
