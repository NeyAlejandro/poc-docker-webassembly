const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>Hello from a Docker Container! 🐳</h1>
    <ul>
      <li><b>Operating System:</b> ${process.platform}</li>
      <li><b>Node Version:</b> ${process.version}</li>
      <li><b>Container Hostname:</b> ${os.hostname()}</li>
    </ul>
  `);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
