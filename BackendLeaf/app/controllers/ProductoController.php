<?php

namespace App\Controllers;

use App\Models\Producto;
use Leaf\DB;
use Psy\Util\Json;

class ProductoController extends Controller
{
    public function obtencionTotal()
    {
        // en base al usuario se obtiene los productos ingresados

        $idUsuario =  request()->get('id');
        //consulta de la base de datos
        $result = db()
        ->select('producto')
        ->where('identificador_usuario', '=', $idUsuario)
        ->all();
        if ($result) {
            return response()->json($result);

        } else {
            // cambio de forma de json en php
            return response()->json(["mensaje"=>'error no existen datos']);

        }
    }
    public function ingresoProducto()
    {
        $producto = app()-> request()->get('producto');

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
        ])
        ->execute();

        // retorno
        print(($producto['nombre']."todo biem"));



    }
}
