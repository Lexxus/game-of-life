import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { cwd } from 'node:process';

const mimeTypes = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon'
};

const publicDir = cwd();

const server = createServer(async (req, res) => {
  console.log(req.method, req.url);
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = join(publicDir, decodeURIComponent(filePath));

  console.log('>>', filePath);

  try {
    const ext = extname(filePath);
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Listening on http://localhost:3000');
});
