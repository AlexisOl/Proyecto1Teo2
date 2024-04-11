<?php

namespace App\Controllers;

use Leaf\DB;

class ArticulosVoluntariadoController extends Controller
{

    public function ingresoArticulosVoluntariado()
    {

        $voluntariado = app()-> request()->get('articulosVoluntariado');

        // ejecucion de insersion
        // aqui peticion primeor de cuantas tiene
        // en base a eso aceptar automaticamente
        $insertResult = db()
        ->insert("articulosVoluntariado")
        ->params([
          "cantidadProducto" => $voluntariado['cantidadProducto'],
          "precioProducto" => $voluntariado['precioProducto'],
          "identificador_voluntariado" => $voluntariado['identificador_voluntariado'],
          "identificador_producto" => $voluntariado['identificador_producto'],
          "id_retribucion" => $voluntariado['id_retribucion'],
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

    //funcion para obtener los productos por voluntariado
    public function obtenerProductosIdVoluntariado(){
        $producto_publicacion = app() -> request() -> get('id');
        $result = db()
        ->query("SELECT 
        av.*, p.nombre,p.imagen, re.descripcion as cambio
        from articulosVoluntariado av 
        join producto p 
        ON p.id = av.identificador_producto 
        join retribucion re 
        ON re.id = av.id_retribucion 
        where identificador_voluntariado = {$producto_publicacion};")
        ->all();
        return response()->json($result ?? []);

    }

    //funcion para eliminar los articulos de los voluntariados
    public function sePuedeEliminar(){

    }

}

