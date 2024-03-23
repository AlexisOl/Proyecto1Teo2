<?php



app()->get('/', function () {
    /**
     * `render(view, [])` is the same as `echo view(view, [])`
     */
    render('index');
});

//* ruta para usuarios LOGIN
app()-> get('/nombreUsuario', 'usuarioController@Index');


//***--------RUTAS VENTAS
//ruta para obtener las categorias
app() -> get('/obtenerCategorias', 'CategoriaController@todasCategorias');
//ruta de ingreso de productos
app() -> post('/ingresoProducto', 'ProductoController@ingresoProducto');
// para la obtencion de los prodcutos registrados
app() -> get('/vistaProducto', 'ProductoController@obtencionTotal');

//funcion para guardar imagenes
app() -> post('/guardarImagen', 'ProductoController@guardarImagen');

// ver imagen

app()->get('/imagen', 'ProductoController@devolverImagen');

// *para publicaciones ==== VENTAS
// ingreso
app() -> post('/ingresoPublicaciones', 'PublicacionController@ingresoPublicacion');
// vista general de publicaciones por usuario
app() -> get('/vistaPublicacion', 'PublicacionController@vistaPublicacionEstado');
// obteners todas las publicaciones
app() -> get('/obtenerTodaPublicacion', 'PublicacionController@vistaTotalPublicacion');
//funcion para la cantidad de publicaciones
app() -> get('/obtenerInformacionVentasRealizadas', 'PublicacionController@obtenerInformacionVentasRealizadas');

//funcion para obtener todas las publicaciones por id
app() -> get('/obtenerTodasLasPublicacionesporId', 'PublicacionController@obtenerTodasLasPublicacionesporId');





// para las asignaciones de todos los productos por publicacion
app() -> post('/asignacionProductos', 'ArticulosPublicacionController@ingresoArticulosPublicacion');


// para ver los productos en las ventas y sus posteriores imagenes

app() -> get('/obtenerImagenesPorPublicaciones', 'PublicacionController@obtenerImagenesPorPublicaciones');


//*ventas especifico
// ruta para obtener los productos en base a su id
app() -> get('/obtenerProductoId', 'ProductoController@obtenerProductoId');

/// funcion para obtener los productos en base a su publicacion

app() -> get('/obtenerInfoPorPublicacion', 'ArticulosPublicacionController@obtenerProductosIdPublicacion');
app() -> get('/obtenerProductosPorPublicacion', 'ArticulosPublicacionController@prueba');

app() -> get('/nuevo', 'ProductoController@uploadImage');

app() -> get('/cantidadProductosValida', 'ArticulosPublicacionController@sePuedeEliminarDatos');

// cambio del estado
app() -> get('/actualizarEstado', 'PublicacionController@actualizarEstado');


//*ADMIN
//funcion para que muestre las ventas
app() -> get('/obtenerTodaPublicacionAdmin', 'PublicacionController@vistaPublicacionesAdmin');
//funcion para aceptar las ventas
app() -> get('/aceptarVenta', 'PublicacionController@aceptarVenta');
//funcion para rechazar ventas
app() -> get('/rechazarVenta', 'PublicacionController@rechazarVenta');


//**COMPRAS

//ingreso de los comentarios
app() -> post('/ingresoComentario', 'ComentariosController@ingresoComentario');
//
app() -> get('/obtenerInfoPublicacionCompra', 'PublicacionController@vistaPublicacionesEspecificasCompras');


//obtener comentarios por publicacion y id de usuario que pregunta
app() -> get('/obtenerConversacionEspecifica', 'ComentariosController@verComentariosPorId');
//obtener los usuarios que hayan comentado unico para vendedor
app() -> get('/obtenerUsuariosComentarios', 'ComentariosController@verComentariosPorIdPublicacion');


app() -> get('/obtenerPublicacionesNombre', 'PublicacionController@vistaTotalPublicacionPorBusquedaProducto');


//! COMRPAS no logeados
app() -> get('/obtenerInfoUsuarios', 'usuarioController@obtenerInformacionId');




//*** */ GENERACION DE FACTURAS
//solo prueba de fehca
app() -> get('/fecha', 'FacturaController@pruebaFecha');
//ingreso de la factura
app() -> post('/ingresoFactura', 'FacturaController@ingresoFactura');
//ingreso detallado
app() -> post('/ingresoDetalleFactura', 'DetalleFacturaController@ingresoDetallado');

app() -> get('/obtenerFacturas', 'FacturaController@obtenerIdFacturas');

app() -> get('/obtenerFacturasDetalle', 'FacturaController@obtenerComprasRealizadasUsuarios');


