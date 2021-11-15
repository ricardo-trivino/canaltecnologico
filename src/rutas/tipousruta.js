//instanciamos las Librerias 
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var TipoUsModel = require('../modelos/tipousmodel');

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res) {
        TipoUsModel.getTiposUs(function (error, data) {
            res.status(200).json(data);
        })
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de identificacion solicitado
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            TipoUsModel.getTipoUs(id, function (error, data) {
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
        //creamos un objeto Json con los datos del tipo de documento
        var TipoUsData =
        {
            id_tipo_usuario: null,
            tipo_usuario: req.body.tipo_usuario,
        };
        //SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc` FROM `ct_tipos_documentos`

        //usamos la funcion para insertar
        TipoUsModel.insertTipoUs(TipoUsData, function (error, data) {
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
        var TipoUsData =
        {
            id_tipo_usuario: req.body.id_tipo_usuario,
            tipo_usuario: req.body.tipo_usuario,
        };


        //usamos la funcion para actualizar
        TipoUsModel.updateTipoUs(TipoUsData, function (error, data) {
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