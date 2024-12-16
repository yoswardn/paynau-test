Descripción de la API REST Desarrollada con Laravel

La API REST desarrollada con Laravel 11 permite gestionar un catálogo de personas con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y autenticación basada en tokens. Además, proporciona un endpoint de logout para finalizar las sesiones de usuario. Los endpoints de la API son los siguientes:
Endpoints

    POST /logout
    Cierra la sesión del usuario autenticado y elimina el token de acceso.
        Método: POST
        Ruta: /logout
        Controlador: AuthController@logout
        Autenticación: Requiere un token de autenticación válido.
        Respuesta: { "message": "Successfully logged out" }

    GET /persons
    Obtiene la lista de todas las personas almacenadas en el sistema.
        Método: GET
        Ruta: /persons
        Controlador: PersonController@index
        Autenticación: Requiere un token de autenticación válido.
        Respuesta: Un array de objetos con la información de cada persona.

    POST /persons
    Crea un nuevo registro de persona.
        Método: POST
        Ruta: /persons
        Controlador: PersonController@store
        Autenticación: Requiere un token de autenticación válido.
        Datos: { "name": "John", "last_name": "Doe", "email": "johndoe@example.com", "date_born": "1990-01-01", "phone": "123456789", "address": "Some Address" }
        Respuesta: Objeto con la persona creada.

    GET /persons/{id}
    Obtiene los detalles de una persona específica por su ID.
        Método: GET
        Ruta: /persons/{id}
        Controlador: PersonController@show
        Autenticación: Requiere un token de autenticación válido.
        Respuesta: Objeto con los detalles de la persona solicitada.

    PUT /persons/{id}
    Actualiza la información de una persona existente.
        Método: PUT
        Ruta: /persons/{id}
        Controlador: PersonController@update
        Autenticación: Requiere un token de autenticación válido.
        Datos: { "name": "Updated Name", "last_name": "Updated Last Name", "email": "updated@example.com", "date_born": "1991-02-01", "phone": "987654321", "address": "Updated Address" }
        Respuesta: Objeto con la persona actualizada.

    DELETE /persons/{id}
    Elimina un registro de persona del sistema.
        Método: DELETE
        Ruta: /persons/{id}
        Controlador: PersonController@destroy
        Autenticación: Requiere un token de autenticación válido.
        Respuesta: { "message": "Person deleted successfully" }

    Instalación del Proyecto

    Para instalar y ejecutar esta API REST en tu entorno local, sigue estos pasos:
    Requisitos Previos

        PHP (versión 8.0 o superior).
        Composer (gestor de dependencias de PHP).
        MySQL o MariaDB (base de datos).

    Clona el repositorio del proyecto:

    git clone https://github.com/yoswardn/paynau-test.git
    cd paynau-test
    cd backend

    Instala las dependencias de PHP:

    composer install

    Configura el archivo .env: Renombra el archivo .env.example a .env y edítalo con los detalles de tu base de datos:

    mv .env.example .env

    Edita las siguientes variables del archivo .env:

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña

    Genera la clave de la aplicación:

    php artisan key:generate

    Crea la base de datos: Asegúrate de que la base de datos esté creada en MySQL o MariaDB:

    CREATE DATABASE nombre_de_tu_base_de_datos;

    Ejecuta las migraciones: Ejecuta las migraciones para crear las tablas necesarias en la base de datos:

    php artisan migrate

    Ejecuta los seeders: Si deseas poblar la base de datos con datos iniciales (como un usuario por defecto), puedes ejecutar los seeders:

    php artisan db:seed

    Inicia el servidor de desarrollo:

    php artisan serve
    Esto levantará el servidor en http://localhost:8000.

    Documentación de la API

    La documentación interactiva de la API está disponible utilizando Swagger. Para verla, simplemente navega a la siguiente URL después de haber iniciado el servidor:

    http://localhost:8000/api/documentation#/
    







