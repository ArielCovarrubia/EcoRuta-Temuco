# Registro de comentarios del Product Owner

---

## Registro [25/09/2026] - Consolidación de Entrevistas 2 y 3, y Cierre de Gestión PO

**Autor:** Carlos Meléndez Díaz (Product Owner)
**Objetivo:** Sintetizar las propuestas finales de la navegación a canales externos, integración de emprendimientos y corrección de hallazgos de rutas previas al Sprint 2.

---

### Resumen general de los avances
- Se consolidaron las Historias de Usuario y Criterios de Aceptación (AC) incorporando los requerimientos de navegación externa (WhatsApp/redes) y accesibilidad (Integración de enlace de llamada directa (`tel:`) hacia nuestros contactos)
- Se validó la estructura responsiva en dispositivos móviles y la arquitectura de navegación dividida por comunas (Temuco, Pucón y Villarrica).
- Se identificaron y registraron hallazgos de QA y errores de enlaces (como la ruta de retorno en (`contacto.html`)) en el Product Backlog para su resolución.

---

### Aclaración clave sobre el Negocio y UX (Entrevista 2 y 3)
**Priorización de la Salida Segura (RN-01):** Todo redireccionamiento hacia WhatsApp, redes sociales o llamadas (`tel:`) debe abrirse en una nueva pestaña (`target="_blank"`) previa notificación de salida segura, asegurando la retenibilidad del usuario en EcoRuta.
**Navegación Territorial:** Estructuración de la oferta dividida en las comunas de Temuco, Pucón y Villarrica, incorporando atractivos turísticos y descripciones breves.
**Criterio de Publicación Sustentable (RN-02):** Filtro estricto que prioriza iniciativas con impacto ambiental, cultural y local positivo.
**Accesibilidad e Interacción:** Implementación prioritarias de la barra de accesibilidad (zoom y alto contraste), fichas con contacto directo por WhatsApp y mapas interactivos/referenciales.


**Información obligatoria:** Las características clave del sitio deben distribuirse dentro de varios apartados en el sitio web.
* Permitirle al usuario tener un acceso directo a los canales de contacto para que este ultimo se pueda comunicar de buena manera con un emprendedor
* Al momento que el usuario deba hacer procedimientos desde fuera de EcoRuta, la aplicación debe proporcionar un fácil retorno a la ultima interacción que tuve el usuario.
* La comuna es una referencia territorial principal, donde a los usuarios le permitirán reconocer sectores vinculados a este ultimo.
* Definir los principales alcances que posee el termino "Sustentable" dentro de la búsqueda e implementación de eventos en la plataforma.
* Discernir que tipo de informaciones son principales al momento de consultar ciertos apartados de la aplicación web (relevancia de información en dispositivos móviles y computadoras)

---

### Solicitudes y observaciones por rol (Transición al Sprint 2)

* **Para Developers (@CarlosMeléndez / @LisetteDelgado):**
- [Enfocarse en la corrección de errores prioritarios de navegación y rutas relativas (como el retorno a Inicio en (`contacto.html`) y la vinculación del Footer).]
- [Desarrollar las componentes asignadas para el próximo incremento, principalmente la maquetación del catálogo de emprendedores con botón directos a WhatsApp y la barra de accesibilidad (zoom y alto contraste).]

* **Para QA/Tester (@ArielCovarrubia):**
- [Continuar con la revisión sistemática de enlaces externos para validar que cumplan con la apertura en nueva pestaña (`target="_blank"`).]
- [Documentar los hallazgos técnicos en el registro de avance con pasos claros de reproducción, facilitando el seguimiento de bugs en el Backlog.]

* **Para Product Owner (@BeatrizMartin):**
- [Mantener alineación de Historias de Usuario (HU) con Criterios de Aceptación (AC) y Reglas de Negocio.]
- [Mantener el Product Backlog priorizado y actualizado según las observaciones del equipo docente y las pruebas de usabilidad.]

* **Para Scrum Master (@PatricioSalazar):**
- [Las tareas pendientes relacionadas con la definición del sitio se trasladarán a la fase de revisión tras la publicación de estos comentarios. Por favor, registre los avances en la carpeta de Drive de EcoRuta.]


---

### Compromisos de Traspaso (Sprint 2)
- Implementación de la barra de accesibilidad (zoom de texto y alto contraste)
- Construcción de fichas de emprendedores con contacto directo por WhatsApp.
- Incorporación de botones para compartir panoramas en redes sociales y mapa tanto de referencia como interactivo.