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
- React 19
- Vite 8
- Node.js / npm
- Mock API REST (Emprendedores)


## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js instalado.
- npm (incluido con Node.js).
- Git.

### Instalación de dependencias

Desde la carpeta raíz del repositorio, ejecutar:

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`.

### Ejecutar la aplicación React

```bash
npm run dev
```

La aplicación estará disponible en:

http://localhost:5173/react.html

### Compilar para producción

```bash
npm run build
```

Este comando verifica TypeScript y genera los archivos de producción en la carpeta `dist/`.

### Ejecutar las pruebas unitarias y de contrato (QA)

```bash
npm test
```

Ejecuta la suite de pruebas automatizadas sobre el contrato de datos, validadores de interfaz, filtrado multicriterio y selección determinista de la ruta del día.

### Ejecutar la API Propia de Rutas e Inscripciones (Backend)

El backend de rutas e inscripciones (Node.js + Express + TypeScript) se encuentra en la carpeta `api/`.

Para compilarlo y ejecutarlo:

```bash
# Paso 1: Instalar dependencias del backend y compilar
cd api
npm install
npm run build
cd ..

# Paso 2: Ejecutar el servidor backend
# Opción A (desde la raíz):
npm run api:dev

# Opción B (desde la carpeta api):
cd api
npm run dev
```

> Nota: Cada vez que se realicen cambios en el código TypeScript de `api/src/`, es necesario compilar nuevamente ejecutando `npm run api:build` desde la raíz (o `npm run build` dentro de `api/`).

La API quedará escuchando en `http://localhost:3001` con los siguientes endpoints principales:
- `GET /api/v1/rutas`: Listado de rutas publicadas (con filtros opcionales `comuna`, `dificultad`, `tipoActividad`, `horasMax`).
- `GET /api/v1/rutas/:id`: Detalle de una ruta individual.
- `POST /api/v1/inscripciones`: Registro de inscripción validado en el servidor (regla de privacidad RN-08).
- `GET /api/health`: Estado del servicio.

### Visualizar la compilación

```bash
npm run preview
```

Permite revisar localmente la versión compilada.


## Compilar TypeScript

Los archivos `.ts` están junto a sus `.js`. Desde la raíz, compila para renovar el JavaScript que cargan las páginas. Se requiere TypeScript 6:

```bash
npx --yes --package typescript@6 tsc -p tsconfig.json
npx --yes --package typescript@6 tsc -p tests/tsconfig.json
```

La primera orden compila los scripts de `js/`; la segunda renueva `tests/pruebas.js`.

## Estado del proyecto

- Sprint actual: Semana 4 de Sprint 2
- Última actualización: 06 de noviembre

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
