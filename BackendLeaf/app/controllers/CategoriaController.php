<?php

namespace App\Controllers;

use App\Models\Categorias;
use Leaf\DB;
use Psy\Util\Json;

class CategoriaController extends Controller
{
    public function todasCategorias()
    {

        response() -> json(Categorias::all());

    }
}
