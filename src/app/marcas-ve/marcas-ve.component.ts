import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-marcas-ve',
  templateUrl: './marcas-ve.component.html',
  styleUrls: ['./marcas-ve.component.css']
})
export class MarcasVeComponent implements OnInit {

  MarcasVe: any = []; //Lista de tipos de usuario
  TituloMarcasVe = ""; //Titulo lista de tipos de usuario
  TablaMarcasVe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloMarcaVe = ""; //Titulo del tipo de id buscado
  MiMarcaVe: any = []; //Tipo de usuario buscado
  TabBusMarcasVe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaMarcaVe: any = [];

  title = "Manejo de marcas de vehículo";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloMarcaVeEdit = ""; //Titulo de tipo de usuario a editar
  MiMarcaVeE: any = []; //Tipo de usuario a editar
  comboEditarMarcaVe: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaMarcasVeh = new FormGroup(
    {

    });
  filtrarMarcaVe = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGMarcaVe = new FormGroup(
    {
      textMarcaVe: new FormControl()
    });
  ActualizarAMarcaVe = new FormGroup(
    {
      BuscarIdMarcaVe: new FormControl(),
      textnuevamarcave: new FormControl(),
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
  public consultaMarcasVe(op: any) {

    if (this.controlLista == 1) {
      this.servi.getMarcasVe().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.MarcasVe = data;
          this.TituloMarcasVe = "LISTA DE MARCAS DE VEHÍCULO";
          this.TablaMarcasVe[0] = "Indicador";
          this.TablaMarcasVe[1] = "Denominación";
        }
        else if (op == 2) {
          this.comboListaMarcaVe = data;
          this.MiMarcaVe = null;
          this.TituloMarcaVe = "";
          this.TabBusMarcasVe[0] = "";
          this.TabBusMarcasVe[1] = "";
        }
        else if (op == 3) {
          this.comboEditarMarcaVe = data;
          this.MiMarcaVeE = null;
          this.TituloMarcaVeEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.MarcasVe = null;
      this.TituloMarcasVe = "";
      this.TablaMarcasVe[0] = "";
      this.TablaMarcasVe[1] = "";
      this.controlLista = 1;
    }

  }

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un tipo de usuario por su id
  public buscarMarcaVe() {

    var filtrovalor = this.filtrarMarcaVe.getRawValue()['combofiltro'];
    this.servi.getMarcaVe('/' + filtrovalor).subscribe((data: {}) => {
      this.MiMarcaVe = data;
      this.TituloMarcaVe = "MARCA DE VEHÍCULO SELECCIONADO";
      this.TabBusMarcasVe[0] = "Indicador";
      this.TabBusMarcasVe[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Insertar un tipo de usuario
  public InsertarMarcaVe() {

    var datosvalo2 = this.InsertarGMarcaVe.getRawValue()['textMarcaVe'];
    var cadena = { "marca_vehiculo": datosvalo2};

    this.servi.insertMarcaVe(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGMarcaVe.reset();

  }

  //Buscar un tipo de usuario su id para editarlo
  buscarEditarMarcaVe() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAMarcaVe.getRawValue()['BuscarIdMarcaVe'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getMarcaVe('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiMarcaVeE = data;
      this.TituloMarcaVeEdit = "MARCA DE VEHÍCULO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarMarcaVe() {

    var nuevamarcave = this.ActualizarAMarcaVe.getRawValue()['textnuevamarcave'];

    var cadena = { "id_marca_vehiculo": this.BuscarEvalor, "marca_vehiculo": nuevamarcave};

    this.servi.updateMarcaVe(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarAMarcaVe.reset();

  }

  ngOnInit(): void {

    this.ListaMarcasVeh = this.formBuilder.group(
      {

      });
    this.filtrarMarcaVe = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}