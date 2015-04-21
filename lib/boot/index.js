import express from 'express';
import landing from '../landing/index.js'

let app = express();

app.get('/', (req, res) => res.send('hello'));

var server = app.listen(8000, () => console.log('App started, listening at http://%s:%s', server.address().address, server.address().port));

/*
3 preguntas para saber de que se trata el sistema 
- cual es el objetivo del sistema?
- quienes son los usuarios?
- para cuando tiene que estar?
*/