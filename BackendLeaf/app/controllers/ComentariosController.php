<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;

class ComentariosController extends Controller
{
    //ingreso de comentarios
    public function ingresoComentario()
    {
        //generacion de la fecha actual
        $date = date('d-m-y');
        $comentario = app()->request()->get('comentario');

        // Convertir respuestaUsuarioOriginal a booleano
        $respuestaUsuarioOriginal = $comentario['respuestaUsuarioOriginal'] === '1' ? false : true;

        $insertResult = db()
            ->insert("comentarios")
            ->params([
                "fecha" => $date,
                "mensaje" => $comentario['mensaje'],
                "id_publicacion" => $comentario['id_publicacion'],
                "id_usuarioPregunta" => $comentario['id_usuarioPregunta'],
                "respuestaUsuarioOriginal" =>  $respuestaUsuarioOriginal,
            ])
            ->execute();

        if ($insertResult) {
            $insertedId = db()->lastInsertId();
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }
    }

    public function verComentariosPorId()
    {
        $idUsuario = app()->request()->get('idCliente');
        $idPublicacion = app()->request()->get('idPublicacion');
        $respuesta = db()
        ->query("SELECT      c.*,             CASE          WHEN c.respuestaUsuarioOriginal = 1 THEN up.user                      ELSE upublicacion.user             END AS nombreUsuarioRespuesta  FROM      comentarios c  LEFT JOIN      usuario up ON c.respuestaUsuarioOriginal = 1 AND c.id_usuarioPregunta = up.id  LEFT JOIN      publicacion p ON c.respuestaUsuarioOriginal = 0 AND p.id = c.id_publicacion LEFT JOIN usuario upublicacion ON p.identificador_usuario = upublicacion.id WHERE c.id_publicacion ={$idPublicacion} and c.id_usuarioPregunta ={$idUsuario}")
            // ->select('comentarios')
            // ->where('id_publicacion', $idUsuario)
            // ->where('id_usuarioPregunta', $idPublicacion)
            ->all();
        return response()->json($respuesta ?? []);
    }
}
