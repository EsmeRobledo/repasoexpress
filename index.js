const express = require('express');
//usamos el frameword de express para REST API
const cors = require('cors');
//usamos cors para permitir conexiones entre distintos dominios
//localhost
const server = express();
//todo lo que esta dentro del server.use es un middleware 
//middleware es una funcion de express
server.use(cors());
//Usamos el middleware de express Json para poder leer los datos
//desde el body
server.use(express.json());
//Ponemos el puerto en una constante
const PORT = 3000;
//Tercero: Creamos un array de objetos para simular una base de datos
let platillos = [
    { nombre: 'Tacos', precio: 50 },
    { nombre: 'Mole', precio: 100 },
    { nombre: 'Enchiladas', precio: 50 },
]
//Verbos o metodos http
/**
 * GET: Obtener datos
 * POST: Crear o realizar un proceso en servidor
 * PUT: Actulizar datos
 * DELETE: Eliminar datos
 */
//Segundo: creamos nuestro endpoint principal
server.get('/', (request, response) => {
    response.send("API V1.0")
})

//Cuarto: Creamos nuestro primer endpoint, para obtener todos nuestros platillos.
server.get('/platillos', (request, response) => {
    // response.send(platillos)
    response.json(
        {
            data: platillos
            /**data: platillos.map((platillo, index) => {
             * return {index, ...platillo}}) */
            , count: platillos.length
            , mensaje: "Platillos obtenidos correctamente"
        }
    )
})
//Creando el end point para agregar un platillo
server.post('/platillos', (request, response) => {
    //agregamos el platillo a nuestro array de platillos
    const platillo = request.body;// se crea una variable para almacenar el request


    if (!platillo.nombre) {//validamos si el platillo tiene nombre
        return response.status(400).json({ mensaje: "El platillo debe de tener un nombre " })
    }
    platillos.push(platillo);//agregamos el valor nuevo en el arreglo
    response.json(
        {
            data: platillo
            , mensaje: "Entro a la funcion de agregar platillo"
        }
    )


})

server.put('/platillos/:index', (request, response) => {
    // sacamos el indice de los parametros enviados en la url
    const { index } = request.params;
    // sacamos el valor del platillo del body
    const platillo = request.body;
    //Accedemos al elemento del array y lo actualizamos
    platillos[index] = platillo

    response.json(
        {
            data: index
            , mensaje: "Se actualizo el platillo"
        }
    )

})

server.delete('/platillos/:index', (request, response) => {
    // sacamos el indice de los parametros enviados en la url
    const { index } = request.params;
    //Accedemos al elemento del array y lo eliminamos
    platillos.splice(index, 1)

    response.json(
        {
            data: index
            , mensaje: "Se elimino el platillo"
        }
    )

})

//Primero : iniciamos el servidor de express con 
server.listen(PORT, () => {
    console.log("servidor iniciado en el puerto ", PORT);
})