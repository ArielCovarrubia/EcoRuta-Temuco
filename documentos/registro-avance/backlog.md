# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio Web Accesible e Interactivo EcoRuta-Temuco

**Organización:** The Frontend Dropout
---
- **Product Owner:** Beatriz Martin
- **QA / Tester:** Ariel Covarrubia
- **Developers:** Lissete Delgado & Carlos Meléndez
- **Scrum Master:** Patricio Salazar
- **Fecha de Última Actualización:** 22/10/2026
---

## Resumen de Estado del Proyecto

- **Estado General:** En desarrollo del Sprint 2. Foco estratégico en la integración de datos dinámicos vía API, implementación de OpenStreetMap, y desarrollo del menú avanzado de accesibilidad visual.
- **Validación de Cliente (Entrevista 2):** Se aprobó la línea gráfica, la paleta de colores y la disposición en cuadrícula. Las redes sociales fueron autorizadas como canales de contacto oficiales adicionales.
- **Refinamiento de Alcance:** Se estableció un sistema de puntaje estricto de 12 puntos para evaluar la sustentabilidad de los emprendimientos antes de su publicación.
- **Foco de Corrección Inmediata (Prioridad Alta):** Resolución de la etiqueta `<meta name="description">` (ISSUE-02), optimización de imágenes (WebP) (ISSUE-03), corrección de superposición de capas en el aviso de cookies y menú de accesibilidad (BUG-04, BUG-06), y ajuste del comportamiento de lectores de pantalla (BUG-07).

---

## Validación Técnica y Estándares de Calidad
Todas las implementaciones desarrolladas a partir del Sprint 2 deben cumplir obligatoriamente con los siguientes estándares antes de pasar a la revisión de QA o del Product Owner:
* **Interactividad y Asincronía (JavaScript):** Separación estricta entre estructura y comportamiento. Prohibido el uso de eventos en línea (`onclick` en HTML). Se debe utilizar `addEventListener` y manipular el DOM exclusivamente mediante adición/eliminación de clases (`classList`). El consumo de APIs debe incluir bloques `try/catch` para evitar fallos de interfaz si los datos no cargan.
* **Accesibilidad Continua (WAI-AA):** Todo nuevo componente dinámico (menús, modales, alertas) debe mantener la navegabilidad estricta por teclado (`Tab`, `Enter`, `Esc`). Se exige la actualización dinámica de estados con atributos ARIA (ej. `aria-expanded`, `aria-pressed`, `aria-live`).
* **Calidad de Código y Estructura:** El HTML debe mantener su validación W3C (0 errores). Las rutas relativas de los archivos deben verificarse en los entornos locales antes del despliegue.
* **Rendimiento:** Las imágenes deben subirse en formatos de próxima generación (WebP) y utilizar `loading="lazy"` en elementos no prioritarios para mantener un *score* alto en Google Lighthouse.

---

## Reglas de Negocio (Business Rules)

* **RN-01 (Navegación Externa y Salida Segura):** Todo enlace a redes o sitios externos debe abrirse en pestaña nueva (`target="_blank"` y `rel="noopener noreferrer"`).
* **RN-02 (Filtro de Sustentabilidad - Sistema 12 pts):** Evaluación de 6 criterios (Impacto ambiental, Aporte local, Relación con la naturaleza, Cultura, Prácticas responsables, Pertinencia territorial).
  - *8 a 12 pts:* Aprobado (se publica).
  - *5 a 7 pts:* Pendiente de revisión (se piden antecedentes).
  - *0 a 4 pts:* Rechazado.
* **RN-03 (Directorio de Emergencias):** El panel no es garantía médica. En móviles, debe iniciar llamadas directas (`tel:`). En escritorio, debe permitir copiar el número fácilmente.
* **RN-04 (Estándar de Accesibilidad WAI-AA):** Navegación por teclado (`Tab`), foco visible en el DOM, legibilidad y contraste garantizados.
* **RN-05 (Arquitectura de Datos y APIs):** Los datos dinámicos provendrán de una fuente externa (API). La web debe contemplar manejo de errores si la API falla, evitando pantallas en blanco.
* **RN-06 (Privacidad y Memoria):** Las preferencias de accesibilidad e idioma se guardarán localmente (Cookies/localStorage) de manera temporal, sin exigir registro ni recolectar datos personales del visitante.
---

## Priorización de Tareas (Prueba QA)
*Esta semana se está testeando el uso de **GitHub Issues** gestionado por QA.*
1. Absorción de API (HU-17).
2. Corrección definitiva de los bugs arrastrados del Sprint 1 (ISSUE-02, ISSUE-03).
3. Correcciones visuales y bugs reportados por QA Tester del Sprint actual (BUG-04, BUG-06, BUG-07).
4. Agregación de nuevas funciones y/o extensiones de página.

---
## Historias de Usuarios Reenfocadas o y Criterios de Aceptación (Sprint 2 - JavaScript y Accesibilidad)
### [HU-09] Detalle dinámico de rutas disponibles
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como turista, quiero ver el detalle de todas las rutas disponibles desplegando la información de manera dinámica, para no tener que recargar la página constantemente.
* **Criterios de Aceptación:**
  - [ ] Escuchar el evento de clic (`addEventListener`) en los botones de las rutas.
  - [ ] Alterar la visibilidad modificando clases CSS (`classList.toggle`).
  - [ ] El botón desplegable debe ser navegable y activable mediante el teclado (`Tab` y `Enter`) (RN-04).

### [HU-11] Menú Avanzado de Accesibilidad
* **Prioridad (MoSCoW):** Must have | **Estado:** En Progreso
* **Historia:** Como persona con baja visión, quiero un menú de accesibilidad (contraste/zoom), para leer sin dificultad.
* **Criterios de Aceptación:**
  - [x] Crear un menú desplegable con opciones de tamaño de texto y alto contraste/modo oscuro.
  - [x] Evitar que el zoom desborde las tarjetas en dispositivos móviles.
  - [ ] Las funciones del menú despegable deben dar una buena experiencia de usuario y legelibildad

### [HU-12] Mapas Interactivos (OpenStreetMap)
* **Prioridad (MoSCoW):** Should have | **Estado:** En Progreso
* **Criterios de Aceptación:**
  - [x] Implementar mapa mediante la API de OpenStreetMap (Leaflet).
  - [ ] Añadir marcadores básicos para la distribución de Pucón, Temuco y Villarrica.

### [HU-13] Implementación y validación dinámica de Formulario
* **Prioridad (MoSCoW):** Should have
* **Estado:** Por hacer
* **Historia:** Como usuario interesado, quiero poder enviar un formulario que valide mis datos dinámicamente, para no enviar información errónea.
* **Criterios de Aceptación:**
  - [ ] Agregación del apartado de formulario en las rutas.
  - [ ] Validar campos de texto vacíos (marcando en rojo si hay error).
  - [ ] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.

### [HU-14] Enlaces Oficiales de Redes Sociales
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como visitante, quiero acceder a las redes oficiales, para usarlas como canal de contacto complementario.
* **Criterios de Aceptación:**
  - [ ] Habilitar iconos en el *footer* y contacto hacia Facebook, Instagram y X.
  - [ ] Cumplir con la salida segura (RN-01).

### [HU-15] Cookies de preferencias y [HU-21] Idioma
* **Prioridad (MoSCoW):** Should have | **Estado:** En Progreso
* **Criterios de Aceptación:**
  - [x] Crear un banner informativo indicando el uso de cookies para preferencias de accesibilidad.
  - [ ] Añadir un selector rápido de idioma (ES/EN).
  - [ ] Aplicar automáticamente la configuración guardada al cambiar de página (RN-06).

### [HU-17] Catálogo Dinámico de Emprendimientos (Consumo API)
* **Prioridad (MoSCoW):** Must have | **Estado:** En Progreso
* **Historia:** Como turista, quiero que las fichas se carguen desde una base de datos validada, para ver info actualizada.
* **Criterios de Aceptación:**
  - [x] Implementar asincronía (`fetch`) para consumir JSON (Google Sheets o MockAPI).
  - [x] Renderizar en el DOM únicamente emprendimientos con el estado "Publicado".
  - [ ] Incluir manejo de errores visual si la API no responde.

## Historias de Usuario Base y Reenfocadas

### [HU-01] Emprendimiento de Manualidades en Pucón
* **Prioridad:** Must have | **Estado:** En Progreso
  - [] Visibilizar información de emprendimientos.
  - [] Redirección hacia canales de venta.
  - [] Apartado de los emprendimientos

### [HU-02] Parque Nacional Villarrica
* **Prioridad:** Must have | **Estado:** Hecho
  - [x] Presentar rutas e información dedicada al cuidado del entorno.
  - [x] **[QA Resuelto]:** Declaración de atributos `id="rutas"` y corrección de anclas.

### [HU-03] Recomendaciones de Rutas (Grupos)
* **Prioridad:** Should have | **Estado:** En Proceso
  - [ ] Enfoque hacia rutas sustentables grupales, descartando eventos no alineados.

### [HU-05] Contactos médicos de emergencia
* **Prioridad:** Should have | **Estado:** Hecho
  - [x] Sección visible con números directos de emergencia.
  - [x] Aviso claro de que es un directorio y no garantía médica.
  - [x] Optimización de experiencia (clic para llamar en móviles y copiar en PC)
---

## Historias de Mejoras Futuras (Could Have)

* **[HU-04] Información Climática y Seguridad en Terreno:** Aplazada para futuras iteraciones por ser una herramienta complementaria, útil para el usuario pero no bloqueante para el MVP del Sprint actual.
* **[HU-06] Almacenamiento de Contactos de Asilos:** Catalogada como mejora futura, ya que requerirá evaluación e implementación de almacenamiento local (`localStorage`) para guardar información personalizada del usuario sin comprometer bases de datos.
* **[HU-12] Mapas Interactivos y Difusión:** Pospuesta para fases posteriores; la integración de cartografía referencial aporta gran valor de ubicación, pero la plataforma puede operar inicialmente con la información descriptiva actual.
* **[HU-16] Migración a TypeScript:** Transición para tipado de botones y manipulación del DOM.
* **[HU-18] Favoritos:** Permitir a usuarios registrados guardar rutas.
* **[HU-19] Itinerarios:** Creación de planes de viaje por día para usuarios registrados.
* **[HU-20] Newsletter:** Suscripción voluntaria a boletines.

---

## Historias Desestimadas / Fuera de Alcance (Won't Have)

* **[HU-07] Horarios de Buses Interurbanos (Lican Ray - Villarrica):** Marcada como *Won't have* por no alinearse con el objetivo central de visibilizar rutas sustentables y turísticas.
* **[HU-08] Publicidad de Sucursales Comerciales Fuera de Zona (Valdivia):** Desestimada por falta de pertinencia territorial (fuera de La Araucanía) y ausencia de los criterios de Sustentabilidad establecidos en la RN-02.
---

## Control de Bugs e Incidencias (Actualizado al 22/10/2026)

| ID | Incidencia / Hallazgo | Prioridad | Asignado | Estado | Observación |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **BUG-02** | ISSUE N.° 02: Falta de etiqueta `<meta name="description">` | **Media** | Developer 2 | **Pendiente** | Retomar como primera instancia en Sprint 2 |
| **BUG-03** | ISSUE N.° 03: Bloqueos de rendimiento y carga (peso imágenes) | **Media** | Developer 1 | **Parcialmente Resuelto** | Mejoró a Performance 74 (Temuco), 62 (Pucón) y 58 (Villarrica), pero requiere más optimización|
| **BUG-04** | Aviso de cookies detrás del apartado de emergencias | **Alta** | Developers | **Pendiente** | Conflicto de superposición por `z-index`. |
| **BUG-05** | Distribución incorrecta y centrado en el Header | **Media** | Developers | **Pendiente** | En portada, los elementos se apilan en vez de distribuirse a los costados. |
| **BUG-06** | Expansión indebida del Header por Menú de Accesibilidad en móviles | **Alta** | Developers | **Pendiente** | El menú estira la cabecera fija y carece de comportamiento flotante. |
| **BUG-07** | Lectura corrida de tamaños de texto en lectores de pantalla (A11y) | **Alta** | Developers | **Pendiente** | Falta `aria-live="polite"` y el `<select>` se lee de corrido. |
| **BUG-08** | Conflicto de reglas CSS en tamaño grande | **Baja** | Developers | **Pendiente** | Conflicto de font-size en `style.css` entre rem y px. |
---

## Historial de Revisiones

* **17/09/2026(sprint 1):** Registro de informe de QA por Beatriz Martin. Proyecto clasificado como *Aceptado con observaciones*.
* **18/09/2026(sprint 1)** Actualización general del Product Backlog por Carlos Meléndez (PO), integrando las aclaraciones de las entrevistas (Sobre todo la 2) con el cliente, las 8 historias de Usuario base de la plantilla oficial y los hallazgos de QA.
* **25/09/2026(sprint 1)** Actualización del control de Bugs e Incidencias del código a partir de los nuevos cambios dedicados a los archivos de la carpeta de páginas y del bug_bounty.
* **27/09/2026(final sprint 1):** Registro de informe final de Bug Bounty por Beatriz Martin (QA Sprint 1). Proyecto clasificado como *Aceptado con observaciones*.
* **03/10/2026(sprint 2):** Actualización general del Backlog para el Sprint 2 por Beatriz Martin (PO). Se integran las historias enfocadas en manipulación del DOM, accesibilidad visual y los hallazgos pendientes del Lighthouse.
* **12/10/2026 (Sprint 2):** Actualización post-Entrevista 2. Se integra el consumo de APIs (HU-17), OpenStreetMap (HU-12), sistema de puntajes RN-02, menú de accesibilidad (HU-11) y se planifican los registros de usuarios para el Sprint 3.
- **22/10/2026 (Sprint 2):** Registro de reporte Bug Bounty y sesión de Planning Poker. El incremento es calificado como *Aceptado con observaciones* por bloqueos visuales (BUG-04 al 07). La estimación de la API (HU-17) arroja un promedio de 3.2 de dificultad. Se establece un flujo estricto de priorización de tareas (absorber API, resolver issues heredados y arreglar bugs de QA) y se inicia periodo de prueba de "Issues" en GitHub.

### Compromiso de Cierre del Product Owner (Sprint 1) `@CarlosMeléndez`
* Se da por finalizado el levantamiento inicial del Sprint 1. Los ajustes de rutas relativas hacia alguno de los bugs pendientes a resolver y el desarrollo de componentes del Sprint 2 quedan delegados a la célula de desarrollo.
* Las historias de usuario base se mantienen como la guía de aceptación para la QA Tester y la nueva Product Owner (`@BeatrizMartin`).

### Compromiso de Product Owner (Sprint 2) `@BeatrizMartin`
- El enfoque principal será priorizar la correcta implementación de interactividad con JavaScript, asegurar que el filtro de sustentabilidad (RN-02) se cumpla estrictamente en las nuevas historias, y guiar al equipo en la resolución de los bloqueos de rendimiento y accesibilidad visual detectados en el Bug Bounty.
- El enfoque de desarrollo será funcional (asincronía, mapas, formularios), manteniendo a raya los bloqueos de diseño responsive (Issues de Bug Bounty).