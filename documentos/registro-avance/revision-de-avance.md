# Registro de Revisión de Avance - Sprint 2

**Responsable (QA):** Ariel Covarrubia | **Fecha de Revisión:** 28/10/2026 | **Sprint:** 2 (Semana 4)  
**Product Owner:** Beatriz Martin | **Scrum Master:** Patricio Salazar  
**Asignado a (Developers):** Lissete Delgado & Carlos Meléndez  
**Referencia:** Validación Técnica de Interactividad, Accesibilidad Universal (WAI-AA), Consumo de APIs y Auditoría Bug Bounty Sprint 2.

---

## 1. Seguimiento de Incidencias Remanentes del Sprint 1

* **ISSUE N.° 01 (Contraste de color insuficiente):** **Resuelto.** Se mantiene la corrección en la paleta de colores aprobada en Sprint 1.
* **ISSUE N.° 02 (Falta de etiqueta Meta Description):** **Resuelto / Cerrado.** Se verificó en código la incorporación efectiva de etiquetas `<meta name="description">` contextualizadas para SEO en el bloque `<head>` de todas las vistas del sitio (`index.html`, `pucon.html`, `temuco.html`, `villarrica.html`). PR #54 cerrado e integrado.
* **ISSUE N.° 03 (Bloqueos de rendimiento y carga diferida):** **Sigue Parcialmente Resuelto.** Se inició la optimización con la primera imagen migrada a formato `.webp` y atributo `loading="lazy"` en `pucon.html` (`termas-huife-destacado.webp`). Sin embargo, persisten imágenes pesadas en formato `.jpg` en banners principales y galerías (`baner-pucon.jpg` de 2.01 MB y `paque-huerquehue.jpg` de 1.71 MB) sin carga diferida en la totalidad de páginas.
* **ISSUE N.° 04 (Textos alternativos sin contexto):** **Resuelto.** Se conservan los atributos `alt` descriptivos con contexto geográfico en todas las vistas.
* **ISSUE N.° 05 (Elementos interactivos sin comportamiento):** **Resuelto.** Enlaces vacíos y redirecciones 404 fueron subsanados en Sprint 1.

---

## 2. Seguimiento de Hallazgos e Incidencias (Sprint 2 - Bug Bounty)

Se dio seguimiento al estado de los hallazgos técnicos formalizados en el documento `Bug Bounty Sprint 2.pdf`:

* **ISSUE-02 (Metadatos SEO en `<head>`):** **Resuelto / Cerrado.** Integrado en la rama principal tras aprobación de PR #54.
* **BUG-07 (Lectura corrida de tamaños de texto en lectores de pantalla - A11y):** **Resuelto / Cerrado.** Se rediseñó el componente en `header.html` y `layout.js` mediante PR #53. Se reemplazó el control `<select>` por un `<fieldset>` semántico con `<legend>`, botones discretos individuales (`.btn-tamano`) con atributo `aria-pressed`, y una región en vivo accesible (`<p id="anuncio-accesibilidad" class="sr-only" aria-live="polite">`) que notifica verbalmente el cambio a sintetizadores de voz (TalkBack / NVDA).
* **BUG-04 (Aviso de cookies detrás del apartado de emergencias):** **Pendiente.** En `css/style.css`, `#aviso-cookies` mantiene `z-index: 1000` frente a `z-index: 9999` del botón flotante y panel de emergencias. El aviso aún carece de capa modal completa, desenfoque de fondo (`backdrop-filter`) y captura estricta de foco.
* **BUG-05 (Distribución incorrecta y centrado en el Header):** **Pendiente.** En la portada, `header.sin-navegacion` continúa con `flex-direction: column` y centrado en escritorio y móvil, apilando el título y el botón de accesibilidad en lugar de alinearlos a los extremos izquierdo y derecho.
* **BUG-06 (Expansión indebida del Header por Menú de Accesibilidad en móviles):** **Pendiente.** El contenedor `#menu-accesibilidad` continúa en flujo estático (`position: static`), lo que estira la cabecera fija verticalmente al abrirse en pantallas móviles. Pendiente conversión a contenedor flotante (`position: absolute`) con eventos de cierre al pulsar fuera o tecla `Escape`.
* **BUG-08 (Conflicto de reglas CSS en tamaño grande):** **Pendiente (Deuda técnica).** Persiste la duplicidad entre `font-size: 1.15rem` (Línea 560) y `--tamano-fuente: 19px` (Línea 960) en `css/style.css`.
* **BUG-09 (Falta de `rel="noopener noreferrer"` en WhatsApp de emprendedores):** **Nuevo Hallazgo (Semana 4).** En `layout.js` (Línea 704), el enlace a WhatsApp generado dinámicamente contiene `target="_blank"` pero carece del atributo de seguridad `rel="noopener noreferrer"`, incumpliendo la regla RN-01.
* **BUG-10 (Atrapamiento de scroll en mapas móviles Leaflet):** **Nuevo Hallazgo (Semana 4).** En celulares, el gesto táctil vertical sobre `#mapa-ruta` queda atrapado como desplazamiento del mapa, bloqueando el scroll de la página (WCAG 2.1.2).

---

## 3. Correspondencia y Ajuste a Requerimientos

* **¿Cumple con los Requerimientos del Sprint 2?:** Parcialmente.
* **Revisión de Criterios de Aceptación:**
  * [x] Catálogo dinámico de emprendedores consumiendo API REST externa (`HU-17`). -> *Estado: Cumple* (Integración remota mediante `fetch` contra endpoint de MockAPI `https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores`, filtrado por estado "Publicado", discriminación territorial por comuna en Temuco, Pucón y Villarrica, enlace directo a WhatsApp, cálculo de puntaje sustentable de 12 puntos segun RN-02 y control de excepciones con bloques `try / catch`).
  * [x] Integración de mapas interactivos Leaflet / OpenStreetMap (`HU-12`). -> *Estado: Cumple* (Implementado en contenedores `#mapa-ruta` de `temuco.html`, `pucon.html` y `villarrica.html`, con azulejos de OpenStreetMap, coordenadas locales y marcadores interactivos con popups).
  * [x] Accesibilidad en lectores de pantalla para tamaño de fuente (`RN-04` WAI-AA / `BUG-07`). -> *Estado: Cumple* (Resuelto y validado en PR #53 con botones discretos y anuncios en vivo).
  * [x] Metadatos SEO en cabeceras HTML (`ISSUE-02`). -> *Estado: Cumple* (Resuelto y validado en PR #54 con etiquetas `<meta name="description">`).
  * [x] Formulario interactivo con validación de campos (`HU-13`). -> *Estado: Cumple* (Validación en tiempo real de campos obligatorios, sintaxis de correo y confirmación dinámica en `script.js`).
  * [x] Directorio de emergencias médicas y públicas (`HU-05` / `RN-03`). -> *Estado: Cumple* (Botón flotante, panel informativo con descargo de responsabilidad, marcado telefónico directo en móviles y botón de copia en PC).
  * [ ] Capa modal y privacidad en aviso de cookies (`HU-15` / `RN-06`). -> *Estado: No cumple (Pendiente por BUG-04)*
  * [ ] Menú de accesibilidad no invasivo en dispositivos móviles (`HU-11`). -> *Estado: No cumple (Pendiente por BUG-06)*
  * [ ] Alineación y distribución a los extremos en el Header (`BUG-05`). -> *Estado: No cumple (Pendiente)*
  * [ ] Optimización completa de peso de imágenes y formato WebP (`ISSUE-03`). -> *Estado: Parcialmente Cumple (En progreso)*
  * [ ] Buscador y generador dinámico de rutas (`HU-22`). -> *Estado: Por hacer (Aprobado en Entrevista 2 / Foco semana en curso)*
  * [ ] Consumo de API de clima para seguridad en terreno (`HU-04`). -> *Estado: Por hacer (Aprobado en Entrevista 2 / Foco semana en curso)*
  * [ ] Migración progresiva a TypeScript (`HU-16`). -> *Estado: Por hacer (Planificado para cierre Sprint 2 / Sprint 3)*

---

## 4. Estado de Aceptación del Incremento

* [ ] **Aceptado**
* [x] **Aceptado con observaciones:** Se aprueba formalmente la incorporación del consumo asíncrono de la MockAPI de emprendedores (`HU-17`), la integración de mapas interactivos Leaflet (`HU-12`), y la subsanación exitosa de los tickets `ISSUE-02` (metadatos SEO) y `BUG-07` (accesibilidad WAI-ARIA en lectores de pantalla). Se mantiene el estado condicionado con observaciones debido a la persistencia de los defectos visuales en dispositivos móviles (`BUG-04`, `BUG-05`, `BUG-06`) y la deuda remanente de optimización de imágenes (`ISSUE-03`), mientras el equipo aborda en el código el Buscador Dinámico de Rutas (`HU-22`) y la API de Clima (`HU-04`).
* [ ] **Modificación Requerida (Rechazado)**
