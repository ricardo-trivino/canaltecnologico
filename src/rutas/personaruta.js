//instanciamos las Librerias 
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var PersonaModel = require('../modelos/personamodel');

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res) {
        PersonaModel.getPersonas(function (error, data) {
            res.status(200).json(data);
        })
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            PersonaModel.getPersona(id, function (error, data) {
                //si la persona existe la mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.json(404,
                        {
                            "msg": "Registro no Existe"
                        });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos de la persona
        var PersonaData =
        {
            id_persona: null,
            tipo_identificacion_persona: req.body.tipo_identificacion_persona,
            identificacion_persona: req.body.identificacion_persona,
            p_nombre_persona: req.body.p_nombre_persona,
            s_nombre_persona: req.body.s_nombre_persona,
            p_apellido_persona: req.body.p_apellido_persona,
            s_apellido_persona: req.body.s_apellido_persona,
            telefono_persona: req.body.telefono_persona,
            correo_persona: req.body.correo_persona,
            direccion_persona: req.body.direccion_persona,
            tipo_usuario_persona: req.body.tipo_usuario_persona,
        };
        //SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc` FROM `ct_tipos_documentos`

        //usamos la funcion para insertar
        PersonaModel.insertPersona(PersonaData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res) {
        //almacenamos los datos de la petición en un objeto
        //console.log(" 38");
        var PersonaData =
        {
            id_persona: req.body.id_persona,
            tipo_identificacion_persona: req.body.tipo_identificacion_persona,
            identificacion_persona: req.body.identificacion_persona,
            p_nombre_persona: req.body.p_nombre_persona,
            s_nombre_persona: req.body.s_nombre_persona,
            p_apellido_persona: req.body.p_apellido_persona,
            s_apellido_persona: req.body.s_apellido_persona,
            telefono_persona: req.body.telefono_persona,
            correo_persona: req.body.correo_persona,
            direccion_persona: req.body.direccion_persona,
            tipo_usuario_persona: req.body.tipo_usuario_persona,
        };


        //usamos la funcion para actualizar
        PersonaModel.updatePersona(PersonaData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data && data.msg) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send(
                    {
                        error: "boo:("
                    });
            }
        });
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}