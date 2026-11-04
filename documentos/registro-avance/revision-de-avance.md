# Registro de Revisión de Avance - Sprint 2 (Cierre e Incremento Final)

**Responsable (QA):** Ariel Covarrubia | **Fecha de Revisión:** 03/11/2026 | **Sprint:** 2 (Semana 5 / Transición Sprint 3)  
**Product Owner:** Beatriz Martin | **Scrum Master:** Patricio Salazar  
**Asignado a (Developers):** Lissete Delgado & Carlos Meléndez  
**Referencia:** Validación Técnica de Interactividad, Consumo Asíncrono de APIs, TypeScript, Buscador Dinámico, Suite de Pruebas Unitarias y Auditoría de Bugs.

---

## 1. Seguimiento de Incidencias Remanentes del Sprint 1

* **ISSUE N.° 01 (Contraste de color insuficiente):** **Resuelto.** Se mantiene la corrección en la paleta de colores y contrastes WCAG AA.
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
* **BUG-09 (Falta de `rel="noopener noreferrer"` en WhatsApp de emprendedores):** **Resuelto / Cerrado.** En `js/layout.js` (Línea 816), el enlace dinámico a WhatsApp generado para cada emprendedor incorpora explícitamente `target="_blank" rel="noopener noreferrer"`, cumpliendo la regla de salida segura RN-01.
* **BUG-10 (Atrapamiento de scroll en mapas móviles Leaflet):** **Resuelto / Cerrado.** En `paginas/temuco.html`, `paginas/pucon.html` y `paginas/villarrica.html`, se integró la librería y estilos de `leaflet-gesture-handling` con la directiva `gestureHandling: true`, exigiendo el uso de dos dedos para interactuar con el mapa táctil y liberando el scroll vertical con un dedo (WCAG 2.1.2).
* **BUG-11 (Botón de emergencias flotante sin nombre accesible en axe DevTools):** **Resuelto / Cerrado.** En `js/layout.js` (Línea 632), se incorporó el atributo `aria-label="Abrir contactos de emergencia"` al elemento `#btn-emergencia-flotante`, superando la regla `button-name`.

---

## 3. Nuevos Hallazgos Técnicos Registrados (QA / Sprint 3 Backlog)

* **BUG-12 (Sensibilidad a diacríticos y tildes en `filtrarRutas` y `obtenerRutaDelDia`):** **Nuevo Hallazgo (Semana 5).** En `js/rutas.ts`, la función `filtrarRutas` compara la comuna con igualdad estricta (`ruta.comuna.toLowerCase() === filtros.comuna.toLocaleLowerCase()`). Si un llamador externo o usuario pasa `"pucon"` (sin tilde), no coincide con `"Pucón"`, retornando 0 resultados. Se sugiere incorporar normalización de tildes con `.normalize('NFD').replace(/[\u0300-\u036f]/g, '')`.
* **BUG-13 (Sincronización de atributos `data-id` en tarjetas estáticas vs dataset `rutas.ts`):** **Nuevo Hallazgo (Semana 5).** En el filtrado dinámico de `js/buscador.js`, si alguna tarjeta del DOM carece del atributo `data-id` correspondiente o no coincide exactamente con el ID numérico de `rutas.ts`, la tarjeta se oculta automáticamente de forma irreversible. Se recomienda generar las tarjetas enteramente desde el dataset en la migración a React.

---

## 4. Correspondencia y Ajuste a Requerimientos

* **¿Cumple con los Requerimientos del Sprint 2?:** **Sí, 100% de los criterios completados.**
* **Revisión de Criterios de Aceptación:**
  * [x] Catálogo dinámico de emprendedores consumiendo API REST externa (`HU-17`). -> *Estado: Cumple* (Integración con MockAPI, discriminación territorial, cálculo de 12 puntos de sustentabilidad según RN-02 y manejo de errores con `try/catch`).
  * [x] Integración de mapas interactivos Leaflet / OpenStreetMap (`HU-12`). -> *Estado: Cumple* (Mapas interactivos en Temuco, Pucón y Villarrica con marcadores georreferenciados y prevención de scroll trap).
  * [x] Accesibilidad en lectores de pantalla para tamaño de fuente (`RN-04` WAI-AA / `BUG-07`). -> *Estado: Cumple* (Validado con TalkBack y NVDA mediante botones discretos y región `aria-live`).
  * [x] Metadatos SEO en cabeceras HTML (`ISSUE-02`). -> *Estado: Cumple* (Etiquetas `<meta name="description">` contextualizadas en todas las páginas).
  * [x] Formulario interactivo con validación de campos (`HU-13`). -> *Estado: Cumple* (Validación de nombre, formato de correo, longitud de mensaje y confirmación dinámica).
  * [x] Directorio de emergencias médicas y públicas (`HU-05` / `RN-03`). -> *Estado: Cumple* (Marcado telefónico directo `tel:` en móviles y función de copia al portapapeles en PC).
  * [x] Capa modal y privacidad en aviso de cookies (`HU-15` / `RN-06` / `BUG-04`). -> *Estado: Cumple* (Overlay de pantalla completa con `z-index: 10001` y gestión de preferencias).
  * [x] Menú de accesibilidad no invasivo en dispositivos móviles (`HU-11` / `BUG-06`). -> *Estado: Cumple* (Posicionamiento flotante absoluto sin desbordar el header).
  * [x] Alineación y distribución en los extremos del Header (`BUG-05`). -> *Estado: Cumple* (Distribución visual equilibrada en móviles y escritorio).
  * [x] Optimización completa de peso de imágenes y formato WebP (`ISSUE-03`). -> *Estado: Cumple* (Todas las imágenes del repositorio convertidas a formato `.webp`).
  * [x] Buscador y generador dinámico de rutas (`HU-22`). -> *Estado: Cumple* (Implementado en `js/rutas.ts`, `js/rutas.js` y `js/buscador.js` con filtros por dificultad y actividad, y selección determinista de la ruta del día).
  * [x] Consumo de API de clima para seguridad en terreno (`HU-04`). -> *Estado: Cumple* (Integrado con Open-Meteo en `js/clima.js`, inyectando temperatura, sensación térmica, viento y condición en tiempo real).
  * [x] Migración progresiva a TypeScript y suite de pruebas unitarias (`HU-16`). -> *Estado: Cumple* (Configurado `tsconfig.json`, tipado estricto en `js/rutas.ts` y página de ejecución automática en `tests/pruebas.html` con 26 pruebas unitarias aprobadas al 100%).

---

## 5. Estado de Aceptación del Incremento

* [x] **Aceptado:** Se aprueba sin observaciones críticas el incremento del Sprint 2. El equipo cumplió con la totalidad de los criterios funcionales, de accesibilidad y de deuda técnica previa (resolución total de `BUG-04`, `BUG-05`, `BUG-06`, `BUG-07`, `BUG-08`, `BUG-09`, `BUG-10`, `BUG-11` e `ISSUE-03`). Se incorporó el Buscador Dinámico (`HU-22`), la API de Clima (`HU-04`) y la suite automatizada de pruebas TypeScript (`HU-16`). Los nuevos hallazgos menores identificados (`BUG-12` y `BUG-13`) se catalogan como tickets de refinamiento para el Sprint 3.
* [ ] **Aceptado con observaciones**
* [ ] **Modificación Requerida (Rechazado)**
