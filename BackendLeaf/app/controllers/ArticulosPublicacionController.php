<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;

class ArticulosPublicacionController extends Controller
{
    public function ingresoArticulosPublicacion()
    {

        $publicacion = app()-> request()->get('asignacionProductos');

        // ejecucion de insersion
        // aqui peticion primeor de cuantas tiene
        // en base a eso aceptar automaticamente
        $insertResult = db()
        ->insert("articulosporPublicacion")
        ->params([
          "cantidadProducto" => $publicacion['cantidadProducto'],
          "precioProducto" => $publicacion['precioProducto'],
          "identificador_publicacion" => $publicacion['identificador_publicacion'],
          "identificador_producto" => $publicacion['identificador_producto'],
          "estado" => $publicacion['nombre'],
        ])
        ->execute();
        if ($insertResult) {
            // Obtiene el ID generado por la base de datos
            $insertedId =db()->lastInsertId();

            // Devuelve el ID generado como respuesta positiva
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            // Si la inserción falla, devuelve un mensaje de error
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }
    }


//funcion para obtener los productos por publicacion
    public function obtenerProductosIdPublicacion(){
        $producto_publicacion = app() -> request() -> get('id');
        $result = db()
        ->select('articulosporPublicacion')
        ->where('identificador_publicacion', '=', $producto_publicacion)
        ->all();
        return response()->json($result ?? []);

    }


}
