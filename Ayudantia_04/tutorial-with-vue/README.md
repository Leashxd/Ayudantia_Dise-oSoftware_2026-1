# Ayudantía 04 - Diseño de Software

En esta ayudantía revisamos y aplicamos los siguientes conceptos y herramientas:

- **Arquitectura Frontend + Backend:** Integración de una app Vue con una API en Deno (Oak), separando responsabilidades entre cliente y servidor.
- **Rutas de API y datos locales:** Exposición de endpoints (`/api/weather` y `/api/weather/:country`) usando `data.json` como fuente base de países soportados.
- **Consumo de APIs externas:** Obtención de clima en vivo con Open-Meteo (geocoding + forecast) y transformación de respuestas a un formato usable por el frontend.
- **Manejo de estados en UI:** Implementación de estados de `loading`, `error` y `success` para evitar pantallas “congeladas”.
- **Control de errores en `fetch`:** Validación de `res.ok`, manejo de mensajes de error del backend y visualización de feedback claro al usuario.
- **Timeouts con `AbortController`:** Corte controlado de requests cuando el servidor o API externa no responde en tiempo razonable.
- **Suspense en Vue:** Uso de `Suspense` y análisis de su comportamiento cuando una promesa falla o no resuelve correctamente.
- **Tipado con TypeScript:** Definición y corrección de tipos (`WeatherCountry`, `WeatherDetails`, `ComponentData`) para mantener consistencia entre componentes y datos.
- **Configuración de entorno en Vite:** Uso de `proxy` para redirigir `/api` al backend local y análisis de problemas de puertos (`AddrInUse`).
- **Verificación técnica antes de publicar:** Flujo mínimo de validación con `npm run build`, revisión de errores de runtime y chequeo de comportamiento real en UI.
