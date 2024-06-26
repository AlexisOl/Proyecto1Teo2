<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class CuponesController extends Controller
{

    public function obtenerCupones(){
        $id = app()->request()->get('id');
        $obtenerCupon = db()
            ->query("SELECT c.*, v.titulo 
            from cupones c 
            join voluntariado v 
            on v.id = c.id_voluntariado  
            WHERE c.id_usuario = {$id};")
            ->all();
        return response()->json($obtenerCupon ?? []);

    }

        public function obtenerCuponesSoloParaUsar(){
        $id = app()->request()->get('id');
        $obtenerCupon = db()
            ->query("SELECT c.*, v.titulo 
            from cupones c 
            join voluntariado v 
            on v.id = c.id_voluntariado  
            WHERE c.id_usuario = {$id}
            AND c.id_estado = 1;")
            ->all();
        return response()->json($obtenerCupon ?? []);

    }
   

}


