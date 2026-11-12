# User story documents

* **Proyecto:** EcoRuta-Temuco/The Frontend Dropout
* **Product Owner:** Beatriz Martin
* **Update date:** 11/11/2026

---

## General Matrix of Stories
Detalle resumido de historias de usuarios

| ID | Historia de usuario (Como / quiero / para) | Prioridad (MoSCoW) | Estado |
| :---: | :--- | :---: | :---: |
| **HU-01** | Como emprendedor de Pucón, quiero ofrecer mis productos, para visibilizarlos a los turistas. | Must have | Hecho |
| **HU-02** | Como director del Parque Nacional, quiero publicar panoramas sustentables, para incentivar el turismo responsable. | Must have | Hecho |
| **HU-03** | Como presidente de curso, quiero ver recomendaciones de rutas, para celebrar con mis compañeros. | Should have | Hecho |
| **HU-04** | Como estudiante de meteorología, quiero ver info climática al presionar sobre una ruta, para planificar mis salidas a terreno. | Must have | Hecho |
| **HU-05** | Como apoderada, quiero ver contactos médicos de emergencia, para reaccionar ante imprevistos. | Should have | Hecho |
| **HU-06** | Como ayudante de asilo, quiero guardar números de emergencia personalizados. | Could have | Descartada |
| **HU-07** | Como residente, quiero ver horarios de buses interurbanos. | Won't have | Descartada |
| **HU-08** | Como panadería, quiero promocionar mi nueva sede en Valdivia. | Won't have | Descartada |
| **HU-09** | Como turista, quiero presionar una ruta y ver su detalle completo en una ventana más grande, para informarme sin cambiar de página. | Must have | Hecho |
| **HU-10** | Como turista, quiero ver una ruta recomendada distinta cada día en la comuna que visito, para descubrir panoramas nuevos. | Should have | Hecho |
| **HU-11** | Como persona con baja visión, quiero controles visuales (alto contraste/zoom), para leer sin dificultad. | Must have | Hecho |
| **HU-12** | Como excursionista, quiero ver mapas interactivos, para ubicarme fácilmente en el territorio. | Should have | Hecho |
| **HU-13** | Como usuario interesado, quiero poder enviar un formulario que valide mis datos dinámicamente, para no enviar información errónea. | Should have | Hecho |
| **HU-14** | Como visitante, quiero acceder a las redes oficiales, para usarlas como canal de contacto complementario. | Must have | Hecho |
| **HU-15** | Como visitante, quiero decidir si permito cookies de preferencias, para conservar mi modo oscuro y tamaño de texto sin entregar datos. | Should have | Hecho |
| **HU-16** | Como desarrollador, quiero migrar la lógica JS a TypeScript, para reducir errores y mejorar la mantenibilidad. | Must have | Hecho |
| **HU-17** | Como turista, quiero que las fichas se carguen desde una base de datos validada, para ver info actualizada. | Must have | Hecho |
| **HU-18** | Como turista registrado, quiero guardar mis rutas favoritas, para consultarlas más tarde. | Could have | Descartada |
| **HU-19** | Como turista registrado, quiero organizar mis guardados en itinerarios por día, para planificar mi viaje. | Could have | Descartada |
| **HU-20** | Como usuario interesado, quiero recibir un boletín de eventos, para mantenerme actualizado voluntariamente. | Could have | Descartada |
| **HU-21** | Como usuario extranjero, quiero poder cambiar el idioma a inglés, para comprender las actividades disponibles. | Should have | Hecho |
| **HU-22** | Como turista, quiero filtrar y generar rutas dinámicamente según comuna, dificultad y actividad, para armar mi panorama ideal. | Must have | Hecho |
| **HU-23** | Como turista, quiero que las rutas se carguen desde una base de datos centralizada, para ver información actualizada. | Must have | Hecho |
| **HU-24** | Como turista registrado, quiero proponer rutas nuevas, para compartir panoramas sustentables con otros visitantes. | Could have | Descartar |
| **HU-25** | Como equipo de desarrollo, queremos reestructurar el sitio en React con TypeScript, para construir componentes reutilizables y facilitar los cambios. | Must have | En Progreso |
| **HU-26** | Como visitante, quiero un menú que reúna accesibilidad y contacto en una barra lateral, para encontrarlos rápido sin que ocupen espacio. | Must have | Hecho |
| **HU-27** | Como turista, quiero inscribirme en la ruta que elijo explorar, para asegurar mi participación en la salida. | Must have | Hecho |

***
# Historias de Usuarios y Criterios de Aceptación - EcoRuta-Temuco

---

## Alineación con la visión del cliente y Requerimientos de Sprint 2

### Historias Prioritarias y Alineadas (Must Have)
Son indispensables y caen dentro del Sprint actual.
- **HU-25 (React + TypeScript):** Primera prioridad indicada por el profesor el 05/11/2026. Todo cambio nuevo de esta semana se construye en React.
- **HU-01 y HU-02 (Turismo Sustentable):** Alta prioridad. El enfoque principal es dar visibilidad al emprendedor y parques.
- **HU-04 (Clima):** Herramienta de seguridad en terreno. Se muestra al presionar "Ver clima", no fija en la tarjeta.
- **HU-09 (Detalle en ventana emergente):** Al presionar una tarjeta se abre una ventana más grande con el detalle, sin crear páginas nuevas.
- **HU-11 (Accesibilidad):** Controles visuales de accesibilidad, que ahora se trasladan a la barra lateral (HU-26).
- **HU-14 (Redes Sociales):** Canales de contacto complementarios y oficiales, también trasladados a la barra lateral.
- **HU-16 (Migración a TypeScript):** Entregable de laboratorio, cumplido el 05/11: cada `.js` tiene su `.ts`.
- **HU-17 (Consumo de API):** Carga dinámica de emprendimientos usando MockAPI validando el estado "Publicado".
- **HU-22 (Buscador y Generador de Rutas):** Sistema de filtrado multicriterio sin recarga de página para buscar rutas ideales.
- **HU-23 (API propia de Rutas):** Entregable de laboratorio: las rutas se obtienen desde una API construida por el equipo (Node.js + Express + TypeScript), con distancia, duración, partida, destino y atractivos, y se generan de forma dinámica.
- **HU-26 (Menú lateral):** Botón de tres líneas con Accesibilidad y Contacto.
- **HU-27 (Inscripción a ruta):** El usuario elige la ruta que quiere explorar e ingresa sus datos.

### Historias Valiosas pero no críticas (Should Have)
Aportan gran valor a la plataforma, pero el sitio puede funcionar inicialmente sin ellas.
- **HU-10 (Ruta recomendada del día):** Destacado diario por comuna que complementa el buscador.
- **HU-03 (Rutas para grupos):** El enfoque hacia las rutas se alinea con el turismo sustentable en grupo; la inscripción permite indicar cantidad de personas.
- **HU-05 (Emergencias):** Válida en el ámbito de salud (directorio), catalogada como funcionalidad secundaria.
- **HU-12 (Mapas Interactivos):** Implementación referencial utilizando la alternativa de código abierto (OpenStreetMap).
- **HU-13 (Validación de formulario):** Su lógica de validación se reutiliza en la inscripción (HU-27).
- **HU-15 (Cookies de preferencias):** Preservar la configuración visual elegida por el usuario de manera segura.
- **HU-21 (Selector de Idioma):** Opción complementaria de accesibilidad (ES/EN) con persistencia de elección vinculada a HU-15.

### Fuera de Alcance (Won't Have)
Fuera de las restricciones del proyecto.
- **HU-06 (Asilos personalizados):** Enfocado en usuarios registrado, quedando fuera del foco del proyecto.
- **HU-07 (Buses):** No es el foco turístico de la aplicación.
- **HU-08 (Sucursal Valdivia):** Fuera del territorio regional (La Araucanía).
- **HU-18, HU-19, HU-20 (Registro de Usuarios):** Creación de cuentas, itinerarios personalizados, favoritos y newsletters. Enfocado en usuarios registrado, quedando fuera del foco del proyecto.
- **HU-24 (Publicación de rutas por usuarios):** Enfocado en usuarios registrado, quedando fuera del foco del proyecto.

### Aprovechamiento de Casos Borde y Generación de Reglas
**¿Cómo aprovechar aquellas historias que no están encaminadas a la visión del cliente (como las descartadas o ajustadas) para mejorar la plataforma?**

- En lugar de dejarlas de lado, las utilizamos como fundamentos para la **Regla de Negocio (RN-02) y de Filtrado de Eventos**, estableciendo una relación estricta al uso correcto del término **Sustentable** que queremos promover en La Araucanía.

> 1. **Impacto Ambiental:** Promover el cuidado del entorno natural.
> 2. **Aporte Local:** Apoyar a comunidades o emprendimientos de La Araucanía.
> 3. **Relación con la Naturaleza:** Rutas, actividades al aire libre y concienciación al cuidado del medio.
> 4. **Cultura y Patrimonio:** Valorizar la identidad regional.
> 5. **Prácticas Responsables:** Iniciativas que fomenten un uso responsable de los recursos o reduzcan impactos negativos.
> 6. **Pertinencia territorial:** Que corresponda exclusivamente a la oferta turística de la región que EcoRuta pretende visibilizar.

- **Aplicación a rutas (06/11/2026):** El mismo criterio de pertinencia territorial que descartó HU-08 se aplicó al catálogo de rutas. Termas Geométricas (Región de Los Ríos) y Reserva Nacional Malalcahuello (comuna de Curacautín, asignada por error a Temuco) deben reemplazarse. El detalle está en la *Validación del Catálogo de Rutas* del backlog.

*Nota Técnica (Sprint 2):* Se define que la responsabilidad de validar, filtrar y aprobar la publicación de eventos, emprendimientos o rutas que cumplan con estos 6 puntos recae sobre la actual Product Owner.

---

# Detalle Resumido de Historias (Sprint 2)

## Prioridad Alta (Must Have)

### HU-25: Migración a React con TypeScript *(Nueva - Primera prioridad)*
- **Objetivo:** Reestructurar el sitio en componentes React con TypeScript, base de todos los cambios de esta semana.
- **Criterios clave:**
> 1. [x] Proyecto React + TypeScript (Vite) con las carpetas `src/components`, `src/services` y `src/types`.
> 2. [x] Reutilizar `style.css` para mantener la línea gráfica aprobada por el cliente.
> 3. [x] `App.tsx` carga la lista de rutas y deja la página funcionando.
> 4. [ ] Vistas de Temuco, Pucón y Villarrica como componentes.
> 5. [ ] Trasladar cookies, idioma, emergencias, emprendedores y mapa sin perder accesibilidad.
> 6. [ ] Despliegue funcionando en GitHub Pages y README con cómo ejecutar y compilar.

### HU-04: Clima interactivo (API Open-Meteo) - Reenfocada
- **Objetivo:** Mostrar el clima del punto de partida de una ruta cuando el usuario lo pide.
- **Criterios clave:**
> 1. [x] Conectar asíncronamente (`fetch`) a Open-Meteo.
> 2. [x] Mostrar temperatura, sensación térmica, viento y condición actual.
> 3. [x] Bloque `try/catch` y mensaje "Clima temporalmente no disponible" si el servicio falla.
> 4. [x] El clima no se ve de lleno en la tarjeta: se consulta y muestra al presionar "Ver clima" en la ventana de detalle.
> 5. [x] Usar las coordenadas de `ubicacionInicio` de la ruta y mostrar "Cargando…" mientras responde.
> 6. [x] Corregir el contraste del widget (BUG-14, commit `ba2d6d6`).

### HU-09: Detalle de la ruta en ventana emergente - Reenfocada
- **Objetivo:** Al presionar una tarjeta, esta se agranda en una ventana con el detalle completo, sin crear páginas nuevas.
- **Criterios clave:**
> 1. [x] Componente `DetalleRutaModal` con nombre, descripción completa, distancia (km), horas de senderismo, fecha y hora de inicio, punto de partida, punto de destino y atractivos.
> 2. [x] Botones "Ver clima" (HU-04) e "Inscribirme" (HU-27).
> 3. [x] Cierre al hacer clic fuera, con `Esc` y con un botón de cerrar.
> 4. [x] `role="dialog"`, `aria-modal="true"`, foco dentro de la ventana y devolución del foco a la tarjeta al cerrar.
> 5. [x] Bloquear el scroll de la página de fondo mientras la ventana está abierta.

### HU-11: Accesibilidad visual (baja visión)
- **Objetivo:** Controles interactivos para activar alto contraste y aumento de texto.
- **Criterios clave:**
> 1. [x] Crear un menú desplegable pequeño con opciones de Tamaño de texto y Alto contraste.
> 2. [x] Conservar la legibilidad de tarjetas sin desbordar el contenido en pantallas móviles al aplicar zoom.
> 3. [x] Guardar las preferencias temporalmente sin exigir una cuenta de usuario, notificando su propósito.
> 4. [x] Afinación de distribución y visualización del funcionamiento dentro de las páginas.
> 5. [x] Trasladar los controles a la barra lateral (HU-26).

### HU-14: Redes sociales oficiales (Contacto)
- **Objetivo:** Utilizar las redes oficiales del proyecto como canal complementario de contacto.
- **Criterios clave:**
> 1. [x] Configurar enlaces a Facebook, Instagram y X verificados.
> 2. [x] Cumplir regla de salida segura (`target="_blank"` y `rel="noopener noreferrer"`).
> 3. [x] Mostrarlas también en la sección Contactos de la barra lateral (HU-26).

### HU-16: Migración completa a TypeScript (Entregable)
- **Objetivo:** Aumentar la solidez del código mediante tipado estático en todo el proyecto.
- **Criterios clave:**
> 1. [x] Crear `tsconfig.json` con configuración compatible con el navegador.
> 2. [x] Migrar `rutas.ts` con las interfaces `Ruta`, `FiltrosRuta` y el tipo `Dificultad`.
> 3. [x] Crear la suite de pruebas unitarias en `tests/pruebas.ts` (26 pruebas aprobadas).
> 4. [x] Migrar `layout`, `buscador`, `clima`, `retorno`, `script` y `puntaje` a `.ts`, cada uno junto a su `.js` (commit `ef084e4`).
> 5. [x] Agregar `package.json` con `typescript` y un script de compilación.

### HU-17: Catálogo Dinámico de Emprendimientos (Consumo API)
- **Objetivo:** Cargar las fichas de los emprendimientos desde una base de datos centralizada y validada.
- **Criterios clave:**
> 1. [x] Implementar asincronía (`fetch`) para traer datos en formato JSON (MockAPI).
> 2. [x] Mostrar en el DOM únicamente los emprendimientos que posean el estado "Publicado".
> 3. [x] Integrar manejo de errores (mostrar mensaje comprensible si la API falla, no pantalla en blanco).
> 4. [x] Afinación de distribución de funcionamiento dentro de las páginas.
> 5. [x] Trasladar a `src/services/emprendedoresApi.ts` con el tipo `Emprendedor`.

### HU-22: Buscador y Generador Dinámico de Rutas
- **Objetivo:** Encontrar y recomendar rutas turísticas de forma rápida utilizando múltiples variables simultáneas.
- **Criterios clave:**
  - [x] Implementar filtrado en tiempo real por Comuna (según la vista), Dificultad y Tipo de Actividad.
  - [x] Filtrar con `.filter()` y `event.preventDefault()` sin recargar la vista.
  - [x] Limpiar filtros y mostrar un mensaje amigable si no hay coincidencias.

### HU-23: API Propia de Rutas (Entregable) *(Nueva)*
- **Objetivo:** Construir una API propia que entregue las rutas, para que las tarjetas, el buscador, la ruta del día y la ventana de detalle se generen de forma dinámica.
- **Criterios clave:**
> 1. [x] Contrato `src/types/ruta.ts` con id, nombre, comuna, imagen, descripción breve, descripción completa, dificultad, tipo de actividad, distancia (km), horas de senderismo, fecha y hora de inicio, ubicación de inicio, ubicación de fin, atractivos, estado y puntaje.
> 2. [x] JSON de ejemplo con 3 rutas reales (una por comuna) mientras la API no esté publicada.
> 3. [x] API propia con Node.js + Express + TypeScript en `api/`, publicada en un servicio que ejecute servidores (GitHub Pages no puede).
> 4. [x] Endpoints `GET /api/rutas` (filtros opcionales) y `GET /api/rutas/:id`, con CORS solo para el dominio del proyecto.
> 5. [x] `src/services/rutasApi.ts` con `async/await` + `fetch` tipado con `Ruta`.
> 6. [x] Mostrar solo rutas con estado "Publicado" (RN-02).
> 7. [x] `try/catch` con error controlado: "Cargando…" mientras espera, mensaje amigable si falla y JSON local de respaldo (RN-05).
> 8. [x] Tarjetas, ruta del día y detalle generados desde los datos de la API (solución definitiva de BUG-13).

### HU-26: Menú de tres líneas con barra lateral *(Nueva)*
- **Objetivo:** Reemplazar el botón "Accesibilidad" por un menú de tres líneas que abra una barra lateral con Accesibilidad y Contacto.
- **Criterios clave:**
> 1. [x] Componente `MenuLateral` con botón de tres líneas, `aria-expanded` y `aria-label`.
> 2. [x] Sección Contactos: correo, teléfono y redes sociales con salida segura (RN-01).
> 3. [x] Sección Accesibilidad: tamaño de texto, alto contraste, modo oscuro e idioma.
> 4. [x] Cierre al hacer clic fuera y con `Esc`, y navegación completa por teclado.

### HU-27: Inscripción a una ruta *(Nueva)*
- **Objetivo:** Permitir que el usuario elija la ruta que quiere explorar y se inscriba en su salida.
- **Criterios clave:**
> 1. [x] Componente `FormularioInscripcion` que se abre desde "Inscribirme", con la ruta ya seleccionada y opción de cambiarla.
> 2. [x] Campos: ruta, fecha de salida, nombre, correo, teléfono (opcional), cantidad de personas, nivel de experiencia (opcional) y aceptación de condiciones.
> 3. [x] Validación dinámica con errores en rojo asociados a cada campo (reutiliza HU-13).
> 4. [x] Aviso de seguridad si la ruta es "Difícil" y el usuario indica nivel "Principiante".
> 5. [x] Enviar la inscripción con `POST /api/inscripciones` a la API propia, que no expone públicamente los datos (RN-08).
> 6. [x] Confirmación con resumen de la inscripción, o aviso si la API no pudo registrarla.

## Prioridad Media (Should Have)

### HU-10: Ruta Recomendada del Día *(Nueva)*
- **Objetivo:** Destacar cada día una ruta distinta de la comuna que el visitante está consultando.
- **Criterios clave:**
> 1. [x] Seleccionar la ruta según el día del año, de forma que todos los visitantes vean la misma ruta ese día (`obtenerRutaDelDia`).
> 2. [x] Mostrar solo rutas de la comuna de la vista actual.
> 3. [x] Comparar comunas sin distinguir tildes ni mayúsculas.
> 4. [x] Mostrar nombre y descripción en el idioma activo.
> 5. [x] Al presionarla, abrir la ventana de detalle (HU-09).
> 6. [x] Si la API de rutas falla, el bloque destacado no debe quedar vacío.

### HU-05: Contactos médicos de emergencia (Optimizado)
- **Objetivo:** Directorio visible, directo y seguro para reaccionar ante imprevistos.
- **Criterios clave:**
> 1. [x] Permitir realizar llamadas directas al hacer clic en números desde dispositivos móviles (`tel:`).
> 2. [x] Habilitar un botón para "Copiar número" al consultar la plataforma desde computadores de escritorio.
> 3. [x] Incluir el texto legal: *"Este panel es un directorio informativo... y no constituye una garantía de atención médica directa"*.

### HU-12: Mapas interactivos por ciudad (OpenStreetMap)
- **Objetivo:** Proveer orientación territorial integrando mapas de código abierto.
- **Criterios clave:**
> 1. [x] Conectar la plataforma a la API de OpenStreetMap (Leaflet).
> 2. [x] Mostrar ubicación general de atractivos o la distribución de comunas (Temuco, Pucón, Villarrica).
> 3. [x] Afinación de distribución de funcionamiento dentro de las páginas (scroll trap resuelto, BUG-10).

### HU-13: Implementación y validación dinámica de Formulario.
- **Objetivo:** Página de formulario que debe validar sus campos antes de enviar los datos.
- **Criterios clave:**
> 1. [x] Agregación del apartado de formulario en las rutas.
> 2. [x] Validar campos de texto vacíos (marcando en rojo si hay error).
> 3. [x] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.
> 4. [x] Afinación de distribución de funcionamiento dentro de EcoRuta.

### HU-15: Cookies de preferencias de accesibilidad
- **Objetivo:** Guardar configuraciones del usuario (modo oscuro, zoom, idioma) de forma segura.
- **Criterios clave:**
> 1. [x] Desplegar un aviso en la primera visita explicando el propósito de las cookies (solo accesibilidad, no publicidad).
> 2. [x] Permitir al usuario aceptar o rechazar el almacenamiento de sus preferencias.
> 3. [x] Aplicar la configuración guardada automáticamente al cambiar entre las vistas de Pucón, Temuco y Villarrica.

### HU-21: Selector de Idioma (Accesibilidad)
- **Objetivo:** Permitir al visitante extranjero cambiar el idioma del sitio de manera fácil.
- **Criterios clave:**
> 1. [x] Implementar un control simple en el menú de accesibilidad para alternar entre Español (ES) e Inglés (EN). 
> 2. [x] Evitar recolección de datos personales, limitándose a aplicar traducciones dinámicas (`data/idiomas.json`).
> 3. [x] Trasladar el selector a la barra lateral (HU-26).
