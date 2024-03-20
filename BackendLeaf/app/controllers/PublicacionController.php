<?php

namespace App\Controllers;

use App\Models\Publicacion;
use Leaf\DB;
use Psy\Util\Json;

class PublicacionController extends Controller
{
    public function ingresoPublicacion()
    {
        //generacion de la fecha actual
        $date = date('d-m-y');
        $estado = 0;
        $publicacion = app()->request()->get('publicacion');
        //? ver si ya hay publciaciones suficiente
        $ejecucion = db()
            ->select('publicacion')
            ->query("SELECT COUNT(*) FROM publicacion WHERE (estado = 3 OR estado = 4 OR estado = 5) AND identificador_usuario =" . $publicacion['identificador_usuario'])
            ->column();
        if ($ejecucion) {
            // ejecucion de insersion
            // aqui peticion primeor de cuantas tiene
            // en base a eso aceptar automaticamente
            $insertResult = db()
                ->insert("publicacion")
                ->params([
                    "titulo" => $publicacion['titulo'],
                    "fecha" => $date,
                    "descripcion" => $publicacion['descripcion'],
                    "identificador_usuario" => $publicacion['identificador_usuario'],
                    "identificador_producto" => $publicacion['identificador_producto'],
                    "estado" => $ejecucion>3?4:1,
                ])
                ->execute();
            if ($insertResult) {
                // Obtiene el ID generado por la base de datos
                $insertedId = db()->lastInsertId();

                // Devuelve el ID generado como respuesta positiva
                return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
            } else {
                // Si la inserción falla, devuelve un mensaje de error
                return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
            }
        }

        // en base al usuario se obtiene los productos ingresados


    }

    //metodo para la vista de publicaciones
    public function vistaPublicacion()
    {
        $idUsuario =  request()->get('id');
        //consulta de la base de datos
        $result = db()
            ->select('publicacion')
            ->where('identificador_usuario', '=', $idUsuario)
            ->all();
        //envio de datos o vacio para evitar problemas
        return response()->json($result ?? []);
    }

    //vista de la publicacion con un join del nombre
    public function vistaPublicacionEstado()
    {
        $idUsuario = request()->get('id');
        // Consulta de la base de datos con un join
        $result = db()
            ->query("SELECT p.*, e.tipo AS tipo_estado
                         FROM publicacion p
                         INNER JOIN estado e ON p.estado = e.id
                         WHERE p.identificador_usuario = " . $idUsuario)
            ->all();
        // Envío de datos o vacío para evitar problemas
        return response()->json($result ?? []);
    }


    //esto para la pagina principal de ventas
    // excepto cancelado o en espera
    public function vistaTotalPublicacion()
    {
        $respuesta = db()
            ->select('publicacion')
            ->where('estado', 3)
            ->orWhere('estado', 4)
            ->orWhere('estado', 5)
            ->all();
        return response()->json($respuesta ?? []);
    }
    //funcion para la vista de toda publicacion para ADMIN
    //tiene varios join de usaurios y estado
    public function vistaPublicacionesAdmin()
    {
        $result = db()
            ->query("SELECT p.*, e.tipo AS tipo_estado, u.user AS nombre_usuario
        FROM publicacion p
        JOIN estado e ON p.estado = e.id
        JOIN usuario u ON p.identificador_usuario = u.id;")
            ->all();

        return response()->json($result ?? []);
    }
    //fucnion para aceptar la venta
    public function aceptarVenta()
    {
        $idVenta = request()->get('id');

        $resultado = db()
            ->update("publicacion")
            ->params(["estado" => 4])
            ->where("id", $idVenta)
            ->execute();

        return response()->json($resultado ?? []);
    }
    //funcion para rechazar la venta

    public function rechazarVenta()
    {
        $idVenta = request()->get('id');

        $resultado = db()
            ->update("publicacion")
            ->params(["estado" => 2])
            ->where("id", $idVenta)
            ->execute();

        return response()->json($resultado ?? []);
    }

    //funcion para obtener la vista de publicacion
    // en base al id de publicacion pero de compras

    public function vistaPublicacionesEspecificasCompras()
    {
        $idUsuario = request()->get('id');
        // Consulta de la base de datos con un join
        $result = db()
            ->query("SELECT p.*, e.tipo AS tipo_estado
            FROM publicacion p
            INNER JOIN estado e ON p.estado = e.id
            WHERE p.id =" . $idUsuario)
            ->all();
        // Envío de datos o vacío para evitar problemas
        return response()->json($result ?? []);
    }

    public function obtenerPublicacionesNombre()
    {
        $nombre = request()->get('nombre');

        $result = db()
            ->select('publicacion')
            ->where('titulo', $nombre)
            ->all();
    }

    //funcion para obtener las publicaciones por nombre de
    //de producto
    public function vistaTotalPublicacionPorBusquedaProducto()
    {
        $nombre = request()->get('nombre');

        $respuesta = db()
            ->select('publicacion')
            ->query("SELECT DISTINCT d.identificador_publicacion, pu.*, p.nombre FROM producto p JOIN articulosporPublicacion d ON p.id = d.identificador_producto JOIN publicacion pu on d.identificador_publicacion=pu.id where (pu.estado = 3 or pu.estado = 4 or pu.estado = 5) and p.nombre ='{$nombre}';")
            ->all();
        return response()->json($respuesta ?? []);
    }


    //funcion para obtene toda la informacion de una venta
    // esto en base a un id
    public function obtenerInformacionVentasRealizadas()
    {
        $id = request()->get('id');
        $id_publicacion =request()->get('id_publicacion');
        $ejecucion = db()
            ->query(" SELECT      f.id AS id_factura,      p.titulo AS titulo_publicacion,      f.fecha,      f.precioTotal,      d.id_producto,      d.cantidadComprado,      d.precioParcial,      pr.nombre AS nombre_producto,      u.user AS nombre_usuario FROM factura f JOIN detalleFactura d ON f.id = d.id_factura JOIN publicacion p ON f.id_publicacion = p.id JOIN producto pr ON d.id_producto = pr.id JOIN usuario u ON p.identificador_usuario = u.id where u.id ={$id} and p.id ={$id_publicacion};")
            ->fetchAll();
        return response()->json($ejecucion ?? []);

    }
    public function obtenerTodasLasPublicacionesporId(){
        $id = app() ->request()->get('id');
        $peticion = db()
        -> query('select distinct id from publicacion where identificador_usuario='.$id)
        ->fetchAll();
        return response()->json($peticion ?? []);

    }

    //todo PARA LO DEL PRECIO TOTAL DE PUBLICACION
    /**
     * todo SELECT  SUM(d.precioParcial) FROM factura f JOIN detalleFactura d ON f.id = d.id_factura JOIN publicacion p ON f.id_publicacion = p.id JOIN producto pr ON d.id_producto = pr.id JOIN usuario u ON p.identificador_usuario = u.id where u.id =1 and p.id =5;
     */
}
