<?php

namespace App\Controllers;

use App\Models\Producto;
use Doctrine\DBAL\Types\Type;
use Leaf\DB;
use Leaf\FS;
use Psy\Util\Json;
use Illuminate\Support\Facades\File;


use function PHPSTORM_META\type;

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos de solicitud que deseas permitir (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Permitir los encabezados que deseas permitir en las solicitudes
header("Access-Control-Allow-Headers: Content-Type");

// Permitir que las solicitudes incluyan cookies
header("Access-Control-Allow-Credentials: true");

// Configurar la caché máxima para la precomprobación CORS
header("Access-Control-Max-Age: 86400");

// Permitir que el navegador acceda al encabezado Authorization
header("Access-Control-Expose-Headers: Authorization");


class ProductoController extends Controller
{
    public function obtencionTotal()
    {
        // en base al usuario se obtiene los productos ingresados

        $idUsuario =  request()->get('id');
        $idEstado = app()->request()->get('idEstado');

        //consulta de la base de datos
        $result = db()
            ->select('producto')
            ->where('identificador_usuario', '=', $idUsuario)
            ->where('identificador_tipo_producto', '=', $idEstado)
            ->all();
        return response()->json($result ?? []);
    }
    public function ingresoProducto()
    {
        $producto = app()->request()->get('producto');
        //para las fotos


        // ejecucion de insersion
        db()
            ->insert("producto")
            ->params([
                "nombre" => $producto['nombre'],
                "descripcion" => $producto['descripcion'],
                "imagen" => $producto['imagen'],
                "precio" => $producto['precio'],
                "identificador_usuario" => $producto['identificador_usuario'],
                "identificador_categoria" => $producto['identificador_categoria'],
                "identificador_tipo_producto" => $producto['identificador_tipo_producto'],
            ])
            ->execute();

        // retorno
        print($producto['imagen'] . "todo biem" . ($producto['imagen']) . "sss");
    }

    //funcion para obtener algun producto en base a id
    public function uploadImage()
    {
       echo "ya da";
    }


    public function guardarImagen()
    {
        $archivo = app()->request()->files('imagen');
        // Verificar si se recibió el archivo
        // Ruta donde se guardarán los archivos
        FS::uploadFile($archivo, "prueba/");
        return response()->json($archivo ?? 'nada');
    }

    public function devolverImagen()
    {
        // Directorio donde se almacenan las imágenes
        $directorioImagenes = 'prueba/';
        $extension = app()->request()->get('extension');
        $nombre = app()->request()->get('nombre');


        // Ruta completa de la imagen
        $rutaImagen = $directorioImagenes . $nombre.'.'.$extension;

        FS::dirname($rutaImagen);
        if (file_exists($rutaImagen)) {
            readfile($rutaImagen);
            echo 'todo bien'.$rutaImagen;

        } else {
            http_response_code(404);
            echo $rutaImagen;

        }


    }



    public function obtenerProductoId()
    {
        $idproducto = app()->request()->get('id');
        $result = db()
            ->select('producto')
            ->where('id', '=', $idproducto)
            ->all();
        return response()->json($result ?? []);
    }




}
