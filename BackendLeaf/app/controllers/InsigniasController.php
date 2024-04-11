<?php

namespace App\Controllers;

use Leaf\DB;

class InsigniasController extends Controller
{




    //funcion para obtener todos los voluntariados
    public function crearInsingia(){
        $insignia = app()-> request()->get('insignia');
        //creacion
        $insertResult = db()
        ->insert("insignias")
        ->params([
          "nombre" => $insignia['nombre'],
          "id_voluntariado" => $insignia['id_voluntariado'],
        ])
        ->execute();
        if ($insertResult) {
            // Obtiene el ID generado por la base de datos
            $insertedId =db()->lastInsertId();

            // Devuelve el ID generado como respuesta positiva
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            // Si la inserción falla, devuelve un mensaje de error
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }

    }
    //funcion para obtener las insignias en un voluntariado

    public function obtenerInsignia(){
        $id = app()-> request()->get('id');
        $result = db()
        ->query("SELECT ai.*, i.nombre, v.titulo 
        from asignacionInsignia ai 
        join insignias i on i.id = ai.id_insignia 
        join voluntariado v on v.id = i.id_voluntariado 
        where ai.id_usuario = {$id};")
        ->all();
        return response()->json($result ?? []);
    }


    public function obtenerInsigniaEspecifica(){
        $id = app()-> request()->get('id');
        $result = db()
        ->query("SELECT v.*, i.nombre 
        from voluntariado v 
        join insignias i 
        on i.id_voluntariado=v.id 
        where v.id ={$id};")
        ->all();
        return response()->json($result ?? []);
    }
}
