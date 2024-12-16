Frontend - Catálogo de Personas con React y PrimeReact

Este es el frontend de un Catálogo de Personas desarrollado con React y PrimeReact. El sistema permite realizar un login de usuario y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre personas. El frontend consume una API REST desarrollada con Laravel 11, y utiliza Sanctum para la autenticación del usuario.
Descripción

Este proyecto es una interfaz para gestionar un catálogo de personas. Permite:

    Login de usuario: Acceder al sistema usando un correo electrónico y contraseña.
    Operaciones CRUD: Crear, leer, actualizar y eliminar registros de personas, con campos como nombre, apellido, correo electrónico, teléfono y dirección.

La autenticación es gestionada mediante Laravel Sanctum, y la API REST está diseñada para ser consumida por el frontend React.
Requisitos Previos

    Node.js (versión 14 o superior).
    NPM (gestor de paquetes para JavaScript).
    API Laravel 11 configurada y corriendo (con autenticación Sanctum habilitada).

Instalación y Configuración
1. Clonar el repositorio del proyecto

Primero, clona el repositorio en tu máquina local:

git clone https://github.com/usuario/repo-front.git
cd repo-front

2. Instalar las dependencias de Node.js

Instala todas las dependencias necesarias utilizando NPM:

npm install

3. Configurar el archivo .env

Asegúrate de que el archivo .env esté configurado correctamente para conectar con la API REST de Laravel. En el archivo .env de React, añade la URL de la API de Laravel:

APP_URL=http://localhost:8000

4. Configuración de la API en Laravel (Sanctum)
Modificar el archivo .env en Laravel

En el archivo .env de tu backend Laravel, asegúrate de tener configuradas las siguientes variables para Sanctum y las cabeceras CORS:

    Habilitar Sanctum:
    Asegúrate de que el archivo .env de Laravel tenga la configuración correcta para Sanctum:

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=.localhost
SESSION_DRIVER=cookie

Configuración de la base de datos:
Asegúrate de que las configuraciones de la base de datos estén correctas en el archivo .env de Laravel:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_de_tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

Correr migraciones y seeders (en Laravel):

Asegúrate de haber ejecutado las migraciones y los seeders de Laravel para configurar la base de datos correctamente:

    php artisan migrate
    php artisan db:seed

5. Iniciar el proyecto

Una vez configurado el entorno y las dependencias, inicia el servidor de desarrollo de React:

npm start

Esto abrirá el frontend en el navegador en http://localhost:3000.
Flujo de Autenticación y Consumo de la API
1. Login de Usuario

    El sistema utiliza Laravel Sanctum para la autenticación. Cuando un usuario inicia sesión, el frontend realiza una solicitud POST al endpoint /login de la API Laravel, enviando las credenciales (correo y contraseña).
    Si las credenciales son correctas, el backend retorna un token de autenticación que es almacenado en el frontend para autenticar futuras solicitudes.

Solicitud:

POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "usuario@dominio.com",
  "password": "contraseña"
}

Respuesta:

{
  "success": true,
  "message": "Welcome John Doe",
  "user": { "id": 1, "name": "John", "email": "usuario@dominio.com" },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Este token se debe almacenar en localStorage o cookies para las siguientes solicitudes.
2. Consumo de la API para CRUD de Personas

El frontend se conecta a los siguientes endpoints de la API REST de Laravel para realizar las operaciones CRUD:

    GET /persons: Obtener la lista de personas.
    POST /persons: Crear una nueva persona.
    GET /persons/{id}: Obtener los detalles de una persona por ID.
    PUT /persons/{id}: Actualizar los datos de una persona.
    DELETE /persons/{id}: Eliminar una persona.

3. Uso de Tokens

Cada vez que se hace una solicitud a la API de Laravel, debes incluir el token de autenticación en las cabeceras de la solicitud para que sea validado por Sanctum.

Ejemplo de solicitud GET (Obtener personas):

GET http://localhost:8000/api/persons
Authorization: Bearer <your_token>

Notas Adicionales

    Sanctum: Asegúrate de haber configurado Sanctum tanto en el backend como en el frontend para que las sesiones de usuario funcionen correctamente.

    CORS: Si estás ejecutando el backend y el frontend en diferentes puertos o dominios, asegúrate de que las cabeceras CORS estén correctamente configuradas para permitir la comunicación entre ellos.

