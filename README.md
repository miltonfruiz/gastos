# Administrador de Gastos Personales
=====================================

## Descripción
El Administrador de Gastos Personales es una aplicación diseñada para ayudar a los usuarios a gestionar sus gastos personales de manera eficiente. La aplicación permite a los usuarios registrar y categorizar sus gastos, establecer presupuestos y recibir alertas cuando se superen los límites establecidos.

## Stack Tecnológico
* **Backend**: Node.js con Express.js
* **Base de Datos**: MongoDB
* **Autenticación**: JWT (JSON Web Tokens)
* **Frontend**: React.js (no incluido en este repositorio)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/usuario/administrador-gastos-personales.git`
2. Instalar dependencias: `npm install`
3. Iniciar la aplicación: `npm start`

## Docker
La aplicación se puede ejecutar utilizando Docker. Para hacerlo, sigue los siguientes pasos:
1. Construir la imagen: `docker build -t administrador-gastos-personales .`
2. Iniciar el contenedor: `docker run -p 3000:3000 administrador-gastos-personales`

## Endpoints
La aplicación expone los siguientes endpoints:
### Autenticación
* **POST /api/auth/login**: Iniciar sesión
* **POST /api/auth/register**: Registrarse
### Gastos
* **GET /api/gastos**: Obtener lista de gastos
* **POST /api/gastos**: Registrar nuevo gasto
* **GET /api/gastos/:id**: Obtener gasto por ID
* **PUT /api/gastos/:id**: Actualizar gasto
* **DELETE /api/gastos/:id**: Eliminar gasto
### Presupuestos
* **GET /api/presupuestos**: Obtener lista de presupuestos
* **POST /api/presupuestos**: Establecer nuevo presupuesto
* **GET /api/presupuestos/:id**: Obtener presupuesto por ID
* **PUT /api/presupuestos/:id**: Actualizar presupuesto
* **DELETE /api/presupuestos/:id**: Eliminar presupuesto

## Seguridad
La aplicación utiliza JWT para autenticar a los usuarios. Los tokens se generan al iniciar sesión y se envían en cada solicitud para autenticar al usuario. La aplicación también utiliza HTTPS para cifrar las comunicaciones entre el cliente y el servidor.

## Contribuir
Para contribuir a este proyecto, por favor sigue los siguientes pasos:
1. Clonar el repositorio
2. Crear una rama para tu contribución
3. Realizar los cambios necesarios
4. Enviar un pull request con una descripción clara de los cambios realizados

## Licencia
Este proyecto está licenciado bajo la licencia MIT. Para más información, por favor consulte el archivo LICENSE.