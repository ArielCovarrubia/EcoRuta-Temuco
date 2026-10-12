# User story documents

**Proyecto:** EcoRuta-Temuco/The Frontend Dropout

**Product Owner:** Beatriz Martin

**Update date:** 12/10/2026

---

## General Matrix of Stories
Detalle resumido de historias de usuarios

| ID | Historia de usuario (Como / quiero / para) | Prioridad (MoSCoW) | Estado |
| :---: | :--- | :---: | :---: |
| **HU-01** | Como emprendedor de Pucón, quiero ofrecer mis productos, para visibilizarlos a los turistas. | Must have | En progreso |
| **HU-02** | Como director del Parque Nacional, quiero publicar panoramas sustentables, para incentivar el turismo responsable. | Must have | En progreso |
| **HU-03** | Como presidente de curso, quiero ver recomendaciones de rutas, para celebrar con mis compañeros. | Should have | En proceso |
| **HU-04** | Como estudiante de meteorología, quiero ver info climática, para planificar mis salidas a terreno. | Could have | Por hacer |
| **HU-05** | Como apoderada, quiero ver contactos médicos de emergencia, para reaccionar ante imprevistos. | Should have | En progreso |
| **HU-06** | Como ayudante de asilo, quiero guardar números de emergencia personalizados. | Could have | Por discutir |
| **HU-07** | Como residente, quiero ver horarios de buses interurbanos. | Won't have | Descartada |
| **HU-08** | Como panadería, quiero promocionar mi nueva sede en Valdivia. | Won't have | Descartada |
| **HU-09** | Como turista, quiero ver el detalle de todas las rutas disponibles. | Must have | Por hacer |
| **HU-11** | Como persona con baja visión, quiero controles visuales (alto contraste/zoom), para leer sin dificultad. | Must have | Por hacer |
| **HU-12** | Como excursionista, quiero ver mapas interactivos, para ubicarme fácilmente en el territorio. | Could have | Por hacer |
| **HU-13** | Como usuario interesado, quiero poder enviar un formulario que valide mis datos dinámicamente, para no enviar información errónea. | should have | Por hacer |
| **HU-14** | Como visitante, quiero acceder a las redes oficiales, para usarlas como canal de contacto complementario. | Must have | Por hacer |
| **HU-15** | Como visitante, quiero decidir si permito cookies de preferencias, para conservar mi modo oscuro y tamaño de texto sin entregar datos. | Should have | Por hacer |
| **HU-16** | Como desarrollador, quiero migrar la lógica JS a TypeScript, para reducir errores y mejorar la mantenibilidad. | Could have | Por hacer |
| **HU-17** | Como turista, quiero que las fichas se carguen desde una base de datos validada, para ver info actualizada. | Must have | Por hacer |
| **HU-18** | Como turista registrado, quiero guardar mis rutas favoritas, para consultarlas más tarde. | Could have | por discutir |
| **HU-19** | Como turista registrado, quiero organizar mis guardados en itinerarios por día, para planificar mi viaje. | Could have | por discutir |
| **HU-20** | Como usuario interesado, quiero recibir un boletín de eventos, para mantenerme actualizado voluntariamente. | Could have | por discutir |
| **HU-21** | Como usuario extranjero, quiero poder cambiar el idioma a inglés, para comprender las actividades disponibles. | Should have | Por hacer |
***
# Historias de Usuarios y Criterios de Aceptación - EcoRuta-Temuco

---

## Alineación con la visión del cliente y Requerimientos de Sprint 2

### Historias Prioritarias y Alineadas (Must Have)
Son indispensables y caen dentro del Sprint actual.
- **HU-01 y HU-02 (Turismo Sustentable):** Alta prioridad. El enfoque principal es dar visibilidad al emprendedor y parques.
- **HU-09 (Interactividad DOM):** Muestra el detalle de las rutas. esto se realizará mediante JS para no recargar la página.
- **HU-11 (Accesibilidad JS):** Cambio de estilos y clases en el DOM para controles visuales de accesibilidad.
- **HU-14 (Redes Sociales):** Habilitación de canales de contacto complementarios y oficiales.
- **HU-17 (Consumo de API):** Carga dinámica de emprendimientos usando una base de datos centralizada (MockAPI/Google Sheets) validando el estado "Publicado".

### Historias Valiosas pero no críticas (Should Have)
Aportan gran valor a la plataforma, pero el sitio puede funcionar inicialmente sin ellas.
- **HU-03 (Rutas para grupos):** el enfoque hacia las rutas, se alinea con el turismo sustentable en grupo.
- **HU-05 (Emergencias):** Válida en el ámbito de salud (directorio), catalogada como funcionalidad secundaria.
- **HU-12 (Mapas Interactivos):** Implementación referencial utilizando la alternativa de código abierto (OpenStreetMap).
- **HU-13 (Validación e Implementación de página de formulario):** Uso de JS para evitar envío de datos erróneos en la creación de envío de formulario.
- **HU-15 (Cookies de preferencias):** Preservar la configuración visual elegida por el usuario de manera segura.
- **HU-21 (Selector de Idioma):** Opción complementaria de accesibilidad (ES/EN) con persistencia de elección vinculada a HU-15.

### Mejoras Futuras (Could Have)
Aportan valor que se podría implementar, pero son prescindibles para el Sprint actual
- **HU-04 (Clima) y HU-12 (Mapas Interactivos):** Herramientas útiles de campo, aplazadas para futuras iteraciones.
- **HU-06 (Asilos personalizados):** Podría requerir almacenamiento local (`localStorage`) a futuro para guardar contactos específicos del usuario.
- **HU-16 (Migración a TypeScript):** Transición técnica progresiva para mejorar el tipado del código.
- **HU-18, HU-19, HU-20 (Registro de Usuarios):** Creación de cuentas, itinerarios personalizados, favoritos y newsletters.

### Fuera de Alcance (Won't Have)
Fuera de las restricciones del proyecto.
- **HU-07 (Buses):** No es el foco turístico de la aplicación.
- **HU-08 (Sucursal Valdivia):** Fuera del territorio regional (La Araucanía).

### Aprovechamiento de Casos Borde y Generación de Reglas
**¿Cómo aprovechar aquellas historias que no están encaminadas a la visión del cliente (como las descartadas o ajustadas) para mejorar la plataforma?**

- En lugar de dejarlas de lado, las utilizamos como fundamentos para la **Regla de Negocio (RN-02) y de Filtrado de Eventos**, estableciendo una relación estricta al uso correcto del término **Sustentable** que queremos promover en La Araucanía.

> 1. **Impacto Ambiental:** Promover el cuidado del entorno natural.
> 2. **Aporte Local:** Apoyar a comunidades o emprendimientos de La Araucanía.
> 3. **Relación con la Naturaleza:** Rutas, actividades al aire libre y concienciación al cuidado del medio.
> 4. **Cultura y Patrimonio:** Valorizar la identidad regional.
> 5. **Prácticas Responsables:** Iniciativas que fomenten un uso responsable de los recursos o reduzcan impactos negativos.
> 6. **Pertinencia territorial:** Que corresponda exclusivamente a la oferta turística de la región que EcoRuta pretende visibilizar.

*Nota Técnica (Sprint 2):* Se define que la responsabilidad de validar, filtrar y aprobar la publicación de eventos o emprendimientos que cumplan con estos 6 puntos recae sobre la actual Product Owner.
---

# Detalle Resumido de Historias (Sprint 2)

## Prioridad Alta (Must Have)

### HU-09: Detalle de rutas disponibles
- **Objetivo:** Mostrar información detallada de cada ruta disponible a los turistas de manera dinámica.
- **Criterios clave (Foco JS):**
> 1. [ ] Definir variables y escuchar el evento de clic (`addEventListener`) en los botones de las rutas.
> 2. [ ] Alterar la visibilidad del detalle modificando clases CSS desde JavaScript (`classList.toggle`).

### HU-11: Accesibilidad visual (baja visión)
- **Objetivo:** Controles interactivos para activar alto contraste y aumento de texto.
- **Criterios clave:**
> 1. [ ] Crear un menú desplegable pequeño con opciones de Tamaño de texto y Alto contraste. (actualmente está como botón)
> 2. [ ] Conservar la legibilidad de tarjetas sin desbordar el contenido en pantallas móviles al aplicar zoom.
> 3. [ ] Guardar las preferencias temporalmente sin exigir una cuenta de usuario, notificando su propósito.

### HU-14: Redes sociales oficiales (Contacto)
- **Objetivo:** Utilizar las redes oficiales del proyecto como canal complementario de contacto.
- **Criterios clave:**
> 1. [ ] Configurar enlaces a Facebook, Instagram y X verificados
> 2. [ ] Cumplir regla de salida segura (abrir en pestaña nueva con `target="_blank"`).

### HU-17: Catálogo Dinámico de Emprendimientos (Consumo API)
- **Objetivo:** Cargar las fichas de los emprendimientos desde una base de datos centralizada y validada.
- **Criterios clave:**
> 1. [ ] Implementar asincronía (`fetch`) para traer datos en formato JSON (Ej: Google Sheets o MockAPI).
> 2. [ ] Mostrar en el DOM únicamente los emprendimientos que posean el estado "Publicado".
> 3. [ ] Integrar manejo de errores (mostrar mensaje comprensible si la API falla, no pantalla en blanco).

## Prioridad Media (Should Have)

### HU-05: Contactos médicos de emergencia (Optimizado)
- **Objetivo:** Directorio visible, directo y seguro para reaccionar ante imprevistos.
- **Criterios clave:**
> 1. [ ] Permitir realizar llamadas directas al hacer clic en números desde dispositivos móviles (`tel:`).
> 2. [ ] Habilitar un botón para "Copiar número" al consultar la plataforma desde computadores de escritorio.
> 3. [x] Incluir el texto legal: *"Este panel es un directorio informativo... y no constituye una garantía de atención médica directa"*.

### HU-12: Mapas interactivos por ciudad (OpenStreetMap)
- **Objetivo:** Proveer orientación territorial integrando mapas de código abierto.
- **Criterios clave:**
> 1. [ ] Conectar la plataforma a la API de OpenStreetMap (Leaflet).
> 2. [ ] Mostrar ubicación general de atractivos o la distribución de comunas (Temuco, Pucón, Villarrica).

### HU-13: Implementación y validación dinámica de Formulario.
- **Objetivo:** página de formulario el cual debe validar sus campos antes de enviar los datos.
- **Criterios clave:**
> 1. [ ] Agregación del apartado de formulario en las rutas
> 2. [ ] Validar campos de texto vacíos (marcando en rojo si hay error)
> 3. [ ] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.

### HU-15: Cookies de preferencias de accesibilidad
- **Objetivo:** Guardar configuraciones del usuario (modo oscuro, zoom, idioma) de forma segura.
- **Criterios clave:**
> 1. [ ] Desplegar un aviso en la primera visita explicando el propósito de las cookies (solo accesibilidad, no publicidad).
> 2. [ ] Permitir al usuario aceptar o rechazar el almacenamiento de sus preferencias.
> 3. [ ] Aplicar la configuración guardada automáticamente al cambiar entre las vistas de Pucón, Temuco y Villarrica.

### HU-21: Selector de Idioma (Accesibilidad)
- **Objetivo:** Permitir al visitante extranjero cambiar el idioma del sitio de manera fácil.
- **Criterios clave:**
> 1. [ ] Implementar un control simple en el menú de accesibilidad para alternar entre Español (ES) e Inglés (EN).
> 2. [ ] Evitar recolección de datos personales, limitándose a aplicar traducciones dinámicas o redirecciones de layout.

## Prioridad Baja / Tareas Técnicas (Could Have)

### HU-16: Migración progresiva a TypeScript
- **Objetivo:** Aumentar la solidez del código mediante tipado estático.
- **Criterios clave:**
> 1. [ ] Crear `tsconfig.json` con configuración compatible con el navegador.
> 2. [ ] Convertir la lógica inicial (`layout.js`) definiendo interfaces para los botones del menú y enlaces del DOM.
> 3. [ ] Compilar y verificar que la accesibilidad siga funcionando sin errores de consola.