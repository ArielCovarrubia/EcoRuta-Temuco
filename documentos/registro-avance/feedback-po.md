# Registro de comentarios del Product Owner

---
* **Autor:** Beatriz Martin (Product Owner)
* **Objetivo:** Sintetizar las validaciones del cliente correspondientes a la Entrevista 2 del Sprint 2, evaluar el estado de entrega tras la resolución de incidencias en GitHub, e instruir al equipo sobre la integración del Buscador Dinámico y la API de Clima.
* **Última actualización:** 28/10/2026 
---

## Resumen general de los avances
- **Gestión exitosa en GitHub:** El periodo de prueba utilizando "Issues" ha sido un éxito. El equipo de desarrollo logró integrar y cerrar los Pull Requests que solucionaron la falta de metadatos SEO (ISSUE-02) y la lectura ininterrumpida en lectores de pantalla (BUG-07). Esta metodología de trabajo se adopta de forma permanente.
- **Nuevos Requerimientos (Entrevista 2):** El cliente validó la necesidad de dotar a la plataforma de herramientas de asistencia rápida para el turista en terreno. Se aprueba la integración de un *Buscador/Generador Dinámico de Rutas (HU-22)* y el *Consumo de una API Meteorológica (HU-04)*.
- **Deuda Técnica Vigente:** Aún se mantienen pendientes los bloqueos de diseño responsive móvil detectados por QA, específicamente la superposición de cookies y el header (BUG-04, BUG-06).
---

## Priorización de Tareas (Semana en curso)
Para mantener el foco operativo, el equipo de desarrollo deberá abordar el tablero siguiendo estrictamente este orden:
+ [ ] **Correcciones visuales urgentes (QA):** Subsanar la superposición de cookies y la expansión indebida del header en dispositivos móviles (BUG-04, BUG-06).
+ [ ] **Desarrollo del Buscador Dinámico (HU-22):** Implementar el filtrado multicriterio mediante arreglos y manipulación del DOM sin recargar la página.
+ [ ] **Integración de API de Clima (HU-04):** Inyectar el clima actual en las fichas de rutas consumiendo una API externa con su respectivo manejo de errores.
+ [ ] **Optimización de peso de imágenes (ISSUE-03):** Migrar a formato WebP y aplicar atributo `loading="lazy"`.
---

## Aclaración clave sobre el Negocio y UX (Entrevistas Sprint 2)
* **Buscador General de Rutas (HU-22):** El cliente prioriza que el visitante encuentre panoramas rápidamente. Se deben poder combinar filtros (comuna, dificultad, tipo de actividad) y limpiar la búsqueda fácilmente. Si no hay coincidencias, el sistema debe arrojar un mensaje amigable en pantalla, nunca un área vacía o rota.
* **Información de Clima (HU-04):** Se considera una herramienta de seguridad en terreno. Si la API meteorológica externa sufre una caída, el bloque `try/catch` debe atajar el error y mostrar un aviso de "Clima temporalmente no disponible", garantizando la arquitectura de datos (RN-05).
* **Filtro de Sustentabilidad (RN-02):** Se mantiene el sistema de 12 puntos. Solo se muestran emprendimientos con estado "Publicado".
* **Privacidad y Cookies (HU-15):** El aviso no debe bloquear la plataforma entera (ni tapar el botón de emergencias) y debe explicar claramente que solo se guarda configuración visual.
* **Menú de Accesibilidad (HU-11):** En dispositivos móviles, aplicar zoom de accesibilidad no debe desbordar las proporciones de las tarjetas.

**Información obligatoria:** Las características clave del sitio deben distribuirse dentro de varios apartados en el sitio web.
* Permitirle al usuario tener un acceso directo a los canales de contacto para que este ultimo se pueda comunicar de buena manera con un emprendedor
* Al momento que el usuario deba hacer procedimientos desde fuera de EcoRuta, la aplicación debe proporcionar un fácil retorno a la ultima interacción que tuve el usuario.
* La comuna es una referencia territorial principal, donde a los usuarios le permitirán reconocer sectores vinculados a este ultimo.
* Definir los principales alcances que posee el termino "Sustentable" dentro de la búsqueda e implementación de eventos en la plataforma.
* Discernir que tipo de informaciones son principales al momento de consultar ciertos apartados de la aplicación web (relevancia de información en dispositivos móviles y computadoras)

---

## Resultados de Planning Poker y Percepción del equipo de desarrollo (21/10/2026)
Durante la jornada se evaluó la dificultad técnica de la implementación del consumo de la API (asociada a la HU-17), utilizando una escala del 1 (muy sencillo) al 5 (muy difícil).
### Resultados:
> 2, 3, 3, 4, 4 --> se obtuvo un promedio del 3.2 de dificultad
* **Análisis de dificultad:** El equipo coincide en que la lógica en sí no es intrínsecamente difícil, pero la complejidad radica en la falta de experiencia previa uniendo Frontend con Backend. El rigor sintáctico de los endpoints y el hecho de construir el frontend antes que el backend (flujo inverso al habitual) ha generado cierta confusión.
* **Mitigación:** Los desarrolladores reportan que, aunque es riguroso, el objetivo es alcanzable con el apoyo de tutoriales e Inteligencia Artificial.

### Percepción del avance del Sprint
- El equipo siente que el avance del código va bien, pero que el ritmo de este Sprint se percibe más lento en comparación al Sprint 1, debido a que la página ya se encuentra en un estado bastante avanzado y ahora requiere ajustes finos.
- Se levantó la observación de que, a nivel de experiencia de desarrollo, tal vez faltan más ciudades o vistas para implementar y testear las nuevas funcionalidades
---

## Solicitudes y observaciones por rol

* **Para Developers (@CarlosMeléndez / @LisetteDelgado):**
    - [**Felicitaciones:** Gran trabajo solucionando el ISSUE-02 y el BUG-07 utilizando ARIA y etiquetas `<meta>` correctas].
    - [**Prioridad Alta (Buscador):** Para la HU-22, es obligatorio que utilicen `event.preventDefault()` y métodos como `.filter()` sobre el conjunto de datos para manipular el DOM directamente, justificando así la velocidad del lado del cliente sin saturar un servidor backend].
    - [**Prioridad Alta (UI Móvil):** Solucionar BUG-04 y BUG-06 elevando `z-index`, aplicando comportamientos modales flotantes (`position: absolute`) y eventos *click-outside*].

* **Para QA/Tester (@ArielCovarrubia):**
    - [Diseñar casos de prueba específicos para el nuevo buscador: comprobar qué ocurre al cruzar filtros incompatibles y verificar que no haya recarga de página].
    - [Simular una falla de red o bloquear la URL de la API del clima desde DevTools para asegurar que el bloque `try/catch` cumpla con mostrar el mensaje de contingencia en la UI].
    - [Auditar que las correcciones del BUG-04 y BUG-06 garanticen una navegación táctil limpia en móviles reales o emuladores].

* **Para Product Owner (@BeatrizMartin):**
    - [Asegurar que la HU-04 y HU-22 queden debidamente documentadas en el Backlog y la matriz de historias].
    - [Mantener las historias "Could Have" (Favoritos, Itinerarios, Newsletter) documentadas en el Backlog únicamente como referencias para escalar el proyecto en un eventual Sprint 3].

* **Para Scrum Master (@PatricioSalazar):**
    - [Coordinar apoyo técnico para los desarrolladores en caso de que la lógica de arreglos (`.filter()`) del buscador o el `fetch` asíncrono del clima generen nuevos cuellos de botella].
    - [Garantizar que el uso de GitHub Issues se mantenga como el canal oficial de comunicación técnica tras su buen resultado esta semana].
---

## Consideraciones Futuras para la evolución del proyecto
De cara a la evolución a largo plazo de EcoRuta, se documentan las siguientes consideraciones levantadas junto al cliente que no forman parte de la iteración actual:
- **Fidelización de Usuarios (HU-18, HU-19, HU-20):** Se contempla a futuro implementar un sistema de registro donde los usuarios puedan guardar sus rutas favoritas, crear itinerarios personalizados y suscribirse a un newsletter de eventos sustentables.
- **Escalabilidad de Base de Datos:** Cuando el proyecto pase a producción, se recomienda evaluar la migración de MockAPI hacia un CMS Headless (ej. Strapi) o una base de datos relacional (ej. Supabase/PostgreSQL) para dotar al equipo administrativo de una interfaz segura.