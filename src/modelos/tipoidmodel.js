var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipoIdModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
TipoIdModel.getTiposId = function (callback) {
    var sql = "SELECT `id_tipo_identificacion`, `tipo_identificacion` FROM `tipos_identificacion` ORDER BY `id_tipo_identificacion` DESC;";
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
TipoIdModel.getTipoId = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_tipo_identificacion`, `tipo_identificacion` FROM `tipos_identificacion` WHERE id_tipo_identificacion = " +
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
TipoIdModel.insertTipoId = function (TipoIdData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tipos_identificacion SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, TipoIdData, function (error, result) {
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
TipoIdModel.updateTipoId = function (TipoIdData, callback) {
    if (connection) {
        var sql = "UPDATE tipos_identificacion SET tipo_identificacion = " + connection.escape(TipoIdData.tipo_identificacion) +
            " WHERE id_tipo_identificacion = " + connection.escape(TipoIdData.id_tipo_identificacion) + ";";
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
module.exports = TipoIdModel;