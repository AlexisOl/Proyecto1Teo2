<?php

namespace App\Controllers;

use Leaf\DB;

class VoluntariadoController extends Controller
{

    //funcion para ingresar voluntariados
    public function ingresoVoluntariado()
    {
        // Generación de la fecha actual
        $date = date('d-m-y');
        $estado = 0;
        $voluntariado = app()->request()->get('voluntariado');

        // Verificar si ya hay suficientes publicaciones
        $ejecucion = db()
            ->query("SELECT COUNT(*) FROM voluntariado WHERE (estado = 3 OR estado = 4 OR estado = 5) AND identificador_usuario={$voluntariado['identificador_usuario']}")
            ->column();

        // Verificar el resultado de la consulta
        if ($ejecucion >= 0) {
            // Ejecución de la inserción
            $insertResult = db()
                ->insert("voluntariado")
                ->params([
                    "titulo" => $voluntariado['titulo'],
                    "fecha" => $date,
                    "imagen" => $voluntariado['imagen'],
                    "descripcion" => $voluntariado['descripcion'],
                    "identificador_usuario" => $voluntariado['identificador_usuario'],
                    "estado" => $ejecucion > 3 ? 4 : 1,
                    "tipo"=>  $voluntariado['tipo']
                ])
                ->execute();

            // Verificar el resultado de la inserción
            if ($insertResult) {
                // Obtener el ID generado por la base de datos
                $insertedId = db()->lastInsertId();
                return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
            } else {
                return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
            }
        } else {
            return response()->json(["success" => false, "message" => "No se pueden crear más publicaciones para este usuario"]);
        }
    }


    //funcion para obtener todos los voluntariados y por tipo
    public function vistaVoluntariadoEstado(){
            $idUsuario = request()->get('id');
            $tipo = request()->get('tipo');
            // Consulta de la base de datos con un join
            $result = db()
                ->query("SELECT v.*, e.tipo AS tipo_estado
                             FROM voluntariado v
                             INNER JOIN estado e ON v.estado = e.id
                             WHERE v.identificador_usuario =  {$idUsuario}
                             AND v.tipo = {$tipo}")
                ->all();
            // Envío de datos o vacío para evitar problemas
            return response()->json($result ?? []);
    }

    public function vistaVoluntariadoInfo(){
        $idUsuario = request()->get('id');
        // Consulta de la base de datos con un join
        $result = db()
            ->query("SELECT v.*, e.tipo AS tipo_estado
            FROM voluntariado v
            INNER JOIN estado e ON v.estado = e.id
            WHERE v.id =" . $idUsuario)
            ->all();
        // Envío de datos o vacío para evitar problemas
        return response()->json($result ?? []);

    }
    public function vistaVoluntariadoEspecifico(){
        $idUsuario = request()->get('id');
        // Consulta de la base de datos con un join
        $result = db()
            ->query("SELECT av.*, p.nombre,p.imagen, p.precio, re.descripcion as cambio
                from articulosVoluntariado av
                join producto p ON p.id = av.identificador_producto
                join retribucion re ON re.id = av.id_retribucion
                where identificador_voluntariado = {$idUsuario};")
            ->all();
        // Envío de datos o vacío para evitar problemas
        return response()->json($result ?? []);
}
        //esto para la pagina principal de voluntariado
    // excepto cancelado o en espera
    public function vistaTotalVoluntariado()
    {
        $respuesta = db()
        ->query("SELECT v.*,e.tipo 
        from voluntariado v 
        join estado e  on e.id = v.estado 
        where (v.estado = 3 or v.estado = 4 or v.estado = 5 )
        and v.tipo = 1;")
            ->all();
        return response()->json($respuesta ?? []);
    }

    public function vistaTotalTrueque(){
        $respuesta = db()
        ->query("SELECT v.*,e.tipo 
        from voluntariado v 
        join estado e  on e.id = v.estado 
        where (v.estado = 3 or v.estado = 4 or v.estado = 5 )and v.tipo = 2 ;")
            ->all();
        return response()->json($respuesta ?? []);
    }
   //funcion para la vista de toda publicacion para ADMIN
    //tiene varios join de usaurios y estado
    public function vistaVoluntariadoAdmin()
    {
        $result = db()
            ->query("SELECT v.*,e.tipo 
            as tipo_estado, u.user 
            as nombre_usuario 
            from voluntariado v 
            JOIN estado e 
            ON v.estado = e.id 
            join usuario u 
            on u.id = identificador_usuario;")
            ->all();

        return response()->json($result ?? []);
    }
    //fucnion para aceptar la venta
    public function aceptarVoluntariado()
    {
        $idVenta = request()->get('id');

        $resultado = db()
            ->update("voluntariado")
            ->params(["estado" => 4])
            ->where("id", $idVenta)
            ->execute();

        return response()->json($resultado ?? []);
    }
    //funcion para rechazar el voluntariado

    public function rechazarVoluntariado()
    {
        $idVenta = request()->get('id');

        $resultado = db()
            ->update("voluntariado")
            ->params(["estado" => 2])
            ->where("id", $idVenta)
            ->execute();

        return response()->json($resultado ?? []);
    }

// funcion para reportar los voluntariados
        public function reportarVoluntariado(){
        $id = app() ->request()->get('id');
        $peticion = db()
        ->query("UPDATE voluntariado set estado = 5
        WHERE id = {$id};")
        ->execute();

        if($peticion){
            return response()->json(["success" => true, "message" => "ahora si"]);
        } else {
            return response()->json(["error" => true, "message" => "aun no"]);

        }
    }


    // genera el darle de baja a un voluntariado
        public function dardeBajaVoluntariado(){
        $id = app() ->request()->get('id');
        $peticion = db()
        ->query("UPDATE voluntariado set estado = 6
        WHERE id = {$id};")
        ->execute();



        $seleccion = db()
        ->query("SELECT COUNT(*) 
        from voluntariado where estado = 6 
        and identificador_usuario = 
        (select identificador_usuario 
        from voluntariado where id = {$id});")
        ->column();


        if(($seleccion >=2 )) {
        $peticion2 = db()
        ->query("UPDATE voluntariado set estado = 6
        where estado !=6 
        and identificador_usuario = 
        (select identificador_usuario 
        from voluntariado where id = {$id});")
        ->execute();

        $peticion3 = db()
        ->query("UPDATE publicacion set estado = 6
        where estado !=6 
        and identificador_usuario = 
        (select identificador_usuario 
        from voluntariado where id = {$id});")
        ->execute();

        $cancelarUsuario = db()
        ->query("UPDATE usuario
        SET idRol = 3
        WHERE id = (select identificador_usuario 
        from voluntariado where id = {$id});")
        ->execute();
        }

        if($peticion){
            return response()->json(["success" => true, "message" => "ahora si"]);
        } else {
            return response()->json(["error" => true, "message" => "aun no"]);

        }
    }


    // funcion para ver los voluntariados reportados
    public function voluntariadosReportados(){
        $respuesta = db()
        ->query("SELECT v.*, e.tipo 
        AS tipo_estado, u.user 
        AS nombre_usuario, t.tipo 
        AS tipo_voluntariado         
        FROM voluntariado v         
        JOIN estado e ON v.estado = e.id         
        JOIN usuario u ON v.identificador_usuario = u.id 
        join tipoVoluntariado t on t.id = v.tipo  
        where v.estado = 5;")
        ->all();
        return response()->json($respuesta ?? []);
    }


        // funcion para ver los voluntariados reportados
    public function voluntariadosCancelados(){
        $respuesta = db()
        ->query("SELECT v.*, e.tipo 
        AS tipo_estado, u.user 
        AS nombre_usuario, t.tipo 
        AS tipo_voluntariado         
        FROM voluntariado v         
        JOIN estado e ON v.estado = e.id         
        JOIN usuario u ON v.identificador_usuario = u.id 
        join tipoVoluntariado t on t.id = v.tipo  
        where v.estado = 6;")
        ->all();
        return response()->json($respuesta ?? []);
    }


    //todo PARA LO DE ACTULIZAR ESTADO
    public function actualizarEstado(){
        $id = app() ->request()->get('id');
        $idVoluntario = db()
        ->query("SELECT id_articulo_Voluntariado FROM 
        comprobanteAyudaVoluntariado where id  = {$id};")
        ->column();

        $idAyudaVoluntario = db()
        ->query("SELECT id_ayuda_Voluntariado FROM 
        comprobanteAyudaVoluntariado where id  = {$id};")
        ->column();
        
        //busqueda de elementos totales
        $peticion2 = db()
        -> query("SELECT count(*) as cantidad 
        from articulosVoluntariado 
        where  identificador_voluntariado =(SELECT identificador_voluntariado FROM
        articulosVoluntariado where id = {$idVoluntario})
        and cantidadProducto = 0;")
        ->column();
        //primero hacer busqueda de elementos con cero
        // en base al ultimo valor de factura
        $peticion = db()
        -> query("SELECT COUNT(*) AS cantidad 
        from articulosVoluntariado 
        where identificador_voluntariado = (SELECT identificador_voluntariado FROM
        articulosVoluntariado where id = {$idVoluntario});")
        ->column();
        // luego hacer actulizacion
        //si es valido entonces actualizar solo a los en venta
        if($peticion == $peticion2) {
            $idVenta = db()
            ->query("SELECT id_voluntariado 
            from ayudaVoluntariado 
            where id ={$idAyudaVoluntario};")
            ->column();


            $resultado = db()
            ->update("voluntariado")
            ->params(["estado" => 3])
            ->where("id", $idVenta)
            ->execute();

            return response()->json(["success" => true, "message" => "ahora si"]);

        } else {
            return response()->json(["error" => true, "message" => "aun no"]);

        }

    }


        //obtiene los ids de facturas
    public function obtenerVoluntariadoId()
    {
        $id = app()->request()->get('id');
        $peticion = db()
            ->query('SELECT distinct id from ayudaVoluntariado where id_cliente =' . $id)
            ->fetchAll();
        return response()->json($peticion ?? []);
    }


        //obtiene todas las compras en base al id de publicacion y de usuarui
    public function obtenerVoluntariadoIdDetalle()
    {
        $id = app()->request()->get('id');
        $idAyudaVoluntariado = app()->request()->get('idAyudaVoluntariado');
        $peticion = db()
            ->query(" SELECT av.id AS id_voluntariado,
        v.titulo AS titulo_voluntariado,
        av.fecha,
        d.id_articulo_Voluntariado,
        d.cantidad,
        d.precio,
        pr.nombre AS nombre_producto,
        u.user AS nombre_usuario
        FROM ayudaVoluntariado av
        JOIN comprobanteAyudaVoluntariado d ON av.id = d.id_ayuda_Voluntariado
        JOIN voluntariado v ON av.id_voluntariado = v.id
        join articulosVoluntariado arv on arv.id = d.id_articulo_Voluntariado
        JOIN producto pr ON arv.identificador_producto = pr.id
        JOIN usuario u ON v.identificador_usuario = u.id
        where av.id_cliente ={$id} and av.id ={$idAyudaVoluntariado};")
            ->fetchAll();
        return response()->json($peticion ?? []);
    }


}
