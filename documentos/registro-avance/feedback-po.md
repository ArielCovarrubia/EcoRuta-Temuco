# Registro de comentarios del Product Owner

---
* **Autor:** Beatriz Martin (Product Owner)
* **Objetivo:** Evaluar el avance del Sprint 2 a partir de la revisión de avance de QA (03/11/2026), incorporar las indicaciones del profesor de la clase del 05/11/2026 (React como primera prioridad), definir el contrato de datos de las rutas, los campos de la inscripción y la lista de APIs para la presentación de cierre.
* **Última actualización:** 06/11/2026
---

## Resumen general de los avances
- **Incremento aceptado:** La revisión de QA del 03/11/2026 calificó el incremento del Sprint 2 como *Aceptado*. Se cerraron BUG-04, BUG-05, BUG-06, BUG-08, BUG-09, BUG-10, BUG-11 e ISSUE-03, y se confirmó el cierre de ISSUE-02 y BUG-07.
- **Funcionalidades entregadas:** Buscador dinámico de rutas (HU-22), ruta recomendada del día (HU-10), clima en tiempo real con Open-Meteo (HU-04) y una suite de 26 pruebas unitarias en TypeScript.
- **GitHub Issues:** Se mantiene como canal oficial. Los issues #81 (BUG-12), #83 (BUG-13) y #84 (BUG-14) ya están corregidos o mitigados en código y falta que QA los verifique y cierre.
- **TypeScript (HU-16):** El 05/11 se completó la migración: cada `.js` de `js/` tiene su `.ts`.
- **Decisión del equipo (06/11/2026):** Las rutas se servirán desde una **API propia**, para que las tarjetas, el detalle y la inscripción se generen de forma dinámica desde un backend del equipo.
- **Indicaciones del profesor (05/11/2026):**
  1. **React es la primera prioridad**, junto con la reestructuración del proyecto. Todo cambio nuevo de esta semana se hace en React.
  2. Las rutas deben mostrar kilómetros, duración, punto de partida y punto de destino.
  3. No se crean páginas nuevas para el detalle: al presionar la tarjeta, esta se agranda y muestra el detalle de la ruta.
  4. Inscripción a una ruta, donde el usuario elige cuál quiere explorar.
  5. El clima se muestra al presionar, no de lleno junto a la tarjeta.
  6. El botón "Accesibilidad" pasa a ser un ícono de tres líneas que abre una barra lateral con Accesibilidad y Contacto.
  7. Para la presentación del Sprint 2 se debe tener la lista de APIs consumidas y los parámetros que se esperan en el backend.
---

## Priorización de Tareas (05/11 al 08/11)
Para mantener el foco operativo, el equipo deberá abordar el tablero siguiendo estrictamente este orden:
+ [ ] **Base React + TypeScript (HU-25) - Developer 1:** Tarea bloqueante; todo lo demás se construye encima.
+ [ ] **Contrato de datos (HU-23) - QA:** Publicar `src/types/ruta.ts` y el JSON de ejemplo con 3 rutas, para que los developers no esperen a la API.
+ [ ] **Campos de inscripción y textos de rutas - PO:** Definidos en este documento y en el backlog.
+ [ ] **API propia de rutas (HU-23) - QA + Developers:** Servidor Node.js + Express + TypeScript en `api/`, publicado, con los endpoints de este documento, y `src/services/rutasApi.ts` en el frontend.
+ [ ] **Menú lateral (HU-26) - Developer 1.**
+ [ ] **Ventana de detalle con clima al presionar (HU-09 / HU-04) - Developer 2.**
+ [ ] **Formulario de inscripción (HU-27) - Developer 2.**
+ [ ] **Presentación de cierre - Scrum Master + todo el equipo:** Incluir la lista de APIs de este documento.
---

## Aclaración clave sobre el Negocio y UX (Sprint 2)
* **Detalle de la ruta (HU-09):** La tarjeta muestra lo esencial (imagen, nombre, comuna, dificultad, descripción breve). Al presionarla se abre una ventana con todo lo demás. Al presionar fuera de ella se cierra y la página vuelve a quedar como estaba.
* **Qué debe aparecer al pedir más información de una ruta:** descripción completa, distancia (km), horas de senderismo, fecha y hora de inicio, punto de partida, punto de destino, atractivos, botón "Ver clima" y botón "Inscribirme".
* **Clima (HU-04):** Se consulta solo cuando el usuario presiona "Ver clima", usando las coordenadas del punto de partida. Esto también reduce las llamadas a la API. Si falla, se muestra "Clima temporalmente no disponible" (RN-05).
* **Buscador (HU-22):** Con el campo `horasSenderismo` ya se puede implementar la sugerencia según el tiempo disponible del usuario.
* **Ruta recomendada del día (HU-10):** Al presionarla se abre la misma ventana de detalle.
* **Menú lateral (HU-26):** Reúne Accesibilidad (tamaño de texto, alto contraste, modo oscuro, idioma) y Contacto (correo, teléfono, redes sociales). Reemplaza el botón con texto "Accesibilidad".
* **Filtro de Sustentabilidad (RN-02):** Se mantiene el sistema de 12 puntos. Solo se muestran emprendimientos y rutas con estado "Publicado", y la pertinencia territorial se aplica también a las rutas.
* **Clasificación de rutas (RN-07):** Dificultad y tipo de actividad salen de una lista cerrada, porque los filtros dependen de esos valores.
* **Privacidad y Cookies (HU-15):** El aviso funciona como capa modal sin tapar el botón de emergencias y explica que solo se guarda configuración visual.

**Información obligatoria:** Las características clave del sitio deben distribuirse dentro de varios apartados en el sitio web.
* Permitirle al usuario tener un acceso directo a los canales de contacto para que este último se pueda comunicar de buena manera con un emprendedor.
* Al momento que el usuario deba hacer procedimientos desde fuera de EcoRuta, la aplicación debe proporcionar un fácil retorno a la última interacción que tuvo el usuario.
* La comuna es una referencia territorial principal, donde a los usuarios les permitirá reconocer sectores vinculados a esta última.
* Definir los principales alcances que posee el término "Sustentable" dentro de la búsqueda e implementación de eventos en la plataforma.
* Discernir qué tipo de informaciones son principales al momento de consultar ciertos apartados de la aplicación web (relevancia de información en dispositivos móviles y computadoras).

---

## Contrato de datos de las rutas (HU-23)
El resto del equipo necesita saber cómo es una ruta antes de que la API esté lista. QA publica este contrato en `src/types/ruta.ts`:

```ts
export type Comuna = 'Temuco' | 'Pucón' | 'Villarrica';
export type Dificultad = 'Fácil' | 'Media' | 'Difícil';
export type TipoActividad =
  | 'Senderismo' | 'Trekking' | 'Cultura y Patrimonio' | 'Termas' | 'Deportes acuáticos';
export type EstadoPublicacion = 'Publicado' | 'Pendiente' | 'Rechazado';

export interface Ubicacion {
  nombre: string;      // ej. "Lago Tinquilco, acceso CONAF"
  latitud: number;
  longitud: number;
}

export interface Ruta {
  id: number;                    // lo asigna la API propia
  nombre: string;
  comuna: Comuna;
  imagen: string;
  altImagen: string;
  descripcionBreve: string;      // tarjeta (máx. ~120 caracteres)
  descripcionCompleta: string;   // ventana de detalle
  dificultad: Dificultad;
  tipoActividad: TipoActividad;
  distanciaKm: number;
  horasSenderismo: number;       // duración estimada, ej. 2.5
  fechaInicio: string;           // "AAAA-MM-DD", próxima salida
  horaInicio: string;            // "HH:MM"
  ubicacionInicio: Ubicacion;    // punto de partida (también para el clima)
  ubicacionFin: Ubicacion;       // punto de destino
  atractivos: string[];
  estado: EstadoPublicacion;
  puntajeSustentable: number;    // 0 a 12 (RN-02), mismo nombre que en /emprendedores
}
```

* Se usa `puntajeSustentable` y `estado` con los mismos nombres que ya tiene `/emprendedores`, para que ambas APIs sigan una misma convención.
* Si la ruta es circular, `ubicacionInicio` y `ubicacionFin` son iguales.
* Los textos (descripción breve, completa y atractivos) de las 11 rutas válidas están en el backlog. Distancia, horas, fechas y coordenadas las mide el equipo; no se cargan valores inventados.
* Lo que llega del `fetch` se valida antes de usarse como `Ruta`. Una ruta con campos faltantes se descarta y no rompe la página.

## API propia de rutas (HU-23)

### ¿Por qué una API propia?
* Las tarjetas, la ruta del día, la ventana de detalle y la inscripción se generan de forma dinámica a partir de un backend que controla el equipo.
* Permite validar los datos en el servidor (RN-02, RN-07) y recibir inscripciones sin exponer datos personales (RN-08), algo que MockAPI no permite.
* Deja la base lista para que usuarios registrados propongan rutas (HU-24).

### Tecnología y publicación
| Aspecto | Decisión |
| :--- | :--- |
| Lenguaje y framework | Node.js + Express con TypeScript (el equipo ya trabaja en TypeScript) |
| Ubicación en el repositorio | Carpeta `api/`, separada del frontend |
| Datos | Archivo `api/data/rutas.json` en Sprint 2; base de datos (ej. SQLite o PostgreSQL) cuando se agreguen usuarios |
| Publicación | Servicio que ejecute servidores, como Render. GitHub Pages solo publica archivos estáticos y no puede ejecutar la API |
| CORS | Permitir solo el dominio de GitHub Pages del proyecto y `localhost` para desarrollo |
| Respaldo | El frontend usa un JSON local si la API no responde. Los planes gratuitos suelen "dormir" el servidor y la primera respuesta puede tardar, por eso el "Cargando…" es obligatorio |

### Endpoints
| Método | Endpoint | Parámetros | Respuesta | Uso |
| :---: | :--- | :--- | :--- | :--- |
| `GET` | `/api/rutas` | Opcionales: `comuna`, `dificultad`, `tipoActividad`, `horasMax` | `200` con lista de `Ruta` publicadas | Tarjetas, buscador y ruta del día |
| `GET` | `/api/rutas/:id` | `id` en la URL | `200` con una `Ruta`, o `404` si no existe o no está publicada | Ventana de detalle (HU-09) |
| `POST` | `/api/inscripciones` | Cuerpo JSON con los campos de `Inscripcion` | `201` con `id` y `fechaRegistro`, o `400` con la lista de errores de validación | Inscripción (HU-27) |
| `POST` | `/api/rutas` | Cuerpo JSON con una `Ruta` | `201` con estado `Pendiente` | *Sprint 3* (HU-24), requiere usuarios registrados |

* El filtrado y la ruta del día se mantienen también en el frontend con `.filter()` (requisito de HU-22). Los parámetros de `/api/rutas` quedan disponibles para cuando el catálogo crezca.
* Toda respuesta de error tiene la misma forma: `{ "error": "mensaje legible" }`, para que el frontend muestre un mensaje claro.

---

## Campos de la inscripción a una ruta (HU-27)

### ¿Qué datos se piden?
| Campo | Tipo | Obligatorio | Validación |
| :--- | :--- | :---: | :--- |
| Ruta | lista de rutas publicadas | Sí | Viene seleccionada desde la ventana de detalle; se puede cambiar |
| Fecha de la salida | fecha | Sí | Se muestra la `fechaInicio` y `horaInicio` de la ruta; no se puede elegir una fecha pasada |
| Nombre completo | texto | Sí | Mínimo 3 caracteres, solo letras y espacios |
| Correo electrónico | correo | Sí | Formato válido (misma validación de HU-13) |
| Teléfono | texto | No | Formato chileno `+56 9 XXXX XXXX` |
| Cantidad de personas | número | Sí | Entre 1 y 10 (apoya HU-03, rutas para grupos) |
| Nivel de experiencia | lista (`Principiante`, `Intermedio`, `Avanzado`) | No | Si la ruta es `Difícil` y se elige `Principiante`, se muestra un aviso de seguridad, sin bloquear |
| Aceptación de condiciones | casilla | Sí | Texto: la inscripción es referencial, EcoRuta no es operador turístico y el usuario es responsable de su seguridad en terreno |

### ¿A dónde se envían?
**Decisión: se envían a la API propia con `POST /api/inscripciones` (regla RN-08).**
* La API valida los datos de nuevo en el servidor y responde `400` con los errores si algo no cumple.
* La API **no ofrece un `GET` público** de inscripciones, para que nadie pueda leer nombres, correos ni teléfonos de otros visitantes.
* Al recibir `201`, el frontend muestra un resumen ("Te inscribiste en *Santuario El Cañi* el 15/11 a las 09:00 para 2 personas") con `aria-live="polite"`.
* Si la API no responde, se avisa que la inscripción no pudo registrarse y se invita a intentar más tarde o a usar los canales de contacto.

Contrato sugerido para `src/types/inscripcion.ts`:

```ts
export type NivelExperiencia = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface Inscripcion {
  rutaId: string;
  fechaSalida: string;           // "AAAA-MM-DD"
  nombre: string;
  correo: string;
  telefono?: string;
  cantidadPersonas: number;      // 1 a 10
  nivelExperiencia?: NivelExperiencia;
  aceptaCondiciones: boolean;
}
```

---

## Lista de APIs consumidas y parámetros de backend (Presentación Sprint 2)

| API | Endpoint / Método | Estado | Parámetros que se envían | Datos que se esperan del backend | Uso en EcoRuta |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **MockAPI - Emprendedores** | `GET https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores` | En uso | Ninguno (se filtra en el frontend por `estado` y comuna) | `id`, `nombre`, `descripcion`, `ubicacion`, `whatsapp`, `redesSociales`, `puntajeSustentable`, `estado` | Catálogo de emprendimientos (HU-17) |
| **API propia - Rutas** | `GET /api/rutas`, `GET /api/rutas/:id` | En desarrollo | `comuna`, `dificultad`, `tipoActividad`, `horasMax` (opcionales); `id` | Todos los campos de la interface `Ruta`, solo publicadas | Tarjetas, buscador, ruta del día, detalle (HU-23, HU-22, HU-10, HU-09) |
| **API propia - Inscripciones** | `POST /api/inscripciones` | En desarrollo | Campos de `Inscripcion` en el cuerpo | `201` con `id` y `fechaRegistro`; `400` con errores | Inscripción a ruta (HU-27), sin `GET` público (RN-08) |
| **Open-Meteo** | `GET https://api.open-meteo.com/v1/forecast` | En uso | `latitude`, `longitude`, `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`, `timezone=America/Santiago` | Temperatura, humedad, sensación térmica, código del tiempo y viento | Clima al presionar "Ver clima" (HU-04). Sprint 3: agregar `daily` para el pronóstico |
| **OpenStreetMap (Leaflet)** | Teselas `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | En uso | Zoom y coordenadas del mapa | Imágenes del mapa | Mapas por comuna (HU-12) |
| **Traducciones (archivo propio)** | `GET data/idiomas.json` | En uso | Ninguno | Textos en `es` y `en` | Selector de idioma (HU-21) |

**Reglas del backend que se esperan (para mencionar en la presentación):**
* Todos los campos de `Ruta` son obligatorios salvo que se indique lo contrario; `distanciaKm` y `horasSenderismo` mayores a 0; `puntajeSustentable` entre 0 y 12.
* La API propia valida estas reglas en el servidor antes de guardar o devolver datos, y responde con códigos HTTP estándar (`200`, `201`, `400`, `404`, `500`).
* `comuna`, `dificultad`, `tipoActividad` y `estado` solo aceptan los valores de la lista (RN-07).
* El frontend nunca muestra registros con estado distinto de "Publicado" (RN-02).
* Toda respuesta con error (`!respuesta.ok`) se maneja en `try/catch` con un mensaje en pantalla (RN-05).

---

## Resultados de Planning Poker y Percepción del equipo de desarrollo (21/10/2026)
Durante la jornada se evaluó la dificultad técnica de la implementación del consumo de la API (asociada a la HU-17), utilizando una escala del 1 (muy sencillo) al 5 (muy difícil).
### Resultados:
> 2, 3, 3, 4, 4 --> se obtuvo un promedio del 3.2 de dificultad
* **Análisis de dificultad:** El equipo coincide en que la lógica en sí no es intrínsecamente difícil, pero la complejidad radica en la falta de experiencia previa uniendo Frontend con Backend. El rigor sintáctico de los endpoints y el hecho de construir el frontend antes que el backend (flujo inverso al habitual) ha generado cierta confusión.
* **Mitigación:** Los desarrolladores reportan que, aunque es riguroso, el objetivo es alcanzable con el apoyo de tutoriales e Inteligencia Artificial.
* **Aplicación a HU-23:** Construir una API propia sube la dificultad respecto de MockAPI, porque el equipo ahora también hace el backend. Publicar primero el contrato y un JSON de ejemplo permite que los developers avancen sin esperar a la API, y se recomienda reestimar HU-23 en Planning Poker.

### Percepción del avance del Sprint
- El equipo siente que el avance del código va bien, pero que el ritmo de este Sprint se percibe más lento en comparación al Sprint 1, debido a que la página ya se encuentra en un estado bastante avanzado y ahora requiere ajustes finos.
- Se levantó la observación de que, a nivel de experiencia de desarrollo, tal vez faltan más ciudades o vistas para implementar y testear las nuevas funcionalidades.
- *Acuerdo Acta 9:* los 5 integrantes se involucran más en el código; los developers distribuyen su tiempo en 60% código y 40% otras tareas.
- *Riesgo:* la migración a React coincide con la semana de la presentación. Se recomienda que la presentación muestre lo que alcance a estar en React y deje explícito qué funciones siguen en la versión anterior.
---

## Solicitudes y observaciones por rol

* **Para Developers (@CarlosMeléndez / @LisetteDelgado):**
    - [**Developer 1 - Prioridad bloqueante:** Base React + TypeScript con Vite, carpetas `src/components`, `src/services`, `src/types`, reutilizando `style.css`, con `App.tsx` funcionando y despliegue en GitHub Pages documentado en el README].
    - [**Developer 1:** Componente `MenuLateral` con botón de tres líneas, secciones Contactos y Accesibilidad, cierre con clic fuera y `Esc`].
    - [**Developer 2:** Componente `DetalleRutaModal` con `role="dialog"`, `aria-modal="true"`, foco atrapado, devolución del foco y bloqueo del scroll de fondo].
    - [**Developer 2:** Componente `FormularioInscripcion` con los campos definidos arriba, reutilizando la validación de HU-13].
    - [Mientras la API no esté lista, trabajar con el JSON de ejemplo que publique QA].

* **Para QA/Tester (@ArielCovarrubia):**
    - [Publicar `src/types/ruta.ts` con el contrato de este documento y un JSON de ejemplo con 3 rutas reales (una por comuna)].
    - [Liderar la API propia en `api/` (Node.js + Express + TypeScript) junto a los developers, publicarla y crear `src/services/rutasApi.ts` con `async/await` + `fetch` tipado y `try/catch` que devuelva un error controlado].
    - [Probar con Postman o Thunder Client cada endpoint: respuestas `200`, `404` con un id inexistente y `400` con una inscripción incompleta].
    - [Verificar BUG-12 (ya existe `normalizarTexto()`) y cerrar el issue #81 si corresponde].
    - [Probar en GitHub Pages bloqueando las URL de la API propia, MockAPI y Open-Meteo en DevTools para comprobar los mensajes de error y el respaldo local].
    - [Verificar y cerrar los issues #83 (BUG-13) y #84 (BUG-14), corregidos en el commit `ba2d6d6`].

* **Para Product Owner (@BeatrizMartin):**
    - [x] [Documentar HU-10, HU-23, HU-25, HU-26 y HU-27 en el Backlog y la matriz de historias].
    - [x] [Validar la dificultad y el tipo de actividad de cada ruta].
    - [x] [Definir los campos de la inscripción y a dónde se envían].
    - [x] [Escribir la descripción breve, completa y los atractivos de las rutas válidas].
    - [ ] [Definir las rutas de reemplazo para Temuco (2) y Villarrica (1), y confirmar el Mirador Bellavista].
    - [ ] [Confirmar con el profesor si React + Vite cumple el entregable de "`.ts` junto a sus `.js`"].

* **Para Scrum Master (@PatricioSalazar):**
    - [Asignar los roles y temas de la presentación de cierre del Sprint 2, incluyendo la lista de APIs y parámetros de backend].
    - [Coordinar quién publica la API propia y dónde, y compartir su URL con el equipo].
    - [Coordinar apoyo técnico si la migración a React genera cuellos de botella].
    - [Garantizar que el uso de GitHub Issues se mantenga como el canal oficial de comunicación técnica].
---

## Consideraciones Futuras para la evolución del proyecto
De cara a la evolución a largo plazo de EcoRuta, se documentan las siguientes consideraciones levantadas junto al cliente que no forman parte de la iteración actual:
- **Fidelización de Usuarios (HU-18, HU-19, HU-20):** Se contempla a futuro implementar un sistema de registro donde los usuarios puedan guardar sus rutas favoritas, crear itinerarios personalizados y suscribirse a un newsletter de eventos sustentables.
- **Panel de inscripciones:** Vista protegida con usuario y contraseña para que el equipo administrativo consulte las inscripciones recibidas por la API propia.
- **Publicación de rutas por usuarios (HU-24):** Propuesta del profesor. Requiere registro de usuarios y `POST` en la API de rutas, con revisión del PO antes de publicar.
- **Pronóstico extendido y mapa por ruta:** Pronóstico de los días siguientes en el detalle de cada ruta (propuesta del PO) y marcadores de partida y destino en el mapa (propuesta de Carlos, Acta 9).
- **Escalabilidad de Base de Datos:** Cuando el proyecto pase a producción, se recomienda migrar los emprendedores desde MockAPI a la API propia y evaluar un CMS Headless (ej. Strapi) o una base de datos relacional (ej. Supabase/PostgreSQL) para dotar al equipo administrativo de una interfaz segura.
