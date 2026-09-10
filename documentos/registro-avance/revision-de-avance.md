# Registro de Revisión de Avance
|
**Responsable (QA):** Beatriz Martin |
**Fecha de Revisión:** 09/09/2026 |
**Sprint:**  1 |

---

## Tareas Revisadas: Validación Técnica, Accesibilidad y Navegación
**Asignado a (Developers):** Ariel Covarrubia & Patricio Salazar (Developer 1 & Developer 2)
**Referencia:** Tareas de QA Tester (validar HTML, navegación por teclado, semántica HTML).

### 1. Correspondencia y Ajuste a Requerimientos
- **¿Cumple con la Historia de Usuario / Requerimiento?:** Parcialmente (Cumple reglas técnicas, pero faltan enlaces funcionales).
- **Revisión de Criterios de Aceptación:**
  - [x] El HTML no presenta errores de validación técnica (W3C). -> *Estado: Cumple*
  - [x] Cada archivo HTML contiene un único `<main>`. -> *Estado: Cumple*
  - [x] Presencia de atributos `alt` descriptivos en imágenes. -> *Estado: Cumple*
  - [x] Navegación exclusiva por teclado (uso de Tab y Shift+Tab) operativa. -> *Estado: Cumple*
  - [ ] Funcionalidad de todos los enlaces de las páginas. -> *Estado: Falla (Ver observaciones)*

### 2. Observaciones Técnicas

- **Interfaz y Experiencia de Usuario (UI/UX):**
  - En `index.html` se detectó una falta ortográfica menor (falta de una tilde).
  - En `temuco.html` hay una flecha visual que debería poder presionarse, pero actualmente no es interactiva.
- **Funcionalidad (Enlaces Rotos o Vacíos):**
  - **En `index.html`:** Dos de tres enlaces no son funcionales por carecer de dirección o archivo HTML de destino (solo uno de los enlaces de redireccionamiento funciona, especificamente el de temuco).
  - **En `temuco.html`:** El apartado de contacto no es funcional (no está ligado a una URL ni a acciones de mail/teléfono en el pie de página). Existen apartados que son interactivos pero no funcionales, ya que presentan un cambio en la URL (`#`), actuando como anclas vacías hacia el mismo recurso.
- **Imágenes:** Las rutas hacia las imágenes están correctas y los recursos cargan bien desde sus carpetas.

### 3. Evidencia
- Validación exitosa en W3C Markup Validation Service.
- Pruebas manuales de navegación por teclado realizadas de forma satisfactoria.
- Ver tarjetas del [tablero Kanban](https://trello.com/b/ALyR2lp3) correspondientes en la columna "Hecho" para más información.

### 4. Estado de Aceptación

- [ ] **Aceptado** 
- [x] **Aceptado con observaciones:** Se aprueba la estructura técnica y semántica del proyecto, pero se requiere que los desarrolladores corrijan los enlaces vacíos/rotos (`#`) y el error ortográfico antes de dar la tarea por 100% finalizada.
- [ ] **Modificación Requerida (Rechazado)** 

### Observaciones adicionales
- Si bien la navegación por teclado funciona excelente a nivel técnico (sin necesidad del señalador), la experiencia del usuario se ve interrumpida por los enlaces vacíos (`#`). Es muy común usar el símbolo `#` como relleno en etapas de maquetación, pero esto puede causar confusión, especialmente cuando se utiliza el lector de pantalla.

- Sugerencia para los developers: Para el apartado de contacto en `temuco.html`, se recomienda implementar los protocolos `mailto`: para el correo electrónico y `tel`: para el número de teléfono. Así, al hacer clic (o presionar Enter), se abrirá automáticamente el gestor de correos o la aplicación de llamadas del usuario. Para las páginas que aún no existen, sería ideal crear una vista sencilla tempolar que diga 'Próximamente' o 'En construcción' en lugar de dejar el error de navegación.
---