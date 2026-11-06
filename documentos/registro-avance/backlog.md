# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio Web Accesible e Interactivo EcoRuta-Temuco

**Organización:** The Frontend Dropout
---
- **Product Owner:** Beatriz Martin
- **QA / Tester:** Ariel Covarrubia
- **Developers:** Lissete Delgado & Carlos Meléndez
- **Scrum Master:** Patricio Salazar
- **Fecha de Última Actualización:** 05/11/2026
---

## Resumen de Estado del Proyecto

- **Estado General:** Cierre del Sprint 2 (Semana 5). La revisión QA del 03/11/2026 calificó el incremento como *Aceptado*. Tras la clase del 05/11/2026 cambia la prioridad: **la migración a React con TypeScript (HU-25) pasa a ser la primera prioridad**, y todo cambio nuevo de esta semana se construye directamente en React.
- **Cambios pedidos:**
  - El detalle de una ruta ya no abre páginas nuevas: al presionar la tarjeta se abre una ventana más grande con toda la información (HU-09).
  - Las rutas deben indicar distancia en kilómetros, duración, punto de partida y punto de destino (HU-23).
  - Inscripción a una ruta, donde el usuario elige cuál quiere explorar (HU-27).
  - El clima se muestra al presionar un botón, no de forma fija junto a la tarjeta (HU-04).
  - El botón "Accesibilidad" se reemplaza por un menú de tres líneas que abre una barra lateral con Accesibilidad y Contacto (HU-26).
- **Validación de Cliente (Entrevista 2):** Se aprobó la línea gráfica, la paleta de colores y la disposición en cuadrícula. Las redes sociales fueron autorizadas como canales de contacto oficiales adicionales. Se aprueba la pertinencia del buscador general y herramientas de clima para turistas en terreno.
- **Entregable de la semana:** todo el código en TypeScript (HU-16) y rutas obtenidas desde una API (HU-23), funcionando en GitHub Pages
- **Refinamiento de Alcance:** Se estableció un sistema de puntaje estricto de 12 puntos para evaluar la sustentabilidad antes de su publicación (RN-02). El mismo criterio de pertinencia territorial se aplica también a las **rutas**.
- **Hitos Logrados Recientemente:** Buscador dinámico de rutas (HU-22), ruta recomendada del día (HU-10), API de clima con Open-Meteo (HU-04), suite de 26 pruebas unitarias en TypeScript y cierre de BUG-04, BUG-05, BUG-06, BUG-08, BUG-09, BUG-10, BUG-11 e ISSUE-03.
---

## Validación Técnica y Estándares de Calidad
Todas las implementaciones desarrolladas a partir del Sprint 2 deben cumplir obligatoriamente con los siguientes estándares antes de pasar a la revisión de QA o del Product Owner:
* **React + TypeScript:** Todo componente nuevo se escribe como `.tsx` dentro de `src/components`, los servicios de datos en `src/services` y los tipos compartidos en `src/types`. No se manipula el DOM con `document.querySelector` dentro de componentes; se usa el estado de React. Se mantiene la prohibición de eventos en línea en HTML.
* **Consumo de APIs:** Toda llamada (Emprendedores, Rutas y Clima) usa `async/await` con `try/catch`, muestra "Cargando…" mientras espera y un mensaje amigable si falla. Los datos que llegan se validan antes de usarse con su interface.
* **Accesibilidad Continua (WAI-AA):** Todo componente dinámico (barra lateral, ventanas emergentes, alertas, buscadores, formularios) mantiene la navegabilidad por teclado (`Tab`, `Enter`, `Esc`) y actualiza sus estados con atributos ARIA (`aria-expanded`, `aria-pressed`, `aria-live`, `aria-modal`).
* **Calidad de Código y Estructura:** El HTML generado debe mantener su validación W3C (0 errores). La compilación debe funcionar en GitHub Pages, no solo en local.
* **Rendimiento:** Imágenes en WebP y `loading="lazy"` en elementos no prioritarios. Las APIs secundarias (clima) se consultan solo cuando el usuario las pide.
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
* **RN-07 (Clasificación de Rutas):** Cada ruta debe tener una dificultad (`Fácil`, `Media`, `Difícil`) y un tipo de actividad de una lista cerrada (`Senderismo`, `Trekking`, `Cultura y Patrimonio`, `Termas`, `Deportes acuáticos`). Los filtros del buscador (HU-22) dependen de estos valores.
* **RN-08 (Datos de Inscripción):** Mientras el proyecto use MockAPI, los datos personales de una inscripción (nombre, correo, teléfono) **no se envían ni se guardan**, porque cualquier persona con la URL de MockAPI puede leer todos sus registros. Se validan, y se muestra una confirmación en pantalla. El envío a `/inscripciones` se habilita cuando exista un backend con control de acceso (Sprint 3).
---

## Priorización de Tareas (Prueba QA / GitHub Issues)
*El uso de **GitHub Issues** gestionado por QA se mantiene como canal oficial de comunicación técnica.*
 
| Orden | Tarea | Responsable | Historia | Depende de |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Crear la base del proyecto en React con TypeScript (**bloqueante**) | Developer 1 | HU-25 | — |
| 2 | Definir el contrato de datos `src/types/ruta.ts` y JSON de ejemplo con 3 rutas | QA | HU-23 | — |
| 3 | Definir los campos de la inscripción y los textos de las rutas | PO | HU-27 / HU-23 | — |
| 4 | Publicar `/rutas` en MockAPI y crear `src/services/rutasApi.ts` | QA | HU-23 | 2, 3 |
| 5 | Menú de tres líneas con barra lateral (Accesibilidad y Contacto) | Developer 1 | HU-26 | 1 |
| 6 | Ventana emergente con el detalle completo de la ruta y clima al presionar | Developer 2 | HU-09 / HU-04 | 1, 2 |
| 7 | Formulario de inscripción a la ruta | Developer 2 | HU-27 | 3, 6 |
| 8 | Lista de APIs y parámetros de backend para la presentación; reparto de roles | Scrum Master / PO | — | 4 |
| 9 | Resolver BUG-14 (contraste) | Scrum Master | — | — |
---

## Validación del Catálogo de Rutas
Revisión de la comuna, dificultad y tipo de actividad de las 15 rutas de `js/rutas.ts`, ya que los filtros dependen de estos campos.
 
| ID | Ruta | Comuna actual | Dificultad | Actividad actual | Resultado | Acción |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| 1 | Cerro Ñielol | Temuco | Fácil | Senderismo | Válida | — |
| 2 | Parque Nacional Huerquehue | Temuco | Media | Trekking | **Corregir** | El parque está en las comunas de Pucón y Cunco, con acceso desde Caburgua. Cambiar comuna a `Pucón`. |
| 3 | Reserva Nacional Malalcahuello | Temuco | Media | Senderismo | **Corregir** | Está en Curacautín/Lonquimay, no en Temuco. Reemplazar por una ruta de la comuna de Temuco. |
| 4 | Isla Cautín | Temuco | Fácil | Senderismo | Válida | — |
| 5 | Monumento Cerro Ñielol | Temuco | Fácil | Cultura y Naturaleza | **Corregir** | Es el mismo lugar que la ruta 1 (Monumento Natural Cerro Ñielol). Fusionar o reemplazar (ej. Museo Regional de La Araucanía, Feria Pinto). |
| 6 | Salto La China | Pucón | Fácil | Senderismo | Válida | — |
| 7 | Termas de Huife | Pucón | Fácil | Cultura y Naturaleza | **Ajustar** | Cambiar actividad a `Termas`. |
| 8 | Ojos del Caburgua | Pucón | Fácil | Senderismo | Válida | — |
| 9 | Reserva Nacional Cañi | Pucón | Difícil | Trekking | **Ajustar** | Su nombre oficial es Santuario El Cañi (área privada, no reserva nacional). Corregir nombre. |
| 10 | Cañón del Río Trancura | Pucón | Media | Trekking | **Ajustar** | La descripción habla de rafting. Cambiar actividad a `Deportes acuáticos`. |
| 11 | Costanera de Villarrica | Villarrica | Fácil | Senderismo | Válida | — |
| 12 | Museo Histórico y Arqueológico | Villarrica | Fácil | Cultura y Naturaleza | **Ajustar** | Cambiar actividad a `Cultura y Patrimonio`. |
| 13 | Feria Costumbrista Mapuche | Villarrica | Fácil | Cultura y Naturaleza | **Ajustar** | Cambiar actividad a `Cultura y Patrimonio`. |
| 14 | Termas Geométricas | Villarrica | Media | Senderismo | **Corregir** | Está en Coñaripe, comuna de Panguipulli, **Región de Los Ríos**. No cumple la pertinencia territorial de RN-02 (mismo motivo por el que se descartó HU-08). Reemplazar por una ruta de Villarrica. |
| 15 | Mirador Bellavista | Villarrica | Media | Senderismo | Por confirmar | Confirmar nombre y ubicación exacta antes de cargarla en la API. |
 
* **Consecuencia para el buscador:** al mover Huerquehue a Pucón y retirar Malalcahuello y el duplicado del Ñielol, Temuco queda con 2 rutas válidas. Se deben agregar al menos 2 rutas nuevas de Temuco para que el filtro y la ruta del día tengan variedad.
* **Detalle menor:** la imagen de la ruta 2 se llama `paque-huerquehue.webp` (falta la "r").

### Textos de las rutas para cargar en la API (PO)
Descripción breve (para la tarjeta, máximo ~120 caracteres), descripción completa (para la ventana de detalle) y atractivos. Las rutas marcadas para reemplazo quedan fuera hasta que se definan sus reemplazos.
 
| Ruta | Comuna | Descripción breve | Descripción completa | Atractivos |
| :--- | :---: | :--- | :--- | :--- |
| Cerro Ñielol | Temuco | Bosque nativo y miradores sobre Temuco, a minutos del centro. | Monumento Natural administrado por CONAF dentro de la ciudad. Sus senderos recorren bosque nativo hasta miradores con vista a todo Temuco. Es también un sitio histórico ligado a la fundación de la ciudad. | Miradores de la ciudad · Bosque nativo · Zona de copihues · La Patagua (sitio histórico) |
| Isla Cautín | Temuco | Parque urbano a orillas del río Cautín para caminar en familia. | Espacio verde junto al río Cautín con senderos planos, ideal para caminatas cortas, picnic y actividades al aire libre sin salir de la ciudad. | Ribera del río Cautín · Senderos planos · Áreas de picnic |
| Parque Nacional Huerquehue | Pucón | Lagos de altura y araucarias milenarias en un sendero de día completo. | Área protegida de CONAF a unos 35 km de Pucón, por el camino a Caburgua. El sendero Los Lagos sube desde el lago Tinquilco entre bosque de coigües y araucarias hasta una serie de lagos de altura. | Lago Tinquilco · Sendero Los Lagos · Saltos de agua · Araucarias · Vista al volcán Villarrica |
| Salto La China | Pucón | Caminata corta entre bosque nativo hasta una cascada escondida. | Sendero breve y de baja exigencia que atraviesa bosque nativo hasta una caída de agua. Recomendado para familias y para quienes buscan un primer acercamiento al senderismo. | Cascada · Bosque nativo |
| Termas de Huife | Pucón | Piscinas termales naturales rodeadas de bosque junto al río. | Centro termal en el valle del río Liucura, con piscinas de agua termal al aire libre rodeadas de bosque nativo. Ideal para descansar después de una jornada de caminata. | Piscinas termales al aire libre · Río Liucura · Bosque nativo |
| Ojos del Caburgua | Pucón | Pozas turquesas y cascadas entre roca volcánica. | Conjunto de cascadas que caen sobre pozas de agua turquesa, rodeadas de bosque y roca volcánica. Se recorre por senderos cortos con miradores. | Cascadas · Pozas de agua turquesa · Miradores |
| Santuario El Cañi | Pucón | Trekking exigente entre araucarias milenarias con vista a los volcanes. | Área protegida privada con uno de los bosques de araucarias mejor conservados de la zona. El sendero sube con fuerte pendiente hasta lagunas de altura y miradores con vista a varios volcanes. Se recomienda buena condición física. | Araucarias milenarias · Lagunas de altura · Mirador a los volcanes |
| Cañón del Río Trancura | Pucón | Rafting en aguas turquesas con guías certificados. | Descenso en balsa por el río Trancura, rodeado de bosque y paredes de roca. Se realiza con operadores locales y equipo de seguridad incluido. | Rafting · Río Trancura · Paisaje de cañón |
| Costanera de Villarrica | Villarrica | Paseo junto al lago con vista directa al volcán. | Recorrido plano por el borde del lago Villarrica, con vista al volcán y a los cerros cercanos. Apto para todas las edades y accesible desde el centro de la ciudad. | Lago Villarrica · Vista al volcán · Playa |
| Museo Histórico y Arqueológico | Villarrica | Cultura mapuche e historia de la fundación de Villarrica. | Museo con piezas de la cultura mapuche y de la historia de la ciudad. Una visita cultural ideal para días de lluvia. | Colección mapuche · Historia local |
| Feria Costumbrista Mapuche | Villarrica | Artesanía, gastronomía y tradiciones del pueblo mapuche. | Espacio donde artesanos y cocineros locales muestran productos y preparaciones tradicionales. Aporta directamente a la economía de las comunidades de la zona. | Artesanía · Gastronomía mapuche · Tradiciones |
 
* **Pendiente de medir por el equipo:** distancia (km), horas de senderismo, fecha y hora de inicio de la salida, y coordenadas de inicio y fin de cada ruta. No se cargan en la API valores inventados.
---

## Historias de Usuarios Reenfocadas o/y Criterios de Aceptación (Sprint 2 - React,  TypeScript y Accesibilidad)

### [HU-25] Migración a React con TypeScript *(Nueva - Primera prioridad)*
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como equipo de desarrollo, queremos reestructurar el sitio en React con TypeScript, para construir componentes reutilizables y facilitar los cambios pedidos esta semana.
* **Criterios de Aceptación:**
  - [ ] Proyecto React + TypeScript (Vite) dentro del repositorio, con las carpetas `src/components`, `src/services` y `src/types`.
  - [ ] Reutilizar `style.css` para mantener la línea gráfica aprobada por el cliente.
  - [ ] `App.tsx` carga la lista de rutas y deja la página funcionando.
  - [ ] Vistas de Temuco, Pucón y Villarrica como componentes, no como páginas HTML separadas.
  - [ ] Trasladar las funciones ya aceptadas (cookies, idioma, emergencias, emprendedores, mapa) sin perder su accesibilidad.
  - [ ] Configurar `base` en Vite y el despliegue a GitHub Pages; verificar que el sitio publicado funcione.
  - [ ] Documentar en el README cómo ejecutar y compilar el proyecto.

### [HU-04] Consumo de API Externa (Clima) - Reenfocada
* **Prioridad (MoSCoW):** Must have | **Estado:** En progreso
* **Historia:** Como estudiante de meteorología, quiero ver info climática, para planificar mis salidas a terreno.
* **Criterios de Aceptación:**
  - [x] Integrar consumo asíncrono de una API pública de meteorología (Open-Meteo).
  - [x] Presentar estado del tiempo y temperatura (temperatura, sensación térmica, viento y condición).
  - [x] Implementar bloque `try/catch` con mensaje visual "Clima temporalmente no disponible" en caso de fallo.
  - [ ] **Interactivo:** el clima no se muestra fijo; aparece al presionar "Ver clima" dentro del detalle de la ruta, y solo entonces se consulta la API.
  - [ ] Usar las coordenadas del punto de partida de la ruta (`ubicacionInicio`), no las de la ciudad.
  - [ ] Mostrar "Cargando…" mientras responde la API.
  - [ ] Corregir el contraste del widget de clima (BUG-14).
  - [ ] *(Sprint 3)* Pronóstico de los días siguientes (propuesta del PO, Acta 9).

### [HU-09] Detalle de la ruta en ventana emergente - Reenfocada
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como turista, quiero presionar una tarjeta de ruta y ver todo su detalle en una ventana más grande dentro de la misma página, para informarme sin cambiar de página.

* **Criterios de Aceptación:**
  - [ ] Componente `DetalleRutaModal` con nombre, descripción completa, distancia, horas de senderismo, fecha y hora de inicio, punto de partida, punto de destino y atractivos.
  - [ ] Botones "Ver clima" (HU-04) e "Inscribirme" (HU-27) dentro de la ventana.
  - [ ] Cierre al hacer clic fuera, con `Esc` y con un botón de cerrar.
  - [ ] `role="dialog"`, `aria-modal="true"`, foco dentro de la ventana mientras está abierta y devolución del foco a la tarjeta al cerrar.
  - [ ] Bloquear el scroll de la página de fondo mientras la ventana está abierta.
  - [ ] Se eliminan las páginas `ruta-temuco.html`, `ruta-pucon.html` y `ruta-villarrica.html`, y el campo `urlDetalle`.


### [HU-11] Menú Avanzado de Accesibilidad
* **Prioridad (MoSCoW):** Must have | **Estado:** En Progreso
* **Historia:** Como persona con baja visión, quiero un menú de accesibilidad (contraste/zoom), para leer sin dificultad.
* **Criterios de Aceptación:**
  - [x] Crear un menú desplegable con opciones de tamaño de texto y alto contraste/modo oscuro.
  - [x] Evitar que el zoom desborde las tarjetas en dispositivos móviles.
  - [x] Las funciones del menú despegable deben dar una buena experiencia de usuario y legelibildad.

### [HU-12] Mapas Interactivos (OpenStreetMap)
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho
* **Historia:** Como excursionista, quiero ver mapas interactivos, para ubicarme fácilmente en el territorio.
* **Criterios de Aceptación:**
  - [x] Implementar mapa mediante la API de OpenStreetMap (Leaflet).
  - [x] Añadir marcadores básicos para la distribución de Pucón, Temuco y Villarrica.
  - [x] Afinación del funcionamiento dentro de las páginas (scroll trap resuelto en BUG-10).
  - [ ] *(Sprint 3)* Marcadores de partida y destino por ruta usando las coordenadas de la API.

### [HU-13] Implementación y validación dinámica de Formulario
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho
* **Historia:** Como usuario interesado, quiero poder enviar un formulario que valide mis datos dinámicamente, para no enviar información errónea.
* **Criterios de Aceptación:**
  - [x] Agregación del apartado de formulario en las rutas.
  - [x] Validar campos de texto vacíos (marcando en rojo si hay error).
  - [x] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.
  - [x] Afinación de funcionamiento dentro de EcoRuta (validación de nombre, correo y longitud de mensaje).
  - *Nota:* la lógica de validación se reutiliza en el formulario de inscripción (HU-27).

### [HU-14] Enlaces Oficiales de Redes Sociales
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho (se traslada a la barra lateral en HU-26)
* **Historia:** Como visitante, quiero acceder a las redes oficiales, para usarlas como canal de contacto complementario.
* **Criterios de Aceptación:**
  - [x] Habilitar iconos en el *footer* hacia Facebook, Instagram y X.
  - [x] Cumplir con la salida segura (RN-01).

### [HU-15] Cookies de preferencias y [HU-21] Idioma
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho
* **Historia:** Como visitante, quiero decidir si permito cookies de preferencias, para conservar mi modo oscuro y tamaño de texto sin entregar datos.
* **Criterios de Aceptación:**
  - [x] Crear un banner informativo indicando el uso de cookies para preferencias de accesibilidad (capa modal, BUG-04 cerrado).
  - [x] Añadir un selector rápido de idioma (ES/EN) con traducciones desde `data/idiomas.json`.
  - [x] Aplicar automáticamente la configuración guardada al cambiar de página (RN-06).

### [HU-16] Migración completa a TypeScript (Entregable)
* **Prioridad (MoSCoW):** Must have | **Estado:** En progreso (se cumple dentro de HU-25)
* **Historia:** Como desarrollador, quiero migrar la lógica JS a TypeScript, para reducir errores y mejorar la mantenibilidad.
* **Criterios de Aceptación:**
  - [x] Crear `tsconfig.json` con configuración compatible con el navegador.
  - [x] Migrar `rutas.ts` con interfaces `Ruta` y `FiltrosRuta` y tipo `Dificultad`.
  - [x] Suite de pruebas unitarias en `tests/pruebas.ts` (26 pruebas aprobadas).
  - [ ] Toda la lógica restante (`layout`, `buscador`, `clima`, `retorno`, `script`) queda escrita en TypeScript como parte de los componentes y servicios de React.
  - [ ] Compilar y verificar en GitHub Pages que la accesibilidad, el buscador y el clima sigan funcionando sin errores de consola.

### [HU-17] Catálogo Dinámico de Emprendimientos (Consumo API)
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho (por trasladar a React)
* **Historia:** Como turista, quiero que las fichas se carguen desde una base de datos validada, para ver info actualizada.
* **Criterios de Aceptación:**
  - [x] Implementar asincronía (`fetch`) para consumir JSON (MockAPI `/emprendedores`).
  - [x] Renderizar en el DOM únicamente emprendimientos con el estado "Publicado".
  - [x] Incluir manejo de errores visual si la API no responde.
  - [x] Afinación de funcionamiento dentro de las páginas (discriminación territorial y cálculo de 12 puntos).
  - [ ] Crear `src/services/emprendedoresApi.ts` y el tipo `Emprendedor` en `src/types`.

### [HU-22] Buscador y Generador Dinámico de Rutas
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como turista, quiero filtrar las rutas en tiempo real y recibir recomendaciones, para planificar mi viaje según mi tiempo y perfil.
* **Criterios de Aceptación:**
  - [ ] Implementar filtrado multicriterio en tiempo real (Comuna, Dificultad, Actividad).
  - [ ] Manipular el DOM sin recargar la página usando `.filter()` y `event.preventDefault()`.
  - [ ] Añadir sugerencias dinámicas según disponibilidad del usuario.

### [HU-10] Ruta Recomendada del Día *(Nueva)*
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho (por trasladar a React)
* **Historia:** Como turista, quiero ver una ruta destacada distinta cada día en la comuna que estoy visitando, para descubrir panoramas que no conocía.
* **Criterios de Aceptación:**
  - [x] Seleccionar la ruta del día de forma determinista según el día del año (`obtenerRutaDelDia`), para que todos los visitantes vean la misma ruta ese día.
  - [x] Mostrar solo rutas de la comuna de la vista actual (Temuco, Pucón o Villarrica).
  - [x] Comparar comunas sin distinguir tildes ni mayúsculas (corrección de BUG-12).
  - [x] Mostrar el nombre y la descripción traducidos según el idioma activo (HU-21).
  - [ ] Al presionar la ruta del día, abrir la misma ventana de detalle (HU-09).
  - [ ] Si la API de rutas falla, el bloque destacado no debe quedar vacío (RN-05).

### [HU-23] API Propia de Rutas *(Nueva - Entregable)*
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como turista, quiero que las rutas se carguen desde una base de datos centralizada, para ver información actualizada sin que el equipo tenga que modificar el código.
* **Criterios de Aceptación:**
  - [ ] Publicar el contrato `src/types/ruta.ts` con la interface `Ruta` (ver Feedback PO) antes de que la API esté lista.
  - [ ] JSON de ejemplo con 3 rutas reales (una por comuna) para que los developers trabajen mientras la API no esté publicada.
  - [ ] Endpoint `/rutas` en el mismo MockAPI de `/emprendedores`, con todas las rutas y los campos del contrato.
  - [ ] `src/services/rutasApi.ts` con una función `async/await` + `fetch` tipada con `Ruta`.
  - [ ] Validar cada objeto recibido y mostrar solo rutas con `estado: "Publicado"` (RN-02).
  - [ ] `try/catch` que devuelva un error controlado para mostrar "Cargando…" y un mensaje amigable si la API falla (RN-05).
  - [ ] Generar las tarjetas desde los datos (resuelve BUG-13).

### [HU-26] Menú de tres líneas con barra lateral *(Nueva)*
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como visitante, quiero un único menú en el encabezado que reúna las opciones de accesibilidad y los datos de contacto, para encontrarlos rápido sin que ocupen espacio en la página.
* **Criterios de Aceptación:**
  - [ ] Componente `MenuLateral` con un botón de tres líneas (sin el texto "Accesibilidad"), con `aria-expanded` y `aria-label`.
  - [ ] Panel lateral con dos secciones: Contactos y Accesibilidad.
  - [ ] Contactos: correo, teléfono y redes sociales, con `target="_blank"` y `rel="noopener noreferrer"` (RN-01).
  - [ ] Accesibilidad: tamaño de texto, alto contraste, modo oscuro e idioma, trasladados desde los controles actuales.
  - [ ] Cierre al hacer clic fuera de la barra y con `Esc`, y navegación completa por teclado.

### [HU-27] Inscripción a una ruta *(Nueva)*
* **Prioridad (MoSCoW):** Must have | **Estado:** Por hacer
* **Historia:** Como turista, quiero inscribirme en la ruta que elijo explorar, para asegurar mi participación en la salida.
* **Criterios de Aceptación:**
  - [ ] Componente `FormularioInscripcion` accesible desde el botón "Inscribirme" de la ventana de detalle, con la ruta ya seleccionada.
  - [ ] Permitir cambiar la ruta mediante una lista con las rutas publicadas.
  - [ ] Campos y validaciones definidos por el PO (ver Feedback PO), con errores en rojo y mensaje asociado al campo (`aria-describedby`).
  - [ ] Al enviar, mostrar una confirmación con el resumen de la inscripción (`aria-live="polite"`), sin guardar datos personales (RN-08).
  - [ ] Navegación completa por teclado.

## Historias de Usuario Base y Reenfocadas

### [HU-01] Emprendimiento de Manualidades en Pucón
* **Prioridad:** Must have | **Estado:** En Progreso
  - [x] Visibilizar información de emprendimientos. (Nombre, Ubicación, Descripción, Puntaje)
  - [x] Redirección hacia canales de contacto. (WhatsApp)
  - [] Apartado de los emprendimientos

### [HU-02] Parque Nacional Villarrica
* **Prioridad:** Must have | **Estado:** Hecho
  - [x] Presentar rutas e información dedicada al cuidado del entorno.
  - [x] **[QA Resuelto]:** Declaración de atributos `id="rutas"` y corrección de anclas.

### [HU-03] Recomendaciones de Rutas (Grupos)
* **Prioridad:** Should have | **Estado:** En Proceso
  - [ ] Enfoque hacia rutas sustentables grupales, descartando eventos no alineados.
  - [ ] Permitir indicar la cantidad de personas en la inscripción (HU-27).

### [HU-05] Contactos médicos de emergencia
* **Prioridad:** Should have | **Estado:** Hecho
  - [x] Sección visible con números directos de emergencia.
  - [x] Aviso claro de que es un directorio y no garantía médica.
  - [x] Optimización de experiencia (clic para llamar en móviles y copiar en PC)
  - [x] Botón flotante con nombre accesible (BUG-11 cerrado).
---

## Historias de Mejoras Futuras (Could Have)

* **[HU-06] Almacenamiento de Contactos de Asilos:** Catalogada como mejora futura, ya que requerirá evaluación e implementación de almacenamiento local (`localStorage`) para guardar información personalizada del usuario sin comprometer bases de datos.
* **[HU-18] Favoritos:** Permitir a usuarios registrados guardar rutas.
* **[HU-19] Itinerarios:** Creación de planes de viaje por día para usuarios registrados.
* **[HU-20] Newsletter:** Suscripción voluntaria a boletines.
* **[HU-24] Publicación de rutas por usuarios registrados:** Idea propuesta por el profesor (Acta 9). Requiere que la API de rutas (HU-23) acepte `POST` y que cada ruta enviada quede con estado "Pendiente" hasta que el PO la evalúe con RN-02.

---

## Historias Desestimadas / Fuera de Alcance (Won't Have)

* **[HU-07] Horarios de Buses Interurbanos (Lican Ray - Villarrica):** Marcada como *Won't have* por no alinearse con el objetivo central de visibilizar rutas sustentables y turísticas.
* **[HU-08] Publicidad de Sucursales Comerciales Fuera de Zona (Valdivia):** Desestimada por falta de pertinencia territorial (fuera de La Araucanía) y ausencia de los criterios de Sustentabilidad establecidos en la RN-02.
---

## Control de Bugs e Incidencias (Actualizado al 03/11/2026)

| ID | Incidencia / Hallazgo | Prioridad | Asignado | Estado | Observación |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **ISSUE-02** | Falta de etiqueta `<meta name="description">` | **Media** | Developer 2 | **Resuelto / Cerrado** | PR #54 cerrado. Etiquetas añadidas en el `<head>`. |
| **ISSUE-03** | Bloqueos de rendimiento y carga (peso imágenes) | **Media** | Developer 1 | **Resuelto / Cerrado** | 100% de las imágenes migradas a `.webp` con `loading="lazy"` en elementos secundarios. |
| **BUG-04** | Aviso de cookies detrás del apartado de emergencias | **Alta** | Developers | **Resuelto / Cerrado** | `#aviso-cookies` como capa modal fija con `z-index: 10001`. |
| **BUG-05** | Distribución incorrecta y centrado en el Header | **Media** | Developers | **Resuelto / Cerrado** | Botonera del header con posicionamiento absoluto a la derecha. |
| **BUG-06** | Expansión indebida del Header por Menú de Accesibilidad en móviles | **Alta** | Developers | **Resuelto / Cerrado** | `#menu-accesibilidad` flotante. Con la barra lateral (HU-26) este menú se reemplaza. |
| **BUG-07** | Lectura corrida de tamaños de texto en lectores de pantalla (A11y) | **Alta** | Developers | **Resuelto / Cerrado** | PR #53 cerrado. Botones discretos y `aria-live="polite"` configurados. |
| **BUG-08** | Conflicto de reglas CSS en tamaño grande | **Baja** | Developers | **Resuelto / Cerrado** | Escala tipográfica unificada en porcentajes sobre `html`. |
| **BUG-09** | Falta de `rel="noopener noreferrer"` en WhatsApp de emprendedores | **Media** | Developers | **Resuelto / Cerrado** | Enlace dinámico en `js/layout.js` con `target="_blank" rel="noopener noreferrer"` (RN-01). |
| **BUG-10** | Atrapamiento de scroll en mapas móviles Leaflet | **Media** | Developers | **Resuelto / Cerrado** | `leaflet-gesture-handling` con `gestureHandling: true` en las 3 vistas (WCAG 2.1.2). |
| **BUG-11** | Botón de emergencias flotante sin nombre accesible | **Media** | Developers | **Resuelto / Cerrado** | `aria-label="Abrir contactos de emergencia"` en `#btn-emergencia-flotante`. |
| **BUG-12** | Sensibilidad a tildes en `filtrarRutas` y `obtenerRutaDelDia` | **Media** | Developers | **Corregido en código** | `normalizarTexto()` ya está en `rutas.ts` y `rutas.js`. Falta que QA lo verifique y cierre el issue #81. |
| **BUG-13** | Dependencia estricta de `data-id` en el filtro de rutas | **Media** | Developers | **Pendiente** | Issue #83. Se resuelve al generar las tarjetas desde la API en React (HU-23 / HU-25). |
| **BUG-14** | Contraste insuficiente en widget de clima y botón "Limpiar filtros" | **Media** | Scrum Master | **Pendiente** | Issue #84. Revisar colores con la norma WCAG AA (RN-04). |
---

## Historial de Revisiones

* **17/09/2026(sprint 1):** Registro de informe de QA por Beatriz Martin. Proyecto clasificado como *Aceptado con observaciones*.
* **18/09/2026(sprint 1)** Actualización general del Product Backlog por Carlos Meléndez (PO), integrando las aclaraciones de las entrevistas (Sobre todo la 2) con el cliente, las 8 historias de Usuario base de la plantilla oficial y los hallazgos de QA.
* **25/09/2026(sprint 1)** Actualización del control de Bugs e Incidencias del código a partir de los nuevos cambios dedicados a los archivos de la carpeta de páginas y del bug_bounty.
* **27/09/2026(final sprint 1):** Registro de informe final de Bug Bounty por Beatriz Martin (QA Sprint 1). Proyecto clasificado como *Aceptado con observaciones*.
* **03/10/2026(sprint 2):** Actualización general del Backlog para el Sprint 2 por Beatriz Martin (PO). Se integran las historias enfocadas en manipulación del DOM, accesibilidad visual y los hallazgos pendientes del Lighthouse.
* **12/10/2026 (Sprint 2):** Actualización post-Entrevista 2. Se integra el consumo de APIs (HU-17), OpenStreetMap (HU-12), sistema de puntajes RN-02, menú de accesibilidad (HU-11) y se planifican los registros de usuarios para el Sprint 3.
- **22/10/2026 (Sprint 2):** Registro de reporte Bug Bounty y sesión de Planning Poker. El incremento es calificado como *Aceptado con observaciones* por bloqueos visuales (BUG-04 al 07). La estimación de la API (HU-17) arroja un promedio de 3.2 de dificultad. Se establece un flujo estricto de priorización de tareas (absorber API, resolver issues heredados y arreglar bugs de QA) y se inicia periodo de prueba de "Issues" en GitHub.
* **28/10/2026 (Sprint 2):** Actualización de tabla de Control de Bugs tras resolver ISSUE-02 y BUG-07 (aprobados en PR). Se agregan al MVP del Sprint las historias HU-22 (Generador Dinámico de Rutas) y HU-23 (API Clima).
* **06/11/2026 (Cierre Sprint 2):** Integración de la revisión de avance de QA (*Aceptado*): se cierran BUG-04, BUG-05, BUG-06, BUG-08, BUG-09, BUG-10, BUG-11 e ISSUE-03, se confirma el cierre de ISSUE-02 y BUG-07, y se registran BUG-12, BUG-13 y BUG-14. Validación del PO de la comuna, dificultad y tipo de actividad de las 15 rutas (3 con comuna incorrecta, 1 duplicada y 4 con actividad mal clasificada) y carga de los textos de 11 rutas. Se incorporan las indicaciones del profesor: React con TypeScript pasa a primera prioridad (HU-25), se reenfocan HU-09 (detalle en ventana emergente) y HU-04 (clima al presionar), y se agregan HU-10 (ruta recomendada del día), HU-23 (API propia de rutas), HU-24 (publicación de rutas por usuarios, Sprint 3), HU-26 (menú de tres líneas con barra lateral) y HU-27 (inscripción a ruta), junto con RN-07 y RN-08. HU-16 sube a *Must have* por ser entregable de laboratorio. Se define la lista de APIs para la presentación.

### Compromiso de Cierre del Product Owner (Sprint 1) `@CarlosMeléndez`
* Se da por finalizado el levantamiento inicial del Sprint 1. Los ajustes de rutas relativas hacia alguno de los bugs pendientes a resolver y el desarrollo de componentes del Sprint 2 quedan delegados a la célula de desarrollo.
* Las historias de usuario base se mantienen como la guía de aceptación para la QA Tester y la nueva Product Owner (`@BeatrizMartin`).

### Compromiso de Product Owner (Sprint 2) `@BeatrizMartin`
- El enfoque principal será priorizar la correcta implementación de interactividad con JavaScript, asegurar que el filtro de sustentabilidad (RN-02) se cumpla estrictamente en las nuevas historias, y guiar al equipo en la resolución de los bloqueos de rendimiento y accesibilidad visual detectados en el Bug Bounty.
- El enfoque de desarrollo será funcional (asincronía, mapas, formularios, buscador dinámico y API de Clima), manteniendo a raya los bloqueos de diseño responsive.