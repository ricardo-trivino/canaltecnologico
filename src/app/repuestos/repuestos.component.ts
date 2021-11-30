import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.css']
})
export class RepuestosComponent implements OnInit {

  Informes: any = []; //Lista de tipos de usuario
  TituloInformes = ""; //Titulo lista de tipos de usuario
  TablaInformes: any = []; //Encabezados tabla lista de tipos de usuario

  TituloInforme = ""; //Titulo del tipo de id buscado
  MiInforme: any = []; //Tipo de usuario buscado
  TabBusInformes: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaInforme: any = [];

  Repuestos: any = []; //Lista de tipos de usuario
  TituloRepuestos = ""; //Titulo lista de tipos de usuario
  TablaRepuestos: any = []; //Encabezados tabla lista de tipos de usuario

  tiposRepuestos: any = []; //Vector que captura la data para el combo de los tipos de documentos
  Clientes: any = []; //Vector que captura la data para el combo de los clientes

  TituloRepuesto = ""; //Titulo del tipo de id buscado
  MiRepuesto: any = []; //Tipo de usuario buscado
  TabBusRepuestos: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaRepuesto: any = [];

  title = "Manejo de repuestos";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloRepuestoEdit = ""; //Titulo de tipo de usuario a editar
  MiRepuestoE: any = []; //Tipo de usuario a editar
  comboEditarRepuesto: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaRepuestos = new FormGroup(
    {

    });
  filtrarRepuesto = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGRepuesto = new FormGroup(
    {
      textCORepuesto: new FormControl(),
      textTRepuesto: new FormControl(),
      textCARepuesto: new FormControl()
    });
  ActualizarARepuesto = new FormGroup(
    {
      BuscarIdRepuesto: new FormControl(),
      textnuevocorepuesto: new FormControl(),
      textnuevotrepuesto: new FormControl(),
      textnuevocarepuesto: new FormControl()
    });
  Informe = new FormGroup(
    {
      clienteorden: new FormControl(),
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
        else if (op == 4) {
          this.MiInforme = null;
          this.TituloInforme = "";
          this.TabBusInformes[0] = "";
          this.TabBusInformes[1] = "";
          this.TabBusInformes[2] = "";
          this.TabBusInformes[3] = "";
          this.TabBusInformes[4] = "";
          this.TabBusInformes[5] = "";
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

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

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

  //Insertar un repuesto
  public InsertarRepuesto() {

    var datosvalor1 = this.InsertarGRepuesto.getRawValue()['textCORepuesto'];
    var datosvalor2 = this.InsertarGRepuesto.getRawValue()['textTRepuesto'];
    var datosvalor3 = this.InsertarGRepuesto.getRawValue()['textCARepuesto'];
    var cadena = {
      "cod_ref_repuesto": datosvalor1, "tipo_repuesto": datosvalor2,
      "cantidad_repuesto": datosvalor3
    };

    this.servi.insertRepuesto(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGRepuesto.reset();

  }

  //Generar informe
  public GenerarInforme() {
    var mec = this.Informe.getRawValue()['clienteorden'];
    var fi = this.Informe.getRawValue()['fechainiinforme'];
    var ff = this.Informe.getRawValue()['fechafininforme'];

    this.servi.getInformeCliente('/' + mec, fi, ff).subscribe((data: {}) => {
      this.MiInforme = data;
      this.TituloInforme = "INFORME";
      this.TabBusInformes[0] = "Indicador";
      this.TabBusInformes[1] = "Repuesto";
      this.TabBusInformes[2] = "Tipo repuesto";
      this.TabBusInformes[3] = "Cantidad";
      this.TabBusInformes[4] = "CC Cliente";
      this.TabBusInformes[5] = "Fecha";
    },
      error => { console.log(error) });
  }

  //Buscar un repuesto su id para editarlo
  buscarEditarRepuesto() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarARepuesto.getRawValue()['BuscarIdRepuesto'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getRepuesto('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiRepuestoE = data;
      this.TituloRepuestoEdit = "REPUESTO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el repuesto
  public ActualizarRepuesto() {

    var nuevocorepuesto = this.ActualizarARepuesto.getRawValue()['textnuevocorepuesto'];
    var nuevotrepuesto = this.ActualizarARepuesto.getRawValue()['textnuevotrepuesto'];
    var nuevocarepuesto = this.ActualizarARepuesto.getRawValue()['textnuevocarepuesto'];

    var cadena = {
      "id_repuesto": this.BuscarEvalor, "cod_ref_repuesto": nuevocorepuesto,
      "tipo_repuesto": nuevotrepuesto, "cantidad_repuesto": nuevocarepuesto
    };

    this.servi.updateRepuesto(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarARepuesto.reset();

  }

  ngOnInit(): void {

    //se invoca el servicio y se carga el combobox de los clientes
    this.servi.getExportClientes().subscribe((data: { clientes: [] }) => {
      this.Clientes = data;
      console.log(this.Clientes);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportTiposRe().subscribe((data: { tiposrepuestos: [] }) => {
      this.tiposRepuestos = data;
      console.log(this.tiposRepuestos);
    },
      error => { console.error(error + " ") });

    this.ListaRepuestos = this.formBuilder.group(
      {

      });
    this.filtrarRepuesto = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
