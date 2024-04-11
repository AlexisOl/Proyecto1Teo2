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

    //funcion para ingresar monedas
public function ingresoMonedas(){
    $monedas =request()->get('dinero');
    $id =request()->get('id');
    //obtener las moneads primero
    $monedasOriginales = db()
    -> query("select cantidad_monedas from usuario where id = {$id};")
    ->column();
    $monedaFinal = $monedasOriginales+$monedas;
    if($monedaFinal>0) {
        db()
        ->update("usuario")
        ->params(["cantidad_monedas" => "{$monedaFinal}"])
        ->where("id", "{$id}")
        ->execute();
    } else{
        return 'error';
    }

}

    //funcion para extaer las monedas
    public function extaerMonedas(){
        $monedas = request()->get('dinero');
        $id =request()->get('id');

        //obtener las moneads primero
        $monedasOriginales =db()
        -> query("select cantidad_monedas from usuario where id = {$id};")
        ->column();

        $monedaFinal = (int)$monedasOriginales-(int)$monedas;
        if($monedaFinal>0) {
            db()
            ->update("usuario")
            ->params(["cantidad_monedas" => "{$monedaFinal}"])
            ->where("id", "{$id}")
            ->execute();
        } else{
            return 'error';
        }

    }

    //registro de los usuarios 
    public function registroUsuario(){
        $usuario = request()->get('usuario');
    
        //peticion para ver si ya hay valores de nombre 
        // repetidos 
    
        $peticion = db()
        ->query("SELECT COUNT(*) FROM usuario WHERE user = '{$usuario['user']}';")
        ->column();
    
        if($peticion == 0) {
            db()
            ->insert("usuario")
            ->params([
                "user" => $usuario['user'],
                "password" => $usuario['password'],
                "idRol" => $usuario['idRol'],
                "contacto" => $usuario['contacto'],
                "cantidad_monedas" => $usuario['cantidad_monedas'],
            ])
            ->execute();
            return response()->json(["success" => true, "message" => "Usuario creado correctamente"]);
        } else {
            return response()->json(["success" => false, "message" => "El usuario ya existe"]);
        }
    }
    
}
