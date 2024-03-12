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
        db()
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

        // retorno
        print(($publicacion['titulo']."todo biem"));
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
        if ($result) {
            return response()->json($result);

        } else {
            // cambio de forma de json en php
            return response()->json(["mensaje"=>'error no existen datos']);

        }
    }

    public function vistaTotalPublicacion(){
        response() -> json(Publicacion::all());
    }

}
