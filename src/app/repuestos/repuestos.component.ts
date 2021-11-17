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

  Repuestos: any = []; //Lista de tipos de usuario
  TituloRepuestos = ""; //Titulo lista de tipos de usuario
  TablaRepuestos: any = []; //Encabezados tabla lista de tipos de usuario

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

  TiposRe: any = []; //Lista de tipos de usuario
  TituloTiposRe = ""; //Titulo lista de tipos de usuario
  TablaTiposRe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloTipoRe = ""; //Titulo del tipo de id buscado
  MiTipoRe: any = []; //Tipo de usuario buscado
  TabBusTiposRe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaTipoRe: any = [];

  TituloTipoReEdit = ""; //Titulo de tipo de usuario a editar
  MiTipoReE: any = []; //Tipo de usuario a editar
  comboEditarTipoRe: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaRepuestos = new FormGroup(
    {

    });
  filtrarRepuesto = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarTipoRe = new FormGroup(
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

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
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

  //Consultar todos los tipos de repuesto
  public consultaTiposRe(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposRe().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TiposRe = data;
          this.TituloTiposRe = "LISTA DE TIPOS DE REPUESTO";
          this.TablaTiposRe[0] = "Indicador";
          this.TablaTiposRe[1] = "Denominación";
        }
        else if (op == 2) {
          this.comboListaTipoRe = data;
          this.MiTipoRe = null;
          this.TituloTipoRe = "";
          this.TabBusTiposRe[0] = "";
          this.TabBusTiposRe[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipoRe = data;
          this.MiTipoReE = null;
          this.TituloTipoReEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TiposRe = null;
      this.TituloTiposRe = "";
      this.TablaTiposRe[0] = "";
      this.TablaTiposRe[1] = "";
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

  //Buscar un tipo de usuario por su id
  public buscarTipoRe() {

    var filtrovalor = this.filtrarTipoRe.getRawValue()['combofiltro'];
    this.servi.getTipoRe('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoRe = data;
      this.TituloTipoRe = "TIPO DE REPUESTO SELECCIONADO";
      this.TabBusTiposRe[0] = "Indicador";
      this.TabBusTiposRe[1] = "Denominación";
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

    this.ListaRepuestos = this.formBuilder.group(
      {

      });
    this.filtrarRepuesto = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarTipoRe = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
