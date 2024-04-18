<?php

namespace App\Controllers;

use App\Models\Categorias;
use Leaf\DB;
use Psy\Util\Json;

class CategoriaController extends Controller
{
    public function todasCategorias()
    {
        response() -> json(Categorias::all());
    }

    //funcion para generar categorias
    public function generarNuevasCategorias(){
        $categoria = app()->request()->get('categorias');
        $insertResult = db()
            ->insert("categoria")
            ->params([
                "nombre" => $categoria['nombre'],
            ])
            ->execute();
        if ($insertResult) {
            $insertedId = db()->lastInsertId();
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }
    }
}
