<?php

namespace App\Controllers;

use Leaf\DB;

class RetribucionController extends Controller
{

    //funcion para obtener retribuciones
    public function obtenerRetribucion(){
        $result = db()
        ->select('retribucion')
        ->fetchAll();
    if ($result) {
        return response()->json($result);
    } else {
        return response()->json(['mensaje' => 'No existe']);
    }
    }


}

