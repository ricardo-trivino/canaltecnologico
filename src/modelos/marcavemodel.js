var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var MarcaVeModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
MarcaVeModel.getMarcasVe = function (callback) {
    var sql = "SELECT `id_marca_vehiculo`, `marca_vehiculo` FROM `marcas_vehiculo` ORDER BY `id_marca_vehiculo` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//---------------------------------------------------------------
//obtenemos un tipo identificacion por su id
MarcaVeModel.getMarcaVe = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_marca_vehiculo`, `marca_vehiculo` FROM `marcas_vehiculo` WHERE id_marca_vehiculo = " +
            connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31 tal " );
        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo tipo de identificacion
MarcaVeModel.insertMarcaVe = function (MarcaVeData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO marcas_vehiculo SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, MarcaVeData, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un identificación
MarcaVeModel.updateMarcaVe = function (MarcaVeData, callback) {
    if (connection) {
        var sql = "UPDATE marcas_vehiculo SET marca_vehiculo = " + connection.escape(MarcaVeData.marca_vehiculo) +
            " WHERE id_marca_vehiculo = " + connection.escape(MarcaVeData.id_marca_vehiculo) + ";";
        ///console.log(" 37 tal " + sql);

        connection.query(sql, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Actualizado" });
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = MarcaVeModel;