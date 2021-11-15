var connection = require('../conexion/index') // La instancia de la conexion

//creamos un objeto para ir almacenandotodo lo que necesitemos
var PersonaModel = {};

//---------------------------------------------------------------
//obtenemos todas las personas
PersonaModel.getPersonas = function (callback) {
    var sql = "SELECT `id_persona`,ti.tipo_identificacion,`identificacion_persona`,`p_nombre_persona`,`s_nombre_persona`,`p_apellido_persona`,`s_apellido_persona`,`telefono_persona`,`correo_persona`,`direccion_persona`, tu.tipo_usuario FROM `personas` p INNER JOIN tipos_identificacion ti ON p.tipo_identificacion_persona=ti.id_tipo_identificacion INNER JOIN tipos_usuario tu ON p.tipo_usuario_persona=tu.id_tipo_usuario ORDER BY `id_persona` DESC;";
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
PersonaModel.getPersona = function (id, callback) {
    if (connection) {
        var sql = "SELECT `id_persona`,ti.tipo_identificacion,`identificacion_persona`,`p_nombre_persona`,`s_nombre_persona`,`p_apellido_persona`,`s_apellido_persona`,`telefono_persona`,`correo_persona`,`direccion_persona`, tu.tipo_usuario FROM `personas` p INNER JOIN tipos_identificacion ti ON p.tipo_identificacion_persona=ti.id_tipo_identificacion INNER JOIN tipos_usuario tu ON p.tipo_usuario_persona=tu.id_tipo_usuario WHERE id_persona = " +
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
PersonaModel.insertPersona = function (PersonaData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO personas SET ?";
        //console.log(" tal " + sql);

        connection.query(sql, PersonaData, function (error, result) {
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
PersonaModel.updatePersona = function (PersonaData, callback) {
    if (connection) {
        var sql = "UPDATE personas SET tipo_identificacion_persona = " + connection.escape(PersonaData.tipo_identificacion_persona) +
            ", identificacion_persona = " + connection.escape(PersonaData.identificacion_persona) +
            ", p_nombre_persona = " + connection.escape(PersonaData.p_nombre_persona) +
            ", s_nombre_persona = " + connection.escape(PersonaData.s_nombre_persona) +
            ", p_apellido_persona = " + connection.escape(PersonaData.p_apellido_persona) +
            ", s_apellido_persona = " + connection.escape(PersonaData.s_apellido_persona) +
            ", telefono_persona = " + connection.escape(PersonaData.telefono_persona) +
            ", correo_persona = " + connection.escape(PersonaData.correo_persona) +
            ", direccion_persona = " + connection.escape(PersonaData.direccion_persona) +
            ", tipo_usuario_persona = " + connection.escape(PersonaData.tipo_usuario_persona) +
            " WHERE id_persona = " + connection.escape(PersonaData.id_persona) + ";";
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
module.exports = PersonaModel;