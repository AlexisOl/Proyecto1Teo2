<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;

class DetalleFacturaController extends Controller
{


    //funcion para iongreso detallados de las compras
    public function ingresoDetallado(){
                $detalleFactura = app()->request()->get('detalleFactura');
                // Realizar la consulta
                $insertResult = db()
                ->insert("detalleFactura")
                ->params([
                    "id_factura" => $detalleFactura['id_factura'],
                    "id_producto" => $detalleFactura['id_producto'],
                    "cantidadComprado" => $detalleFactura['cantidadComprado'],
                    "precioParcial" => $detalleFactura['precioParcial'],
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
