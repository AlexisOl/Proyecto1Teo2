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


    //funcion para obtener todos los voluntariados
    public function vistaVoluntariadoEstado(){
            $idUsuario = request()->get('id');
            // Consulta de la base de datos con un join
            $result = db()
                ->query("SELECT v.*, e.tipo AS tipo_estado
                             FROM voluntariado v
                             INNER JOIN estado e ON v.estado = e.id
                             WHERE v.identificador_usuario = " . $idUsuario)
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
            ->query("SELECT av.*, p.nombre, p.precio, re.descripcion as cambio
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
            ->select('voluntariado')
            ->where('estado', 3)
            ->orWhere('estado', 4)
            ->orWhere('estado', 5)
            ->all();
        return response()->json($respuesta ?? []);
    }

}
