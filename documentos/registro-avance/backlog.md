# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio Web Accesible e Interactivo EcoRuta-Temuco

**Organización:** The Frontend Dropout
---
- **Product Owner:** Beatriz Martin
- **QA / Tester:** Ariel Covarrubia
- **Developers:** Lissete Delgado & Carlos Meléndez
- **Scrum Master:** Patricio Salazar
- **Fecha de Última Actualización:** 11/11/2026
---

### Resumen de Estado del Proyecto (Cierre del Sprint 2)

-- **Estado General:** El Sprint 2 se cierra con el incremento final **Aceptado al 100%** por el equipo de QA. La funcionalidad principal está operativa en la versión HTML/TypeScript, y la **API propia** (Node.js + Express + TypeScript) está construida, probada y conectada al frontend React. El PR «feat(api): connect backend API with react frontend and configure vite proxy» se integró a `main` el 11/11/2026. Lo que pasa al Sprint 3 como primera prioridad es **completar el traslado de las vistas a React usando React Router** y desplegar el backend en la nube.
- **Balance de historias (27 en total):** 14 *Hechas*, 6 *En progreso* (arrastradas al Sprint 3) y 7 *Won't have* (HU-06, 07, 08, 18, 19, 20 y 24).
- **Entregable del Sprint 2:**
  - Todo el código JS migrado a TypeScript (HU-16): **cumplido**. Compilación frontend (Vite) y backend (Express) exitosa con 0 errores.
  - Rutas obtenidas desde una API (HU-23): **cumplido**. La API propia en `api/` tiene endpoints validados (GET, POST con código 403 para listado público). Frontend consume API con interfaz `ResultadoRutas` y conmuta a respaldo JSON si hay fallo (RN-05). 
  - Verificación de QA: 28/28 pruebas unitarias aprobadas, 7/7 pruebas de contrato, 8/8 pruebas de endpoints. Lighthouse marca 100 en SEO, 92 Buenas Prácticas, 91 Accesibilidad, y axe DevTools reporta 0 incidencias.
- **Decisión de cierre sobre alcance:** las historias que implican guardar datos de usuarios o cuentas (HU-06, 18, 19, 20 y 24) pasan a *Won't have*. La plataforma se mantiene **sin registro de usuarios**, en línea con RN-06 y RN-08. Lo rescatado está en `historia-de-usuarios.md`.
- **Validación de Cliente (Entrevista 2):** Aprobada línea gráfica, colores, disposición en cuadrícula y canales de redes sociales. Aprobada la pertinencia del buscador y herramientas de clima.
- **Refinamiento de Alcance:** Se mantiene sistema de 12 puntos para sustentabilidad antes de publicar (RN-02).
- **Hitos logrados:** Buscador dinámico (HU-22), ruta del día determinista (HU-10), clima Open-Meteo (HU-04), menú lateral React (HU-26), detalle modal (HU-09), API propia conectada a React, y cierre del Bug Bounty (BUG-04 al BUG-14).

---
## Validación Técnica y Estándares de Calidad
Todas las implementaciones deben cumplir obligatoriamente con los siguientes estándares antes de pasar a la revisión de QA o del Product Owner:
* **React + TypeScript:** Todo componente nuevo se escribe como `.tsx` dentro de `src/components`. Se usa el estado de React sin manipular DOM directo. Se informa origen de datos mediante insignia (`🟢 API conectada` o `🟡 Usando respaldo local`).
* **Consumo de APIs:** Uso de `async/await` con `try/catch`. Los datos recibidos se validan con su interfaz. El POST de inscripciones valida en servidor y nunca se expone en GET público.
* **Accesibilidad Continua (WAI-AA):** Componentes dinámicos mantienen navegabilidad por teclado (`Tab`, `Enter`, `Esc`) y estados ARIA (`aria-expanded`, `aria-live`).
* **Calidad de Código:** La compilación debe funcionar en GitHub Pages. 100% de pruebas unitarias TypeScript deben aprobar (actual 28/28).
* **Rendimiento:** 100% imágenes migradas a WebP con `loading="lazy"`. APIs secundarias se consultan bajo demanda.
* **Datos personales en repositorio:** Ningún dato de inscripciones de prueba se versiona en Git (BUG-15).
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
* **RN-08 (Datos de Inscripción):** Los datos personales de una inscripción (nombre, correo, teléfono) solo se envían a la API propia mediante  `POST /api/incripciones`. La API **nunca expone públicamente** el listado de inscripciones (no existe un `GET` abieto), valida los datos también en el servidor y guarda solo los campos definidos. Si la API no está disponible, el formulario muestra la confirmación en pantalla sin guardar nada.
---

## Resultado de las Tareas del Sprint 2

| Orden | Tarea | Historia | Resultado | Observación de cierre |
| :---: | :--- | :---: | :---: | :--- |
| 1 | Base del proyecto en React con TypeScript | HU-25 | **Parcial** | Vite + React funcionando sin errores. Faltan vistas por comuna (React Router) y corregir imágenes en build (BUG-20). |
| 2 | Contrato de datos `src/types/ruta.ts` y JSON de ejemplo | HU-23 | **Completada** | Contrato publicado; 11 rutas reales. |
| 2b | API propia en `api/` y conexión con React | HU-23 | **Completada** | Backend Express con 8/8 pruebas aprobadas. Conectada a frontend; queda restringir CORS (BUG-18). |
| 3 | Campos de inscripción y textos de rutas | HU-27 / HU-23 | **Completada** | Definidos por el PO. |
| 4 | Datos en la API y `src/services/rutasApi.ts` | HU-23 | **Completada** | Retorno con interfaz `ResultadoRutas` (API vs respaldo). |
| 5 | Menú de tres líneas con barra lateral | HU-26 | **Completada** | Accesible por teclado (`Tab`, `Esc`). Falta idioma en React. |
| 6 | Ventana emergente con detalle y clima al presionar | HU-09 / HU-04 | **Parcial** | Modal lista en HTML. Faltan en React y botón de clima dinámico. |
| 7 | Formulario de inscripción | HU-27 | **Parcial** | Conectado a API React con advertencia de seguridad probada. Falta integrarlo al modal en React. |
| 8 | Lista de APIs y parámetros para la presentación | — | **Completada** | En `feedback-po.md`. |
| 9 | Verificar y cerrar issues #81, #83 y #84 | — | **Cerrados** | Verificados y cerrados por QA. |

---

## Priorización de Tareas del Sprint 3
*Actualizado en base a QA y requerimientos de arquitectura del Sprint 3.*

| Orden | Tarea | Historia | Depende de |
| :---: | :--- | :---: | :---: |
| 1 | **Migración completa de vistas a React usando React Router**. | HU-25 | — |
| 2 | **Restringir CORS de la API y documentar ejecución local**. | HU-23 | — |
| 3 | **Despliegue del Backend en la Nube** (Render, Railway o AWS). | Arquitectura | 2 |
| 4 | **Persistencia Avanzada de Inscripciones** en Base de Datos (SQLite/PostgreSQL). | HU-27 / RN-08 | 3 |
| 5 | Corregir imágenes en el build de React y despliegue GitHub Pages (BUG-20). | HU-25 | 1 |
| 6 | Trasladar cookies, idioma, emergencias, emprendedores y mapa a React. | Varias | 1 |
| 7 | Componente `DetalleRutaModal` en React con datos de API. | HU-09 | 1 |
| 8 | Botón "Ver clima" interactivo dentro de la ventana de detalle. | HU-04 | 7 |
| 9 | Formulario "Inscribirme" en la ventana modal (cupos 1-10, validar teléfono). | HU-27 | 7 |
| 10 | Ruta del día vinculada al detalle modal con respaldo local. | HU-10 | 7 |
| 11 | Sugerencia por tiempo disponible (`horasSenderismo`). | HU-22 | 1 |
| 12 | Marcadores partida/destino mapa; pronóstico extendido clima. | HU-12 / 04 | 7 |
| 13 | Limpieza técnica: retirar rutas antiguas de JS, endpoint POST /api/rutas abierto y json de pruebas. | Mantenimiento | — |

---

### Validación del Catálogo de Rutas
La API ya incorpora las correcciones (06/11/2026). La versión HTML antigua (`js/rutas.ts`) todavía conserva errores (se limpiará en Sprint 3).

| ID original | Ruta | Resultado de la validación | Estado al cierre en la API |
| :---: | :--- | :---: | :--- |
| 1 | Cerro Ñielol | Válida | Cargada (id 1) |
| 2 | Parque Nacional Huerquehue | Corregir comuna a `Pucón` | **Corregida** (id 3) |
| 3 | Reserva Nacional Malalcahuello | Reemplazar (Curacautín) | **Retirada**; reemplazo pendiente |
| 4 | Isla Cautín | Válida | Cargada (id 2) |
| 5 | Monumento Cerro Ñielol | Duplicada de la ruta 1 | **Retirada**; reemplazo pendiente |
| 6 | Salto La China | Válida | Cargada (id 4) |
| 7 | Termas de Huife | Actividad a `Termas` | **Corregida** (id 5) |
| 8 | Ojos del Caburgua | Válida | Cargada (id 6) |
| 9 | Reserva Nacional Cañi | Nombre: Santuario El Cañi | **Corregida** (id 7) |
| 10 | Cañón del Río Trancura | Actividad a `Deportes` | **Corregida** (id 8) |
| 11 | Costanera de Villarrica | Válida | Cargada (id 9) |
| 12 | Museo Histórico y Arqueológico | Actividad a `Cultura` | **Corregida** (id 10) |
| 13 | Feria Costumbrista Mapuche | Actividad a `Cultura` | **Corregida** (id 11) |
| 14 | Termas Geométricas | Reemplazar (Los Ríos) | **Retirada**; reemplazo pendiente |
| 15 | Mirador Bellavista | Por confirmar | **No cargada** |

### Textos de las rutas cargados en la API (PO)

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
---

## Historias de Usuarios Reenfocadas y Criterios de Aceptación (Estado al cierre del Sprint 2)

### [HU-25] Migración a React con TypeScript
* **Prioridad (MoSCoW):** Must have | **Estado:** En progreso → **Sprint 3**
* **Historia:** Como equipo de desarrollo, queremos reestructurar el sitio en React con TypeScript, para construir componentes reutilizables y facilitar los cambios pedidos.
* **Criterios de Aceptación:**
  - [x] Proyecto React + TypeScript (Vite) con `src/components`, `src/services`, `src/types` compilando sin errores.
  - [x] Reutilizar `style.css` para línea gráfica.
  - [x] `App.tsx` carga rutas desde la API y maneja conmutación con insignia `🟢 API conectada` o `🟡 Usando respaldo local`.
  - [ ] Vistas de Temuco, Pucón y Villarrica usando **React Router**.
  - [ ] Trasladar componentes funcionales faltantes y verificar build de imágenes.
  - [x] Documentación en README.

### [HU-04] Consumo de API Externa (Clima) - Reenfocada
* **Prioridad (MoSCoW):** Must have | **Estado:** En progreso → Sprint 3
* **Historia:** Como estudiante de meteorología, quiero ver info climática, para planificar mis salidas a terreno.
* **Criterios de Aceptación:**
  - [x] Consumo asíncrono de Open-Meteo inyectando datos y traducción al español.
  - [x] Mensaje visual de error si falla.
  - [x] Contraste en widget meteorológico corregido (ratio > 4.5:1, BUG-14).
  - [ ] Interactivo: aparece al presionar "Ver clima" dentro del detalle modal.

### [HU-09] Detalle de la ruta en ventana emergente - Reenfocada
* **Prioridad (MoSCoW):** Must have | **Estado:** En progreso → Sprint 3
* **Historia:** Como turista, quiero presionar una tarjeta de ruta y ver todo su detalle en una ventana más grande dentro de la misma página.
* **Criterios de Aceptación:**
  - [ ] Componente `DetalleRutaModal` completo.
  - [ ] Botones interactivos internos ("Ver clima", "Inscribirme").
  - [x] Funciones de modal accesibles (`role="dialog"`, atrapamiento de foco, bloqueo de scroll) operativas en versión HTML.
  - [ ] Eliminar páginas HTML legacy y campo `urlDetalle`.

### [HU-11] Menú Avanzado de Accesibilidad
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho
  - [x] Opciones de zoom y contraste trasladadas al menú lateral (HU-26). Botones con `aria-pressed` evitan BUG-07 en TalkBack.

### [HU-12] Mapas Interactivos (OpenStreetMap)
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho 
  - [x] Mapas Leaflet configurados con `leaflet-gesture-handling` (`gestureHandling: true`) para evitar scroll trap (BUG-10).

### [HU-13] Implementación y validación dinámica de Formulario
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho
  - [x] Validaciones de DOM en vivo portadas e integradas al formulario de inscripción HU-27.

### [HU-14] Enlaces Oficiales de Redes Sociales
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho
  - [x] Salida segura en todas redes y API WhatsApp (`target="_blank" rel="noopener noreferrer"`) solucionando BUG-09.

### [HU-15] Cookies de preferencias y [HU-21] Idioma
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho
  - [x] Overlay de privacidad modal implementado con `z-index: 10001` y `inset: 0` resolviendo solapamientos de UI (BUG-04).
  - [ ] *(Sprint 3)* Trasladar estados al store de React.

### [HU-16] Migración completa a TypeScript (Entregable)
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho
  - [x] Tipado estricto en frontend y backend validado con 0 errores de compilación.
  - [x] Suite de 28 pruebas unitarias aprobadas al 100%.

### [HU-17] Catálogo Dinámico de Emprendimientos (Consumo API)
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho (por mostrar en React)
  - [x] Consumo asíncrono MockAPI y cálculo de 12 puntos de sustentabilidad testeados y aprobados (RN-02).

### [HU-22] Buscador y Generador Dinámico de Rutas
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho 
  - [x] Buscador multicriterio en vivo con sensibilidad a tildes remediada mediante `normalizarTexto` (BUG-12 validado en tests).

### [HU-10] Ruta Recomendada del Día
* **Prioridad (MoSCoW):** Should have | **Estado:** Hecho 
  - [x] Algoritmo determinista y agnóstico a mayúsculas aprobado en tests.

### [HU-23] API Propia de Rutas *(Entregable)*
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho (CORS por restringir)
  - [x] API Node.js/Express en `api/` con 8/8 pruebas de endpoints aprobadas.
  - [x] Proxy en Vite operativo y tolerancia a fallos mediante interfaz `ResultadoRutas`.
  - [ ] *(Sprint 3)* Despliegue en la Nube y configuración estricta de CORS.

### [HU-26] Menú de tres líneas con barra lateral
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho
  - [x] Componente `MenuLateral.tsx` operable por teclado (`Tab`, `Escape`).

### [HU-27] Inscripción a una ruta
* **Prioridad (MoSCoW):** Must have | **Estado:** Hecho
  - [x] Formulario `FormularioInscripcion.tsx` integrado a POST backend, poblando select de rutas dinámicamente y bloqueando fechas pasadas.
  - [x] Restricción y privacidad RN-08 validada en servidor HTTP.

## Historias de Usuario Base y Reenfocadas
* **[HU-01]** Emprendimientos: En progreso → Sprint 3.
* **[HU-02]** Parque Nacional Villarrica: Hecho.
* **[HU-03]** Recomendaciones : Hecho (Límite 1 a 10 en HU-27).
* **[HU-05]** Contactos médicos de emergencia: Hecho. Atributo `aria-label` resolvió BUG-11.

---

## Historias Desestimadas / Fuera de Alcance (Won't Have)
Historias descartadas por exigir cuentas de usuario y almacenamiento de datos personales (contradice RN-06 y RN-08). **No tienen criterios de aceptación.** Lo rescatado se documenta en `historia-de-usuarios.md`.
* **[HU-06] Almacenamiento de contactos de asilos.**
* **[HU-07] Horarios de Buses Interurbanos.**
* **[HU-08] Publicidad de Sucursales Comerciales (Valdivia).**
* **[HU-18] Favoritos.**
* **[HU-19] Itinerarios.**
* **[HU-20] Newsletter.**
* **[HU-24] Publicación de rutas por usuarios registrados.**

---

## Control de Bugs e Incidencias (Actualizado al 11/11/2026 - QA Sprint 2)

| ID | Incidencia / Hallazgo | Prioridad | Estado QA | Observación de Auditoría |
| :---: | :--- | :---: | :---: | :--- |
| **ISSUE-02** | Metadatos SEO | **Media** | **Resuelto** | 100/100 en Lighthouse SEO. Etiquetas `<meta>` operativas. |
| **ISSUE-03** | Optimización de imágenes | **Media** | **Resuelto** | 100% migradas a `.webp` con lazy loading. |
| **BUG-04** | Cookies tapan emergencias | **Alta** | **Resuelto** | Overlay fijo implementado con `z-index: 10001`. |
| **BUG-05** | Header desalineado | **Media** | **Resuelto** | Botones desacoplados mediante CSS absoluto. |
| **BUG-06** | Expansión del header | **Alta** | **Resuelto** | Menú de accesibilidad fijado como flotante. |
| **BUG-07** | Lectura corrida (A11y) | **Alta** | **Resuelto** | Componentes discretos con `aria-live="polite"`. |
| **BUG-08** | Conflicto escala CSS | **Baja** | **Resuelto** | Tipografía unificada a porcentajes en HTML. |
| **BUG-09** | Enlace WhatsApp inseguro | **Media** | **Resuelto** | Salida segura `noopener noreferrer` (RN-01) inyectada. |
| **BUG-10** | Scroll atrapado en mapas | **Media** | **Resuelto** | Leaflet incluye `gestureHandling: true` (WCAG 2.1.2). |
| **BUG-11** | Botón flotante sin A11y | **Media** | **Resuelto** | Etiqueta `aria-label` asignada; axe 0 problemas. |
| **BUG-12** | Sensibilidad a tildes | **Media** | **Resuelto** | Normalización (`.normalize('NFD')`) validada en unit tests. |
| **BUG-13** | Pérdida de tarjetas `data-id`| **Media** | **Resuelto** | Tarjetas de React mapeadas directo de `Ruta[]`. |
| **BUG-14** | Contraste de API badges | **Media** | **Resuelto** | Clases semánticas (ej. `.badge-api-conectada`) cumplen ratio AA. |
| **BUG-15** | Data prueba `inscripciones` | **Alta** | **Abierto** | Retirar archivo JSON del repositorio por privacidad. |
| **BUG-16** | Límite cupos desfasado | **Media** | **Abierto** | Corregir límite 1-10 personas. |
| **BUG-17** | URL MockAPI duplicada | **Media** | **Abierto** | Unificar ruta externa. |
| **BUG-18** | CORS Permisivo | **Media** | **Abierto** | Limitar backend a frontend en producción. |
| **BUG-19** | Datos antiguos JS (15 rts) | **Media** | **Abierto** | Borrar arrays legacy. |
| **BUG-20** | Imágenes rotas build Vite | **Alta** | **Abierto** | Corregir referencias relativas. |
| **BUG-21** | `POST /rutas` expuesto | **Media** | **Abierto** | Remover código inútil de HU-24. |

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
* **06/11/2026 (Sprint 2):** Integración de la revisión de avance de QA (*Aceptado*): se cierran BUG-04, BUG-05, BUG-06, BUG-08, BUG-09, BUG-10, BUG-11 e ISSUE-03, se confirma el cierre de ISSUE-02 y BUG-07, y se registran BUG-12, BUG-13 y BUG-14. Validación del PO de la comuna, dificultad y tipo de actividad de las 15 rutas (3 con comuna incorrecta, 1 duplicada y 4 con actividad mal clasificada) y carga de los textos de 11 rutas. Se incorporan las indicaciones del profesor: React con TypeScript pasa a primera prioridad (HU-25), se reenfocan HU-09 (detalle en ventana emergente) y HU-04 (clima al presionar), y se agregan HU-10 (ruta recomendada del día), HU-23 (API propia de rutas), HU-24 (publicación de rutas por usuarios, Sprint 3), HU-26 (menú de tres líneas con barra lateral) y HU-27 (inscripción a ruta), junto con RN-07 y RN-08. HU-16 queda como *Hecho* tras la migración de todos los `.js` a `.ts`, y BUG-13 y BUG-14 quedan corregidos en código. El equipo decide construir una **API propia** para las rutas (Node.js + Express + TypeScript) en lugar de MockAPI, y la inscripción se enviará a esa API (RN-08). Se define la lista de APIs para la presentación.
* **11/11/2026 (Cierre del Sprint 2):** Proyecto clasificado como **Aceptado al 100%** por el equipo de QA. Resolución exitosa de la totalidad del Bug Bounty previo. Pruebas automáticas y Lighthouse avalan solidez técnica. Se orienta el Sprint 3 a React Router, despliegue cloud de Node.js y base de datos relacional para inscripciones.

### Compromiso de Cierre del Product Owner (Sprint 1) `@CarlosMeléndez`
* Se da por finalizado el levantamiento inicial del Sprint 1. Los ajustes de rutas relativas hacia alguno de los bugs pendientes a resolver y el desarrollo de componentes del Sprint 2 quedan delegados a la célula de desarrollo.
* Las historias de usuario base se mantienen como la guía de aceptación para la QA Tester y la nueva Product Owner (`@BeatrizMartin`).

### Compromiso de Cierre del Product Owner (Sprint 2) `@BeatrizMartin`
- Se da por finalizado el procedimiento del sprint 2. la implementación de API y React se toman a gran consideración para configuraciones futuras y el pulimiento de de la página durante el sprint 3 quedan delegados a los siguientes developers.
- las historias de usuario fueron creciendo y considerados como guía para el seguimiento de todas ls implementaciones y se esperan en consideración para poder terminar de pulir la página como guía de aceptacón para el QA Teste y nuevo Product Owner (`ArielCovarrubia`)
