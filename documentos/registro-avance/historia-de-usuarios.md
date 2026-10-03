# User story documents

**Proyecto:** EcoRuta-Temuco/The Frontend Dropout

**Product Owner:** Beatriz Martin

**Update date:** 03/10/2026

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

***
# Historias de Usuarios y Criterios de Aceptación - EcoRuta-Temuco

---

## Alineación con la visión del cliente y Requerimientos de Sprint 2

### Historias Prioritarias y Alineadas (Must Have)
Son indispensables y caen dentro del Sprint actual.
- **HU-01 y HU-02 (Turismo Sustentable):** Alta prioridad. El enfoque principal es dar visibilidad al emprendedor y parques.
- **HU-09 (Interactividad DOM):** Muestra el detalle de las rutas. esto se realizará mediante JS para no recargar la página.
- **HU-11 (Accesibilidad JS):** Cambio de estilos y clases en el DOM para controles visuales de accesibilidad.

### Historias Valiosas pero no críticas (Should Have)
Aportan gran valor a la plataforma, pero el sitio puede funcionar inicialmente sin ellas.
- **HU-03 (Rutas para grupos):** el enfoque hacia las rutas, se alinea con el turismo sustentable en grupo.
- **HU-05 (Emergencias):** Válida en el ámbito de salud (directorio), catalogada como funcionalidad secundaria.
- **HU-13 (Validación e Implementación de página de formulario):** Uso de JS para evitar envío de datos erróneos en la creación de envío de formulario.

### Mejoras Futuras (Could Have)
Aportan valor que se podría implementar, pero son prescindibles para el Sprint actual
- **HU-04 (Clima) y HU-12 (Mapas Interactivos):** Herramientas útiles de campo, aplazadas para futuras iteraciones.
- **HU-06 (Asilos personalizados):** Podría requerir almacenamiento local (`localStorage`) a futuro para guardar contactos específicos del usuario.

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
> 1. [ ] Botones funcionales que cambien el estilo general (`document.querySelector`).
> 2. [ ] Separación correcta de la lógica de JS y las clases de CSS.

## Prioridad Media (Should Have)

### HU-13: Implementación y validación dinámica de Formulario.
- **Objetivo:** página de formulario el cual debe validar sus campos antes de enviar los datos.
- **Criterios clave:**
> 1. [ ] Agregación del apartado de formulario en las rutas
> 2. [ ] Validar campos de texto vacíos (marcando en rojo si hay error)
> 3. [ ] Mostrar mensaje dinámico modificando `.textContent` si los datos son correctos.

### HU-05: Contactos médicos de emergencia
- **Objetivo:** Directorio visible para reaccionar ante imprevistos.
- **Criterios clave:**
> 1. [ ] Sección visible con números directos de emergencia.
> 2. [ ] Aviso claro de que es un directorio y no garantía médica.