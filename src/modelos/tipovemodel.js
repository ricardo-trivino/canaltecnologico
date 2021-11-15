var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipoVeModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
TipoVeModel.getTiposVe = function (callback) {
    var sql = "SELECT `id_tipo_vehiculo`, `tipo_vehiculo` FROM `tipos_vehiculo` ORDER BY `id_tipo_vehiculo` DESC;";
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
TipoVeModel.getTipoVe = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_tipo_vehiculo`, `tipo_vehiculo` FROM `tipos_vehiculo` WHERE id_tipo_vehiculo = " +
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
TipoVeModel.insertTipoVe = function (TipoVeData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tipos_vehiculo SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, TipoVeData, function (error, result) {
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
TipoVeModel.updateTipoVe = function (TipoVeData, callback) {
    if (connection) {
        var sql = "UPDATE tipos_vehiculo SET tipo_vehiculo = " + connection.escape(TipoVeData.tipo_vehiculo) +
            " WHERE id_tipo_vehiculo = " + connection.escape(TipoVeData.id_tipo_vehiculo) + ";";
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
module.exports = TipoVeModel;