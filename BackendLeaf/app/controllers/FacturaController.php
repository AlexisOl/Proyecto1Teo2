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

    //obtiene los ids de facturas
    public function obtenerIdFacturas(){
        $id = app() ->request()->get('id');
        $peticion = db()
        -> query('select distinct id from factura where id_cliente ='.$id)
        ->fetchAll();
        return response()->json($peticion ?? []);

    }
    //obtiene todas las compras en base al id de publicacion y de usuarui
    public function obtenerComprasRealizadasUsuarios(){
        $id = app()->request()->get('id');
        $idFactura = app() -> request()->get('id_factura');
        $peticion = db()
        -> query(" SELECT f.id AS id_factura,
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
}
