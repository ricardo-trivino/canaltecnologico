//instanciamos las Librerias 
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var VehiculoModel = require('../modelos/vehiculomodel');

//creamos el ruteo de la clase
module.exports = function () {

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todas las personas
    router.get("/", function (req, res) {
        VehiculoModel.getVehiculos(function (error, data) {
            res.status(200).json(data);
        })
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si el id es un número
        if (!isNaN(id)) {
            VehiculoModel.getVehiculo(id, function (error, data) {
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
        var VehiculoData =
        {
            id_vehiculo: null,
            placa_vehiculo: req.body.placa_vehiculo,
            marca_vehiculo: req.body.marca_vehiculo,
            modelo_vehiculo: req.body.modelo_vehiculo,
            color_vehiculo: req.body.color_vehiculo,
            tipo_vehiculo: req.body.tipo_vehiculo,
            cliente_vehiculo: req.body.cliente_vehiculo,
        };
        //SELECT `id_tip_doc`, `tipo_documento`, `iniciales_tip_doc` FROM `ct_tipos_documentos`

        //usamos la funcion para insertar
        VehiculoModel.insertVehiculo(VehiculoData, function (error, data) {
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
        var VehiculoData =
        {
            id_vehiculo: req.body.id_vehiculo,
            placa_vehiculo: req.body.placa_vehiculo,
            marca_vehiculo: req.body.marca_vehiculo,
            modelo_vehiculo: req.body.modelo_vehiculo,
            color_vehiculo: req.body.color_vehiculo,
            tipo_vehiculo: req.body.tipo_vehiculo,
            cliente_vehiculo: req.body.cliente_vehiculo,
        };


        //usamos la funcion para actualizar
        VehiculoModel.updateVehiculo(VehiculoData, function (error, data) {
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