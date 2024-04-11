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

//obtiene factiras solo id
app() -> get('/obtenerFacturas', 'FacturaController@obtenerIdFacturas');
//obtiene facturas todas
app() -> get('/obtenerIdFacturasTotal', 'FacturaController@obtenerIdFacturasTotal');

app() -> get('/obtenerFacturasDetalle', 'FacturaController@obtenerComprasRealizadasUsuarios');

//** para los voluntariados */
//? obtiene las retribuciones
app() -> get('/obtenerRetribucion', 'RetribucionController@obtenerRetribucion');

//? ingreso de voluntariado
app() -> post('/ingresoVoluntariado', 'VoluntariadoController@ingresoVoluntariado');

//? ingreso de productos por voluntariado
app() -> post('/ingresoArticuloVoluntariado', 'ArticulosVoluntariadoController@ingresoArticulosVoluntariado');
//? para ver los voluntariados de usuario creados

app() -> get('/vistaVoluntariadoEstado', 'VoluntariadoController@vistaVoluntariadoEstado');
//? crea insignias

app() -> post('/crearInsignia', 'InsigniasController@crearInsingia');

//? consulta a todos los datos de voluntariado (articulos)
app() -> get('/obtenerProductosIdVoluntariado', 'ArticulosVoluntariadoController@obtenerProductosIdVoluntariado');

// para obtener insignias
app() -> get('/obtenerInsignia', 'InsigniasController@obtenerInsignia');

//? para todos los voluntariaods
app() -> get('/vistaTotalVoluntariado', 'VoluntariadoController@vistaTotalVoluntariado');

//? para el especifico del voluntariado TODOS LOS DATOS
app() -> get('/vistaVoluntariadoEspecifico', 'VoluntariadoController@vistaVoluntariadoEspecifico');
//? solo el voluntariado especifico en base al id
app() -> get('/vistaVoluntariadoInfo', 'VoluntariadoController@vistaVoluntariadoInfo');


//? ingreso del comprobante ayuda
app() -> post('/ingresoConstanciaAyudaVoluntariado', 'AyudaVoluntariadoController@ingresoConstanciaAyudaVoluntariado');
//?ingreso de detallado comprobante ayuda
app() -> post('/ingresoDetalleConstanciaAyudaVoluntariado', 'ComprobanteAyudaVoluntariadoController@ingresoDetalleConstanciaAyudaVoluntariado');







//! el de crear productos estara igual solo maneja un cambio de estado

//* finanzas
//ingreso monedas
app() -> post('/ingresoMonedas', 'usuarioController@ingresoMonedas');
//extraccion de monedas
app() -> post('/extaerMonedas', 'usuarioController@extaerMonedas');


//* para los usuario
app() -> post('/registroUsuario', 'usuarioController@registroUsuario');
app() -> post('/peticionPorcentaje', 'ComprobanteAyudaVoluntariadoController@peticionPorcentaje');

//? para los cupones
app() -> get('/obtenerCupones', 'CuponesController@obtenerCupones');