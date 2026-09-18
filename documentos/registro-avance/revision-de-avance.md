# Registro de Revisión de Avance
|
**Responsable (QA):** Beatriz Martin |
**Fecha de Revisión:** 17/09/2026 |
**Sprint:**  1 |

---

## Tareas Revisadas: Validación Técnica, Accesibilidad y Navegación
**Asignado a (Developers):** Ariel Covarrubia & Patricio Salazar (Developer 1 & Developer 2)
**Referencia:** Tareas de QA Tester (validar HTML, navegación por teclado, semántica HTML, resolución de direcciones).

### Hallazgo [1]: Enlaces de contacto, botones sin función y anclas vacías

* **Estado:** PARCIALMENTE RESUELTO (Redirecciones de `index.html` solucionadas).
* **Vista(s) / Componente(s) afectado(s):** `contacto.html`, `pucon.html`, `temuco.html`, `villarrica.html`
* **Resultado obtenido:** 
  - La flecha de navegación y el enlace "Ver más" en la ruta recomendada actúan como anclas vacías (no desplazan la página).
  - Existe un botón sin función asignada que genera un conflicto de usabilidad y accesibilidad (los lectores de pantalla lo anuncian, pero no ejecuta ninguna acción).
  - En el pie de página, los enlaces de Instagram y Twitter están rotos o dirigen a páginas inexistentes (solo Facebook es funcional).
* **Causa raíz:**
  - Las etiquetas `<a href="#rutas">` y `<a href="#ve-mas">` buscan identificadores que no han sido declarados (`id="rutas"`, `id="ve-mas"`) en las secciones correspondientes de los archivos HTML.
  - El botón mencionado no tiene interactividad programada en el código.
  - Faltan las rutas correctas para las redes sociales en el footer.
* **Solución sugerida:**
  - **Para las anclas:** Agregar los atributos `id="rutas"` e `id="ve-mas"` a las secciones de destino dentro de la página para que el desplazamiento (scroll) funcione, o deshabilitar dichos enlaces temporalmente.
  - **Para el botón:** Asignarle su funcionalidad correspondiente o eliminarlo si no tendrá utilidad en esta iteración.
  - **Para el footer:** Actualizar las URLs de redes sociales o remover temporalmente los íconos inactivos para evitar enlaces rotos.

### Incidencia [1]: [File not found 404]

* **Estado:** PENDIENTE
* **Vista(s) / Componente(s) afectado(s):** `pucon.html`, `temuco.html`, `villarrica.html`
* **Resultado obtenido:** al hacer click en `Contacto` en el encabezado de página arroja un error de tipo 404
* **Causa raíz:** `href="paginas/contacto.html"` ruta no especificada correctamente dentro de las páginas causando un error de redireccionamiento
* **Solución esperada / aplicada:** se espera que la ruta sea especificada correctamente dentro de cada página esperando lo siguiente `href="../paginas/contacto.html"`

### Correspondencia y Ajuste a Requerimientos
- **¿Cumple con los Requerimientos?:** Parcialmente
- **Revisión de Criterios de Aceptación:**
  - [x] El HTML no presenta errores de validación técnica en ninguna de las nuevas paginas(W3C). -> *Estado: Cumple*
  - [x] Cada archivo HTML contiene un único `<main>`. -> *Estado: Cumple*
  - [x] Presencia de atributos `alt` descriptivos en imágenes. -> *Estado: Cumple*
  - [x] Navegación exclusiva por teclado (uso de Tab y Shift+Tab) operativa. -> *Estado: Cumple*
  - [ ] Funcionalidad de **todos** los enlaces de las páginas. -> *Estado: Falla*

### Observaciones Técnicas

- **Interfaz y Experiencia de Usuario (UI/UX):**
  - En `index.html` se detectó una falta ortográfica menor (falta de una tilde).
  - En `temuco.html` (y páginas de ciudades similares) existen elementos visuales como la flecha de navegación que aparentan ser interactivos pero no ejecutan ninguna acción, perjudicando la UX.
- **Funcionalidad (Enlaces Rotos o Vacíos):**
  - **En páginas de ciudades (`temuco.html`, etc.):** Existen apartados interactivos que no son funcionales, ya que presentan un cambio en la URL (`#`), actuando como anclas vacías hacia el mismo recurso debido a la falta de IDs. El apartado de contacto y algunas redes sociales en el pie de página tampoco son funcionales.en la URL (`#`), actuando como anclas vacías hacia el mismo recurso.

### Evidencia
- Validación exitosa en [W3C Markup Validation Service](https://validator.w3.org).
- Pruebas manuales de navegación por teclado realizadas de forma satisfactoria.
- Pruebas de lector de pantalla realizada de forma mediana puesto a indicaciones anteriores
- Ver tarjetas del [tablero Kanban](https://trello.com/b/ALyR2lp3) correspondientes en la columna "Hecho" para más información.

### Estado de Aceptación

- [ ] **Aceptado** 
- [x] **Aceptado con observaciones:** Se aprueba la estructura técnica y semántica del proyecto, pero se requiere que los desarrolladores corrijan los enlaces vacíos/rotos (`#`)
- [ ] **Modificación Requerida (Rechazado)** 

### Observaciones adicionales

El uso de botones visuales sin funcionalidad o enlaces rotos genera problemas directos de accesibilidad. Durante las pruebas, se detectó que los lectores de pantalla anuncian estos elementos como interactivos o menús desplegables, lo que causa confusión severa en la navegación al no poder ejecutar ninguna acción. 

**Sugerencia de accesibilidad:** Para futuras vistas, se recomienda utilizar el atributo HTML `disabled` en los botones que aún estén en construcción, o bien, ocultar elementos no funcionales temporalmente de las tecnologías de asistencia utilizando `aria-hidden="true"` hasta que su enrutamiento o desarrollo esté completamente finalizado.

---