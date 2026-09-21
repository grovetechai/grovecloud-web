import { createServer } from 'node:http';
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import handler from 'serve-handler';

const publicDir = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}
try {
  await access(new URL('../dist/index.html', import.meta.url));
} catch {
  throw new Error('Built website missing. Run npm run build before npm start.');
}

const server = createServer((request, response) => {
  handler(request, response, {
    public: publicDir,
    cleanUrls: true,
    directoryListing: false,
  }).catch((error) => {
    console.error(error);
    if (!response.headersSent) response.writeHead(500);
    response.end();
  });
});
server.listen(port, '0.0.0.0', () => {
  console.log(`Grove Cloud static website listening on port ${port}`);
});
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  });
}
