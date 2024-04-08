<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class ComprobanteAyudaVoluntariadoController extends Controller
{

    public function ingresoDetalleConstanciaAyudaVoluntariado()
    {
        $comprobanteAyudaVoluntariado = app()->request()->get('comprobanteAyudaVoluntariado');





        // Realizar la consulta
        $insertResult = db()
            ->insert("comprobanteAyudaVoluntariado")
            ->params([
                "id_articulo_Voluntariado" => $comprobanteAyudaVoluntariado['id_articulo_Voluntariado'],
                "id_ayuda_Voluntariado" => $comprobanteAyudaVoluntariado['id_ayuda_Voluntariado'],
                "precio" => $comprobanteAyudaVoluntariado['precio'],
                "cantidad" => $comprobanteAyudaVoluntariado['cantidad'],
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


