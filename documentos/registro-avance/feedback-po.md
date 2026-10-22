# Registro de comentarios del Product Owner

---

## Registro [22/10/2026] 

**Autor:** Beatriz Martin (Product Owner)
**Objetivo:** Sintetizar las validaciones del cliente correspondientes al Sprint 2, evaluar el estado de entrega del incremento (Bug Bounty), documentar los resultados del Planning Poker y establecer el nuevo flujo de trabajo (Priorización y Testing de GitHub Issues).
---

### Resumen general de los avances
- Se aprobó de manera exitosa la funcionalidad asíncrona de consumo de datos para emprendedores (HU-17) y la implementación de mapas referenciales (HU-12).
- El estado de aceptación(QA) de esta semana del Sprint 2 ha sido catalogado como "Aceptado con observaciones". Las funcionalidades lógicas cumplen con los Criterios de Aceptación, pero se rechazaron los componentes visuales móviles de cookies y accesibilidad (HU-11, HU-15) por bloqueos de superposición de capas y deudas en la lectura asistiva (BUG-04, BUG-06, BUG-07)
- Se realizó una sesión de Planning Poker con el equipo de desarrollo para estimar el esfuerzo de las integraciones complejas (como la API) y se recogieron sus impresiones sobre el ritmo actual del proyecto.
- **Actualización de Procesos:** Se acordó implementar un periodo de prueba durante esta semana utilizando el apartado de "Issues" de GitHub para la gestión de incidencias. Este espacio será administrado por el QA Tester; si los resultados optimizan el flujo de trabajo, se mantendrá de forma permanente; de lo contrario, se descartará.
---

### Priorización de Tareas (Semana en curso)
Para mantener el foco y evitar confusiones en el flujo de trabajo, el equipo de desarrollo deberá abordar el tablero siguiendo este orden:
+ [ ] Absorción de API: Consumo asíncrono, renderizado dinámico de datos en el DOM y manejo de errores (HU-17).
+ [ ] Corrección definitiva de bugs arrastrados del Sprint 1: Inserción de <meta name="description"> (ISSUE-02) y optimización de peso de imágenes (ISSUE-03).
+ [ ] Correcciones visuales y bugs reportados por el QA Tester en el Sprint actual: Subsanar superposición de cookies, expansión indebida del header y lectura asistiva ininterrumpida (BUG-04, BUG-06, BUG-07).
+ [ ] Agregación de nuevas funciones y/o extensiones de página: Solo tras completar los puntos anteriores.
---

### Aclaración clave sobre el Negocio y UX (Entrevista 1, sprint 2)
* **Filtro de Sustentabilidad (RN-02):** Se aprueba estrictamente el sistema de 12 puntos basado en 6 criterios. Emprendimientos de 8-12 puntos se publican, 5-7 quedan pendientes y 0-4 se rechazan. Sin embargo, se aplicará flexibilidad moderada; un emprendimiento con un alto aporte cultural no se rechazará automáticamente si falla en prácticas ambientales menores
* **Privacidad y Cookies (HU-15):** El aviso debe explicar de forma sencilla que solo se guardan ajustes visuales e idioma, garantizando que no hay recolección de datos personales ni uso publicitario.
* **Menú de Accesibilidad (HU-11):** Se validó la propuesta de un menú pequeño y discreto con control de tamaño, contraste y modo oscuro. Es imperativo que en dispositivos móviles las tarjetas mantengan proporciones claras sin desbordarse al hacer zoom.
* **Directorio de Emergencias (HU-05):** El cliente percibe de buena manera el botón flotante y exige un comportamiento dual: iniciar llamadas directas en celulares (tel:), y facilitar el copiado del número en computadores.
* **Gestión de la Base de Datos:** Para el prototipo, MockAPI/Google Sheets es suficiente si integra estados de control. Si la API falla, la interfaz debe mostrar obligatoriamente un mensaje de error amigable, cumpliendo con la arquitectura de datos (RN-05).   


**Información obligatoria:** Las características clave del sitio deben distribuirse dentro de varios apartados en el sitio web.
* Permitirle al usuario tener un acceso directo a los canales de contacto para que este ultimo se pueda comunicar de buena manera con un emprendedor
* Al momento que el usuario deba hacer procedimientos desde fuera de EcoRuta, la aplicación debe proporcionar un fácil retorno a la ultima interacción que tuve el usuario.
* La comuna es una referencia territorial principal, donde a los usuarios le permitirán reconocer sectores vinculados a este ultimo.
* Definir los principales alcances que posee el termino "Sustentable" dentro de la búsqueda e implementación de eventos en la plataforma.
* Discernir que tipo de informaciones son principales al momento de consultar ciertos apartados de la aplicación web (relevancia de información en dispositivos móviles y computadoras)

---

### Resultados de Planning Poker y Percepción del equipo de desarrollo
Durante la jornada se evaluó la dificultad técnica de la implementación del consumo de la API (asociada a la HU-17), utilizando una escala del 1 (muy sencillo) al 5 (muy difícil).
#### Resultados
> 2, 3, 3, 4, 4 --> se obtuvo un promedio del 3.2 de dificultad
* **Análisis de dificultad:** El equipo coincide en que la lógica en sí no es intrínsecamente difícil, pero la complejidad radica en la falta de experiencia previa uniendo Frontend con Backend. El rigor sintáctico de los endpoints y el hecho de construir el frontend antes que el backend (flujo inverso al habitual) ha generado cierta confusión.
* **Mitigación:** Los desarrolladores reportan que, aunque es riguroso, el objetivo es alcanzable con el apoyo de tutoriales e Inteligencia Artificial.

#### Percepción del avance del Sprint
- El equipo siente que el avance del código va bien, pero que el ritmo de este Sprint se percibe más lento en comparación al Sprint 1, debido a que la página ya se encuentra en un estado bastante avanzado y ahora requiere ajustes finos.
- Se levantó la observación de que, a nivel de experiencia de desarrollo, tal vez faltan más ciudades o vistas para implementar y testear las nuevas funcionalidades

---

### Solicitudes y observaciones por rol

* **Para Developers (@CarlosMeléndez / @LisetteDelgado):**
    - [**Prioridad Alta**: Solucionar BUG-04 elevando el `z-index` de `#aviso-cookies` a 10000+ y agregando una capa modal con `backdrop-filter: blur(4px)`. Solucionar BUG-06 rediseñando `#menu-accesibilidad` como una ventana flotante superpuesta (`position: absolute; right: 0; top: 100%;`) y agregando un evento de cierre al hacer clic fuera (click-outside) o presionar Esc].
    - [**Prioridad Alta**: Solucionar BUG-07 cambiando el selector de tamaño de texto por un grupo de botones discretos (ej. radio buttons o con `aria-pressed`) y una zona con `aria-live="polite"` que confirme dinámicamente el cambio (ej. "Tamaño de texto ajustado a Grande")].
    - [**Prioridad Media**: Solucionar BUG-05 ajustando el flexbox de `header.sin-navegacion` a `justify-content: space-between; flex-direction: row;`. Solucionar BUG-08 eliminando la regla de la línea 560 y unificando el control bajo variables CSS `--tamano-fuente`]

* **Para QA/Tester (@ArielCovarrubia):**
    - [Administrar de manera centralizada el apartado de "Issues" en GitHub durante esta semana de prueba, documentando cada hallazgo con pasos claros de reproducción.]
    - [Auditar que los parches de accesibilidad cumplan con las normativas (RN-04), centrando las pruebas en TalkBack/VoiceOver y navegación por teclado.]
    - [Documentar los hallazgos técnicos en el registro de avance con pasos claros de reproducción, facilitando el seguimiento de bugs en el Backlog.]

* **Para Product Owner (@BeatrizMartin):**
    - [Mantener alineación de Historias de Usuario (HU) con Criterios de Aceptación (AC) y Reglas de Negocio.]
    - [Aplicar la matriz de 12 puntos de la RN-02 sobre los emprendimientos en MockAPI, definiendo qué fichas pasan a estado "Publicado".]
    - [Mantener el Product Backlog priorizado y actualizado según las observaciones del equipo docente y las pruebas de usabilidad.]
    - [Mantener las historias "Could Have" (Favoritos, Itinerarios, Newsletter) documentadas en el Backlog únicamente como referencias para escalar el proyecto a futuro.]

* **Para Scrum Master (@PatricioSalazar):**
    - [Supervisar que el tablero Kanban y los nuevos "Issues" de GitHub estén sincronizados y respeten el orden de priorización acordado.]
    - [Tomar en cuenta la retroalimentación de los desarrolladores sobre la sensación de lentitud del Sprint, asegurando espacios para resolver bloqueos técnicos (especialmente con la API).]

---

### Consideraciones Futuras para la evolución del proyecto
De cara a la evolución a largo plazo de EcoRuta, se documentan las siguientes consideraciones levantadas junto al cliente que no forman parte de la iteración actual:
- **Fidelización de Usuarios (HU-18, HU-19, HU-20):** Se contempla a futuro implementar un sistema de registro donde los usuarios puedan guardar sus rutas favoritas, crear itinerarios personalizados y suscribirse a un newsletter de eventos sustentables.
- **Escalabilidad de Base de Datos:** Cuando el proyecto pase a producción, se recomienda evaluar la migración de MockAPI hacia un CMS Headless (ej. Strapi) o una base de datos relacional (ej. Supabase/PostgreSQL) para dotar al equipo administrativo de una interfaz segura.