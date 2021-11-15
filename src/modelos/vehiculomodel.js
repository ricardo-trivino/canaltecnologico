var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var VehiculoModel = {};

//---------------------------------------------------------------
//obtenemos todas las personas
VehiculoModel.getVehiculos = function (callback) {
    var sql = "SELECT `id_vehiculo`, `placa_vehiculo`, mv.marca_vehiculo, `modelo_vehiculo`, `color_vehiculo`, tv.tipo_vehiculo, c.identificacion_persona as CC_cliente FROM `vehiculos` v INNER JOIN marcas_vehiculo mv ON v.marca_vehiculo=mv.id_marca_vehiculo INNER JOIN tipos_vehiculo tv ON v.tipo_vehiculo=tv.id_tipo_vehiculo INNER JOIN personas c ON v.cliente_vehiculo=c.id_persona ORDER BY `id_vehiculo` DESC;";
    connection.query(sql, function (error, rows) {
        if (error) {
            throw error;
        } else {
            callback(null, rows);
        }
    });
}

//---------------------------------------------------------------
//obtenemos una persona por su id
VehiculoModel.getVehiculo = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_vehiculo`, `placa_vehiculo`, mv.marca_vehiculo, `modelo_vehiculo`, `color_vehiculo`, tv.tipo_vehiculo, c.identificacion_persona as CC_cliente FROM `vehiculos` v INNER JOIN marcas_vehiculo mv ON v.marca_vehiculo=mv.id_marca_vehiculo INNER JOIN tipos_vehiculo tv ON v.tipo_vehiculo=tv.id_tipo_vehiculo INNER JOIN personas c ON v.cliente_vehiculo=c.id_persona WHERE id_vehiculo = " +
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
//añadir una nueva persona
VehiculoModel.insertVehiculo = function (VehiculoData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO vehiculos SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, VehiculoData, function (error, result) {
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
//actualizar una persona
VehiculoModel.updateVehiculo = function (VehiculoData, callback) {
    if (connection) {
        var sql = "UPDATE vehiculos SET placa_vehiculo = " + connection.escape(VehiculoData.placa_vehiculo) +
            ", marca_vehiculo = " + connection.escape(VehiculoData.marca_vehiculo) +
            ", modelo_vehiculo = " + connection.escape(VehiculoData.modelo_vehiculo) +
            ", color_vehiculo = " + connection.escape(VehiculoData.color_vehiculo) +
            ", tipo_vehiculo = " + connection.escape(VehiculoData.tipo_vehiculo) +
            ", cliente_vehiculo = " + connection.escape(VehiculoData.cliente_vehiculo) +
            " WHERE id_vehiculo = " + connection.escape(VehiculoData.id_vehiculo) + ";";
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
module.exports = VehiculoModel;