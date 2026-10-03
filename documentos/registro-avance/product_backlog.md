# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio Web Accesible e Interactivo EcoRuta-Temuco

**Organización:** The Frontend Dropout
---
- **Product Owner:** Beatriz Martin
- **QA / Tester:** Ariel Covarrubia
- **Developers:** Lissete Delgado & Carlos Meléndez
- **Scrum Master:** Patricio Salazar
- **Fecha de Última Actualización:** 03/10/2026
---

## Resumen de Estado del Proyecto

* **Estado General:** Inicio del Sprint 2. Foco en la implementación de interactividad nativa (JavaScript), validación de formularios y mejoras en la accesibilidad visual.
* **Validación Técnica:** Semántica HTML y navegación por teclado (Sprint 1) aprobadas. Las nuevas interacciones de JS deberán mantener este estándar.
* **Refinamiento de Alcance:** Definición estricta del perfil "Sustentable" para los eventos/emprendimientos.
* **Foco de Corrección Inmediata:** Resolución de hallazgos remanentes del Bug Bounty (etiquetas `<meta>` faltantes y optimización de rendimiento/imágenes).

---

## Reglas de Negocio (Business Rules)

* **RN-01 (Navegación Externa y Salida Segura):** Todo enlace a redes o sitios externos debe abrirse en pestaña nueva (`target="_blank"` y `rel="noopener noreferrer"`).
* **RN-02 (Criterio de Sustentabilidad y Filtrado):** Los emprendimientos deben alinearse con el propósito de EcoRuta (impacto ambiental, aporte local, cultura, etc.). *Responsabilidad de validación delegada a la Product Owner.*
* **RN-03 (Acceso Persistente a Emergencias):** El apartado de emergencias debe ser visible en dispositivos móviles y al consultar rutas.
* **RN-04 (Estándar de Accesibilidad WAI-AA):** La interfaz debe garantizar navegación por teclado (`Tab`), alternativas tipográficas, y que los nuevos eventos de JavaScript no rompan la secuencialidad del foco.
* **RN-05 (Consistencia de Rutas Relativas):** La arquitectura de archivos debe mantener rutas relativas coherentes.

---

## Historias de Usuarios Reenfocadas o y Criterios de Aceptación (Sprint 2 - JavaScript y Accesibilidad)
### [HU-09] Detalle de rutas disponibles
* **Prioridad (MoSCoW):** Must have
* **Estado:** Por hacer
* **Historia:** Como turista, quiero ver el detalle de todas las rutas disponibles desplegando la información de manera dinámica, para no tener que recargar la página constantemente.
* **Criterios de Aceptación:**
  - [ ] Definir variables y escuchar el evento de clic (`addEventListener`) en los botones de las rutas.
  - [ ] Alterar la visibilidad del detalle modificando clases CSS desde JavaScript (`classList.toggle`).
  - [ ] El botón desplegable debe ser navegable y activable mediante el teclado (`Tab` y `Enter`) (RN-04).

### [HU-11] Accesibilidad visual (baja visión)
* **Prioridad (MoSCoW):** Must have
* **Estado:** Por hacer
* **Historia:** Como persona con baja visión, quiero controles visuales en la cabecera (alto contraste/zoom), para leer la información turística sin dificultad.
* **Criterios de Aceptación:**
  - [ ] Botones funcionales que cambien el estilo general (`document.querySelector`).
  - [ ] Separación correcta de la lógica de JS y las clases de CSS.
  - [ ] El aumento de texto no debe desbordar las tarjetas de las ciudades, especialmente en móviles.

### [HU-13] Implementación y validación dinámica de Formulario
* **Prioridad (MoSCoW):** Should have
* **Estado:** Por hacer
* **Historia:** Como usuario interesado, quiero poder enviar un formulario que valide mis datos dinámicamente, para no enviar información errónea.
* **Criterios de Aceptación:**
  - [ ] Agregación del apartado de formulario en las rutas.
  - [ ] Validar campos de texto vacíos (marcando en rojo si hay error).
  - [ ] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.

## Historias de Usuario Base y Reenfocadas

### [HU-01] Emprendimiento de Manualidades en Pucón
* **Prioridad:** Must have | **Estado:** En Progreso
  - [x] Visibilizar información de emprendimientos.
  - [x] Redirección hacia canales de venta.

### [HU-02] Parque Nacional Villarrica
* **Prioridad:** Must have | **Estado:** En Progreso
  - [x] Presentar rutas e información dedicada al cuidado del entorno.
  - [x] **[QA Resuelto]:** Declaración de atributos `id="rutas"` y corrección de anclas.

### [HU-03] Recomendaciones de Rutas (Grupos)
* **Prioridad:** Should have | **Estado:** En Proceso
  - Enfoque hacia rutas sustentables grupales, descartando eventos no alineados.

### [HU-05] Contactos médicos de emergencia
* **Prioridad:** Should have | **Estado:** En Progreso
  - [ ] Sección visible con números directos de emergencia.
  - [ ] Aviso claro de que es un directorio y no garantía médica.

---

## Historias de Mejoras Futuras (Could Have)

* **[HU-04] Información Climática y Seguridad en Terreno:** Aplazada para futuras iteraciones por ser una herramienta complementaria, útil para el usuario pero no bloqueante para el MVP del Sprint actual.
* **[HU-06] Almacenamiento de Contactos de Asilos:** Catalogada como mejora futura, ya que requerirá evaluación e implementación de almacenamiento local (`localStorage`) para guardar información personalizada del usuario sin comprometer bases de datos.
* **[HU-12] Mapas Interactivos y Difusión:** Pospuesta para fases posteriores; la integración de cartografía referencial aporta gran valor de ubicación, pero la plataforma puede operar inicialmente con la información descriptiva actual.

---

## Historias Desestimadas / Fuera de Alcance (Won't Have)

* **[HU-07] Horarios de Buses Interurbanos (Lican Ray - Villarrica):** Marcada como *Won't have* por no alinearse con el objetivo central de visibilizar rutas sustentables y turísticas.
* **[HU-08] Publicidad de Sucursales Comerciales Fuera de Zona (Valdivia):** Desestimada por falta de pertinencia territorial (fuera de La Araucanía) y ausencia de los criterios de Sustentabilidad establecidos en la RN-02.
---

## Control de Bugs e Incidencias (Actualizada el 27/09/2026)
aquí se van a considerar las que quedaron en un estado parcial y pendiente desde el script 1 como alta prioridad para el comienzo del desarrollo del script 2.

| ID | Incidencia / Hallazgo | Prioridad | Asignado | Estado | Observación |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **BUG-02** | ISSUE N.° 02: Falta de etiqueta `<meta name="description">` | **Media** | Developer 2 | **Pendiente** | Retomar como primera instancia en Sprint 2 |
| **BUG-03** | ISSUE N.° 03: Bloqueos de rendimiento y carga (peso imágenes) | **Media** | Developer 1 | **Parcialmente Resuelto** | Mejoró a Performance 74 (Temuco), 62 (Pucón) y 58 (Villarrica), pero requiere más optimización|
---

## Historial de Revisiones

* **17/09/2026(sprint 1):** Registro de informe de QA por Beatriz Martin. Proyecto clasificado como *Aceptado con observaciones*.
* **18/09/2026(sprint 1)** Actualización general del Product Backlog por Carlos Meléndez (PO), integrando las aclaraciones de las entrevistas (Sobre todo la 2) con el cliente, las 8 historias de Usuario base de la plantilla oficial y los hallazgos de QA.
* **25/09/2026(sprint 1)** Actualización del control de Bugs e Incidencias del código a partir de los nuevos cambios dedicados a los archivos de la carpeta de páginas y del bug_bounty.
* **27/09/2026(final sprint 1):** Registro de informe final de Bug Bounty por Beatriz Martin (QA Sprint 1). Proyecto clasificado como *Aceptado con observaciones*.
* **03/10/2026(sprint 2):** Actualización general del Backlog para el Sprint 2 por Beatriz Martin (PO). Se integran las historias enfocadas en manipulación del DOM, accesibilidad visual y los hallazgos pendientes del Lighthouse.

### Compromiso de Cierre del Product Owner (Sprint 1)
* Se da por finalizado el levantamiento inicial del Sprint 1. Los ajustes de rutas relativas hacia alguno de los bugs pendientes a resolver y el desarrollo de componentes del Sprint 2 quedan delegados a la célula de desarrollo.
* Las historias de usuario base se mantienen como la guía de aceptación para la QA Tester y la nueva Product Owner (`@BeatrizMartin`).

### Compromiso de Inicio del Product Owner (Sprint 2)
* Asumo formalmente el rol de Product Owner para este ciclo (`@Beatriz Martin`). 
* El enfoque principal para las próximas semanas será priorizar la correcta implementación de interactividad con JavaScript (Validación de formularios y manipulacion del DOM), asegurar que el filtro de sustentabilidad (RN-02) se cumpla estrictamente en las nuevas historias, y guiar al equipo en la resolución de los bloqueos de rendimiento y accesibilidad visual detectados en el Bug Bounty.