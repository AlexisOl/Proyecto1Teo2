<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class AyudaVoluntariadoController extends Controller
{
    public function ingresoConstanciaAyudaVoluntariado()
    {
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        $date = $now->format('y-m-d');
        $factura = app()->request()->get('ayudaVoluntariado');
        // para el tipo de voluntariado
        $tipo = app()->request()->get('tipo');
        //en caso de ser voluntariado
        if($tipo ==1) {
            // ingreso de insignia a usuario
            $insignia = db()
            ->query(
                "SELECT * from insignias where id_voluntariado = {$factura['id_voluntariado']};"
            )
            ->column();
            // ver si ya existe 
            $existencia = db()
            ->query("SELECT count(*) from asignacionInsignia where id_usuario = {$factura['id_cliente']} 
            and id_insignia  = {$insignia};")
            ->column();

            if($existencia >=1) {
                $cantidad = db()
                ->query("UPDATE asignacionInsignia 
                set cantidadVeces =(SELECT cantidadVeces+1 from asignacionInsignia where id_usuario = {$factura['id_cliente']} 
                and id_insignia  = {$insignia});")
                ->execute();

            } else {
                $crearInsignia =db()
                ->insert("asignacionInsignia")
                ->params([
                    "id_usuario" => $factura['id_cliente'],
                    "id_insignia" => $insignia,
                    "cantidadVeces" => 1,
                ])
                ->execute();
            }
        }

        //ingreso de comprobante de ayuda
        $insertResult = db()
            ->insert("ayudaVoluntariado")
            ->params([
                "id_cliente" => $factura['id_cliente'],
                "id_voluntariado" => $factura['id_voluntariado'],
                "fecha" => $date,
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
