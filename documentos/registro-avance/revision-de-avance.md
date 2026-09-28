# Registro de Revisión de Avance

**Responsable (QA):** Beatriz Martin | **Fecha de Revisión:** 27/09/2026 | **Sprint:** 1
**Asignado a (Developers):** Ariel Covarrubia & Patricio Salazar (Developer 1 & Developer 2)
**Referencia:** Tareas de QA Tester (validar HTML, navegación por teclado, semántica HTML) y actualización de Reporte Bug Bounty.

---

## Tareas Revisadas: Validación Técnica, Accesibilidad y Navegación

### Hallazgo [1]: Enlaces de contacto, botones sin función y anclas vacías

* **Estado:** Resuelto.
* **Vista(s) / Componente(s) afectado(s):** `contacto.html`, `pucon.html`, `temuco.html`, `villarrica.html`.
* **Causa raíz:** Existen botones interactivos y enlaces de navegación (`href="#"`) que no ejecutan ninguna acción ni redirigen al ser activados
* **Solución Aplicada:**
* Se crearon las páginas detalladas `ruta-pucon.html`, `ruta-temuco.html` y `ruta-villarrica.html` en el directorio `paginas extra/` para reemplazar los enlaces ancla vacíos del botón "Ver más".
* Se asignaron las rutas correctas a los atributos operativos para garantizar su redireccionamiento.
* Se deshabilitaron las funciones que aún no estaban completas para asegurar una correcta experiencia de usuario y evitar confusiones en la navegación por teclado.

### Incidencia [1]: [File not found 404] en enlaces de navegación
* **Estado:** Resuelto.
* **Vista(s) / Componente(s) afectado(s):** `pucon.html`, `temuco.html`, `villarrica.html`.
* **Causa raíz:** Ruta relativa no especificada correctamente (`href="paginas/contacto.html"`), causando un error de redireccionamiento al intentar acceder desde subdirectorios.
* **Solución aplicada:** La ruta fue especificada correctamente utilizando la jerarquía de directorios adecuada (`href="../paginas/contacto.html"`), restaurando el acceso a la vista de contacto.
---

## Actualización de Reporte Bug Bounty
Se integraron los resultados del reporte de accesibilidad del 27 de septiembre de 2026. El estado actual de las incidencias es el siguiente:
* **ISSUE N.° 01 (Contraste de color insuficiente):** Resuelto. Se modificó el archivo `style.css` para ajustar los contrastes de color, solucionando el fallo en las tarjetas de rutas.
* **ISSUE N.° 02 (Falta de etiqueta Meta Description):** Pendiente. Aún existe la ausencia de la etiqueta `<meta name="description">` en el bloque `<head>` de las vistas. Esto se retomará como primera instancia en el cambio de Script del 1 al 2.
* **ISSUE N.° 03 (Bloqueos de rendimiento y carga):** Parcialmente Resuelto. Se revisó el peso de las imágenes y se ajustó parte de la estructura, logrando un cambio significativo en la performance de `pucon.html` y `villarrica.html`.
* **ISSUE N.° 04 (Textos alternativos sin contexto):** Resuelto. Las descripciones genéricas fueron reescritas y parafraseadas para proveer un contexto geográfico claro (ej. `alt="Mirador panorámico hacia el volcán Villarrica"`).
* **ISSUE N.° 05 (Elementos interactivos sin comportamiento):** Resuelto. (Detallado previamente en el Hallazgo [1]).

---

## Correspondencia y Ajuste a Requerimientos

* **¿Cumple con los Requerimientos?:** Parcialmente.
* **Revisión de Criterios de Aceptación:**
* [x] El HTML no presenta errores de validación técnica en ninguna de las nuevas páginas (W3C). -> *Estado: Cumple*
* [x] Cada archivo HTML contiene un único `<main>`. -> *Estado: Cumple*
* [x] Presencia de atributos `alt` descriptivos y con contexto geográfico en imágenes. -> *Estado: Cumple*
* [x] Navegación exclusiva por teclado (uso de Tab y Shift+Tab) operativa. -> *Estado: Cumple*
* [x] Funcionalidad de **todos** los enlaces de las páginas. -> *Estado: Cumple*


## Observaciones Técnicas
* **Interfaz y Experiencia de Usuario (UI/UX):**
* El botón de accesibilidad indica directamente su función sin mencionar ser un menú. Esta decisión demostró ser una buena alternativa de usabilidad, ya que comunica de manera directa y eficiente su propósito al usuario, reduciendo la carga cognitiva.

## Evidencia

* Pruebas manuales de navegación por teclado realizadas de forma satisfactoria.
* Pruebas de lector de pantalla realizadas de forma exitosa mediante Talk Back.
* Evidencias automáticas (axe DevTools y Lighthouse) adjuntas en el directorio de imágenes del repositorio.
* Haga revición del `bug_bounty(1).pdf` en el apartado de reportes
* Ver tarjetas del tablero Kanban correspondientes en la columna "Hecho" para más detalle técnico.

## Estado de Aceptación

* [ ] **Aceptado**
* [x] **Aceptado con observaciones:** El incremento es funcional y los bloqueos absolutos de navegación fueron solucionados. Se aprueba el pase, pero se requiere priorizar los issues pendientes de SEO (Meta Description) y optimización de carga (Performance) para el próximo hito de desarrollo.
* [ ] **Modificación Requerida (Rechazado)**

## Observaciones Adicionales
Las tareas remanentes del Bug Bounty serán la prioridad técnica principal durante el inicio del próximo Script.