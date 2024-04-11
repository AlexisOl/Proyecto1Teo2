<?php

namespace App\Controllers;

use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;

class ComprobanteAyudaVoluntariadoController extends Controller
{

    public function ingresoDetalleConstanciaAyudaVoluntariado()
    {
        $comprobanteAyudaVoluntariado = app()->request()->get('comprobanteAyudaVoluntariado');
        $id = app()->request()->get('id');
        // aqui generamos un select para su ingreso 
        $peticionRetribucion = db()
        ->query("SELECT id_retribucion 
        from articulosVoluntariado where id = {$comprobanteAyudaVoluntariado['id_articulo_Voluntariado']};")
        ->column();
        // aqui creo el cupon
        if($peticionRetribucion == 2) {
            $monedasOriginales = db()
            -> query("select cantidad_monedas from usuario where id = {$id};")
            ->column();
            $monedaFinal = $monedasOriginales+$comprobanteAyudaVoluntariado['precio'];
            if($monedaFinal>0) {
                db()
                ->update("usuario")
                ->params(["cantidad_monedas" => "{$monedaFinal}"])
                ->where("id", "{$id}")
                ->execute();
            } else{
                return 'error';
            }
        } else {
            //genera un cupon
            //busqueda de cantidad inicial 
            $porcentajePeticion = db()
            ->query("SELECT 
            {$comprobanteAyudaVoluntariado['precio']}
            /
            (select precioProducto 
            from articulosVoluntariado 
            where id = {$comprobanteAyudaVoluntariado['id_articulo_Voluntariado']});")
            ->column();

        //obtoene el voluntariado 
        $peticionIdVoluntariado = db()
        ->query("SELECT id_voluntariado 
        from ayudaVoluntariado where id = {$comprobanteAyudaVoluntariado['id_ayuda_Voluntariado']};")
        ->column();
            //insersion de cupon    
        $insertResult = db()
        ->insert("cupones")
        ->params([
            "porcentaje" => $porcentajePeticion,
            "id_usuario" => $id,
            "id_voluntariado" => $peticionIdVoluntariado,
        ])
        ->execute(); 
    }



        // Realizar la consulta
        $insertResult = db()
            ->insert("comprobanteAyudaVoluntariado")
            ->params([
                "id_articulo_Voluntariado" => $comprobanteAyudaVoluntariado['id_articulo_Voluntariado'],
                "id_ayuda_Voluntariado" => $comprobanteAyudaVoluntariado['id_ayuda_Voluntariado'],
                "precio" => $comprobanteAyudaVoluntariado['precio'],
                "cantidad" => $comprobanteAyudaVoluntariado['cantidad'],
            ])
            ->execute();

        if ($insertResult) {
            $insertedId = db()->lastInsertId();
            return response()->json(["success" => true, "message" => "Publicación creada correctamente", "insertedId" => $insertedId]);
        } else {
            return response()->json(["success" => false, "message" => "Error al crear la publicación"]);
        }
    }


    public function peticionPorcentaje(){
        $comprobanteAyudaVoluntariado = app()->request()->get('comprobanteAyudaVoluntariado');

            //busqueda de cantidad inicial 
            $porcentajePeticion = db()
            ->query("SELECT 
            {$comprobanteAyudaVoluntariado['precio']}
            /
            (select precioProducto 
            from articulosVoluntariado 
            where id = {$comprobanteAyudaVoluntariado['id_articulo_Voluntariado']});")
            ->column();

            echo $porcentajePeticion;
    }

}


