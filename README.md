# Docker & WebAssembly (Wasm) - POCs

Repository containing the theoretical research and two minimal Proofs of Concept (POCs) for presentation.

**Team Members:**
- Alejandro Flores
- Bryan Flores
- Marcos Burga

---

## 1. Docker 🐳

- **What is it?**
  An open-source platform for packaging, shipping, and running applications along with all their dependencies inside lightweight, portable containers.
- **How does it work?**
  It uses the host operating system's kernel (Linux Namespaces and cgroups) to isolate processes and resources without needing a heavy virtual machine.
- **Where can we use it?**
  In microservices architectures, cloud deployments (AWS, GCP, Azure), CI/CD pipelines, and for standardizing local development environments.
- **Who is implementing it?**
  Netflix, Spotify, Uber, PayPal, Shopify, and thousands of tech companies worldwide.
- **Who created it?**
  **Solomon Hykes** in **2013** (originally as an internal project at dotCloud, now Docker, Inc.).

### How to run the Docker POC (`poc-docker/`)
```bash
cd poc-docker
docker build -t poc-docker .
docker run -d -p 3000:3000 --name my-container poc-docker
```
- Open in your browser: **http://localhost:3000**
- To stop and remove it: `docker stop my-container && docker rm my-container`

---

## 2. WebAssembly (Wasm) ⚡

- **What is it?**
  A low-level binary instruction format (`.wasm`) that allows code written in languages like C, C++, or Rust to run in web browsers at near-native speed.
- **How does it work?**
  Source code is compiled into `.wasm` binary bytecode, which the browser's engine validates and executes inside a secure, sandboxed virtual stack machine.
- **Where can we use it?**
  In performance-heavy web applications (video/3D editing, browser games), cryptography, serverless functions, and Edge Computing (Cloudflare Workers).
- **Who is implementing it?**
  **Figma**, **Adobe Photoshop Web**, **AutoCAD Web**, **Google Earth**, and all major browsers (Chrome, Firefox, Safari, Edge).
- **Who created it?**
  **Luke Wagner** (Mozilla) in **2015**, in collaboration with **Google, Microsoft, and Apple** (now an official **W3C** standard).

### How to run the WebAssembly POC (`poc-webassembly/`)
1. Double-click `poc-webassembly/index.html` to open it in any web browser.
2. Enter two numbers and click **"Add with Wasm"**.
3. Open the browser console (`F12`) to verify: `✅ WebAssembly module loaded successfully`.
