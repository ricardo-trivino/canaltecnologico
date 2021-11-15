var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipoUsModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
TipoUsModel.getTiposUs = function (callback) {
    var sql = "SELECT `id_tipo_usuario`, `tipo_usuario` FROM `tipos_usuario` ORDER BY `id_tipo_usuario` DESC;";
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
TipoUsModel.getTipoUs = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_tipo_usuario`, `tipo_usuario` FROM `tipos_usuario` WHERE id_tipo_usuario = " +
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
TipoUsModel.insertTipoUs = function (TipoUsData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tipos_usuario SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, TipoUsData, function (error, result) {
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
TipoUsModel.updateTipoUs = function (TipoUsData, callback) {
    if (connection) {
        var sql = "UPDATE tipos_usuario SET tipo_usuario = " + connection.escape(TipoUsData.tipo_usuario) +
            " WHERE id_tipo_usuario = " + connection.escape(TipoUsData.id_tipo_usuario) + ";";
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
module.exports = TipoUsModel;