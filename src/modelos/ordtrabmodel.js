var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var OrdTrabModel = {};

//---------------------------------------------------------------
//obtenemos todas las personas
OrdTrabModel.getOrdsTrab = function (callback) {
    var sql = "SELECT `id_orden_trabajo`, v.placa_vehiculo, `numero_orden_trabajo`, r.cod_ref_repuesto, m.identificacion_persona as CC_Mecanico, `descripcion_servicio_orden`, fp.forma_pago, `precio_orden_trabajo`, `fecha_orden_trabajo` FROM `ordenes_trabajo` ot INNER JOIN vehiculos v ON ot.vehiculo_orden_trabajo=v.id_vehiculo INNER JOIN repuestos r ON ot.repuesto_orden_trabajo=r.id_repuesto INNER JOIN personas m ON ot.mecanico_orden_trabajo=m.id_persona INNER JOIN formas_pago fp ON ot.forma_pago_orden_trabajo=fp.id_forma_pago ORDER BY `id_orden_trabajo` DESC;";
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
OrdTrabModel.getOrdTrab = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_orden_trabajo`, v.placa_vehiculo, `numero_orden_trabajo`, r.cod_ref_repuesto, m.identificacion_persona as CC_Mecanico, `descripcion_servicio_orden`, fp.forma_pago, `precio_orden_trabajo`, `fecha_orden_trabajo` FROM `ordenes_trabajo` ot INNER JOIN vehiculos v ON ot.vehiculo_orden_trabajo=v.id_vehiculo INNER JOIN repuestos r ON ot.repuesto_orden_trabajo=r.id_repuesto INNER JOIN personas m ON ot.mecanico_orden_trabajo=m.id_persona INNER JOIN formas_pago fp ON ot.forma_pago_orden_trabajo=fp.id_forma_pago WHERE id_orden_trabajo = " +
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
//obtenemos un informe por periodo de tiempo
OrdTrabModel.getInforme = function (id, fecha_inicial, fecha_final, callback) {
    if (connection) {
        var sql = "SELECT `id_orden_trabajo`, v.placa_vehiculo, `numero_orden_trabajo`, r.cod_ref_repuesto, m.identificacion_persona as CC_Mecanico, `descripcion_servicio_orden`, fp.forma_pago, `precio_orden_trabajo`, `fecha_orden_trabajo` FROM `ordenes_trabajo` ot INNER JOIN vehiculos v ON ot.vehiculo_orden_trabajo=v.id_vehiculo INNER JOIN repuestos r ON ot.repuesto_orden_trabajo=r.id_repuesto INNER JOIN personas m ON ot.mecanico_orden_trabajo=m.id_persona INNER JOIN formas_pago fp ON ot.forma_pago_orden_trabajo=fp.id_forma_pago WHERE mecanico_orden_trabajo = " +
            connection.escape(id) + " AND fecha_orden_trabajo BETWEEN " + connection.escape(fecha_inicial) + " AND " +connection.escape(fecha_final) + " ORDER BY `id_orden_trabajo` DESC;";

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
OrdTrabModel.insertOrdTrab = function (OrdTrabData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO ordenes_trabajo SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, OrdTrabData, function (error, result) {
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
OrdTrabModel.updateOrdTrab = function (OrdTrabData, callback) {
    if (connection) {
        var sql = "UPDATE ordenes_trabajo SET vehiculo_orden_trabajo = " + connection.escape(OrdTrabData.vehiculo_orden_trabajo) +
            ", numero_orden_trabajo = " + connection.escape(OrdTrabData.numero_orden_trabajo) +
            ", repuesto_orden_trabajo = " + connection.escape(OrdTrabData.repuesto_orden_trabajo) +
            ", mecanico_orden_trabajo = " + connection.escape(OrdTrabData.mecanico_orden_trabajo) +
            ", descripcion_servicio_orden = " + connection.escape(OrdTrabData.descripcion_servicio_orden) +
            ", forma_pago_orden_trabajo = " + connection.escape(OrdTrabData.forma_pago_orden_trabajo) +
            ", precio_orden_trabajo = " + connection.escape(OrdTrabData.precio_orden_trabajo) +
            ", fecha_orden_trabajo = " + connection.escape(OrdTrabData.fecha_orden_trabajo) +
            " WHERE id_orden_trabajo = " + connection.escape(OrdTrabData.id_orden_trabajo) + ";";
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
module.exports = OrdTrabModel;