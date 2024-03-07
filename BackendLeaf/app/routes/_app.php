<?php

app()->get('/', function () {
    /**
     * `render(view, [])` is the same as `echo view(view, [])`
     */
    render('index');
});

app()-> get('/prueba', 'contactoController@Index');
