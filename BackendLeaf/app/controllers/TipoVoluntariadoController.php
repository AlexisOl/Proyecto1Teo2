<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class TipoVoluntariadoController extends Controller
{

    public function obtenerTipoVoluntariado(){
        $obtenerTipo = db()
        ->select("tipoVoluntariado")
        ->fetchAll();
        return response()->json($obtenerTipo ?? []);
    }
   

}


