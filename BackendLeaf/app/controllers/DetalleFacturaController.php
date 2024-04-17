<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class DetalleFacturaController extends Controller
{


    //funcion para iongreso detallados de las compras
    public function ingresoDetallado()
    {
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        $date = $now->format('y-m-d');
        
        $detalleFactura = app()->request()->get('detalleFactura');
        $utilizacionCupon = app()->request()->get('utilizacionCupon');

        //aqui como ya me acepto hago el update para quitar los producto
        db()
            ->query("UPDATE articulosporPublicacion
                SET cantidadProducto =(select cantidadProducto from articulosporPublicacion
                where identificador_publicacion =(SELECT id_publicacion from factura WHERE id = {$detalleFactura['id_factura']})
                and identificador_producto ={$detalleFactura['id_producto']})-{$detalleFactura['cantidadComprado']}
                WHERE identificador_producto = {$detalleFactura['id_producto']}
                and identificador_publicacion =(SELECT id_publicacion from factura WHERE id = {$detalleFactura['id_factura']});
                ")
            ->execute();



        //  aqui generaria en caso se use el cupon
        if($utilizacionCupon && $utilizacionCupon != NULL) {
        $insertResult = db()
            ->insert("utilizacionCupon")
            ->params([
                "id_cupon" => $utilizacionCupon['id_cupon'],
                "id_factura" => $utilizacionCupon['id_factura'],
                "fecha" => $date,
                "cantidad" => $utilizacionCupon['cantidad'],
            ])
            ->execute();
        // cambio del estado del cupon
        $cambioEstadoCupon=db()
        ->query("UPDATE cupones SET id_estado = 2 
            where id = {$utilizacionCupon['id_cupon']}")
        ->execute();

        //posteriormente ingreso de dinero
        $idUsuario = db()
        ->query("SELECT id_usuario 
        from cupones where 
        id = {$utilizacionCupon['id_cupon']};")
        ->column();

        $ingresoDinero = db()
        ->query("UPDATE usuario set cantidad_monedas 
        = (SELECT (select cantidad_monedas from usuario where 
        id = {$idUsuario}) 
        + {$utilizacionCupon['cantidad']}) where id = {$idUsuario};")
        ->execute();
        }
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
    //funcion para ver si se puede

}
