# Docker & WebAssembly (Wasm) - POCs

Repositorio con la consulta teórica y dos pruebas de concepto mínimas para exposición.

**Integrantes:**
- Alejandro Flores
- Bryan Flores
- Marcos Burga

---

## 1. Docker 🐳

- **What is it? (¿Qué es?)**
  Una plataforma para empaquetar y ejecutar aplicaciones con todas sus dependencias dentro de contenedores ligeros y portables.
- **How does it work? (¿Cómo funciona?)**
  Usa el kernel del sistema operativo (Linux Namespaces y cgroups) para aislar procesos sin necesidad de levantar una máquina virtual completa.
- **Where can we use it? (¿Dónde usarlo?)**
  En microservicios, despliegues en la nube (AWS, GCP, Azure), pruebas de CI/CD y para estandarizar entornos de desarrollo.
- **Who is implementing it? (¿Quién lo implementa?)**
  Netflix, Spotify, Uber, PayPal, Shopify y miles de empresas.
- **Who created it? (¿Quién lo creó?)**
  **Solomon Hykes** en **2013** (dentro de la empresa dotCloud, hoy Docker Inc.).

### Cómo ejecutar la POC de Docker (`poc-docker/`)
```bash
cd poc-docker
docker build -t poc-docker .
docker run -d -p 3000:3000 --name mi-contenedor poc-docker
```
- Abrir en el navegador: **http://localhost:3000**
- Para detenerlo: `docker stop mi-contenedor && docker rm mi-contenedor`

---

## 2. WebAssembly (Wasm) ⚡

- **What is it? (¿Qué es?)**
  Un formato de código binario (`.wasm`) que permite ejecutar código de lenguajes como C, C++ o Rust en el navegador a velocidad casi nativa.
- **How does it work? (¿Cómo funciona?)**
  El código fuente se compila a bytecode binario `.wasm` y el motor del navegador lo ejecuta dentro de una máquina virtual segura (*sandbox*).
- **Where can we use it? (¿Dónde usarlo?)**
  En aplicaciones web pesadas (edición de video/3D, videojuegos en navegador), criptografía y Edge Computing (Cloudflare Workers).
- **Who is implementing it? (¿Quién lo implementa?)**
  **Figma**, **Adobe Photoshop Web**, **AutoCAD Web**, **Google Earth** y todos los navegadores modernos (Chrome, Firefox, Safari, Edge).
- **Who created it? (¿Quién lo creó?)**
  **Luke Wagner** (Mozilla) en **2015**, en colaboración con **Google, Microsoft y Apple** (estándar oficial del **W3C**).

### Cómo ejecutar la POC de WebAssembly (`poc-webassembly/`)
1. Abre el archivo `poc-webassembly/index.html` con doble clic en cualquier navegador.
2. Ingresa dos números y presiona **"Sumar con Wasm"**.
3. Abre la consola (`F12`) para ver el mensaje: `✅ Módulo WebAssembly cargado correctamente`.
