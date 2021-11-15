var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var FormaPagoModel = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de identificacion
FormaPagoModel.getFormasPago = function (callback) {
    var sql = "SELECT `id_forma_pago`, `forma_pago` FROM `formas_pago` ORDER BY `id_forma_pago` DESC;";
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
FormaPagoModel.getFormaPago = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_forma_pago`, `forma_pago` FROM `formas_pago` WHERE id_forma_pago = " +
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
FormaPagoModel.insertFormaPago = function (FormaPagoData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO formas_pago SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, FormaPagoData, function (error, result) {
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
FormaPagoModel.updateFormaPago = function (FormaPagoData, callback) {
    if (connection) {
        var sql = "UPDATE formas_pago SET forma_pago = " + connection.escape(FormaPagoData.forma_pago) +
            " WHERE id_forma_pago = " + connection.escape(FormaPagoData.id_forma_pago) + ";";
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
module.exports = FormaPagoModel;