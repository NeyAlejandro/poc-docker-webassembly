const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>POC Docker - Node.js</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --accent: #38bdf8;
      --text: #f8fafc;
      --muted: #94a3b8;
      --border: #334155;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      max-width: 520px;
      width: 100%;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
    }
    .badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    p.subtitle {
      color: var(--muted);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
    .info-list {
      list-style: none;
      border-top: 1px solid var(--border);
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 0.85rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.95rem;
    }
    .info-label {
      color: var(--muted);
    }
    .info-value {
      font-family: 'Consolas', 'Courier New', monospace;
      color: var(--accent);
      font-weight: 600;
    }
  </style>
</head>
<body>
  <main class="card">
    <span class="badge">Docker Container Active</span>
    <h1>¡Servidor en Contenedor Funcionando!</h1>
    <p class="subtitle">Prueba de concepto (POC) ejecutándose sobre Node.js sin dependencias externas.</p>
    <ul class="info-list">
      <li class="info-item">
        <span class="info-label">Sistema Operativo (process.platform)</span>
        <span class="info-value">${process.platform} (${os.arch()})</span>
      </li>
      <li class="info-item">
        <span class="info-label">Versión de Node (process.version)</span>
        <span class="info-value">${process.version}</span>
      </li>
      <li class="info-item">
        <span class="info-label">Hostname del Contenedor (os.hostname())</span>
        <span class="info-value">${os.hostname()}</span>
      </li>
    </ul>
  </main>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[POC-Docker] Servidor HTTP escuchando en http://0.0.0.0:${PORT}`);
});
