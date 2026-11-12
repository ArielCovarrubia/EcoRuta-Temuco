# Registro de Revisión de Avance - Sprint 2 (Cierre e Incremento Final)

**Responsable (QA):** Ariel Covarrubia | **Fecha de Revisión:** 11/11/2026 | **Sprint:** 2 (Cierre de Sprint / Preparación Sprint 3)  
**Product Owner:** Beatriz Martin | **Scrum Master:** Patricio Salazar  
**Asignado a (Developers):** Lisette Delgado & Carlos Meléndez  
**Referencia:** Validación Técnica de Interactividad, Consumo Asíncrono de APIs, Backend Propio en Node.js/Express, React 19 + Vite, TypeScript, Suite de Pruebas Automatizadas y Auditoría de Reglas de Negocio (RN-01 a RN-08).

---

## 1. Seguimiento de Incidencias Remanentes del Sprint 1

* **ISSUE N.° 01 (Contraste de color insuficiente):** **Resuelto.** Se mantiene la corrección en la paleta de colores y contrastes WCAG AA en todas las vistas.
* **ISSUE N.° 02 (Falta de etiqueta Meta Description):** **Resuelto / Cerrado.** Verificado en código con etiquetas `<meta name="description">` contextualizadas para SEO en el `<head>` de todas las páginas (`index.html`, `pucon.html`, `temuco.html`, `villarrica.html`). PR #54 cerrado e integrado.
* **ISSUE N.° 03 (Bloqueos de rendimiento y optimización masiva de imágenes):** **Resuelto / Cerrado.** Se completó la migración del 100% de las imágenes del directorio `assets/imagenes/` desde formato `.jpg` a formato optimizado de nueva generación `.webp` (incluyendo banners principales `baner-pucon.webp`, `baner-temuco.webp` y `baner-villarrica.webp`), con atributos `loading="lazy"` en elementos secundarios.
* **ISSUE N.° 04 (Textos alternativos sin contexto):** **Resuelto.** Se conservan los atributos `alt` descriptivos con contexto geográfico y paisajístico en todas las vistas.
* **ISSUE N.° 05 (Elementos interactivos sin comportamiento):** **Resuelto.** Enlaces vacíos y redirecciones 404 fueron subsanados.

---

## 2. Seguimiento de Hallazgos e Incidencias (Sprint 2 - Bug Bounty y Código)

Se auditó exhaustivamente el estado de cada ticket reportado previamente, verificando su resolución en el código fuente:

* **ISSUE-02 (Metadatos SEO en `<head>`):** **Resuelto / Cerrado.** Integrado en la rama principal tras aprobación de PR #54.
* **BUG-07 (Lectura corrida de tamaños de texto en lectores de pantalla - A11y):** **Resuelto / Cerrado.** Resuelto en PR #53 con botones discretos `.btn-tamano`, atributo `aria-pressed` y región en vivo accesible `aria-live="polite"`.
* **BUG-04 (Aviso de cookies detrás del apartado de emergencias):** **Resuelto / Cerrado.** En `css/style.css`, `#aviso-cookies` se configuró como capa modal fija (`position: fixed; inset: 0; z-index: 10001;`), garantizando superposición absoluta por sobre el botón y panel de emergencias (`z-index: 9999`).
* **BUG-05 (Distribución incorrecta y centrado en el Header):** **Resuelto / Cerrado.** En `css/style.css`, la botonera de acciones del header (`header.sin-navegacion .acciones-header`) se desacopló mediante posicionamiento absoluto a la derecha (`right: 16px; top: 12px;` en PC y `right: 8px; top: 8px;` en móviles), manteniendo el título de la marca a la izquierda y el botón de accesibilidad en el extremo opuesto.
* **BUG-06 (Expansión indebida del Header por Menú de Accesibilidad en móviles):** **Resuelto / Cerrado.** En `css/style.css`, `#menu-accesibilidad` se convirtió a posicionamiento flotante (`position: absolute; top: calc(100% + 10px); right: 0; z-index: 100;`), eliminando el estiramiento vertical de la cabecera fija al abrirse en pantallas móviles.
* **BUG-08 (Conflicto de reglas CSS en escala tipográfica):** **Resuelto / Cerrado.** Se refactorizó la escala de tamaño de fuente en `css/style.css` a porcentajes en el elemento raíz `html` (`87.5%`, `100%`, `118.75%`, `143.75%`), eliminando colisiones de especificidad entre variables y propiedades fijas en píxeles.
* **BUG-09 (Falta de `rel="noopener noreferrer"` en WhatsApp de emprendedores):** **Resuelto / Cerrado.** En `js/layout.js`, el enlace dinámico a WhatsApp generado para cada emprendedor incorpora explícitamente `target="_blank" rel="noopener noreferrer"`, cumpliendo la regla de salida segura RN-01.
* **BUG-10 (Atrapamiento de scroll en mapas móviles Leaflet):** **Resuelto / Cerrado.** En `paginas/temuco.html`, `paginas/pucon.html` y `paginas/villarrica.html`, se integró la librería y estilos de `leaflet-gesture-handling` con la directiva `gestureHandling: true`, exigiendo el uso de dos dedos para interactuar con el mapa táctil y liberando el scroll vertical con un dedo (WCAG 2.1.2 / HU-12).
* **BUG-11 (Botón de emergencias flotante sin nombre accesible en axe DevTools):** **Resuelto / Cerrado.** En `js/layout.js`, se incorporó el atributo `aria-label="Abrir contactos de emergencia"` al elemento `#btn-emergencia-flotante`, superando la regla `button-name`.
* **BUG-12 (Sensibilidad a diacríticos y tildes en filtrado de rutas):** **Resuelto / Cerrado.** Se implementó la función auxiliar `normalizarTexto` con `.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()` en `src/utils/rutas.ts`. El buscador multicriterio ahora reconoce de manera idéntica entradas con o sin tilde (ej. "pucon" coincide con "Pucón"), validado por la suite de pruebas unitarias (`tests/rutas.test.ts`).
* **BUG-13 (Sincronización de atributos `data-id` en tarjetas vs dataset):** **Resuelto / Cerrado.** Con la arquitectura basada en componentes React (`ListaRutas.tsx` y `TarjetaRuta.tsx`), las tarjetas se generan directamente mapeando el dataset tipado `Ruta[]`, garantizando sincronización exacta de identificadores y eliminando la pérdida de elementos en el DOM.
* **BUG-14 (Contraste y estilos inline en badges/mensajes de estado de API):** **Resuelto / Cerrado.** Se migraron todos los estilos inline a clases CSS semánticas en `css/style.css` (`.badge-api-conectada`, `.badge-api-respaldo`, `.mensaje-cargando-api`, `.mensaje-error-api`, `.aviso-modo-respaldo`), asegurando cumplimiento WCAG AA y variantes dedicadas para modo claro, modo oscuro (`body.modo-oscuro`) y alto contraste (`body.alto-contraste`).

---

## 3. Estado de la Arquitectura y Nuevos Componentes (Sprint 2 Final)

Durante el cierre del Sprint 2 se integraron los siguientes componentes estructurales verificados en QA:

1. **Backend Dedicado en Node.js + Express + TypeScript (`api/`):**
   * Servidor REST modular con rutas `/api/v1/rutas` y `/api/v1/inscripciones`.
   * Cumplimiento estricto de la regla **RN-08**: los datos personales de inscripciones solo se reciben mediante `POST` y **nunca se exponen en un `GET` público**.
   * Validación de esquemas en servidor con respuestas HTTP semánticas (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
   * Configuración de CORS permitiendo entornos locales (`localhost:5173`, `localhost:3000`) y producción en GitHub Pages.

2. **Servicio Resiliente Frontend (`src/services/rutasApi.ts` y `rutasService.ts`):**
   * Retorno estructurado mediante interfaz `ResultadoRutas` (`{ rutas: Ruta[], origen: 'api' | 'respaldo' }`).
   * Cumplimiento de **RN-05**: si la API externa no está disponible, el sistema conmuta automáticamente al catálogo JSON respaldado (`public/api/rutas.json`), previniendo caídas de interfaz.
   * Eliminación de URLs hardcodeadas a `localhost:3001`: gestión centralizada mediante `VITE_API_URL` y proxy de desarrollo en `vite.config.ts`.
   * Insignia dinámica accesible en `App.tsx`: informa con claridad si el origen es `🟢 API conectada` o `🟡 Usando respaldo local`.

3. **Formulario de Inscripción React TSX (`src/components/FormularioInscripcion.tsx` / HU-27):**
   * Selector dinámico de rutas (`<select id="ins-ruta">`) poblado automáticamente desde el listado de rutas disponibles, sincronizando el `rutaId` con la carga útil enviada a la API.
   * Advertencia de seguridad reactiva: alerta en tiempo real a usuarios con nivel principiante cuando seleccionan una ruta clasificada como "Difícil" (RN-04).
   * Restricción de fecha de salida: atributo `min` fijado a la fecha actual para evitar envíos de fechas pasadas.
   * Protección en modo respaldo: muestra un aviso informativo y deshabilita el botón de confirmación si no hay conexión activa al servidor backend, evitando registros huérfanos.

4. **Menú Lateral Accesible en React (`src/components/MenuLateral.tsx` / HU-26):**
   * Menú lateral deslizable accionado por botón de tres líneas, operable al 100% mediante teclado con teclas `Tab`, `Enter` y `Escape`.
   * Centraliza los accesos a accesibilidad, canales de contacto y emergencias sin sobrecargar la barra superior.

---

## 4. Correspondencia y Ajuste a Requerimientos

* **¿Cumple con los Requerimientos del Sprint 2?:** **Sí, 100% de los criterios completados y auditados.**
* **Revisión de Criterios de Aceptación:**
  * [x] **API Propia de Rutas y Servicios Frontend (`HU-23`):** -> *Estado: Cumple.* Endpoints `/api/v1/rutas` y `/api/v1/rutas/:id`, interfaz `ResultadoRutas` con detección dinámica (`api` vs `respaldo`), proxy Vite y tolerancia a fallos bajo RN-05.
  * [x] **Reestructuración base en React 19 + TypeScript + Vite (`HU-25`):** -> *Estado: Cumple.* Base de aplicación en `react.html`, `src/App.tsx`, componentes modulares `.tsx`, tipado estricto en `src/types/ruta.ts` y compilación sin errores.
  * [x] **Menú lateral accesible en React (`HU-26`):** -> *Estado: Cumple.* Componente `MenuLateral.tsx` con soporte ARIA y navegación por teclado (`Tab`, `Escape`).
  * [x] **Formulario de inscripción a rutas (`HU-27` / `RN-08`):** -> *Estado: Cumple.* Formulario conectado a la API de inscripciones con validación de datos en servidor, selector dinámico de rutas y aviso de seguridad condicional.
  * [x] **Documentación y compilación del backend (`HU-28`):** -> *Estado: Cumple.* Comandos de compilación `api:build` y ejecución documentados en `README.md`.
  * [x] **Detalle de ruta en ventana emergente (`HU-09`):** -> *Estado: Cumple.* Implementado mediante modal accesible con soporte de alto contraste.
  * [x] **Catálogo dinámico de emprendedores consumiendo API REST externa (`HU-17`):** -> *Estado: Cumple.* Integración con MockAPI, cálculo de 12 puntos de sustentabilidad según RN-02 y manejo de excepciones con `try/catch`.
  * [x] **Integración de mapas interactivos Leaflet / OpenStreetMap (`HU-12`):** -> *Estado: Cumple.* Mapas en Temuco, Pucón y Villarrica con marcadores georreferenciados y prevención de scroll trap.
  * [x] **Buscador y generador dinámico de rutas (`HU-22`):** -> *Estado: Cumple.* Filtrado multicriterio por comuna y dificultad con tolerancia a tildes (BUG-12 resuelto) y selección determinista de la ruta del día (`HU-10`).
  * [x] **Consumo de API de clima para seguridad en terreno (`HU-04`):** -> *Estado: Cumple.* Integrado con Open-Meteo, inyectando temperatura, condición y traducción a español.
  * [x] **Accesibilidad en lectores de pantalla para tamaño de fuente (`RN-04` / `BUG-07`):** -> *Estado: Cumple.* Botones discretos `.btn-tamano` y región `aria-live`.
  * [x] **Directorio de emergencias médicas y públicas (`HU-05` / `RN-03`):** -> *Estado: Cumple.* Marcado telefónico directo `tel:` en móviles y función de copia en escritorio.
  * [x] **Capa modal y privacidad en aviso de cookies (`HU-15` / `RN-06` / `BUG-04`):** -> *Estado: Cumple.* Overlay de pantalla completa con `z-index: 10001` y gestión de preferencias.
  * [x] **Optimización completa de imágenes en formato WebP (`ISSUE-03`):** -> *Estado: Cumple.* 100% de los recursos visuales convertidos a `.webp`.
  * [x] **Migración a TypeScript y suite de pruebas (`HU-16`):** -> *Estado: Cumple.* Tipado estricto en frontend y backend con 0 errores de compilación.

---

## 5. Auditoría de Calidad y Suite de Pruebas Automatizadas

La calidad del incremento final del Sprint 2 fue validada ejecutando la totalidad de las suites de prueba del repositorio:

| Suite de Prueba | Archivo de Origen | Pruebas Ejecutadas | Resultado | Observaciones |
|---|---|:---:|:---:|---|
| **Pruebas Unitarias del Frontend** | `tests/pruebas.ts` / `tests/pruebas.js` | 28 | **28/28 Aprobadas (100%)** | Lógica de negocio, formato telefónico, cálculo de sustentabilidad y accesibilidad. |
| **Pruebas de Contrato de Datos y Filtros** | `tests/rutas.test.ts` | 7 | **7/7 Aprobadas (100%)** | Contrato `Ruta`, normalización de tildes (BUG-12), representatividad territorial y ruta del día. |
| **Pruebas de Endpoints del Backend** | `api/test-endpoints.js` | 8 | **8/8 Aprobadas (100%)** | Endpoints `/api/health`, `/api/v1/rutas`, filtros, detalle, validación de inscripción y privacidad RN-08. |
| **Compilación Frontend (Vite + React)** | `tsconfig.app.json` + `vite build` | 24 módulos | **Exitosa (0 errores)** | Bundle optimizado generado en `dist/`. |
| **Compilación Backend (API Express)** | `api/tsconfig.json` | 4 archivos TS | **Exitosa (0 errores)** | Código transpilado a ESM en `api/dist/`. |

---

## 6. Estado de Aceptación del Incremento Final

* [x] **Aceptado al 100%:** Se aprueba formalmente el incremento final del **Sprint 2**.  
  El equipo logró la totalidad de los objetivos fijados para el ciclo: interactividad plena, consumo de APIs externas (MockAPI y Open-Meteo), desarrollo y conexión del backend propio en Node.js/Express (`api/`), base de migración a React 19 con TypeScript y Vite, resolución completa del Bug Bounty (`BUG-04` al `BUG-14`) y cobertura integral de pruebas automáticas. El proyecto se encuentra listo para su presentación y preparado para la transición al Sprint 3.
* [ ] **Aceptado con observaciones**
* [ ] **Modificación Requerida (Rechazado)**

---

## 7. Objetivos y Recomendaciones para el Sprint 3

Para el siguiente ciclo (Sprint 3), el equipo continuará sobre la base consolidada abordando los siguientes puntos:
1. **Migración Completa de Vistas a React:** Trasladar las páginas estáticas restantes (`pucon.html`, `temuco.html`, `villarrica.html`, `contactos.html`) hacia un sistema de rutas unificado en React (React Router).
2. **Despliegue del Backend en la Nube:** Publicar el servidor Express (`api/`) en un servicio cloud (ej. Render, Railway o AWS) para proveer conexión permanente a la API sin depender de ejecución local.
3. **Persistencia Avanzada de Inscripciones:** Incorporar una base de datos ligera (ej. SQLite / PostgreSQL) para persistir las inscripciones más allá del ciclo de vida en memoria del servidor.
