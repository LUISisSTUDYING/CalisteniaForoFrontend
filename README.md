# Calistenia Tarija - Frontend (React + Vite)

Este es el repositorio Frontend para la plataforma de gestión de Calistenia Tarija, desarrollado como una Single Page Application (SPA) utilizando React, Vite y Bootstrap.

## Guía de Instalación Rápida

Sigue estos sencillos pasos para levantar el entorno de desarrollo local. Es directo y claro :

### 1. Requisitos Previos
- Asegúrate de tener instalado **Node.js** (versión 18 o superior).

### 2. Acceder al proyecto
Abre tu terminal y ubícate en la raíz de esta carpeta (Frontend):
```bash
cd CalisteniaForoFrontend
```

### 3. Instalar Dependencias
Instala todas las librerías de React, React Router y Axios ejecutando:
```bash
npm install
```

### 4. Levantar el Servidor
Inicia la aplicación en modo desarrollo con el siguiente comando:
```bash
npm run dev
```

La consola te indicará una URL (usualmente `http://localhost:5173/`). Solo tienes que hacer click en ese enlace (o presionar la tecla `o` y Enter en la terminal) para abrir la aplicación en tu navegador.

---
**Nota sobre la API:**
Por defecto, el frontend se conectará automáticamente a tu backend de Laravel asumiendo que corre en `http://localhost:8000/api`. Si tu backend corre en otro puerto, solo debes cambiar la URL en el archivo `src/services/api.js`.
