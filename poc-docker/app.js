const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>¡Hola desde un Contenedor Docker! 🐳</h1>
    <ul>
      <li><b>Sistema Operativo:</b> ${process.platform}</li>
      <li><b>Versión de Node:</b> ${process.version}</li>
      <li><b>Hostname del Contenedor:</b> ${os.hostname()}</li>
    </ul>
  `);
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
