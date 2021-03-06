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

  Mecanicos: any = []; //Vector que captura la data para el combo de los tipos de documentos
  FormasPago: any = []; //Vector que captura la data para el combo de los tipos de documentos
  Repuestos: any = []; //Lista de tipos de usuario
  Vehiculos: any = []; //Lista de tipos de usuario

  //Form group 
  ListaOrdenesTr = new FormGroup(
    {

    });
  filtrarOrdenTr = new FormGroup(
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
          this.TablaOrdenesTr[1] = "Veh??culo";
          this.TablaOrdenesTr[2] = "N??mero";
          this.TablaOrdenesTr[3] = "Repuesto";
          this.TablaOrdenesTr[4] = "Mec??nico";
          this.TablaOrdenesTr[5] = "Descripci??n";
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
        else if (op == 4) {
          this.MiInforme = null;
          this.TituloInforme = "";
          this.TabBusInformes[0] = "";
          this.TabBusInformes[1] = "";
          this.TabBusInformes[2] = "";
          this.TabBusInformes[3] = "";
          this.TabBusInformes[4] = "";
          this.TabBusInformes[5] = "";
          this.TabBusInformes[6] = "";
          this.TabBusInformes[7] = "";
          this.TabBusInformes[8] = "";
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
      this.TabBusOrdenesTr[1] = "Veh??culo";
      this.TabBusOrdenesTr[2] = "N??mero";
      this.TabBusOrdenesTr[3] = "Repuesto";
      this.TabBusOrdenesTr[4] = "Mec??nico";
      this.TabBusOrdenesTr[5] = "Descripci??n";
      this.TabBusOrdenesTr[6] = "Forma de pago";
      this.TabBusOrdenesTr[7] = "Precio $";
      this.TabBusOrdenesTr[8] = "Fecha";
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
      this.TabBusInformes[1] = "Veh??culo";
      this.TabBusInformes[2] = "N??mero orden";
      this.TabBusInformes[3] = "Repuesto";
      this.TabBusInformes[4] = "CC Mec??nico";
      this.TabBusInformes[5] = "Descripci??n";
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
  }

}
