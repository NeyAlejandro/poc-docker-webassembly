# Docker & WebAssembly (Wasm) — Investigación y Pruebas de Concepto (POC)

Este repositorio contiene la investigación teórica estructurada y dos pruebas de concepto (**POC**) independientes:
1. **`poc-docker/`**: Aplicación web HTTP ligera en Node.js contenerizada con Docker (`node:20-alpine`).
2. **`poc-webassembly/`**: Aplicación web autocontenida que instancia y ejecuta un módulo binario real de **WebAssembly (`.wasm`)** en el navegador para realizar operaciones matemáticas a nivel de bytecode.

---

## Estructura del Proyecto

```text
.
├── README.md
├── .gitignore
├── poc-docker/
│   ├── app.js
│   ├── Dockerfile
│   └── .dockerignore
└── poc-webassembly/
    └── index.html
```

---

## Parte 1: Marco Teórico

### 1. Docker

#### What is it? (¿Qué es?)
**Docker** es una plataforma de código abierto diseñada para automatizar el despliegue, escalado y ejecución de aplicaciones dentro de **contenedores** ligeros y portables. Un contenedor empaqueta el código de una aplicación junto con todas sus bibliotecas, dependencias, variables de entorno y archivos de configuración necesarios para que se ejecute de manera idéntica en cualquier entorno.

#### How does it work? (¿Cómo funciona?)
Docker utiliza una arquitectura cliente-servidor y aprovecha características nativas del kernel de Linux (sin necesidad de hipervisores pesados como las máquinas virtuales tradicionales):
- **Namespaces**: Proporcionan aislamiento de procesos, red, sistema de archivos (`mount`), usuarios (`user`) e IPC para que cada contenedor vea su propio entorno aislado.
- **Control Groups (cgroups)**: Limitan y contabilizan el uso de recursos físicos (CPU, memoria RAM, I/O de disco y red) por contenedor.
- **Union File Systems (OverlayFS)**: Permiten construir imágenes en capas inmutables reutilizables.
- **Docker Engine (`dockerd`)**: El demonio que gestiona imágenes, contenedores, redes y volúmenes, recibiendo órdenes a través de la CLI (`docker`).

#### Where can we use it? (¿Dónde podemos usarlo?)
- **Estandarización de entornos de desarrollo**: Elimina el clásico problema de *"en mi máquina sí funciona"*.
- **Arquitecturas de Microservicios**: Despliegue independiente y escalado horizontal de servicios desacoplados.
- **Pipelines de CI/CD**: Ejecución de pruebas automatizadas y compilaciones en entornos limpios y efímeros (GitHub Actions, GitLab CI, Jenkins).
- **Cloud y Orquestación**: Despliegue en Kubernetes, AWS ECS/EKS, Google Cloud Run/GKE y Azure Container Apps.

#### Who is implementing it? (¿Quién lo implementa?)
- **En su infraestructura y productos**: Spotify, Netflix, Uber, PayPal, Stripe, Shopify, NASA y miles de empresas tecnológicas.
- **En el ecosistema de estándares**: La **Open Container Initiative (OCI)** (bajo la Linux Foundation), junto con motores y runtimes compatibles como `containerd`, `CRI-O` y `Podman` (Red Hat, Google, Microsoft, AWS, Docker Inc.).

#### Who created it? (¿Quién lo creó?)
Fue creado originalmente por **Solomon Hykes** (junto con Kamel Founadi y Sebastien Pahl) en **2013** como un proyecto interno dentro de **dotCloud** (una empresa de PaaS), que posteriormente cambió su nombre a **Docker, Inc.**

---

### 2. WebAssembly (Wasm)

#### What is it? (¿Qué es?)
**WebAssembly (abreviado Wasm)** es un formato de código binario (`bytecode`) de bajo nivel, seguro, portable y de alto rendimiento diseñado para ejecutarse a velocidades cercanas a las nativas. Funciona como un objetivo de compilación (*compilation target*) para lenguajes de alto nivel como C, C++, Rust, Go, C# o Zig, permitiendo su ejecución tanto en navegadores web modernos como en servidores y entornos edge.

#### How does it work? (¿Cómo funciona?)
1. **Compilación**: El código fuente escrito en un lenguaje como Rust o C++ se compila mediante herramientas como LLVM o Emscripten a un archivo binario `.wasm` (cuya representación textual legible se denomina **WAT** — *WebAssembly Text Format*).
2. **Máquina Virtual Basada en Pila (*Stack Machine*)**: El motor ejecuta instrucciones tipadas (`i32`, `i64`, `f32`, `f64`) operando sobre una pila virtual y una **memoria lineal** contigua (`ArrayBuffer`).
3. **Ejecución Segura (*Sandboxed*)**: El módulo se valida y compila a código máquina nativo del procesador (JIT / AOT) dentro de un entorno aislado (*sandbox*), sin acceso directo al DOM ni al sistema operativo a menos que el host le otorgue funciones explícitas mediante importaciones o interfaces como **WASI** (*WebAssembly System Interface*).

#### Where can we use it? (¿Dónde podemos usarlo?)
- **Aplicaciones Web de Alto Rendimiento**: Edición de video/imagen en el navegador, diseño CAD/3D, motores de videojuegos (Unity, Unreal), criptografía y procesamiento de audio en tiempo real.
- **Edge Computing y Serverless**: Ejecución de funciones ultraligeras con tiempos de arranque en microsegundos (Cloudflare Workers, Fastly Compute).
- **Sistemas de Plugins y Extensibilidad Segura**: Filtros en proxies (Envoy Proxy), funciones definidas por el usuario en bases de datos y contratos inteligentes en Blockchain.
- **Contenedores y Microservicios WASI**: Ejecución en servidor fuera del navegador con runtimes como `Wasmtime`, `WasmEdge` o incluso integrado con Docker (`runwasi`).

#### Who is implementing it? (¿Quién lo implementa?)
- **Motores de Navegadores**: Google (**V8** en Chrome/Edge), Mozilla (**SpiderMonkey** en Firefox), Apple (**JavaScriptCore** en Safari).
- **Empresas y Productos en Producción**:
  - **Figma**: Compiló su motor gráfico en C++ a WebAssembly para renderizar diseños complejos a 60 FPS en la web.
  - **Adobe**: Llevó Photoshop y Acrobat a la web usando WebAssembly.
  - **AutoCAD Web**, **Google Earth**, **Cloudflare**, **Shopify** y **1Password**.

#### Who created it? (¿Quién lo creó?)
Fue anunciado en **2015** y liderado inicialmente por **Luke Wagner** (Mozilla, creador previo de `asm.js`) en colaboración directa con ingenieros de **Mozilla, Google, Microsoft y Apple**. Desde **2019** es un estándar oficial abierto del **W3C (World Wide Web Consortium)** y su ecosistema fuera del navegador es impulsado por la **Bytecode Alliance**.

---

## Parte 2: Instrucciones Paso a Paso para Ejecutar las POCs

### POC 1: Docker (`poc-docker/`)

Esta prueba de concepto levanta un servidor HTTP en Node.js dentro de un contenedor Linux Alpine que muestra el sistema operativo del contenedor (`process.platform`), la versión de Node (`process.version`) y el ID/hostname del contenedor (`os.hostname()`).

#### Requisitos previos
- Tener **Docker Desktop** o **Docker Engine** instalado y en ejecución.

#### Paso 1: Entrar a la carpeta de la POC de Docker
```bash
cd poc-docker
```

#### Paso 2: Construir la imagen de Docker
```bash
docker build -t poc-node-docker .
```

#### Paso 3: Ejecutar el contenedor mapeando el puerto 3000
```bash
docker run --rm -d -p 3000:3000 --name mi-poc-docker poc-node-docker
```

#### Paso 4: Probar la aplicación
1. Abre tu navegador en: [http://localhost:3000](http://localhost:3000)
   *(o ejecuta `curl http://localhost:3000` en tu terminal)*.
2. Verás la tarjeta de confirmación mostrando:
   - **Sistema Operativo**: `linux`
   - **Versión de Node**: `v20.x.x`
   - **Hostname del Contenedor**: El identificador hexadecimal único asignado al contenedor por Docker.

#### Paso 5: Detener el contenedor
```bash
docker stop mi-poc-docker
```

---

### POC 2: WebAssembly (`poc-webassembly/`)

Esta prueba de concepto carga un módulo binario `.wasm` real embebido en un `Uint8Array` (sin requerir herramientas de compilación externas), exporta la función `add(a, b)` de 32 bits (`i32.add`) y permite probarla desde una interfaz gráfica limpia.

#### Opción A: Abrir directamente en el navegador
Dado que el bytecode binario `.wasm` está embebido directamente en memoria (`Uint8Array`), no sufre bloqueos de CORS al abrirse como archivo local:
1. Navega a la carpeta `poc-webassembly/`.
2. Haz doble clic sobre `index.html` para abrirlo en Chrome, Edge, Firefox o Safari.

#### Opción B: Servir con un servidor HTTP local (opcional)
Si prefieres servirlo por HTTP usando Node.js o Python:
```bash
# Desde la raíz del proyecto con npx:
npx --yes serve poc-webassembly
```
O con Python:
```bash
cd poc-webassembly
python -m http.server 8080
```
Luego abre [http://localhost:8080](http://localhost:8080) en tu navegador.

#### Cómo verificar su funcionamiento
1. Ingresa dos números enteros en los campos **Número A** y **Número B**.
2. Haz clic en **"Ejecutar add(a, b) en WebAssembly"**.
3. Observa el resultado calculado por el módulo Wasm en pantalla.
4. Abre la consola de desarrollador (`F12` -> pestaña **Console**) para verificar el mensaje de confirmación:
   `[POC-WebAssembly] Módulo WebAssembly cargado e instanciado correctamente.`
