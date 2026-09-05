import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
const app = express();
const PORT = Number(process.env.PORT || 3000);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Dastarkhan Restaurant & Banquet Hall website' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dastarkhan website running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start Dastarkhan website:', error);
  process.exit(1);
});
