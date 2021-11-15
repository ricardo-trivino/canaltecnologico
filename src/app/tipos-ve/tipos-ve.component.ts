import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-tipos-ve',
  templateUrl: './tipos-ve.component.html',
  styleUrls: ['./tipos-ve.component.css']
})
export class TiposVeComponent implements OnInit {

  TiposVe: any = []; //Lista de tipos de usuario
  TituloTiposVe = ""; //Titulo lista de tipos de usuario
  TablaTiposVe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloTipoVe = ""; //Titulo del tipo de id buscado
  MiTipoVe: any = []; //Tipo de usuario buscado
  TabBusTiposVe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaTipoVe: any = [];

  title = "Manejo de tipos de vehículo";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipoVeEdit = ""; //Titulo de tipo de usuario a editar
  MiTipoVeE: any = []; //Tipo de usuario a editar
  comboEditarTipoVe: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaTiposVeh = new FormGroup(
    {

    });
  filtrarTipoVe = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipoVe = new FormGroup(
    {
      textTipoVe: new FormControl(),
      textIniTipoVe: new FormControl()
    });
  ActualizarATipoVe = new FormGroup(
    {
      BuscarIdTipoVe: new FormControl(),
      textnuevotipove: new FormControl(),
      //textnuevoinicialestipoid: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
  public consultaTiposVe(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposVe().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TiposVe = data;
          this.TituloTiposVe = "LISTA DE TIPOS DE VEHÍCULO";
          this.TablaTiposVe[0] = "Indicador";
          this.TablaTiposVe[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
        }
        else if (op == 2) {
          this.comboListaTipoVe = data;
          this.MiTipoVe = null;
          this.TituloTipoVe = "";
          this.TabBusTiposVe[0] = "";
          this.TabBusTiposVe[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipoVe = data;
          this.MiTipoVeE = null;
          this.TituloTipoVeEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TiposVe = null;
      this.TituloTiposVe = "";
      this.TablaTiposVe[0] = "";
      this.TablaTiposVe[1] = "";
      //this.TablaTiposId[2] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de usuario por su id
  public buscarTipoVe() {

    var filtrovalor = this.filtrarTipoVe.getRawValue()['combofiltro'];
    this.servi.getTipoVe('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoVe = data;
      this.TituloTipoVe = "TIPO DE VEHÍCULO SELECCIONADO";
      this.TabBusTiposVe[0] = "Indicador";
      this.TabBusTiposVe[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de usuario
  public InsertarTipoVe() {

    var datosvalo2 = this.InsertarGTipoVe.getRawValue()['textTipoVe'];
    //var datosvalo1 = this.InsertarGTipoId.getRawValue()['textIniTipoId'];
    var cadena = { "tipo_vehiculo": datosvalo2/*, "iniciales_tipo_id": datosvalo1*/ };

    this.servi.insertTipoVe(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipoVe.reset();

  }

  //Buscar un tipo de usuario su id para editarlo
  buscarEditarTipoVe() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipoVe.getRawValue()['BuscarIdTipoVe'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipoVe('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipoVeE = data;
      this.TituloTipoVeEdit = "TIPO DE VEHÍCULO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarTipoVe() {

    var nuevotipove = this.ActualizarATipoVe.getRawValue()['textnuevotipove'];
    //var nuevoinitipdoc = this.ActualizarATipoId.getRawValue()['textnuevoinicialestipoid'];

    var cadena = { "id_tipo_vehiculo": this.BuscarEvalor, "tipo_vehiculo": nuevotipove/*, "iniciales_tip_doc": nuevoinitipdoc*/ };

    this.servi.updateTipoVe(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipoVe.reset();

  }

  ngOnInit(): void {

    this.ListaTiposVeh = this.formBuilder.group(
      {

      });
    this.filtrarTipoVe = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}

