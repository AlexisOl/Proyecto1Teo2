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
app() -> get('/vistaPublicacion', 'PublicacionController@vistaPublicacionEstado');
// obteners todas las publicaciones
app() -> get('/obtenerTodaPublicacion', 'PublicacionController@vistaTotalPublicacion');
//funcion para la vistad de puublicaciones



// para las asignaciones de todos los productos por publicacion
app() -> post('/asignacionProductos', 'ArticulosPublicacionController@ingresoArticulosPublicacion');


//ventas especifico
// ruta para obtener los productos en base a su id
app() -> get('/obtenerProductoId', 'ProductoController@obtenerProductoId');

/// funcion para obtener los productos en base a su publicacion

app() -> get('/obtenerInfoPorPublicacion', 'ArticulosPublicacionController@obtenerProductosIdPublicacion');
app() -> get('/obtenerProductosPorPublicacion', 'ArticulosPublicacionController@prueba');

app() -> get('/prueba', 'ProductoController@uploadImage');

//ADMIN
//funcion para que muestre las ventas
app() -> get('/obtenerTodaPublicacionAdmin', 'PublicacionController@vistaPublicacionesAdmin');
//funcion para aceptar las ventas
app() -> get('/aceptarVenta', 'PublicacionController@aceptarVenta');
//funcion para rechazar ventas
app() -> get('/rechazarVenta', 'PublicacionController@rechazarVenta');


//COMPRAS

//ingreso de los comentarios
app() -> post('/ingresoComentario', 'ComentariosController@ingresoComentario');
//
app() -> get('/obtenerInfoPublicacionCompra', 'PublicacionController@vistaPublicacionesEspecificasCompras');


//obtener comentarios por publicacion y id de usuario que pregunta
app() -> get('/obtenerConversacionEspecifica', 'ComentariosController@verComentariosPorId');
//obtener los usuarios que hayan comentado unico para vendedor
app() -> get('/obtenerUsuariosComentarios', 'ComentariosController@verComentariosPorIdPublicacion');


//solo prueba de fehca
app() -> get('/fecha', 'FacturaController@pruebaFecha');

