//instanciamos las Librerias 
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var RepuestoModel = require('../modelos/repuestomodel');

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res) {
        RepuestoModel.getRepuestos(function (error, data) {
            res.status(200).json(data);
        })
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            RepuestoModel.getRepuesto(id, function (error, data) {
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
    //Muestra el método CRUL read(leer), que muestra el informe solicitado
    router.get("/:id/:fecha_inicial/:fecha_final", function (req, res) {
        var id = req.params.id;
        var fecha_inicial = req.params.fecha_inicial;
        var fecha_final = req.params.fecha_final;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            RepuestoModel.getInforme(id, fecha_inicial, fecha_final, function (error, data) {
                //si la persona existe la mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.status(404).json({
                        "msg": "Sin Registros en las fechas"
                    })
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
        var RepuestoData =
        {
            id_repuesto: null,
            cod_ref_repuesto: req.body.cod_ref_repuesto,
            tipo_repuesto: req.body.tipo_repuesto,
            cantidad_repuesto: req.body.cantidad_repuesto,
        };
        //SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc` FROM `ct_tipos_documentos`

        //usamos la funcion para insertar
        RepuestoModel.insertRepuesto(RepuestoData, function (error, data) {
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
        var RepuestoData =
        {
            id_repuesto: req.body.id_repuesto,
            cod_ref_repuesto: req.body.cod_ref_repuesto,
            tipo_repuesto: req.body.tipo_repuesto,
            cantidad_repuesto: req.body.cantidad_repuesto,
        };


        //usamos la funcion para actualizar
        RepuestoModel.updateRepuesto(RepuestoData, function (error, data) {
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