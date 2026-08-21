const http = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const app = next({
  dev: false,
  hostname,
  port,
});

const handle = app.getRequestHandler();

console.log("=================================");
console.log("Starting Next.js");
console.log(`Node.js version: ${process.version}`);
console.log(`Port: ${port}`);
console.log("=================================");

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(`> Next.js ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Next.js startup error:");
    console.error(err);
    process.exit(1);
  });
