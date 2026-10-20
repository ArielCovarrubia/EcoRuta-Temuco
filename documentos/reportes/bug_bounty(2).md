# Reporte de Auditoría Técnica y Bug Bounty - Sprint 2
**Proyecto:** EcoRuta-Temuco (Sitio Web Accesible e Interactivo)  
**Organización:** The Frontend Dropout  
**Fecha de Emisión:** 20 de Octubre de 2026  
**Ciclo:** Sprint 2 - Interactividad, APIs y Accesibilidad Universal  
**Reportado por:** Ariel Covarrubia (QA / Tester)  
**Revisores:** Beatriz Martin (Product Owner), Patricio Salazar (Scrum Master)  
**Equipo de Desarrollo:** Lissete Delgado & Carlos Meléndez  

---

## 1. Resumen Ejecutivo de Calidad

Durante las pruebas funcionales, de experiencia de usuario (UI/UX) y de accesibilidad asistiva (A11y) sobre el incremento del Sprint 2, se detectaron incidencias críticas en la interacción de capas dinámicas (`z-index`), en la estructura flexible del encabezado (`header`), en el comportamiento responsive del menú de accesibilidad y en la compatibilidad con lectores de pantalla (TalkBack / VoiceOver / NVDA).

Este documento formaliza las incidencias bajo el estándar de **Bug Bounty / QA Defect Report** del proyecto para su priorización inmediata en el backlog.

### Matriz de Incidencias Detectadas

| ID | Título de la Incidencia | Severidad | Prioridad | Componentes Afectados | Criterio / Regla |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-04** | Aviso de cookies detrás del apartado de emergencias | Alta | Alta | Cookies, Emergencias, Overlay | RN-06 / RN-03 |
| **BUG-05** | Distribución incorrecta y apilamiento en el Header | Media | Media | Header, Navegación | UI/UX Base |
| **BUG-06** | Expansión no deseada del Header por menú de accesibilidad en móviles | Alta | Alta | Header, Menú Accesibilidad | Mobile UX / HU-11 |
| **BUG-07** | Lectura corrida de tamaños de texto en lectores de pantalla | Alta | Alta | Accesibilidad, Screen Reader | RN-04 / WAI-AA |
| **BUG-08** | Conflicto de especificidad y doble regla CSS en tamaño grande | Baja | Media | Estilos (`css/style.css`) | Calidad Técnica |

---

## 2. Fichas Técnicas de Defectos (Bug Reports)

### BUG-04: Aviso de cookies detrás del apartado de emergencias

* **ID:** BUG-04  
* **Severidad:** Alta  
* **Prioridad:** Alta  
* **Estado:** Pendiente  
* **Componentes Afectados:** Componente de cookies (`#aviso-cookies`), botón flotante de emergencias (`.btn-emergencia-sticky`), panel de emergencias (`.panel-emergencia`).  
* **Dispositivos Afectados:** Computador de escritorio y teléfonos móviles.

#### Descripción del Problema
Al cargar el sitio por primera vez o sin preferencias guardadas, el aviso informativo de preferencias de cookies se renderiza visualmente por detrás del botón flotante de emergencias en la esquina inferior derecha. Esto impide la correcta lectura del texto y bloquea el clic sobre el botón "Gestionar preferencias". Además, el aviso no bloquea la interacción con el resto de la página ni desenfoca el fondo.

#### Diagnóstico y Causa Raíz Técnica
- En `css/style.css`, `.btn-emergencia-sticky` y `.panel-emergencia` tienen definido `z-index: 9999;`, mientras que `#aviso-cookies` tiene asignado `z-index: 1000;`.
- Ambos componentes comparten la posición `bottom: 20px; right: 20px;`.
- `#aviso-cookies` carece de capa de fondo modal (backdrop) con desenfoque (`backdrop-filter: blur(...)`) y de atributo `aria-modal="true"` con captura de foco (focus trap).

#### Pasos para Reproducir
1. Abrir una ventana de incógnito o borrar el almacenamiento local (`localStorage.clear()`).
2. Ingresar a cualquier vista del sitio (ej. `index.html` o `paginas/pucon.html`).
3. Observar la esquina inferior derecha donde se despliega el aviso de cookies y el botón de emergencias.
4. Intentar interactuar con los botones del aviso de cookies.

#### Comportamiento Actual
El botón circular rojo de emergencias se sitúa encima del aviso de cookies. El fondo permanece 100% interactivo y legible sin desenfoque.

#### Comportamiento Esperado
El aviso de cookies debe presentarse como un modal con una capa de fondo oscura y desenfocada (`backdrop-filter`) que bloquee temporalmente cualquier interacción con el resto del sitio (incluyendo el botón de emergencias). Su jerarquía visual debe ser superior a todos los elementos flotantes de la página (`z-index: 10000+` o elemento `<dialog>` nativo).

#### Criterios de Aceptación
- [ ] El aviso de cookies aparece por encima de cualquier otro elemento flotante o fijo (`z-index` superior a emergencias).
- [ ] Se proyecta un fondo desenfocado que bloquea clics y scrolls en el contenido de fondo.
- [ ] Compatible y sin desbordes horizontales en resoluciones de 320px a 1920px.
- [ ] Mantiene operativas las opciones de Aceptar, Rechazar y Gestionar preferencias (RN-06).

---

### BUG-05: Distribución incorrecta y apilamiento del Header

* **ID:** BUG-05  
* **Severidad:** Media  
* **Prioridad:** Media  
* **Estado:** Pendiente  
* **Componentes Afectados:** Encabezado global (`header.html`), Hoja de estilos (`css/style.css`), Script de layout (`js/layout.js`).  
* **Dispositivos Afectados:** Teléfonos móviles y computadores de escritorio.

#### Descripción del Problema
En la página principal (`index.html`), el título "EcoRuta Araucanía" y el botón "Accesibilidad" se muestran apilados verticalmente en el centro del encabezado, en lugar de estar distribuidos en los extremos opuestos de la cabecera.

#### Diagnóstico y Causa Raíz Técnica
- Al eliminarse el elemento `<nav>` en la portada mediante `layout.js`, se asigna la clase `header.sin-navegacion`.
- En `css/style.css`:
  ```css
  header.sin-navegacion {
      justify-content: center;
      flex-direction: column;
      gap: 0.6rem;
  }
  ```
- En la consulta de medios móvil (`@media (max-width: 768px)`), `header.sin-navegacion` utiliza `grid-template-columns: 1fr;` con `h1 { text-align: center; }`, forzando a que ambos elementos queden apilados y centrados.

#### Pasos para Reproducir
1. Abrir la página de inicio (`index.html`) en resolución de escritorio.
2. Observar la alineación del título y del botón de accesibilidad.
3. Cambiar a la vista de dispositivo móvil (pantalla de 375px o 414px) y verificar la distribución.

#### Comportamiento Actual
El título queda centrado y el botón de accesibilidad se ubica inmediatamente debajo de él, también centrado, perdiendo la estructura de barra de navegación estándar.

#### Comportamiento Esperado
El título "EcoRuta Araucanía" debe alinearse al extremo izquierdo y el botón de accesibilidad al extremo derecho, manteniendo una sola fila horizontal tanto en computadores como en dispositivos móviles.

#### Criterios de Aceptación
- [ ] El título de la marca se alinea a la izquierda en todas las vistas.
- [ ] El botón de accesibilidad se alinea al extremo derecho en todas las vistas.
- [ ] La distribución se mantiene en una sola fila sin saltos de línea indeseados en anchos móviles estándar (desde 360px).

---

### BUG-06: Expansión indebida del Header por Menú de Accesibilidad en móviles

* **ID:** BUG-06  
* **Severidad:** Alta  
* **Prioridad:** Alta  
* **Estado:** Pendiente  
* **Componentes Afectados:** Menú de accesibilidad (`#menu-accesibilidad`), Contenedor de acciones (`.acciones-header`), Encabezado flotante (`header`).  
* **Dispositivos Afectados:** Teléfonos móviles y tablets.

#### Descripción del Problema
Al abrir el menú de accesibilidad en pantallas móviles, el encabezado se estira hacia abajo de forma desproporcionada, duplicando o triplicando su tamaño original. Como el encabezado posee posicionamiento fijo/pegajoso (`position: sticky; top: 0;`), el bloque expandido permanece fijo tapando más del 40% de la pantalla del usuario. Además, el diseño del menú es plano, básico y carece de cierre al hacer clic afuera.

#### Diagnóstico y Causa Raíz Técnica
- `#menu-accesibilidad` forma parte del flujo normal del documento (`position: static;` dentro de `.acciones-header`).
- Al removerse el atributo `hidden`, el contenedor suma su altura al total del `<header>`.
- No existe un mecanismo de escucha para eventos fuera del menú (*click outside*) ni tecla de escape (`Esc`).
- El contenedor carece de estilo visual de ventana flotante (sin `box-shadow`, sin elevación de capa `z-index`, bordes planos de 1px).

#### Pasos para Reproducir
1. Abrir cualquier página en un smartphone o emulador móvil.
2. Hacer clic en el botón **"Accesibilidad"**.
3. Intentar desplazarse (scroll) hacia abajo en la página con el menú abierto.
4. Intentar cerrar el menú haciendo clic en cualquier parte fuera de él.

#### Comportamiento Actual
El menú desplaza todo el contenido de la página hacia abajo al expandir el header. El header cubre casi la mitad de la pantalla al hacer scroll. Hacer clic fuera del menú no lo cierra.

#### Comportamiento Esperado
El menú debe desplegarse como una ventana flotante superpuesta (Dropdown / Popover o Bottom Sheet) mediante posicionamiento absoluto (`position: absolute; right: 0; top: 100%; z-index: 100;`). No debe modificar la altura del header. Debe contar con sombra de elevación (`box-shadow`), bordes pulidos y cerrarse automáticamente si el usuario hace clic fuera o presiona `Esc`.

#### Criterios de Aceptación
- [ ] La apertura del menú no incrementa la altura del `<header>`.
- [ ] El menú flota sobre el contenido de la página con elevación y sombra definida.
- [ ] El menú se cierra al hacer clic/toque fuera de sus límites o al pulsar `Esc`.
- [ ] La interfaz visual interna (etiquetas, selectores y casillas) presenta márgenes armónicos y tipografía pulida.

---

### BUG-07: Lectura corrida de opciones de tamaño de texto en lectores de pantalla

* **ID:** BUG-07  
* **Severidad:** Alta (Accesibilidad Crítica)  
* **Prioridad:** Alta  
* **Estado:** Pendiente  
* **Componentes Afectados:** Selector de tamaño de texto (`#tamano-texto`), Compatibilidad de accesibilidad A11y.  
* **Herramientas de Verificación:** TalkBack (Android), VoiceOver (iOS), NVDA (Windows).

#### Descripción del Problema
Al recorrer el menú de accesibilidad utilizando un lector de pantalla en modo de lectura continua o exploración por toques, las opciones del selector de tamaño de texto son verbalizadas todas juntas de corrido: *"Tamaño del texto Pequeño Normal Grande Muy grande..."*, provocando confusión en usuarios con discapacidad visual total o parcial. Asimismo, al cambiar la opción no se emite ninguna confirmación sonora/hablada de la modificación.

#### Diagnóstico y Causa Raíz Técnica
- El control `<select id="tamano-texto">` no expone estados individuales de selección accesibles en navegación lineal sin desplegar previamente el menú nativo del sistema operativo.
- No existe una región en vivo (`aria-live="polite"`) que notifique al lector de pantalla el cambio de tamaño ejecutado.
- Incumplimiento directo de la Regla de Negocio **RN-04 (Estándar WAI-AA)**.

#### Pasos para Reproducir
1. Activar TalkBack en Android o VoiceOver en iOS.
2. Ingresar al sitio y abrir el botón "Accesibilidad".
3. Deslizar el dedo o realizar gesto de avance (swipe) hacia el control de "Tamaño del texto".
4. Escuchar la verbalización del sintetizador de voz.

#### Comportamiento Actual
El lector lee todas las alternativas unidas en una sola frase continua sin indicar pausas, estados individuales de marcado ni cantidad total de opciones. No hay anuncio auditivo al cambiar el tamaño.

#### Comportamiento Esperado
Las opciones deben presentarse de manera que el lector anuncie cada alternativa de forma individual e interactiva (ej. grupo de botones discretos con `aria-pressed` o grupo radial con `<fieldset>`, `<legend>` y botones de radio). Al seleccionar una opción, una zona accesible debe comunicar inmediatamente: *"Tamaño de texto ajustado a [nivel]"*.

#### Criterios de Aceptación
- [ ] Cada tamaño de texto se anuncia de forma independiente con su estado actual (seleccionado / no seleccionado).
- [ ] Existe un área accesible con `aria-live="polite"` que confirma la acción realizada al cambiar la configuración.
- [ ] El componente es 100% operable mediante teclado (`Flechas`, `Tab`, `Espacio`).

---

### BUG-08 (Deuda Técnica): Conflicto de especificidad en reglas CSS de tamaño de fuente

* **ID:** BUG-08  
* **Severidad:** Baja  
* **Prioridad:** Media  
* **Estado:** Pendiente  
* **Componentes Afectados:** Hoja de estilos (`css/style.css`).

#### Descripción del Problema
Existen dos declaraciones simultáneas y contradictorias para la clase `body.texto-grande` dentro de la hoja de estilos:
- Línea 560: `body.texto-grande { font-size: 1.15rem; }`
- Línea 960: `body.texto-grande { --tamano-fuente: 19px; }`

#### Impacto
Genera inconsistencias de renderizado según la regla de cascada y especificidad, haciendo que el escalado de fuentes no funcione de manera uniforme con el sistema de variables CSS (`--tamano-fuente`) implementado para el resto de tamaños.

#### Criterios de Aceptación
- [ ] Se unifica el control de tamaño de fuentes exclusivamente bajo variables CSS (`--tamano-fuente`).
- [ ] Se elimina la regla redundante de la línea 560.

---

## 3. Matriz de Cumplimiento de Reglas de Negocio

| Regla de Negocio / Criterio | Estado Post-Auditoría | Incidencia Asociada |
| :--- | :--- | :--- |
| **RN-03: Directorio de Emergencias** | Comprometida por solapamiento | BUG-04 |
| **RN-04: Estándar WAI-AA** | No cumple en lector de pantalla y foco modal | BUG-04, BUG-06, BUG-07 |
| **RN-06: Privacidad y Memoria** | Dificultad de acceso al panel de cookies | BUG-04 |
| **HU-11: Menú Avanzado de Accesibilidad** | Afecta usabilidad móvil por estiramiento | BUG-06, BUG-07 |

---

## 4. Plan de Remediación Sugerido para Desarrollo

1. **Sprint Backlog Item 1 (Alta Prioridad):**
   - Elevar `z-index` de `#aviso-cookies` a `10000+` y añadir capa modal con `backdrop-filter: blur(4px)`.
   - Modificar `#menu-accesibilidad` a `position: absolute;` flotante con sombra (`box-shadow`) y listener para cierre al pulsar fuera o `Esc`.
2. **Sprint Backlog Item 2 (Accesibilidad Crítica):**
   - Reemplazar o enriquecer semánticamente el selector de tamaño de texto con estructura accesible e inyección de anuncios dinámicos vía `aria-live`.
3. **Sprint Backlog Item 3 (UI / Maquetación):**
   - Ajustar el flexbox de `header.sin-navegacion` a `justify-content: space-between; flex-direction: row;` para mantener el título a la izquierda y el botón a la derecha.
   - Limpiar el conflicto de CSS en `body.texto-grande`.

