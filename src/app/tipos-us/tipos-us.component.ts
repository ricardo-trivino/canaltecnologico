import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-tipos-us',
  templateUrl: './tipos-us.component.html',
  styleUrls: ['./tipos-us.component.css']
})
export class TiposUsComponent implements OnInit {

  TiposUs: any = []; //Lista de tipos de usuario
  TituloTiposUs = ""; //Titulo lista de tipos de usuario
  TablaTiposUs: any = []; //Encabezados tabla lista de tipos de usuario

  TituloTipoUs = ""; //Titulo del tipo de id buscado
  MiTipoUs: any = []; //Tipo de usuario buscado
  TabBusTiposUs: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaTipoUs: any = [];

  title = "Manejo de tipos de usuario";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloTipoUsEdit = ""; //Titulo de tipo de usuario a editar
  MiTipoUsE: any = []; //Tipo de usuario a editar
  comboEditarTipoUs: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaTiposUsu = new FormGroup(
    {

    });
  filtrarTipoUs = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGTipoUs = new FormGroup(
    {
      textTipoUs: new FormControl(),
      textIniTipoUs: new FormControl()
    });
  ActualizarATipoUs = new FormGroup(
    {
      BuscarIdTipoUs: new FormControl(),
      textnuevotipous: new FormControl(),
      //textnuevoinicialestipoid: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
  public consultaTiposUs(op: any) {

    if (this.controlLista == 1) {
      this.servi.getTiposUs().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.TiposUs = data;
          this.TituloTiposUs = "LISTA DE TIPOS DE USUARIO";
          this.TablaTiposUs[0] = "Indicador";
          this.TablaTiposUs[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
        }
        else if (op == 2) {
          this.comboListaTipoUs = data;
          this.MiTipoUs = null;
          this.TituloTipoUs = "";
          this.TabBusTiposUs[0] = "";
          this.TabBusTiposUs[1] = "";
        }
        else if (op == 3) {
          this.comboEditarTipoUs = data;
          this.MiTipoUsE = null;
          this.TituloTipoUsEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.TiposUs = null;
      this.TituloTiposUs = "";
      this.TablaTiposUs[0] = "";
      this.TablaTiposUs[1] = "";
      //this.TablaTiposId[2] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de usuario por su id
  public buscarTipoUs() {

    var filtrovalor = this.filtrarTipoUs.getRawValue()['combofiltro'];
    this.servi.getTipoUs('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoUs = data;
      this.TituloTipoUs = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTiposUs[0] = "Indicador";
      this.TabBusTiposUs[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de usuario
  public InsertarTipoUs() {

    var datosvalo2 = this.InsertarGTipoUs.getRawValue()['textTipoUs'];
    //var datosvalo1 = this.InsertarGTipoId.getRawValue()['textIniTipoId'];
    var cadena = { "tipo_usuario": datosvalo2/*, "iniciales_tipo_id": datosvalo1*/ };

    this.servi.insertTipoUs(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGTipoUs.reset();

  }

  //Buscar un tipo de usuario su id para editarlo
  buscarEditarTipoUs() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarATipoUs.getRawValue()['BuscarIdTipoUs'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getTipoUs('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiTipoUsE = data;
      this.TituloTipoUsEdit = "TIPO DE USUARIO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarTipoUs() {

    var nuevotipous = this.ActualizarATipoUs.getRawValue()['textnuevotipous'];
    //var nuevoinitipdoc = this.ActualizarATipoId.getRawValue()['textnuevoinicialestipoid'];

    var cadena = { "id_tipo_usuario": this.BuscarEvalor, "tipo_usuario": nuevotipous/*, "iniciales_tip_doc": nuevoinitipdoc*/ };

    this.servi.updateTipoUs(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarATipoUs.reset();

  }

  ngOnInit(): void {

    this.ListaTiposUsu = this.formBuilder.group(
      {

      });
    this.filtrarTipoUs = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
