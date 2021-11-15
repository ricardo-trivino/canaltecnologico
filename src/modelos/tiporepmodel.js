var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var TipoRepModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
TipoRepModel.getTiposRep = function (callback) {
    var sql = "SELECT `id_tipo_repuesto`, `tipo_repuesto` FROM `tipos_repuesto` ORDER BY `id_tipo_repuesto` DESC;";
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
TipoRepModel.getTipoRep = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_tipo_repuesto`, `tipo_repuesto` FROM `tipos_repuesto` WHERE id_tipo_repuesto = " +
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
TipoRepModel.insertTipoRep = function (TipoRepData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tipos_repuesto SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, TipoRepData, function (error, result) {
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
TipoRepModel.updateTipoRep = function (TipoRepData, callback) {
    if (connection) {
        var sql = "UPDATE tipos_repuesto SET tipo_repuesto = " + connection.escape(TipoRepData.tipo_repuesto) +
            " WHERE id_tipo_repuesto = " + connection.escape(TipoRepData.id_tipo_repuesto) + ";";
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
module.exports = TipoRepModel;