# Product Backlog - EcoRuta-Temuco

**Proyecto:** Sitio Web Accesible e Interactivo EcoRuta-Temuco

**Organización:** The Frontend Dropout
---
**Product Owner:** Carlos Meléndez
**QA / Tester:** Beatriz Martin
**Developers:** Ariel Covarrubia & Patricio Salazar
**Scrum Master:** Lissete Delgado
**Fecha de Última Actualización:** 25/09/2026
---

## Resumen de Estado del Proyecto

* **Estado General:** Transición de ajustes puntuales a la aplicación web de EcoRuta-Temuco antes de pasar al Script 2 (Verificación y arreglo de bugs)
* **Validación Técnica:** Semántica HTML y navegación por teclado aprobadas al 100% por W3C y pruebas manuales.
* **Refinamiento con Cliente (Entrevista 2):** Ajuste del alcance enfocado en turismo sustentable, rutas y contacto de emergencias persistente.
* **Foco de Corrección Inmediata:** Reparación de rutas relativas (Error 404 en contacto), vinculación de anclas internas (`#`) e interactividad de botones.

---

## Reglas de Negocio (Business Rules)

* **RN-01 (Navegación Externa y Salida Segura):** Todo enlace a redes sociales o sitios externos debe abrirse en una pestaña nueva (`target="_blank"` y `rel="noopener noreferrer"`). Esto asegura que el usuario no pierda su sesión dentro de EcoRuta.
* **RN-02 (Criterio de Sustentabilidad y Filtrado):** Los eventos o emprendimientos publicados deben alinearse con el propósito de EcoRuta (impacto ambiental positivo, aporte local, cultura/patrimonio o prácticas responsables). Evitando agregar entretenimiento puramente comercial sin validación previa.
* **RN-03 (Acceso Persistente a Emergencias):** El apartado de emergencias debe contar con acceso visible y persistente mediante un botón flotante en dispositivos móviles y al consultar rutas (Sin invadir de sobre manera el apartado de inicio de la aplicación).
* **RN-04 (Estándar de Accesibilidad WAI-AA):** La interfaz debe garantizar navegación por teclado (`Tab`), alternativas tipográficas/contraste y atributos de ocultación (`disabled` / `aria-hidden="true"`) en botones no funcionales.
* **RN-05 (Consistencia de Rutas Relativas):** La arquitectura de archivos debe mantener rutas relativas coherentes entre la raíz y la subcarpeta `paginas/` para evitar errores 404 al navegar hacia `contacto.html`.

---

## Historias de Usuario Base y Criterios de Aceptación

### [HU-01] Emprendimiento de Manualidades en Pucón
* **Prioridad (MoSCoW):** Must have
* **Estado:** En Progreso / Parcialmente Cumplido (Sprint 1)
* **Historia:** Como emprendedor de manualidades en Pucón, quiero ofrecer mis productos a vecinos de mi sector, para que me ayuden a visibilizar mis productos a turistas que vengan de vacaciones.
* **Criterios de Aceptación:**
  - [x] La plataforma visibiliza información sobre emprendimientos locales en Pucón.
  - [x] Redirección hacia canales de venta y contacto del emprendedor.
  - [x] Corregir enlaces rotos/inactivos de Instagram y Twitter en el pie de página (`footer`).

### [HU-02] Promoción Turística y Cuidado del Parque Nacional Villarrica
* **Prioridad (MoSCoW):** Must have
* **Estado:** En Progreso / Parcialmente Cumplido (Sprint 1)
* **Historia:** Como director del Parque Nacional Villarrica, quiero incentivar a nuestros turistas a que vengan a visitar nuestro parque, para que podamos ofrecerles un buen panorama en un lugar limpio y natural.
* **Criterios de Aceptación:**
  - [x] Presenta rutas e información de actividades dedicadas al cuidado del entorno local.
  - [x] Direcciona información de un sitio establecido.
  - [ ] **[Pendiente QA]:** Declarar los atributos `id="rutas"` e `id="ve-mas"` para corregir las anclas vacías (`#`).

### [HU-05] Contactos de Emergencia y Centros Médicos
* **Prioridad (MoSCoW):** Must have
* **Estado:** En Progreso / Parcialmente Cumplido (Sprint 1)
* **Historia:** Como tutora de un usuario en un viaje, quiero tener la información de los centros médicos u hospitales y números de emergencia, para reaccionar oportunamente ante un imprevisto.
* **Criterios de Aceptación:**
  - [x] Disponibilidad de medios de contacto telefónicos (`tel:`) y correo (`mailto:`) en la vista `contacto.html`.
  - [ ] **[Pendiente QA]:** Solucionar el error 404 en el enlace hacia `contacto.html` desde subpáginas (`temuco.html`, `pucon.html`, `villarrica.html`).
  - [ ] **[Pendiente UX]:** Implementación de botón flotante de emergencias en visitas móviles.

### [HU-ACC] Accesibilidad Técnica y Navegabilidad Inclusiva (Transversal) 
* **Prioridad (MoSCoW):** Must have
* **Estado:** Parcialmente Aprobado (QA 17/09/2026)
* **Historia:** Como usuario con discapacidad visual o movilidad reducida, quiero navegar por el sitio mediante la tecla `Tab` y lectores de pantalla, para acceder a la información sin barreras digitales.
* **Criterios de Aceptación:**
  - [x] Validación W3C sin errores sintácticos.
  - [x] Un solo elemento `<main>` por cada archivo HTML.
  - [x] Atributos `alt` descriptivos en todas las imágenes.
  - [x] Navegación secuencial por teclado totalmente operativa.
  - [ ] **[Pendiente QA]:** Asignar funcionalidad o incorporar `disabled`/`aria-hidden="true"` en botones inactivos.

---

## Historias de Usuarios Reenfocadas
### [HU-03] Recomendaciones Recreativas y Eventos Sustentables
* **Prioridad (MoSCoW):** Should have
* **Estado:** En Refinamiento / Por discutir
* **Historia:** Como presidente de un curso escolar, quiero ver recomendaciones para lugares de eventos recreativos, para que podamos celebrar nuestro periodo escolar con mis compañeros.
* **Criterios de Aceptación:**
  - [ ] Muestra del valor del entorno local a partir de panoramas recreativos y sustentables.
  - [ ] **[Filtro de Ciente]:** Definición de condiciones mínimas de publicación y validación interna de eventos (impacto ambiental y aporte local).

### [HU-04] Información Climática y Seguridad en Terreno
* **Prioridad (MoSCoW):** Could have
* **Estado:** Por hacer
* **Historia:** Como visitante en terreno, quiero ver la información climática de ciertos sectores en la región de La Araucanía, para planificar mis actividades al aire libre con seguridad.
* **Criterios de Aceptación:**
  - [ ] Muestra de rutas y lugares accesibles en entornos naturales.
  - [ ] Muestra de recomendaciones de seguridad para senderismo y datos climáticos en localidades concurridas.

---

## Historias Desestimadas / Fuera de Alcance (Aclaración Entrevista 2)

* **[HU-06] Almacenamiento de Contactos de Asilos:** Desestimada por el cliente por requerir gestión de datos privados y almacenamiento personalizado fuera del alcance inicial.
* **[HU-07] Horarios de Buses Interurbanos (Lican Ray - Villarrica):** Marcada como *Won't have* por no alinearse con el objetivo central de rutas sustentables y turísticas.
* **[HU-08] Publicidad de Sucursales Comerciales Fuera de Zona (Valdivia):** Desestimada por falta de pertinencia territorial y ausencia de criterios de Sustentabilidad.

---

## Control de Bugs e Incidencias (Actualizado al 25/09/2026)

| ID | Incidencia / Hallazgo | Prioridad | Asignado | Estado | Solución Técnica Requerida / Observación |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **BUG-01** | Error 404 en enlace a Contacto desde subpáginas | **Alta** | Developer 1 | **Resuelto** | Se corrigieron las rutas en las vistas de comunas. |
| **BUG-02** | Anclas vacías (`#rutas` y `#ve-mas`) | **Media** | Developer 1 | **Resuelto** | Se asignaron las ID correspondientes en los `<section>`. |
| **BUG-03** | Botones sin función activa | **Media** | Developer 2 | En Progreso | Se aplicaron estados `disabled` para cumplir WAI-AA. |
| **BUG-04** | Enlaces de redes sociales rotos en Footer | **Baja** | Developer 2 | **Resuelto** | Se actualizaron URLs con `target="_blank"`. |
| **BUG-05** | Error ortográfico en vista principal | **Baja** | Developer 2 | **Resuelto** | Corregido en `index.html`. |
| **BUG-06** | Enlace roto de retorno a "Inicio" en `contacto.html` | **Alta** | Developer 1 | Por Hacer | Ajustar el botón en `contacto.html` cambiando `href="index.html"` por `href="../index.html"`. |

---

## Historial de Revisiones

* **17/09/2026:** Registro de informe de QA por Beatriz Martin. Proyecto clasificado como *Aceptado con observaciones*.
* **18/09/2026** Actualización general del Product Backlog por Carlos Meléndez (PO), integrando las aclaraciones de las entrevistas (Sobre todo la 2) con el cliente, las 8 historias de Usuario base de la plantilla oficial y los hallazgos de QA.
* **25/09/2026** Actualización del control de Bugs e Incidencias del código a partir de los nuevos cambios dedicados a los archivos de la carpeta de páginas y del bug_bounty.

### Compromiso de Cierre del Product Owner (Sprint 1)
* Se da por finalizado el levantamiento inicial del Sprint 1. Los ajustes de rutas relativas hacia alguno de los bugs pendientes a resolver y el desarrollo de componentes del Sprint 2 quedan delegados a la célula de desarrollo.
* Las historias de usuario base se mantienen como la guía de aceptación para la QA Tester y la nueva Product Owner (`@BeatrizMartin`).