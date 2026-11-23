import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

function resolveAssetPdfPath(storedFilename: string): string | null {
  const safeStoredName = path.basename(storedFilename);
  if (!/^[a-zA-Z0-9_-]+\.pdf$/i.test(safeStoredName)) {
    return null;
  }

  const candidates = [
    path.resolve(process.cwd(), 'public', 'assets', 'aistudio', safeStoredName),
    path.resolve(process.cwd(), 'dist', 'assets', 'aistudio', safeStoredName),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

// Dedicated PDF download/view endpoint for KakaoTalk / LINE / Mobile WebViews & Desktop
app.get('/api/pdf/:storedFilename', (req, res) => {
  const filePath = resolveAssetPdfPath(req.params.storedFilename);
  if (!filePath) {
    res.status(404).json({ error: 'PDF file not found' });
    return;
  }

  const rawName = typeof req.query.name === 'string' ? req.query.name : '';
  const cleanedName = rawName.replace(/[\r\n"\\/]/g, '').trim();
  const baseName = cleanedName || path.basename(filePath);
  const finalName = baseName.toLowerCase().endsWith('.pdf')
    ? baseName
    : `${baseName}.pdf`;

  const mode = req.query.mode === 'inline' ? 'inline' : 'attachment';
  const safeStoredName = path.basename(filePath);
  const asciiFallback = `BGIT_${safeStoredName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const encodedUtf8Name = encodeURIComponent(finalName).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `${mode}; filename="${asciiFallback}"; filename*=UTF-8''${encodedUtf8Name}`
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  res.sendFile(filePath);
});

// Ensure direct /assets/aistudio/*.pdf requests never fall through to HTML
app.get('/assets/aistudio/:storedFilename', (req, res, next) => {
  if (!req.params.storedFilename.toLowerCase().endsWith('.pdf')) {
    next();
    return;
  }
  const filePath = resolveAssetPdfPath(req.params.storedFilename);
  if (!filePath) {
    res.status(404).json({ error: 'PDF file not found' });
    return;
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.sendFile(filePath);
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.use((_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
