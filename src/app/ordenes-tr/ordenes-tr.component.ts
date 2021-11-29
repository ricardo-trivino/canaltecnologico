import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-ordenes-tr',
  templateUrl: './ordenes-tr.component.html',
  styleUrls: ['./ordenes-tr.component.css']
})
export class OrdenesTrComponent implements OnInit {

  Informes: any = []; //Lista de tipos de usuario
  TituloInformes = ""; //Titulo lista de tipos de usuario
  TablaInformes: any = []; //Encabezados tabla lista de tipos de usuario

  TituloInforme = ""; //Titulo del tipo de id buscado
  MiInforme: any = []; //Tipo de usuario buscado
  TabBusInformes: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaInforme: any = [];

  OrdenesTr: any = []; //Lista de tipos de usuario
  TituloOrdenesTr = ""; //Titulo lista de tipos de usuario
  TablaOrdenesTr: any = []; //Encabezados tabla lista de tipos de usuario

  TituloOrdenTr = ""; //Titulo del tipo de id buscado
  MiOrdenTr: any = []; //Tipo de usuario buscado
  TabBusOrdenesTr: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaOrdenTr: any = [];

  title = "Manejo de ordenes de trabajo";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloOrdenTrEdit = ""; //Titulo de tipo de usuario a editar
  MiOrdenTrE: any = []; //Tipo de usuario a editar
  comboEditarOrdenTr: any = []; //Combo editar tipo de usuario

  Vehiculos: any = []; //Lista de tipos de usuario
  TituloVehiculos = ""; //Titulo lista de tipos de usuario
  TablaVehiculos: any = []; //Encabezados tabla lista de tipos de usuario

  Mecanicos: any = []; //Vector que captura la data para el combo de los tipos de documentos
  FormasPago: any = []; //Vector que captura la data para el combo de los tipos de documentos

  TituloVehiculo = ""; //Titulo del tipo de id buscado
  MiVehiculo: any = []; //Tipo de usuario buscado
  TabBusVehiculos: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaVehiculo: any = [];

  TituloVehiculoEdit = ""; //Titulo de tipo de usuario a editar
  MiVehiculoE: any = []; //Tipo de usuario a editar
  comboEditarVehiculo: any = []; //Combo editar tipo de usuario

  Repuestos: any = []; //Lista de tipos de usuario
  TituloRepuestos = ""; //Titulo lista de tipos de usuario
  TablaRepuestos: any = []; //Encabezados tabla lista de tipos de usuario

  TituloRepuesto = ""; //Titulo del tipo de id buscado
  MiRepuesto: any = []; //Tipo de usuario buscado
  TabBusRepuestos: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaRepuesto: any = [];

  TituloRepuestoEdit = ""; //Titulo de tipo de usuario a editar
  MiRepuestoE: any = []; //Tipo de usuario a editar
  comboEditarRepuesto: any = []; //Combo editar tipo de usuario

  Personas: any = []; //Lista de tipos de usuario
  TituloPersonas = ""; //Titulo lista de tipos de usuario
  TablaPersonas: any = []; //Encabezados tabla lista de tipos de usuario

  TituloPersona = ""; //Titulo del tipo de id buscado
  MiPersona: any = []; //Tipo de usuario buscado
  TabBusPersonas: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaPersona: any = [];

  TituloPersonaEdit = ""; //Titulo de tipo de usuario a editar
  MiPersonaE: any = []; //Tipo de usuario a editar
  comboEditarPersona: any = []; //Combo editar tipo de usuario

  FormasPa: any = []; //Lista de tipos de usuario
  TituloFormasPa = ""; //Titulo lista de tipos de usuario
  TablaFormasPa: any = []; //Encabezados tabla lista de tipos de usuario

  TituloFormaPa = ""; //Titulo del tipo de id buscado
  MiFormaPa: any = []; //Tipo de usuario buscado
  TabBusFormasPa: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaFormaPa: any = [];

  TituloFormaPaEdit = ""; //Titulo de tipo de usuario a editar
  MiFormaPaE: any = []; //Tipo de usuario a editar
  comboEditarFormaPa: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaOrdenesTr = new FormGroup(
    {

    });
  filtrarOrdenTr = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarVehiculo = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarRepuesto = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarPersona = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarFormaPa = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGOrdenTr = new FormGroup(
    {
      textVeOrdenTr: new FormControl(),
      textNuOrdenTr: new FormControl(),
      textReOrdenTr: new FormControl(),
      textMeOrdenTr: new FormControl(),
      textDeOrdenTr: new FormControl(),
      textFPOrdenTr: new FormControl(),
      textPrOrdenTr: new FormControl(),
      textFeOrdenTr: new FormControl()
    });
  ActualizarAOrdenTr = new FormGroup(
    {
      BuscarIdOrdenTr: new FormControl(),
      textnuevoveordentr: new FormControl(),
      textnuevonuordentr: new FormControl(),
      textnuevoreordentr: new FormControl(),
      textnuevomeordentr: new FormControl(),
      textnuevodeordentr: new FormControl(),
      textnuevofpordentr: new FormControl(),
      textnuevoprordentr: new FormControl(),
      textnuevofeordentr: new FormControl()
    });
  Informe = new FormGroup(
    {
      mecanicoorden: new FormControl(),
      fechainiinforme: new FormControl(),
      fechafininforme: new FormControl()
    }
  )

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todas las ordenes de trabajo
  public consultaOrdenesTr(op: any) {

    if (this.controlLista == 1) {
      this.servi.getOrdsTrab().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.OrdenesTr = data;
          this.TituloOrdenesTr = "LISTA DE ORDENES DE TRABAJO";
          this.TablaOrdenesTr[0] = "Indicador";
          this.TablaOrdenesTr[1] = "Vehículo";
          this.TablaOrdenesTr[2] = "Número";
          this.TablaOrdenesTr[3] = "Repuesto";
          this.TablaOrdenesTr[4] = "Mecánico";
          this.TablaOrdenesTr[5] = "Descripción";
          this.TablaOrdenesTr[6] = "Forma de pago";
          this.TablaOrdenesTr[7] = "Precio $";
          this.TablaOrdenesTr[8] = "Fecha";
        }
        else if (op == 2) {
          this.comboListaOrdenTr = data;
          this.MiOrdenTr = null;
          this.TituloOrdenTr = "";
          this.TabBusOrdenesTr[0] = "";
          this.TabBusOrdenesTr[1] = "";
          this.TabBusOrdenesTr[2] = "";
          this.TabBusOrdenesTr[3] = "";
          this.TabBusOrdenesTr[4] = "";
          this.TabBusOrdenesTr[5] = "";
          this.TabBusOrdenesTr[6] = "";
          this.TabBusOrdenesTr[7] = "";
          this.TabBusOrdenesTr[8] = "";
        }
        else if (op == 3) {
          this.comboEditarOrdenTr = data;
          this.MiOrdenTrE = null;
          this.TituloOrdenTrEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.OrdenesTr = null;
      this.TituloOrdenesTr = "";
      this.TablaOrdenesTr[0] = "";
      this.TablaOrdenesTr[1] = "";
      this.TablaOrdenesTr[2] = "";
      this.TablaOrdenesTr[3] = "";
      this.TablaOrdenesTr[4] = "";
      this.TablaOrdenesTr[5] = "";
      this.TablaOrdenesTr[6] = "";
      this.TablaOrdenesTr[7] = "";
      this.TablaOrdenesTr[8] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todos los vehiculos
  public consultaVehiculos(op: any) {

    if (this.controlLista == 1) {
      this.servi.getVehiculos().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Vehiculos = data;
          this.TituloVehiculos = "LISTA DE VEHÍCULOS";
          this.TablaVehiculos[0] = "Indicador";
          this.TablaVehiculos[1] = "Placa";
          this.TablaVehiculos[2] = "Marca";
          this.TablaVehiculos[3] = "Modelo";
          this.TablaVehiculos[4] = "Color";
          this.TablaVehiculos[5] = "Tipo";
          this.TablaVehiculos[6] = "Cliente";
        }
        else if (op == 2) {
          this.comboListaVehiculo = data;
          this.MiVehiculo = null;
          this.TituloVehiculo = "";
          this.TabBusVehiculos[0] = "";
          this.TabBusVehiculos[1] = "";
          this.TabBusVehiculos[2] = "";
          this.TabBusVehiculos[3] = "";
          this.TabBusVehiculos[4] = "";
          this.TabBusVehiculos[5] = "";
          this.TabBusVehiculos[6] = "";
        }
        else if (op == 3) {
          this.comboEditarVehiculo = data;
          this.MiVehiculoE = null;
          this.TituloVehiculoEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Vehiculos = null;
      this.TituloVehiculos = "";
      this.TablaVehiculos[0] = "";
      this.TablaVehiculos[1] = "";
      this.TablaVehiculos[2] = "";
      this.TablaVehiculos[3] = "";
      this.TablaVehiculos[4] = "";
      this.TablaVehiculos[5] = "";
      this.TablaVehiculos[6] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todos los repuestos
  public consultaRepuestos(op: any) {

    if (this.controlLista == 1) {
      this.servi.getRepuestos().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Repuestos = data;
          this.TituloRepuestos = "LISTA DE REPUESTOS";
          this.TablaRepuestos[0] = "Indicador";
          this.TablaRepuestos[1] = "Código";
          this.TablaRepuestos[2] = "Tipo";
          this.TablaRepuestos[3] = "Cantidad";
        }
        else if (op == 2) {
          this.comboListaRepuesto = data;
          this.MiRepuesto = null;
          this.TituloRepuesto = "";
          this.TabBusRepuestos[0] = "";
          this.TabBusRepuestos[1] = "";
          this.TabBusRepuestos[2] = "";
          this.TabBusRepuestos[3] = "";
        }
        else if (op == 3) {
          this.comboEditarRepuesto = data;
          this.MiRepuestoE = null;
          this.TituloRepuestoEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Repuestos = null;
      this.TituloRepuestos = "";
      this.TablaRepuestos[0] = "";
      this.TablaRepuestos[1] = "";
      this.TablaRepuestos[2] = "";
      this.TablaRepuestos[3] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todas las personas
  public consultaPersonas(op: any) {

    if (this.controlLista == 1) {
      this.servi.getMecanicos().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Personas = data;
          this.TituloPersonas = "LISTA DE PERSONAS";
          this.TablaPersonas[0] = "Indicador";
          this.TablaPersonas[1] = "Tipo identificación";
          this.TablaPersonas[2] = "Número identificación";
          this.TablaPersonas[3] = "Primer nombre";
          this.TablaPersonas[4] = "Segundo nombre";
          this.TablaPersonas[5] = "Primer apellido";
          this.TablaPersonas[6] = "Segundo apellido";
          this.TablaPersonas[7] = "Teléfono";
          this.TablaPersonas[8] = "Correo";
          this.TablaPersonas[9] = "Dirección";
          this.TablaPersonas[10] = "Rol";
        }
        else if (op == 2) {
          this.comboListaPersona = data;
          this.MiPersona = null;
          this.TituloPersona = "";
          this.TabBusPersonas[0] = "";
          this.TabBusPersonas[1] = "";
          this.TabBusPersonas[2] = "";
          this.TabBusPersonas[3] = "";
          this.TabBusPersonas[4] = "";
          this.TabBusPersonas[5] = "";
          this.TabBusPersonas[6] = "";
          this.TabBusPersonas[7] = "";
          this.TabBusPersonas[8] = "";
          this.TabBusPersonas[9] = "";
          this.TabBusPersonas[10] = "";
        }
        else if (op == 3) {
          this.comboEditarPersona = data;
          this.MiPersonaE = null;
          this.TituloPersonaEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Personas = null;
      this.TituloPersonas = "";
      this.TablaPersonas[0] = "";
      this.TablaPersonas[1] = "";
      this.TablaPersonas[2] = "";
      this.TablaPersonas[3] = "";
      this.TablaPersonas[4] = "";
      this.TablaPersonas[5] = "";
      this.TablaPersonas[6] = "";
      this.TablaPersonas[7] = "";
      this.TablaPersonas[8] = "";
      this.TablaPersonas[9] = "";
      this.TablaPersonas[10] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todas las formas de pago
  public consultaFormasPa(op: any) {

    if (this.controlLista == 1) {
      this.servi.getFormasPa().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.FormasPa = data;
          this.TituloFormasPa = "LISTA DE FORMAS DE PAGO";
          this.TablaFormasPa[0] = "Indicador";
          this.TablaFormasPa[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
        }
        else if (op == 2) {
          this.comboListaFormaPa = data;
          this.MiFormaPa = null;
          this.TituloFormaPa = "";
          this.TabBusFormasPa[0] = "";
          this.TabBusFormasPa[1] = "";
        }
        else if (op == 3) {
          this.comboEditarFormaPa = data;
          this.MiFormaPaE = null;
          this.TituloFormaPaEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.FormasPa = null;
      this.TituloFormasPa = "";
      this.TablaFormasPa[0] = "";
      this.TablaFormasPa[1] = "";
      //this.TablaTiposId[2] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar una orden de trabajo por su id
  public buscarOrdenTr() {

    var filtrovalor = this.filtrarOrdenTr.getRawValue()['combofiltro'];
    this.servi.getOrdTrab('/' + filtrovalor).subscribe((data: {}) => {
      this.MiOrdenTr = data;
      this.TituloOrdenTr = "ORDEN DE TRABAJO SELECCIONADA";
      this.TabBusOrdenesTr[0] = "Indicador";
      this.TabBusOrdenesTr[1] = "Vehículo";
      this.TabBusOrdenesTr[2] = "Número";
      this.TabBusOrdenesTr[3] = "Repuesto";
      this.TabBusOrdenesTr[4] = "Mecánico";
      this.TabBusOrdenesTr[5] = "Descripción";
      this.TabBusOrdenesTr[6] = "Forma de pago";
      this.TabBusOrdenesTr[7] = "Precio $";
      this.TabBusOrdenesTr[8] = "Fecha";
    },
      error => { console.log(error) });

  }

  //Buscar un vehículo por su id
  public buscarVehiculo() {

    var filtrovalor = this.filtrarVehiculo.getRawValue()['combofiltro'];
    this.servi.getVehiculo('/' + filtrovalor).subscribe((data: {}) => {
      this.MiVehiculo = data;
      this.TituloVehiculo = "VEHÍCULO SELECCIONADO";
      this.TabBusVehiculos[0] = "Indicador";
      this.TabBusVehiculos[1] = "Placa";
      this.TabBusVehiculos[2] = "Marca";
      this.TabBusVehiculos[3] = "Modelo";
      this.TabBusVehiculos[4] = "Color";
      this.TabBusVehiculos[5] = "Tipo";
      this.TabBusVehiculos[6] = "Cliente";
    },
      error => { console.log(error) });

  }

  //Buscar un tipo de usuario por su id
  public buscarRepuesto() {

    var filtrovalor = this.filtrarRepuesto.getRawValue()['combofiltro'];
    this.servi.getRepuesto('/' + filtrovalor).subscribe((data: {}) => {
      this.MiRepuesto = data;
      this.TituloRepuesto = "REPUESTO SELECCIONADO";
      this.TabBusRepuestos[0] = "Indicador";
      this.TabBusRepuestos[1] = "Código";
      this.TabBusRepuestos[2] = "Tipo";
      this.TabBusRepuestos[3] = "Cantidad";
    },
      error => { console.log(error) });

  }

  //Buscar una persona por su id
  public buscarPersona() {

    var filtrovalor = this.filtrarPersona.getRawValue()['combofiltro'];
    this.servi.getMecanico('/' + filtrovalor).subscribe((data: {}) => {
      this.MiPersona = data;
      this.TituloPersona = "PERSONA SELECCIONADA";
      this.TabBusPersonas[0] = "Indicador";
      this.TabBusPersonas[1] = "Tipo identificación";
      this.TabBusPersonas[2] = "Número identificación";
      this.TabBusPersonas[3] = "Primer nombre";
      this.TabBusPersonas[4] = "Segundo nombre";
      this.TabBusPersonas[5] = "Primer apellido";
      this.TabBusPersonas[6] = "Segundo apellido";
      this.TabBusPersonas[7] = "Teléfono";
      this.TabBusPersonas[8] = "Correo";
      this.TabBusPersonas[9] = "Dirección";
      this.TabBusPersonas[10] = "Rol";
    },
      error => { console.log(error) });

  }

  //Buscar una forma de pago por su id
  public buscarFormaPa() {

    var filtrovalor = this.filtrarFormaPa.getRawValue()['combofiltro'];
    this.servi.getFormaPa('/' + filtrovalor).subscribe((data: {}) => {
      this.MiFormaPa = data;
      this.TituloFormaPa = "FORMA DE PAGO SELECCIONADA";
      this.TabBusFormasPa[0] = "Indicador";
      this.TabBusFormasPa[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar una orden de trabajo
  public InsertarOrdenTr() {

    var datosvalor1 = this.InsertarGOrdenTr.getRawValue()['textVeOrdenTr'];
    var datosvalor2 = this.InsertarGOrdenTr.getRawValue()['textNuOrdenTr'];
    var datosvalor3 = this.InsertarGOrdenTr.getRawValue()['textReOrdenTr'];
    var datosvalor4 = this.InsertarGOrdenTr.getRawValue()['textMeOrdenTr'];
    var datosvalor5 = this.InsertarGOrdenTr.getRawValue()['textDeOrdenTr'];
    var datosvalor6 = this.InsertarGOrdenTr.getRawValue()['textFPOrdenTr'];
    var datosvalor7 = this.InsertarGOrdenTr.getRawValue()['textPrOrdenTr'];
    var datosvalor8 = this.InsertarGOrdenTr.getRawValue()['textFeOrdenTr'];

    var cadena = {
      "vehiculo_orden_trabajo": datosvalor1, "numero_orden_trabajo": datosvalor2,
      "repuesto_orden_trabajo": datosvalor3, "mecanico_orden_trabajo": datosvalor4,
      "descripcion_servicio_orden": datosvalor5, "forma_pago_orden_trabajo": datosvalor6,
      "precio_orden_trabajo": datosvalor7, "fecha_orden_trabajo": datosvalor8
    };

    this.servi.insertOrdTrab(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGOrdenTr.reset();

  }

  //Generar informe
  public GenerarInforme() {
    var mec = this.Informe.getRawValue()['mecanicoorden'];
    var fi = this.Informe.getRawValue()['fechainiinforme'];
    var ff = this.Informe.getRawValue()['fechafininforme'];

    this.servi.getInformeMecanico('/' + mec, fi, ff).subscribe((data: {}) => {
      this.MiInforme = data;
      this.TituloInforme = "INFORME";
      this.TabBusInformes[0] = "Indicador";
      this.TabBusInformes[1] = "Vehículo";
      this.TabBusInformes[2] = "Número orden";
      this.TabBusInformes[3] = "Repuesto";
      this.TabBusInformes[4] = "CC Mecánico";
      this.TabBusInformes[5] = "Descripción";
      this.TabBusInformes[6] = "Forma de pago";
      this.TabBusInformes[7] = "Precio";
      this.TabBusInformes[8] = "Fecha";
    },
      error => { console.log(error) });
  }

  //Buscar una orden de trabajo por su id para editarla
  buscarEditarOrdenTr() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAOrdenTr.getRawValue()['BuscarIdOrdenTr'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getOrdTrab('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiOrdenTrE = data;
      this.TituloOrdenTrEdit = "ORDEN DE TRABAJO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarOrdenTr() {

    var nuevoveordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevoveordentr'];
    var nuevonuordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevonuordentr'];
    var nuevoreordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevoreordentr'];
    var nuevomeordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevomeordentr'];
    var nuevodeordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevodeordentr'];
    var nuevofpordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevofpordentr'];
    var nuevoprordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevoprordentr'];
    var nuevofeordentr = this.ActualizarAOrdenTr.getRawValue()['textnuevofeordentr'];

    var cadena = {
      "id_orden_trabajo": this.BuscarEvalor, "vehiculo_orden_trabajo": nuevoveordentr,
      "numero_orden_trabajo": nuevonuordentr, "repuesto_orden_trabajo": nuevoreordentr,
      "mecanico_orden_trabajo": nuevomeordentr, "descripcion_servicio_orden": nuevodeordentr,
      "forma_pago_orden_trabajo": nuevofpordentr, "precio_orden_trabajo": nuevoprordentr,
      "fecha_orden_trabajo": nuevofeordentr
    };

    this.servi.updateOrdTrab(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarAOrdenTr.reset();

  }

  ngOnInit(): void {

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportVehiculos().subscribe((data: { vehiculos: [] }) => {
      this.Vehiculos = data;
      console.log(this.Vehiculos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportRepuestos().subscribe((data: { repuestos: [] }) => {
      this.Repuestos = data;
      console.log(this.Repuestos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportMecanicos().subscribe((data: { mecanicos: [] }) => {
      this.Mecanicos = data;
      console.log(this.Mecanicos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportFormasPa().subscribe((data: { formaspago: [] }) => {
      this.FormasPago = data;
      console.log(this.FormasPago);
    },
      error => { console.error(error + " ") });

    this.ListaOrdenesTr = this.formBuilder.group(
      {

      });
    this.filtrarOrdenTr = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarVehiculo = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarRepuesto = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarPersona = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarFormaPa = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
