<?php

namespace App\Controllers;

use App\Models\Producto;
use Doctrine\DBAL\Types\Type;
use Leaf\DB;
use Psy\Util\Json;

use function PHPSTORM_META\type;

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
        return response()->json($result ?? []);
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
        print($producto['imagen']."todo biem".($producto['imagen'])."sss");
    }

    //funcion para obtener algun producto en base a id

    public function obtenerProductoId(){
        $idproducto = app() -> request() -> get('id');
        $result = db()
        ->select('producto')
        ->where('id', '=', $idproducto)
        ->all();
        return response()->json($result ?? []);

    }
}
