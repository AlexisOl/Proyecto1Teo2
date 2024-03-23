<?php

/*
|--------------------------------------------------------------------------
| Leaf MVC
|--------------------------------------------------------------------------
|
| Leaf MVC is a minimal but powerful PHP MVC framework based on
| the Leaf PHP framework.
|
| This file allows us to run the app from the root of the project.
| This provides a convenient way to test your Leaf MVC app
| without having installed a "real" web server software here.
|
| It also allows you to directly load up your application from
| the root file for quickly hosting on shared hosting platforms.
|
*/
use Leaf\Http\Cors;

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir solicitudes con los métodos GET y POST
header("Access-Control-Allow-Methods: GET, POST");
// Permitir que el navegador incluya cookies en las solicitudes
header("Access-Control-Allow-Credentials: true");
// Establecer la caché máxima para la precomprobación CORS (en segundos)
header("Access-Control-Max-Age: 86400");
// Permitir ciertos encabezados en las solicitudes
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Aplicar las opciones CORS a todas las rutas de la aplicación


$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

if ($uri !== '/' && file_exists(__DIR__ . '/public' . $uri)) {
    return false;
}

require_once __DIR__ . '/public/index.php';
