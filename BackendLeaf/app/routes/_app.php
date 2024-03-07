<?php

app()->get('/', function () {
    /**
     * `render(view, [])` is the same as `echo view(view, [])`
     */
    render('index');
});

// ruta para usuarios LOGIN
app()-> get('/nombreUsuario', 'usuarioController@Index');
