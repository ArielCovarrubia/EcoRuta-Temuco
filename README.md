# Proyecto EcoRuta-Temuco / The Frontend Dropout (TFD)

## Integrantes y roles (Sprint actual)

| Nombre | Rol ágil |
|---|---|
| Beatriz Martin | Product Owner |
| Patricio Salazar | Scrum Master |
| Lisette Delgado | Developer |
| Carlos Melendez | Developer |
| Ariel Covarrubia | QA/tester |

## Descripción breve

Eco Ruta Temuco, desarrollado por The Frontend Dropout (TFD), es una plataforma web e interactiva que conecta a los turistas con la riqueza natural y cultural de la novena región, o sea la Araucanía. El objetivo de esta plataforma es visibilizar los atractivos locales y promover un ecoturismo responsable, centralizando mapas, rutas y emprendimientos propiamente tales de la región en un solo lugar accesible.

## Tecnologías utilizadas

- HTML5 / CSS3
- JavaScript / TypeScript
- (Framework a definir)
- (API consumida)

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## Estado del proyecto

- Sprint actual: Semana 4 de Sprint 2
- Última actualización: 25 de octubre

## Consumo de API / Integración

El proyecto consume una **Mock API REST (de Emprendedores)** que provee la información requerida para el despliegue dinámico de contenidos en el layout.

* **Tipo de API:** Mock API REST (formato JSON).
* **Origen de datos:** Endpoint remoto (`https://6ad90babf89c5702ed9a6190.mockapi.io/emprendedores`) con datos de simulados de la entidad *Emprendedores*.
* **Mecanismo de consumo:** Peticiones HTTP asíncronas utilizando `fetch` con `async/await` estructurado dentro de bloques `try/catch` para el control de excepciones y validación de estados (`respuestas.ok`)
* **Manipulación del DOM:** Procesamiento del conjunto de datos e inyección dinámica en la interfaz a través de `innerHTML`.

## Tablero Kanban

[Enlace al tablero trello](https://trello.com/b/ALyR2lp3)

## Enlace de despliegue

[EcoRuta Araucanía](https://arielcovarrubia.github.io/EcoRuta-Temuco/index.html)
