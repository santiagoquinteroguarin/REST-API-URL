const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

// pool - hilos que se ejecutan en secuencia , funciona con collbacks
const pool = mysql.createPool(database);

// no llamar cada vez la conexion
pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // la conexión con la base de datos perdida
            console.error('DATABASE CONNECTION WAS CLOSED');
        }

        if(err.code === 'ER_CON_COUNT_ERROR') { // comprobar cuantas conexiones tiene la base de datos
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        } 

        if(err.code === 'ECONNREFUSED') { // conexión rechazada, credenciales o otros
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

// cada vez que utilice un query ya puedo utilizar promesas y async await
pool.query = promisify(pool.query);

module.exports = pool;