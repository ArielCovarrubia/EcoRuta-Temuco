# Registro de Revisión de Avance - Sprint 2

**Responsable (QA):** Ariel Covarrubia | **Fecha de Revisión:** 20/10/2026 | **Sprint:** 2  
**Product Owner:** Beatriz Martin | **Scrum Master:** Patricio Salazar  
**Asignado a (Developers):** Lissete Delgado & Carlos Meléndez  
**Referencia:** Validación Técnica de Interactividad, Accesibilidad Universal (WAI-AA) y Auditoría Bug Bounty Sprint 2.

---

## 1. Seguimiento de Incidencias Remanentes del Sprint 1

* **ISSUE N.° 01 (Contraste de color insuficiente):** Resuelto. Se mantiene la corrección en la paleta de colores.
* **ISSUE N.° 02 (Falta de etiqueta Meta Description):** **Sigue Pendiente.** Se constató la persistente ausencia de `<meta name="description">` en el bloque `<head>` de todas las vistas del sitio (`index.html`, `pucon.html`, `temuco.html`, `villarrica.html`). Requiere subsanación inmediata para SEO.
* **ISSUE N.° 03 (Bloqueos de rendimiento y carga diferida):** **Sigue Parcialmente Resuelto.** Las imágenes no han sido migradas a `.webp` y mantienen pesos excesivos para móvil (`baner-pucon.jpg` de 2.01 MB y `paque-huerquehue.jpg` de 1.71 MB). No se ha implementado el atributo `loading="lazy"`.
* **ISSUE N.° 04 (Textos alternativos sin contexto):** Resuelto. Se conservan los atributos `alt` descriptivos con contexto geográfico.
* **ISSUE N.° 05 (Elementos interactivos sin comportamiento):** Resuelto. Enlaces 404 corregidos en Sprint 1.

---

## 2. Nuevos Hallazgos e Incidencias Detectadas (Sprint 2 - Bug Bounty)

Se integraron los resultados de la auditoría técnica del 20 de octubre de 2026 formalizados en el documento `reporte-bug-bounty-sprint-2.md`:

* **BUG-04 (Aviso de cookies detrás del apartado de emergencias):** **Pendiente.** Conflicto de superposición por `z-index: 1000` frente a `z-index: 9999` de emergencias. El aviso carece de capa modal, desenfoque de fondo y captura de foco.
* **BUG-05 (Distribución incorrecta y centrado en el Header):** **Pendiente.** En la portada, `header.sin-navegacion` apila el título y el botón de accesibilidad verticalmente en el centro en vez de distribuirlos a los costados.
* **BUG-06 (Expansión indebida del Header por Menú de Accesibilidad en móviles):** **Pendiente.** El menú se encuentra en flujo estático (`position: static`), lo que estira la cabecera fija ocupando más del 40% de la pantalla del teléfono. Carece de comportamiento flotante (dropdown) y cierre al pulsar fuera.
* **BUG-07 (Lectura corrida de tamaños de texto en lectores de pantalla - A11y):** **Pendiente.** El control `<select>` provoca que TalkBack/VoiceOver lean las opciones de corrido como una sola frase ininterrumpida. Falta confirmación sonora vía `aria-live="polite"` al cambiar el tamaño (RN-04).
* **BUG-08 (Conflicto de reglas CSS en tamaño grande):** **Pendiente (Deuda técnica).** Conflicto entre `font-size: 1.15rem` (Línea 560) y `--tamano-fuente: 19px` (Línea 960) en `style.css`.

---

## 3. Correspondencia y Ajuste a Requerimientos

* **¿Cumple con los Requerimientos del Sprint 2?:** Parcialmente.
* **Revisión de Criterios de Aceptación:**
  * [x] Catálogo dinámico de emprendedores consumiendo JSON local (`HU-17`). -> *Estado: Cumple*
  * [x] Integración de mapas interactivos Leaflet / OpenStreetMap (`HU-12`). -> *Estado: Cumple*
  * [ ] Capa modal y privacidad en aviso de cookies (`HU-15` / `RN-06`). -> *Estado: No cumple (BUG-04)*
  * [ ] Menú de accesibilidad operable y no invasivo en móviles (`HU-11`). -> *Estado: No cumple (BUG-06)*
  * [ ] Accesibilidad universal en lectores de pantalla y foco modal (`RN-04` WAI-AA). -> *Estado: No cumple (BUG-04, BUG-07)*
  * [ ] Optimización de peso de imágenes y SEO técnico (`ISSUE-02`, `ISSUE-03`). -> *Estado: No cumple*

---

## 4. Estado de Aceptación del Incremento

* [ ] **Aceptado**
* [x] **Aceptado con observaciones:** Se aprueban las funcionalidades asíncronas de datos (emprendedores) y mapas, pero se rechazan los componentes visuales de accesibilidad móvil y cookies hasta subsanar los bloqueos de superposición (`BUG-04`), estiramiento del header (`BUG-06`), lectura asistiva (`BUG-07`) y las deudas remanentes de SEO y optimización de carga.
* [ ] **Modificación Requerida (Rechazado)**