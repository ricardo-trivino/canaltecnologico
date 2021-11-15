//instanciamos las Librerias 
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var OrdTrabModel = require('../modelos/ordtrabmodel');

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res) {
        OrdTrabModel.getOrdsTrab(function (error, data) {
            res.status(200).json(data);
        })
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            OrdTrabModel.getOrdTrab(id, function (error, data) {
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
            OrdTrabModel.getInforme(id, fecha_inicial, fecha_final, function (error, data) {
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
        var OrdTrabData =
        {
            id_orden_trabajo: null,
            vehiculo_orden_trabajo: req.body.vehiculo_orden_trabajo,
            numero_orden_trabajo: req.body.numero_orden_trabajo,
            repuesto_orden_trabajo: req.body.repuesto_orden_trabajo,
            mecanico_orden_trabajo: req.body.mecanico_orden_trabajo,
            descripcion_servicio_orden: req.body.descripcion_servicio_orden,
            forma_pago_orden_trabajo: req.body.forma_pago_orden_trabajo,
            precio_orden_trabajo: req.body.precio_orden_trabajo,
            fecha_orden_trabajo: req.body.fecha_orden_trabajo,
        };
        //SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc` FROM `ct_tipos_documentos`

        //usamos la funcion para insertar
        OrdTrabModel.insertOrdTrab(OrdTrabData, function (error, data) {
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
        var OrdTrabData =
        {
            id_orden_trabajo: req.body.id_orden_trabajo,
            vehiculo_orden_trabajo: req.body.vehiculo_orden_trabajo,
            numero_orden_trabajo: req.body.numero_orden_trabajo,
            repuesto_orden_trabajo: req.body.repuesto_orden_trabajo,
            mecanico_orden_trabajo: req.body.mecanico_orden_trabajo,
            descripcion_servicio_orden: req.body.descripcion_servicio_orden,
            forma_pago_orden_trabajo: req.body.forma_pago_orden_trabajo,
            precio_orden_trabajo: req.body.precio_orden_trabajo,
            fecha_orden_trabajo: req.body.fecha_orden_trabajo,
        };


        //usamos la funcion para actualizar
        OrdTrabModel.updateOrdTrab(OrdTrabData, function (error, data) {
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