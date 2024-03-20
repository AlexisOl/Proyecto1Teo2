<?php

namespace App\Controllers;

use Doctrine\DBAL\Types\Type;
use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;
use function PHPSTORM_META\type;

class FacturaController extends Controller
{
    //ingreso de comentarios
    public function pruebaFecha()
    {
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        echo $now->format('d-m-y');
    }

    public function ingresoFactura()
    {
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        $date = $now->format('y-m-d');
        $factura = app()->request()->get('factura');

        // Verificar que los parámetros necesarios están presentes y no son nulos
        if(isset($factura['id_publicacion'], $factura['id_cliente'], $factura['precioTotal'])) {
            // Realizar la consulta
            $insertResult = db()
            ->insert("factura")
            ->params([
                "id_publicacion" => $factura['id_publicacion'],
                "id_cliente" => $factura['id_cliente'],
                "fecha" => $date,
                "precioTotal" => $factura['precioTotal'],
            ])
            ->execute();

            if ($insertResult) {
                $insertedId = db()->lastInsertId();
                return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
            } else {
                return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
            }
        } else {
            // Alguno de los parámetros está ausente o es nulo
            return response()->json(["success" => false, "message" => "Parámetros incompletos o nulos"]);
        }
    }

    //vista de compras realizadas
}
