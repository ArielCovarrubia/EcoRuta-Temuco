# Registro de comentarios del Product Owner

---
* **Autor:** Beatriz Martin (Product Owner)
* **Objetivo:** Evaluar el avance del Sprint 2 a partir de la revisión de avance de QA (03/11/2026), incorporar las indicaciones del profesor de la clase del 05/11/2026 (React como primera prioridad), definir el contrato de datos de las rutas, los campos de la inscripción y la lista de APIs para la presentación de cierre.
* **Última actualización:** 11/11/2026
---

## Resumen general del cierre del Sprint 2
- **Evaluación del PO:** El incremento del Sprint 2 se cierra como **Aceptado al 100%** apoyado por la auditoría técnica de QA. La API propia quedó probada y conectada a React mediante proxy Vite. 
- **Auditoría Técnica:** QA validó 28/28 pruebas unitarias frontend, 7/7 de contrato, y 8/8 de backend (100% efectividad). Lighthouse reportó 100 en SEO y axe DevTools 0 incidencias.
- **Cierre de incidencias (Bug Bounty):** Todos los tickets heredados (ISSUE-02 al 03 y BUG-04 al 14) fueron solucionados, auditados en código y **cerrados formalmente**.
- **Decisión de alcance:** HU-06, 18, 19, 20 y 24 permanecen firmes como *Won't have*. La plataforma no tendrá gestión de usuarios.

## Aclaración clave sobre Negocio, Arquitectura y UX
* **Transición Definitiva a React:** Con la base estabilizada y testeada, todo desarrollo futuro será bajo **React Router**.
* **Despliegue y Base de Datos:** La API debe moverse a un entorno productivo en la nube (Render, AWS, Railway) y las inscripciones deben dejar el JSON local para migrar a una base de datos relacional persistente (SQLite/PostgreSQL).
* **Resiliencia (RN-05):** QA corroboró que el frontend alerta correctamente `🟢 API conectada` o `🟡 Usando respaldo local` ante fallos externos. Este patrón debe mantenerse.
* **Privacidad estricta:** Reitero retirar `api/data/inscripciones.json` de Git (BUG-15).
* **Validaciones Inteligentes:** El selector del formulario poblado automáticamente y la alerta reactiva a usuarios principiantes fueron validados positivamente.
---

## Priorización de Tareas del Sprint 3
| Prioridad | Tarea Estructural | Asignación sugerida |
| :---: | :--- | :--- |
| 1 | **Migrar vistas a React Router** | Developers |
| 2 | **Desplegar el Backend en la Nube (AWS/Render)** | Desarrolladores Backend / QA |
| 3 | **Persistencia Avanzada en BD (SQLite/PostgreSQL)** | Developers |
| 4 | Restringir el CORS de la API (BUG-18) | QA / Developers |
| 5 | Corregir imágenes de React Pages (BUG-20) | Developers |
| 6 | Integrar `DetalleRutaModal` React con botones hijos | Developers |
| 7 | Limpieza legacy HTML y remoción de data expuesta | QA |
---

## Contrato de datos de las rutas (HU-23)
Publicado en `src/types/ruta.ts` y auditado con éxito al 100% en las pruebas de tipado y validación de atributos:


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
| Lenguaje y framework | Node.js + Express con TypeScript |
| Ubicación en el repositorio | Carpeta `api/`, separada del frontend |
| Datos | Archivo `api/data/rutas.json` en Sprint 2; base de datos (ej. SQLite o PostgreSQL) cuando se agreguen usuarios |
| Publicación | Servicio que ejecute servidores, como Render. GitHub Pages solo publica archivos estáticos y no puede ejecutar la API |
| CORS | Permitir solo el dominio de GitHub Pages del proyecto y `localhost` para desarrollo |
| Respaldo | El frontend usa un JSON local si la API no responde. Los planes gratuitos suelen "dormir" el servidor y la primera respuesta puede tardar, por eso el "Cargando…" es obligatorio |

### Endpoints (Testeados por QA)
| Método | Endpoint | Parámetros | Respuesta | Uso |
| :---: | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/rutas` | Opcionales: `comuna`, `dificultad`, `tipoActividad`, `horasMax` | `200` con lista de `Ruta` publicadas | Tarjetas, buscador y ruta del día |
| `GET` | `/api/v1/rutas/:id` | `id` en la URL | `200` con una `Ruta`, `400` si el ID no es numérico, o `404` si no existe | Ventana de detalle (HU-09) |
| `POST` | `/api/v1/inscripciones` | Cuerpo JSON con los campos de `Inscripcion` | `201` con `id` y `fechaRegistro`, o `400` con la lista de errores | Inscripción a ruta (HU-27) |
| `GET` | `/api/v1/inscripciones` | — | `403` (El listado de inscripciones es privado por cumplimiento estricto de la regla RN-08) | — (Protegido) |
| `GET` | `/api/health` | — | `200` con `{ status: "ok" }` | Verificación del estado de salud del servicio |

* El filtrado y la ruta del día se mantienen también en el frontend con `.filter()` (requisito de HU-22).
* Toda respuesta con error tiene la misma forma: `{ "error": "mensaje legible" }`, asegurando que el frontend muestre un aviso claro al usuario (RN-05).
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
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MockAPI - Emprendedores** | `GET https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores` | En uso | Ninguno (se filtra en el frontend por `estado` y comuna) | `id`, `nombre`, `descripcion`, `ubicacion`, `whatsapp`, `redesSociales`, `puntajeSustentable`, `estado` | Catálogo de emprendimientos (HU-17) |
| **API propia - Rutas** | `GET /api/v1/rutas`, `GET /api/v1/rutas/:id` | En desarrollo | `comuna`, `dificultad`, `tipoActividad`, `horasMax` (opcionales); `id` | Todos los campos de la interface `Ruta`, solo publicadas | Tarjetas, buscador, ruta del día, detalle (HU-23, HU-22, HU-10, HU-09) |
| **API propia - Inscripciones** | `POST /api/v1/inscripciones` | En desarrollo | Campos de `Inscripcion` en el cuerpo | `201` con `id` y `fechaRegistro`; `400` con errores | Inscripción a ruta (HU-27), sin `GET` público (RN-08) |
| **Open-Meteo** | `GET https://api.open-meteo.com/v1/forecast` | En uso | `latitude`, `longitude`, `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`, `timezone=America/Santiago` | Temperatura, humedad, sensación térmica, código del tiempo y viento | Clima al presionar "Ver clima" (HU-04). Sprint 3: agregar `daily` para el pronóstico |
| **OpenStreetMap (Leaflet)** | Teselas `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | En uso | Zoom y coordenadas del mapa | Imágenes del mapa | Mapas por comuna (HU-12) |
| **Traducciones (archivo propio)** | `GET data/idiomas.json` | En uso | Ninguno | Textos en `es` y `en` | Selector de idioma (HU-21) |

**Reglas del backend que se esperan:**
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

## Consideraciones Futuras para la evolución del proyecto
De cara a la evolución a largo plazo de EcoRuta, se documentan las siguientes consideraciones levantadas junto al cliente que no forman parte de la iteración actual:
- **Fidelización de Usuarios (HU-18, HU-19, HU-20):** Se contempla a futuro implementar un sistema de registro donde los usuarios puedan guardar sus rutas favoritas, crear itinerarios personalizados y suscribirse a un newsletter de eventos sustentables.
- **Panel de inscripciones y gestión:** Vista protegida con autenticación (usuario y contraseña) para que el equipo administrativo consulte y gestione las inscripciones de forma centralizada.
- **Publicación de rutas por usuarios (HU-24):** Propuesta del profesor. Requiere registro de usuarios, roles de seguridad y un endpoint `POST` autenticado en la API de rutas, con revisión previa del PO.
- **Evolución Arquitectónica (Sprint 3 en curso):** Consolidación de la Single Page Application mediante React Router, migración definitiva del backend a un entorno cloud en producción (Render, Railway o AWS) y establecimiento de persistencia relacional avanzada (SQLite o PostgreSQL) para las inscripciones de los turistas.
- **Pronóstico extendido y mapa por ruta:** Pronóstico de los días siguientes en el detalle de cada ruta (propuesta del PO) y marcadores interactivos de partida y destino en el mapa (propuesta de Carlos, Acta 9).
- **Escalabilidad de Base de Datos:** Cuando el proyecto pase a una fase comercial completa, se recomienda migrar los emprendedores desde MockAPI hacia la API propia y evaluar un CMS Headless (ej. Strapi) o una base de datos relacional robusta (ej. Supabase/PostgreSQL) para dotar al equipo administrativo de una interfaz segura.