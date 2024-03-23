<?php
return [
    'origin' => '*', // Permitir solicitudes desde cualquier origen
    'methods' => 'GET,POST,PUT,DELETE', // Permitir los métodos de solicitud que deseas permitir
    'allowedHeaders' => '*', // Permitir todos los encabezados en las solicitudes
    "exposedHeaders"=> "",
    'credentials' => true, // Permitir que las solicitudes incluyan cookies
    'maxAge' => 3600, // Configurar la caché máxima para la precomprobación CORS (en segundos)
    "preflightContinue"=> false,
    "optionsSuccessStatus"=> 204,
];
