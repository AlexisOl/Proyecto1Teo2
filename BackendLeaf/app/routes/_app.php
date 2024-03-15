<?php



app()->get('/', function () {
    /**
     * `render(view, [])` is the same as `echo view(view, [])`
     */
    render('index');
});

// ruta para usuarios LOGIN
app()-> get('/nombreUsuario', 'usuarioController@Index');


//--------RUTAS VENTAS
//ruta para obtener las categorias
app() -> get('/obtenerCategorias', 'CategoriaController@todasCategorias');
//ruta de ingreso de productos
app() -> post('/ingresoProducto', 'ProductoController@ingresoProducto');
// para la obtencion de los prodcutos registrados
app() -> get('/vistaProducto', 'ProductoController@obtencionTotal');


// para publicaciones
// ingreso
app() -> post('/ingresoPublicacion', 'PublicacionController@ingresoPublicacion');
// vista general de publicaciones por usuario
app() -> get('/vistaPublicacion', 'PublicacionController@vistaPublicacion');
// obteners todas las publicaciones
app() -> get('/obtenerTodaPublicacion', 'PublicacionController@vistaTotalPublicacion');


// para las asignaciones de todos los productos por publicacion
app() -> post('/asignacionProductos', 'ArticulosPublicacionController@ingresoArticulosPublicacion');


//ventas especifico
// ruta para obtener los productos en base a su id
app() -> get('/obtenerProductoId', 'ProductoController@obtenerProductoId');

/// funcion para obtener los productos en base a su publicacion

app() -> get('/obtenerInfoPorPublicacion', 'ArticulosPublicacionController@obtenerProductosIdPublicacion');
