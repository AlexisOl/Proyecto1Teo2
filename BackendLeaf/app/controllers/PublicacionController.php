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
          "estado" => "En espera",
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

    public function vistaTotalPublicacion(){
        response() -> json(Publicacion::all());
    }

}
