<?php

namespace App\Controllers;

use Leaf\DB;

class UsuarioController extends Controller
{
    public function index()
    {
        $nombre = (string) request()->get('user');
        $password = (string) request()->get('password');

        //consulta de la base de datos
        $result = db()
            ->select('usuario')
            ->where('user', '=', $nombre)
            ->where('password', '=', $password)
            ->first();

        // Verificar si se encontró un usuario
        if ($result) {
            return response()->json($result);
        } else {
            return response()->json(['mensaje' => 'No existe']);
        }
    }

    //funcion para obtener la info del usuario por id
    public function obtenerInformacionId(){
        $id = (string) request()->get('id');
        $result = db()
        ->select('usuario')
        ->where('id', '=', $id)
        ->first();

    // Verificar si se encontró un usuario
    if ($result) {
        return response()->json($result);
    } else {
        return response()->json(['mensaje' => 'No existe']);
    }
    }


    //funcion para obtener al usuario

}
