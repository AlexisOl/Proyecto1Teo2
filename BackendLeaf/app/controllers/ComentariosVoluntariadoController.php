<?php

namespace App\Controllers;

use App\Models\Categorias;
use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class ComentariosVoluntariadoController extends Controller
{
    //ingreso de comentarios
    public function envioComentarioVoluntariado()
    {
        //generacion de la fecha actual
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        $date= $now->format('y-m-d H:i:s');
        $comentario = app()->request()->get('comentario');

        //$respuestaUsuarioOriginal = $comentario['respuestaUsuarioOriginal'] === '1' ? false : true;
        if($comentario['respuestaUsuarioOriginal']==0){
            $valorNuevo  = 1;
        } else {
            $valorNuevo ='0';
        }
        //$valorNuevo =$comentario['respuestaUsuarioOriginal']=='0'? true:false;
       // print($comentario['respuestaUsuarioOriginal']."--". gettype($comentario['respuestaUsuarioOriginal']). $valorNuevo."   -- ". gettype($valorNuevo));
        $insertResult = db()
            ->insert("comentariosVoluntariado")
            ->params([
                "fecha" => $date,
                "mensaje" => $comentario['mensaje'],
                "id_voluntariado" => $comentario['id_voluntariado'],
                "id_usuarioPregunta" => $comentario['id_usuarioPregunta'],
                "respuestaUsuarioOriginal" => $valorNuevo
            ])
            ->execute();

        if ($insertResult) {
            $insertedId = db()->lastInsertId();
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }
    }

    public function verConversacionClienteVoluntariado()
    {
        $idUsuario = app()->request()->get('idCliente');
        $idvoluntariado = app()->request()->get('idvoluntariado');
        $respuesta = db()
        ->query("SELECT c.*,CASE WHEN c.respuestaUsuarioOriginal = 1 
        THEN up.user ELSE upublicacion.user
        END AS nombreUsuarioRespuesta  
        FROM comentariosVoluntariado c  
        LEFT JOIN usuario up 
        ON c.respuestaUsuarioOriginal = 1 
        AND c.id_usuarioPregunta = up.id  
        LEFT JOIN voluntariado p 
        ON c.respuestaUsuarioOriginal = 0 
        AND p.id = c.id_voluntariado 
        LEFT JOIN usuario upublicacion 
        ON p.identificador_usuario = upublicacion.id 
        WHERE c.id_voluntariado ={$idvoluntariado} 
        and c.id_usuarioPregunta ={$idUsuario}")
            // ->select('comentarios')
            // ->where('id_publicacion', $idUsuario)
            // ->where('id_usuarioPregunta', $idPublicacion)
            ->all();
        return response()->json($respuesta ?? []);
    }

    //* para la vista del vendedor
    // ? obtenemos los comentarios asociados a la publicacion unicos id
    public function verComentariosPorIdVoluntariado() {
        // id publicacion
        $idVoluntariado = app()->request()->get('idVoluntariado');
        $respuesta = db()
            ->query("SELECT DISTINCT 
            c.id_usuarioPregunta,
            c.id_voluntariado,
            u.user 
            AS nombreUsuario,
            p.identificador_usuario 
            AS id_usuario_publicacion
            FROM comentariosVoluntariado c 
            JOIN usuario u 
            ON c.id_usuarioPregunta = u.id
            JOIN voluntariado p 
            ON c.id_voluntariado = p.id
            WHERE p.id =  ".$idVoluntariado)
            ->all();
        return response()->json($respuesta ?? []);
    }
}

