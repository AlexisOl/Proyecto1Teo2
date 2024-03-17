<?php

namespace App\Controllers;

use App\Models\Publicacion;
use Leaf\DB;
use Psy\Util\Json;

class PublicacionController extends Controller
{
    public function ingresoPublicacion()
    {
        //generacion de la fecha actual
        $date = date('d-m-y');

        $publicacion = app()-> request()->get('publicacion');

        // ejecucion de insersion
        // aqui peticion primeor de cuantas tiene
        // en base a eso aceptar automaticamente
        $insertResult = db()
        ->insert("publicacion")
        ->params([
          "titulo" => $publicacion['titulo'],
          "fecha" => $date,
          "descripcion" => $publicacion['descripcion'],
          "identificador_usuario" => $publicacion['identificador_usuario'],
          "identificador_producto" => $publicacion['identificador_producto'],
          "estado" => 1,
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
        // en base al usuario se obtiene los productos ingresados


    }

    //metodo para la vista de publicaciones
    public function vistaPublicacion(){
        $idUsuario =  request()->get('id');
        //consulta de la base de datos
        $result = db()
        ->select('publicacion')
        ->where('identificador_usuario', '=', $idUsuario)
        ->all();
        //envio de datos o vacio para evitar problemas
        return response()->json($result ?? []);
    }

    //vista de la publicacion con un join del nombre
    public function vistaPublicacionEstado(){
            $idUsuario = request()->get('id');
            // Consulta de la base de datos con un join
            $result = db()
                ->query("SELECT p.*, e.tipo AS tipo_estado
                         FROM publicacion p
                         INNER JOIN estado e ON p.estado = e.id
                         WHERE p.identificador_usuario = ".$idUsuario)
                ->all();
            // Envío de datos o vacío para evitar problemas
            return response()->json($result ?? []);

    }


    //esto para la pagina principal de ventas
    // excepto cancelado o en espera
    public function vistaTotalPublicacion(){
        $respuesta = db()
        ->  select('publicacion')
        ->where('estado', 3)
        ->orWhere('estado', 4)
        ->orWhere('estado', 5)
        ->all();
        return response()->json($respuesta ?? []);

    }
    //funcion para la vista de toda publicacion para ADMIN
    //tiene varios join de usaurios y estado
    public function vistaPublicacionesAdmin(){
        $result = db()
        -> query("SELECT p.*, e.tipo AS tipo_estado, u.user AS nombre_usuario
        FROM publicacion p
        JOIN estado e ON p.estado = e.id
        JOIN usuario u ON p.identificador_usuario = u.id;")
        ->all();

        return response()->json($result ?? []);
    }
    //fucnion para aceptar la venta
    public function aceptarVenta(){
        $idVenta = request()->get('id');

        $resultado = db()
        ->update("publicacion")
        ->params(["estado" => 4])
        ->where("id", $idVenta)
        ->execute();

        return response()->json($resultado ?? []);
    }
    //funcion para rechazar la venta

    public function rechazarVenta(){
        $idVenta = request()->get('id');

        $resultado = db()
        ->update("publicacion")
        ->params(["estado" => 2])
        ->where("id", $idVenta)
        ->execute();

        return response()->json($resultado ?? []);
    }
    //funcion para eliminar la venta

}
