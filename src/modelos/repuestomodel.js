var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var RepuestoModel = {};

//---------------------------------------------------------------
//obtenemos todas las personas
RepuestoModel.getRepuestos = function (callback) {
    var sql = "SELECT `id_repuesto`, `cod_ref_repuesto`, tr.tipo_repuesto, `cantidad_repuesto` FROM `repuestos` r INNER JOIN tipos_repuesto tr ON r.tipo_repuesto=tr.id_tipo_repuesto ORDER BY `id_repuesto` DESC;";
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
RepuestoModel.getRepuesto = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_repuesto`, `cod_ref_repuesto`, tr.tipo_repuesto, `cantidad_repuesto` FROM `repuestos` r INNER JOIN tipos_repuesto tr ON r.tipo_repuesto=tr.id_tipo_repuesto WHERE id_repuesto = " +
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
RepuestoModel.getInforme = function (id, fecha_inicial, fecha_final, callback) {
    if (connection) {
        var sql = "SELECT `id_repuesto`, `cod_ref_repuesto`, tp.tipo_repuesto, `cantidad_repuesto`, p.identificacion_persona AS CC_Cliente, ot.fecha_orden_trabajo AS fecha_servicio FROM `repuestos` r INNER JOIN tipos_repuesto tp ON tp.id_tipo_repuesto=r.tipo_repuesto INNER JOIN ordenes_trabajo ot ON r.id_repuesto=ot.repuesto_orden_trabajo INNER JOIN vehiculos v ON ot.vehiculo_orden_trabajo=v.id_vehiculo INNER JOIN personas p ON v.cliente_vehiculo=p.id_persona WHERE p.id_persona = " +
            connection.escape(id) + " AND ot.fecha_orden_trabajo BETWEEN " + connection.escape(fecha_inicial) + " AND " +connection.escape(fecha_final) + " ORDER BY `id_repuesto` DESC;";

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
RepuestoModel.insertRepuesto = function (RepuestoData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO repuestos SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, RepuestoData, function (error, result) {
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
RepuestoModel.updateRepuesto = function (RepuestoData, callback) {
    if (connection) {
        var sql = "UPDATE repuestos SET cod_ref_repuesto = " + connection.escape(RepuestoData.cod_ref_repuesto) +
            ", tipo_repuesto = " + connection.escape(RepuestoData.tipo_repuesto) +
            ", cantidad_repuesto = " + connection.escape(RepuestoData.cantidad_repuesto) +
            " WHERE id_repuesto = " + connection.escape(RepuestoData.id_repuesto) + ";";
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
module.exports = RepuestoModel;