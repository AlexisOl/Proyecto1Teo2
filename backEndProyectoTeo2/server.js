const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('holaaaaaa en el puerto desde node');
});

app.get('/hola', (req, res) => {
    res.send('hola en otro lado');
});

app.get('/hola/adios', (req, res) => {
    res.send('hola en otro lado para adios');
});

app.listen(3000, () => console.log('simon en el 3000'));
