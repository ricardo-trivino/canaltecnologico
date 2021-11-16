import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-tipos-re',
  templateUrl: './tipos-re.component.html',
  styleUrls: ['./tipos-re.component.css']
})
export class TiposReComponent implements OnInit {

  TiposRe: any = []; //Lista de tipos de usuario
  TituloTiposRe = ""; //Titulo lista de tipos de usuario
  TablaTiposRe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloTipoRe = ""; //Titulo del tipo de id buscado
  MiTipoRe: any = []; //Tipo de usuario buscado
  TabBusTiposRe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaTipoRe: any = [];

  title = "Manejo de tipos de repuesto";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipoReEdit = ""; //Titulo de tipo de usuario a editar
  MiTipoReE: any = []; //Tipo de usuario a editar
  comboEditarTipoRe: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaTiposRep = new FormGroup(
    {

    });
  filtrarTipoRe = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipoRe = new FormGroup(
    {
      textTipoRe: new FormControl()
    });
  ActualizarATipoRe = new FormGroup(
    {
      BuscarIdTipoRe: new FormControl(),
      textnuevotipore: new FormControl(),
      //textnuevoinicialestipoid: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
  public consultaTiposRe(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposRe().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TiposRe = data;
          this.TituloTiposRe = "LISTA DE TIPOS DE REPUESTO";
          this.TablaTiposRe[0] = "Indicador";
          this.TablaTiposRe[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
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
      //this.TablaTiposId[2] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

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

  //Insertar un tipo de usuario
  public InsertarTipoRe() {

    var datosvalo2 = this.InsertarGTipoRe.getRawValue()['textTipoRe'];
    //var datosvalo1 = this.InsertarGTipoId.getRawValue()['textIniTipoId'];
    var cadena = { "tipo_repuesto": datosvalo2/*, "iniciales_tipo_id": datosvalo1*/ };

    this.servi.insertTipoRe(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipoRe.reset();

  }

  //Buscar un tipo de usuario su id para editarlo
  buscarEditarTipoRe() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipoRe.getRawValue()['BuscarIdTipoRe'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipoRe('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipoReE = data;
      this.TituloTipoReEdit = "TIPO DE REPUESTO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarTipoRe() {

    var nuevotipore = this.ActualizarATipoRe.getRawValue()['textnuevotipore'];
    //var nuevoinitipdoc = this.ActualizarATipoId.getRawValue()['textnuevoinicialestipoid'];

    var cadena = { "id_tipo_repuesto": this.BuscarEvalor, "tipo_repuesto": nuevotipore/*, "iniciales_tip_doc": nuevoinitipdoc*/ };

    this.servi.updateTipoRe(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipoRe.reset();

  }

  ngOnInit(): void {

    this.ListaTiposRep = this.formBuilder.group(
      {

      });
    this.filtrarTipoRe = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}

