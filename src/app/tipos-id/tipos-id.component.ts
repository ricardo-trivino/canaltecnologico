import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-tipos-id',
  templateUrl: './tipos-id.component.html',
  styleUrls: ['./tipos-id.component.css']
})
export class TiposIdComponent implements OnInit {

  TiposId: any = []; //Lista de tipos de identificación
  TituloTiposId = ""; //Titulo lista de tipos de identificación
  TablaTiposId: any = []; //Encabezados tabla lista de tipos de identificación

  TituloTipoId = ""; //Titulo del tipo de id buscado
  MiTipoId: any = []; //Tipo de identificación buscado
  TabBusTiposId: any = []; //Encabezados tabla Tipo de identificación Buscado
  comboListaTipoId: any = [];

  title = "Manejo de tipos de identificación";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipoIdEdit = ""; //Titulo de tipo de identificación a editar
  MiTipoIdE: any = []; //Tipo de identificación a editar
  comboEditarTipoId: any = []; //Combo editar tipo de identificación

  //Form group 
  ListaTiposIde = new FormGroup(
    {

    });
  filtrarTipoId = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipoId = new FormGroup(
    {
      textTipoId: new FormControl()
    });
  ActualizarATipoId = new FormGroup(
    {
      BuscarIdTipoId: new FormControl(),
      textnuevotipoid: new FormControl(),
      //textnuevoinicialestipoid: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de identificación
  public consultaTiposId(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposId().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TiposId = data;
          this.TituloTiposId = "LISTA DE TIPOS DE IDENTIFICACIÓN";
          this.TablaTiposId[0] = "Indicador";
          this.TablaTiposId[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
        }
        else if (op == 2) {
          this.comboListaTipoId = data;
          this.MiTipoId = null;
          this.TituloTipoId = "";
          this.TabBusTiposId[0] = "";
          this.TabBusTiposId[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipoId = data;
          this.MiTipoIdE = null;
          this.TituloTipoIdEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TiposId = null;
      this.TituloTiposId = "";
      this.TablaTiposId[0] = "";
      this.TablaTiposId[1] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de identificación por su id
  public buscarTipoId() {

    var filtrovalor = this.filtrarTipoId.getRawValue()['combofiltro'];
    this.servi.getTipoId('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoId = data;
      this.TituloTipoId = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTiposId[0] = "Indicador";
      this.TabBusTiposId[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de identificación
  public InsertarTipoId() {

    var datosvalo2 = this.InsertarGTipoId.getRawValue()['textTipoId'];
    //var datosvalo1 = this.InsertarGTipoId.getRawValue()['textIniTipoId'];
    var cadena = { "tipo_identificacion": datosvalo2/*, "iniciales_tipo_id": datosvalo1*/ };

    this.servi.insertTipoId(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipoId.reset();

  }

  //Buscar un tipo de identificación por su id para editarlo
  buscarEditarTipoId() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipoId.getRawValue()['BuscarIdTipoId'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipoId('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipoIdE = data;
      this.TituloTipoIdEdit = "TIPO DE IDENTIFICACIÓN A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de identificación 
  public ActualizarTipoId() {

    var nuevotipoid = this.ActualizarATipoId.getRawValue()['textnuevotipoid'];
    //var nuevoinitipdoc = this.ActualizarATipoId.getRawValue()['textnuevoinicialestipoid'];

    var cadena = { "id_tipo_identificacion": this.BuscarEvalor, "tipo_identificacion": nuevotipoid/*, "iniciales_tip_doc": nuevoinitipdoc*/ };

    this.servi.updateTipoId(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipoId.reset();

  }

  ngOnInit(): void {

    this.ListaTiposIde = this.formBuilder.group(
      {

      });
    this.filtrarTipoId = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}