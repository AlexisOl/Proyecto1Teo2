<?php

namespace App\Controllers;

use Doctrine\DBAL\Types\Type;
use Leaf\DB;
use Psy\Util\Json;
use \Datetime;
use \DateTimeZone;
use function PHPSTORM_META\type;

class FacturaController extends Controller
{
    //ingreso de comentarios
    public function pruebaFecha()
    {
        $now = new DateTime('', new DateTimeZone('America/Mexico_City'));
        echo $now->format('d-m-y');
    }
}


