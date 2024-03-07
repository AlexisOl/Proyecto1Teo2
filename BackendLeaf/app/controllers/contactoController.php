<?php

namespace App\Controllers;

use App\Models\Contactos;



class contactoController extends Controller {


    public function index(){
        response() -> json(Contactos::all());
    }
}
