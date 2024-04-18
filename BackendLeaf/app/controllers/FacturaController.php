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
        $valorMonetario = 0;

        // Consulta para obtener la cantidad de dinero en la cuenta del cliente
        $resultados = db()
            ->select('usuario')
            ->where("cantidad_monedas >= {$factura['precioTotal']} and id = {$factura['id_cliente']}")
            ->fetchAll();

        if (!empty($resultados)) {
            $valorMonetario = $resultados[0]['cantidad_monedas'];
        }


        if ($resultados) {
            $nuevaCantidadMonedas = $valorMonetario - $factura['precioTotal'];

            //actualizacion de monedas a quien vende
            db()
                ->query("UPDATE usuario
                SET cantidad_monedas =(select cantidad_monedas from usuario
                 where id = (select identificador_usuario from publicacion where id ={$factura['id_publicacion']}))+{$factura['precioTotal']}
                 WHERE id = (select identificador_usuario from publicacion where id ={$factura['id_publicacion']});
                    ")
                ->execute();
            //actualizacion de monedas a quien compra
            $peticion = db()
                ->update("usuario")
                ->params(["cantidad_monedas" =>  $nuevaCantidadMonedas])
                ->where("id", $factura['id_cliente'])
                ->execute();

            $insertResult = db()
                ->insert("factura")
                ->params([
                    "id_publicacion" => $factura['id_publicacion'],
                    "id_cliente" => $factura['id_cliente'],
                    "fecha" => $date,
                    "precioTotal" => $factura['precioTotal'],
                ])
                ->execute();
            if ($insertResult && $peticion) {
                $insertedId = db()->lastInsertId();
                return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
            } else {
                return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
            }
        }
    }


    //vista de compras realizadas

    //obtiene los ids de facturas
    public function obtenerIdFacturas()
    {
        $id = app()->request()->get('id');
        $peticion = db()
            ->query('SELECT distinct id from factura where id_cliente =' . $id)
            ->fetchAll();
        return response()->json($peticion ?? []);
    }

    //funcion para obtener todas las facturas de usuario
    public function obtenerIdFacturasTotal()
    {
        $id = app()->request()->get('id');
        $peticion = db()
            ->query('SELECT * from factura where id_cliente =' . $id)
            ->fetchAll();
        return response()->json($peticion ?? []);
    }
    //obtiene todas las compras en base al id de publicacion y de usuarui
    public function obtenerComprasRealizadasUsuarios()
    {
        $id = app()->request()->get('id');
        $idFactura = app()->request()->get('id_factura');
        $peticion = db()
            ->query(" SELECT f.id AS id_factura,
        p.titulo AS titulo_publicacion,
        f.fecha,
        f.precioTotal,
        d.id_producto,
        d.cantidadComprado,
        d.precioParcial,
        pr.nombre AS nombre_producto,
        u.user AS nombre_usuario
        FROM factura f
        JOIN detalleFactura d ON f.id = d.id_factura
        JOIN publicacion p ON f.id_publicacion = p.id
        JOIN producto pr ON d.id_producto = pr.id
        JOIN usuario u ON p.identificador_usuario = u.id
        where f.id_cliente ={$id} and f.id ={$idFactura};")
            ->fetchAll();
        return response()->json($peticion ?? []);
    }


    // para reporte de mas gastado 

    public function masGastado(){
        $peticion = db()
            ->query("SELECT 
            distinct sum(precioTotal) as total,
             f.*,
             u.user
             from factura f 
             join usuario u on u.id = f.id_cliente
             group by id_cliente 
             order by total desc ;")
            ->fetchAll();
        return response()->json($peticion ?? []);
     
    }
}
