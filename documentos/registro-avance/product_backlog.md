# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio web accesible e interactivo EcoRuta-Temuco  
**Organización:** The Frontend Dropout  
**Product Owner:** Beatriz Martin  
**QA / Tester:** Ariel Covarrubia  
**Developers:** Lisette Delgado y Carlos Meléndez  
**Scrum Master:** Patricio Salazar  
**Última actualización:** 07/10/2026

---

## 1. Visión y objetivo del producto

EcoRuta-Temuco conecta a turistas con rutas, atractivos y emprendimientos de Temuco, Pucón y Villarrica. El producto debe promover un turismo sustentable, accesible y seguro, con información clara en computadores y teléfonos.

El siguiente orden de trabajo considera los avances aprobados del Sprint 1, el foco del Sprint 2 y las mejoras propuestas por el equipo.

## 2. Resumen del estado actual

* **Sprint:** 2, desarrollo de interactividad, accesibilidad y corrección de hallazgos técnicos.
* **Sprint 1:** Aceptado con observaciones. La semántica HTML, la navegación por teclado, los textos alternativos y los enlaces principales fueron validados.
* **Prioridad técnica inmediata:** completar la accesibilidad visual, agregar la descripción meta pendiente y continuar la optimización de imágenes y carga.
* **Riesgo de alcance:** las cuentas oficiales de redes sociales y la integración de mapas dependen de información externa que debe ser validada por la Product Owner.

## 3. Reglas de negocio y calidad

* **RN-01 - Salida segura:** los enlaces externos deben usar `target="_blank"`, `rel="noopener noreferrer"` y un nombre accesible que informe la apertura en una pestaña nueva. Se aplica a redes, WhatsApp y otros sitios externos.
* **RN-02 - Sustentabilidad:** solo se publican iniciativas con impacto ambiental positivo, aporte local, relación con la naturaleza, valor cultural o patrimonial, prácticas responsables y pertinencia territorial en La Araucanía.
* **RN-03 - Emergencias:** el directorio de emergencias debe ser visible al consultar rutas y en dispositivos móviles. Debe aclarar que no constituye una garantía médica.
* **RN-04 - Accesibilidad WAI-AA:** los controles deben funcionar con teclado, tener foco visible, nombres comprensibles para lectores de pantalla y comunicar su estado mediante `aria-pressed` cuando corresponda.
* **RN-05 - Rutas relativas:** los enlaces deben funcionar desde las páginas principales, las páginas de ciudades y las páginas de detalle.
* **RN-06 - Privacidad:** las cookies solo pueden guardar preferencias de accesibilidad. No se permiten cookies de seguimiento, publicidad ni datos personales.

## 4. Backlog priorizado

| Orden | ID | Elemento | Prioridad | Estado | Responsable principal |
| :---: | :---: | :--- | :---: | :---: | :--- |
| 1 | BUG-02 | Agregar `meta description` a las vistas | Must have | Pendiente | Developer 2 |
| 2 | HU-11 | Barra de accesibilidad: modo oscuro y texto grande | Must have | Por hacer | Developers |
| 3 | BUG-03 | Optimizar imágenes y tiempo de carga | Must have | Parcialmente resuelto | Developer 1 |
| 4 | HU-09 | Detalle dinámico de rutas | Must have | Por hacer | Developers |
| 5 | HU-14 | Enlaces oficiales de redes sociales | Must have | Bloqueado por validación | Product Owner / Developers |
| 6 | HU-01 | Catálogo de emprendimientos y contacto directo | Must have | En progreso | Developers |
| 7 | HU-02 | Rutas y panoramas sustentables | Must have | En progreso | Product Owner / Developers |
| 8 | HU-13 | Formulario con validación dinámica | Should have | Por hacer | Developers |
| 9 | HU-05 | Directorio de emergencias | Should have | En progreso | Developers / QA |
| 10 | HU-03 | Recomendaciones de rutas para grupos | Should have | En proceso | Product Owner |
| 11 | HU-15 | Cookies de preferencias de accesibilidad | Should have | Por hacer | Developers / QA |
| 12 | HU-12 | Mapas interactivos por ciudad | Should have | Por hacer | Developers |
| 13 | HU-04 | Información climática y seguridad en terreno | Could have | Aplazada | Product Owner |
| 14 | HU-06 | Contactos personalizados de asilos | Could have | Por discutir | Product Owner |
| 15 | HU-16 | Migración progresiva a TypeScript | Could have | Por hacer | Developers |

## 5. Historias prioritarias y criterios de aceptación

### HU-11 - Barra de accesibilidad visual

**Prioridad:** Must have  
**Estado:** Por hacer  
**Historia:** Como persona con baja visión, quiero activar modo oscuro y texto grande desde una barra de herramientas agrupada, para leer la información turística sin dificultad.

**Criterios de aceptación:**

- [ ] La barra está disponible en las páginas principales y mantiene una presentación usable en computadores y teléfonos.
- [ ] Los controles de modo oscuro y texto grande están agrupados visualmente sin ocupar demasiado espacio.
- [ ] Cada control tiene un nombre claro para lectores de pantalla y puede activarse con teclado.
- [ ] El estado activo se comunica con `aria-pressed`.
- [ ] El texto grande no desborda tarjetas, botones ni la pantalla en móviles.
- [ ] El modo oscuro mejora el contraste de títulos, párrafos, enlaces y botones de las rutas populares.
- [ ] La mejora funciona en Temuco, Pucón y Villarrica sin alterar negativamente el modo claro.
- [ ] La barra no genera desplazamiento horizontal.

**Tareas técnicas:**

- [ ] Crear un contenedor reutilizable para los controles en header/footer.
- [ ] Implementar los eventos con `addEventListener` y clases CSS separadas de la lógica JavaScript.
- [ ] Revisar contraste en modo oscuro y foco visible mediante teclado.
- [ ] Probar lector de pantalla, `Tab`, `Enter` y navegación en móvil.

### HU-09 - Detalle dinámico de rutas

**Prioridad:** Must have  
**Estado:** Por hacer  
**Historia:** Como turista, quiero desplegar el detalle de cada ruta sin recargar la página, para consultar rápidamente la información que necesito.

**Criterios de aceptación:**

- [ ] Cada botón de ruta escucha su evento mediante `addEventListener`.
- [ ] El detalle se muestra u oculta con clases CSS y `classList.toggle`.
- [ ] El botón funciona con teclado y comunica su estado mediante `aria-expanded`.
- [ ] Cada ruta incluye, cuando la información esté disponible, duración, distancia, dificultad, ubicación y recomendaciones.
- [ ] La interacción funciona en las tres ciudades y no provoca desplazamiento horizontal.

### HU-14 - Redes sociales oficiales

**Prioridad:** Must have  
**Estado:** Bloqueado por validación de cuentas oficiales  
**Historia:** Como visitante, quiero acceder a las redes oficiales de EcoRuta, para consultar novedades y canales públicos del proyecto.

**Criterios de aceptación:**

- [ ] Facebook, Instagram y Twitter/X aparecen en el footer y en la página de contacto.
- [ ] Cada enlace dirige únicamente a una cuenta pública y oficial validada por la Product Owner.
- [ ] Los enlaces se abren en una pestaña nueva con `rel="noopener noreferrer"`.
- [ ] El texto o nombre accesible informa la red social y la apertura de una pestaña nueva.
- [ ] Si una cuenta no está disponible, el control permanece deshabilitado o no se publica hasta contar con una URL oficial.
- [ ] Los enlaces funcionan en computadores y teléfonos.

### HU-15 - Cookies de preferencias de accesibilidad

**Prioridad:** Should have  
**Estado:** Por hacer; depende de HU-11  
**Historia:** Como visitante, quiero decidir si permito cookies de preferencias, para conservar mi modo oscuro y tamaño de texto al cambiar de página sin entregar datos personales.

**Criterios de aceptación:**

- [ ] El aviso aparece en la primera visita y explica que las cookies solo guardan preferencias de accesibilidad.
- [ ] El usuario puede aceptar, rechazar o configurar preferencias.
- [ ] La decisión no vuelve a solicitarse después de guardarla.
- [ ] El modo oscuro y el tamaño de texto se guardan y recuperan mediante cookies, sin usar `localStorage` para esas mismas preferencias.
- [ ] Las preferencias se mantienen al cambiar de página.
- [ ] El usuario puede modificar posteriormente su decisión.
- [ ] Si rechaza las cookies, el sitio continúa funcionando normalmente durante la visita.
- [ ] No se guardan datos personales ni se usan cookies de seguimiento o publicidad.

### HU-12 - Mapas interactivos por ciudad

**Prioridad:** Should have  
**Estado:** Por hacer  
**Historia:** Como excursionista, quiero consultar un mapa interactivo de cada ciudad, para ubicar atractivos y rutas antes de visitarlos.

**Criterios de aceptación:**

- [ ] Temuco, Pucón y Villarrica cuentan con un mapa funcional o una integración referencial validada.
- [ ] Los atractivos y rutas aparecen con marcadores correctos.
- [ ] Cada marcador muestra nombre, descripción y enlace a más información.
- [ ] Las rutas relacionan el mapa con duración, distancia, dificultad y recomendaciones.
- [ ] Los controles del mapa son utilizables con teclado y tienen nombres comprensibles para lectores de pantalla.
- [ ] El mapa funciona en computadores y teléfonos sin provocar desplazamiento horizontal.

### HU-13 - Formulario con validación dinámica

**Prioridad:** Should have  
**Estado:** Por hacer  
**Historia:** Como usuario interesado, quiero enviar un formulario que valide mis datos dinámicamente, para evitar enviar información errónea.

**Criterios de aceptación:**

- [ ] El formulario está disponible desde las rutas o la página de contacto.
- [ ] Los campos obligatorios vacíos se identifican visualmente y mediante un mensaje accesible.
- [ ] Los errores se asocian al campo correspondiente y no dependen solo del color.
- [ ] Se muestra un mensaje dinámico con `.textContent` cuando los datos son válidos.

### HU-05 - Directorio de emergencias

**Prioridad:** Should have  
**Estado:** En progreso  
**Historia:** Como apoderada, quiero consultar contactos médicos de emergencia, para reaccionar ante imprevistos durante una visita.

**Criterios de aceptación:**

- [ ] La sección es visible al consultar rutas y en móviles.
- [ ] Los números permiten una llamada directa cuando el dispositivo lo admite.
- [ ] Se informa claramente que es un directorio y no una garantía médica.
- [ ] La información es revisada por la Product Owner antes de publicarse.

## 6. Historias base en seguimiento

### HU-01 - Emprendimientos de Pucón

**Prioridad:** Must have | **Estado:** En progreso

- [x] Visibilizar información de emprendimientos.
- [x] Redirigir a canales de venta.
- [ ] Verificar que los enlaces externos cumplan RN-01.
- [ ] Validar cada publicación según RN-02.

### HU-02 - Parque Nacional Villarrica y panoramas sustentables

**Prioridad:** Must have | **Estado:** En progreso

- [x] Presentar rutas e información dedicada al cuidado del entorno.
- [x] Corregir el atributo `id="rutas"` y sus anclas.
- [ ] Incorporar en cada ficha los datos de ruta definidos en HU-09.
- [ ] Validar contenido, ubicación y criterios de sustentabilidad antes de publicar.

### HU-03 - Recomendaciones de rutas para grupos

**Prioridad:** Should have | **Estado:** En proceso

- [ ] Mantener el enfoque en rutas grupales sustentables.
- [ ] Descartar eventos que no cumplan RN-02.
- [ ] Definir recomendaciones útiles para distintos tamaños de grupo.

## 7. Correcciones técnicas y rendimiento

| ID | Hallazgo / tarea | Prioridad | Estado | Criterio de cierre |
| :---: | :--- | :---: | :---: | :--- |
| BUG-02 | Falta de `<meta name="description">` | Must have | Pendiente | Todas las vistas principales tienen una descripción única y pertinente. |
| BUG-03 | Peso de imágenes y carga lenta | Must have | Parcialmente resuelto | Optimizar imágenes sin pérdida visual relevante, usar WebP cuando sea compatible y aplicar `loading="lazy"` a imágenes secundarias. |
| QA-01 | Validación de enlaces y rutas relativas | Must have | Resuelto en Sprint 1 | No existen 404 en navegación, retorno a Inicio, contacto ni footer. Revalidar tras nuevos cambios. |
| QA-02 | Contraste y textos alternativos | Must have | Parcialmente resuelto | Mantener contraste adecuado en ambos modos y textos `alt` con contexto geográfico. |
| QA-03 | Elementos interactivos sin comportamiento | Must have | Resuelto en Sprint 1 | Reprobar botones de rutas, accesibilidad, formulario y redes después de cada incremento. |

**Tareas de rendimiento:**

- [ ] Medir Lighthouse en Temuco, Pucón y Villarrica antes y después de optimizar.
- [ ] Identificar imágenes principales y secundarias, conservar calidad visual y registrar sus nuevos formatos y pesos.
- [ ] Eliminar reglas CSS o JavaScript sin uso solo después de verificar que no sean compartidas por otras páginas.
- [ ] Confirmar que las mejoras no alteren la navegación ni el diseño responsivo.

## 8. Mejoras futuras

### HU-04 - Información climática y seguridad en terreno

**Prioridad:** Could have | **Estado:** Aplazada. Herramienta complementaria, no bloqueante para el MVP.

### HU-06 - Contactos personalizados de asilos

**Prioridad:** Could have | **Estado:** Por discutir. Requiere definir almacenamiento y privacidad antes de implementarse.

### HU-16 - Migración progresiva a TypeScript

**Prioridad:** Could have | **Estado:** Por hacer.

**Historia:** Como equipo de desarrollo, queremos migrar progresivamente navegación, header, footer y accesibilidad a TypeScript, para reducir errores y mejorar la mantenibilidad.

**Criterios de aceptación:**

- [ ] Crear `tsconfig.json` con una configuración compatible con el navegador actual.
- [ ] Convertir primero `layout.js` a `layout.ts` sin modificar innecesariamente el comportamiento existente.
- [ ] Definir tipos para botones, enlaces y elementos del DOM, contemplando valores nulos.
- [ ] Compilar a JavaScript ejecutable por las páginas actuales.
- [ ] Verificar que navegación, modo oscuro y texto grande sigan funcionando sin errores de consola.

## 9. Fuera de alcance

* **HU-07 - Horarios de buses interurbanos:** Won't have. No se alinea con el objetivo central de rutas y turismo sustentable.
* **HU-08 - Publicidad de sucursales fuera de la región:** Won't have. Valdivia queda fuera de la pertinencia territorial de EcoRuta.
* Publicidad, seguimiento de usuarios y recopilación de datos personales mediante cookies.

## 10. Definición de terminado

Una historia se considera terminada cuando:

- [ ] Sus criterios de aceptación están verificados por QA.
- [ ] Funciona con teclado, foco visible y nombres accesibles cuando incluye interacción.
- [ ] Se revisa en computador y teléfono, sin desplazamiento horizontal inesperado.
- [ ] No rompe las páginas de Temuco, Pucón ni Villarrica.
- [ ] No introduce errores en consola ni enlaces rotos.
- [ ] La Product Owner valida el contenido, la pertinencia territorial y el criterio de sustentabilidad cuando corresponda.
- [ ] El cambio queda registrado en el control de bugs o en la historia relacionada.

## 11. Historial de revisiones

* **17/09/2026 - Sprint 1:** QA clasificó el incremento como aceptado con observaciones.
* **18/09/2026:** Se actualizaron las historias base y los hallazgos de QA.
* **25/09/2026:** Se incorporaron comentarios del Product Owner sobre navegación externa, emprendimientos, accesibilidad y mapas.
* **27/09/2026 - Cierre de Sprint 1:** Se confirmaron como resueltos los problemas principales de navegación, semántica, teclado, textos alternativos y enlaces; quedaron pendientes `BUG-02` y `BUG-03`.
* **03/10/2026 - Inicio de Sprint 2:** Se priorizaron DOM, formularios, accesibilidad visual y rendimiento.
* **07/10/2026:** Se reorganizó el backlog con las mejoras propuestas: barra de accesibilidad, contraste en modo oscuro, redes oficiales, mapas, cookies de preferencias, TypeScript y rendimiento.

## 12. Compromisos del Sprint 2

* Resolver `BUG-02` y avanzar en `BUG-03`.
* Implementar y validar HU-11 antes de guardar preferencias con cookies.
* Completar HU-09 y HU-13 manteniendo navegación por teclado.
* Validar las cuentas oficiales antes de habilitar HU-14.
* Mantener actualizados estados, evidencias de QA y criterios de aceptación en cada revisión.
