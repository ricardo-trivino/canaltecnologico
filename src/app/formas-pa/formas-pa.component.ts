import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-formas-pa',
  templateUrl: './formas-pa.component.html',
  styleUrls: ['./formas-pa.component.css']
})
export class FormasPaComponent implements OnInit {

  FormasPa: any = []; //Lista de tipos de usuario
  TituloFormasPa = ""; //Titulo lista de tipos de usuario
  TablaFormasPa: any = []; //Encabezados tabla lista de tipos de usuario

  TituloFormaPa = ""; //Titulo del tipo de id buscado
  MiFormaPa: any = []; //Tipo de usuario buscado
  TabBusFormasPa: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaFormaPa: any = [];

  title = "Manejo de formas de pago";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloFormaPaEdit = ""; //Titulo de tipo de usuario a editar
  MiFormaPaE: any = []; //Tipo de usuario a editar
  comboEditarFormaPa: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaFormasPag = new FormGroup(
    {

    });
  filtrarFormaPa = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGFormaPa = new FormGroup(
    {
      textFormaPa: new FormControl(),
      textIniFormaPa: new FormControl()
    });
  ActualizarAFormaPa = new FormGroup(
    {
      BuscarIdFormaPa: new FormControl(),
      textnuevaformapa: new FormControl(),
      //textnuevoinicialestipoid: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los tipos de usuario
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

  //Buscar un tipo de usuario por su id
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

  //Insertar un tipo de usuario
  public InsertarFormaPa() {

    var datosvalo2 = this.InsertarGFormaPa.getRawValue()['textFormaPa'];
    //var datosvalo1 = this.InsertarGTipoId.getRawValue()['textIniTipoId'];
    var cadena = { "forma_pago": datosvalo2/*, "iniciales_tipo_id": datosvalo1*/ };

    this.servi.insertFormaPa(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGFormaPa.reset();

  }

  //Buscar un tipo de usuario su id para editarlo
  buscarEditarFormaPa() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAFormaPa.getRawValue()['BuscarIdFormaPa'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getFormaPa('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiFormaPaE = data;
      this.TituloFormaPaEdit = "FORMA DE PAGO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el tipo de usuario 
  public ActualizarFormaPa() {

    var nuevaformapa = this.ActualizarAFormaPa.getRawValue()['textnuevaformapa'];
    //var nuevoinitipdoc = this.ActualizarATipoId.getRawValue()['textnuevoinicialestipoid'];

    var cadena = { "id_forma_pago": this.BuscarEvalor, "forma_pago": nuevaformapa/*, "iniciales_tip_doc": nuevoinitipdoc*/ };

    this.servi.updateFormaPa(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarAFormaPa.reset();

  }

  ngOnInit(): void {

    this.ListaFormasPag = this.formBuilder.group(
      {

      });
    this.filtrarFormaPa = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}