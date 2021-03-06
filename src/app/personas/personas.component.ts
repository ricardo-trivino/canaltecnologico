import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {

  Personas: any = []; //Lista de tipos de usuario
  TituloPersonas = ""; //Titulo lista de tipos de usuario
  TablaPersonas: any = []; //Encabezados tabla lista de tipos de usuario

  tiposDocumentos: any = []; //Vector que captura la data para el combo de los tipos de documentos
  tiposUsuarios: any = []; //Vector que captura la data para el combo de los tipos de documentos

  TituloPersona = ""; //Titulo del tipo de id buscado
  MiPersona: any = []; //Tipo de usuario buscado
  TabBusPersonas: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaPersona: any = [];

  title = "Manejo de personas";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloPersonaEdit = ""; //Titulo de tipo de usuario a editar
  MiPersonaE: any = []; //Tipo de usuario a editar
  comboEditarPersona: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaPersonas = new FormGroup(
    {

    });
  filtrarPersona = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGPersona = new FormGroup(
    {
      textPersona: new FormControl(),
      textTIPersona: new FormControl(),
      textIPersona: new FormControl(),
      textPNPersona: new FormControl(),
      textSNPersona: new FormControl(),
      textPAPersona: new FormControl(),
      textSAPersona: new FormControl(),
      textTPersona: new FormControl(),
      textCPersona: new FormControl(),
      textDPersona: new FormControl(),
      textTUPersona: new FormControl()
    });
  ActualizarAPersona = new FormGroup(
    {
      BuscarIdPersona: new FormControl(),
      textnuevotipersona: new FormControl(),
      textnuevoipersona: new FormControl(),
      textnuevopnpersona: new FormControl(),
      textnuevosnpersona: new FormControl(),
      textnuevopapersona: new FormControl(),
      textnuevosapersona: new FormControl(),
      textnuevotpersona: new FormControl(),
      textnuevocpersona: new FormControl(),
      textnuevodpersona: new FormControl(),
      textnuevotupersona: new FormControl()
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todas las personas
  public consultaPersonas(op: any) {

    if (this.controlLista == 1) {
      this.servi.getPersonas().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Personas = data;
          this.TituloPersonas = "LISTA DE PERSONAS";
          this.TablaPersonas[0] = "Indicador";
          this.TablaPersonas[1] = "Tipo identificaci??n";
          this.TablaPersonas[2] = "N??mero identificaci??n";
          this.TablaPersonas[3] = "Primer nombre";
          this.TablaPersonas[4] = "Segundo nombre";
          this.TablaPersonas[5] = "Primer apellido";
          this.TablaPersonas[6] = "Segundo apellido";
          this.TablaPersonas[7] = "Tel??fono";
          this.TablaPersonas[8] = "Correo";
          this.TablaPersonas[9] = "Direcci??n";
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

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar una persona por su id
  public buscarPersona() {

    var filtrovalor = this.filtrarPersona.getRawValue()['combofiltro'];
    this.servi.getPersona('/' + filtrovalor).subscribe((data: {}) => {
      this.MiPersona = data;
      this.TituloPersona = "PERSONA SELECCIONADA";
      this.TabBusPersonas[0] = "Indicador";
      this.TabBusPersonas[1] = "Tipo identificaci??n";
      this.TabBusPersonas[2] = "N??mero identificaci??n";
      this.TabBusPersonas[3] = "Primer nombre";
      this.TabBusPersonas[4] = "Segundo nombre";
      this.TabBusPersonas[5] = "Primer apellido";
      this.TabBusPersonas[6] = "Segundo apellido";
      this.TabBusPersonas[7] = "Tel??fono";
      this.TabBusPersonas[8] = "Correo";
      this.TabBusPersonas[9] = "Direcci??n";
      this.TabBusPersonas[10] = "Rol";
    },
      error => { console.log(error) });

  }

  //Insertar una persona
  public InsertarPersona() {

    var datosvalor1 = this.InsertarGPersona.getRawValue()['textTIPersona'];
    var datosvalor2 = this.InsertarGPersona.getRawValue()['textIPersona'];
    var datosvalor3 = this.InsertarGPersona.getRawValue()['textPNPersona'];
    var datosvalor4 = this.InsertarGPersona.getRawValue()['textSNPersona'];
    var datosvalor5 = this.InsertarGPersona.getRawValue()['textPAPersona'];
    var datosvalor6 = this.InsertarGPersona.getRawValue()['textSAPersona'];
    var datosvalor7 = this.InsertarGPersona.getRawValue()['textTPersona'];
    var datosvalor8 = this.InsertarGPersona.getRawValue()['textCPersona'];
    var datosvalor9 = this.InsertarGPersona.getRawValue()['textDPersona'];
    var datosvalor10 = this.InsertarGPersona.getRawValue()['textTUPersona'];
    var cadena = {
      "tipo_identificacion_persona": datosvalor1, "identificacion_persona": datosvalor2, "p_nombre_persona": datosvalor3, "s_nombre_persona": datosvalor4,
      "p_apellido_persona": datosvalor5, "s_apellido_persona": datosvalor6, "telefono_persona": datosvalor7, "correo_persona": datosvalor8, "direccion_persona": datosvalor9,
      "tipo_usuario_persona": datosvalor10
    };

    this.servi.insertPersona(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGPersona.reset();

  }

  //Buscar una persona por su id para editarla
  buscarEditarPersona() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAPersona.getRawValue()['BuscarIdPersona'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getPersona('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiPersonaE = data;
      this.TituloPersonaEdit = "PERSONA A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar la persona
  public ActualizarPersona() {

    var nuevotipersona = this.ActualizarAPersona.getRawValue()['textnuevotipersona'];
    var nuevoipersona = this.ActualizarAPersona.getRawValue()['textnuevoipersona'];
    var nuevopnpersona = this.ActualizarAPersona.getRawValue()['textnuevopnpersona'];
    var nuevosnpersona = this.ActualizarAPersona.getRawValue()['textnuevosnpersona'];
    var nuevopapersona = this.ActualizarAPersona.getRawValue()['textnuevopapersona'];
    var nuevosapersona = this.ActualizarAPersona.getRawValue()['textnuevosapersona'];
    var nuevotpersona = this.ActualizarAPersona.getRawValue()['textnuevotpersona'];
    var nuevocpersona = this.ActualizarAPersona.getRawValue()['textnuevocpersona'];
    var nuevodpersona = this.ActualizarAPersona.getRawValue()['textnuevodpersona'];
    var nuevotupersona = this.ActualizarAPersona.getRawValue()['textnuevotupersona'];

    var cadena = {
      "id_persona": this.BuscarEvalor, "tipo_identificacion_persona": nuevotipersona, "identificacion_persona": nuevoipersona, "p_nombre_persona": nuevopnpersona,
      "s_nombre_persona": nuevosnpersona, "p_apellido_persona": nuevopapersona, "s_apellido_persona": nuevosapersona, "telefono_persona": nuevotpersona,
      "correo_persona": nuevocpersona, "direccion_persona": nuevodpersona, "tipo_usuario_persona": nuevotupersona
    };

    this.servi.updatePersona(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarAPersona.reset();

  }

  ngOnInit(): void {
    //se invoca el servicio y se carga el combobox de los tipos de documentos
    this.servi.getExportTiposId().subscribe((data: { tiposdocumentos: [] }) => {
      this.tiposDocumentos = data;
      console.log(this.tiposDocumentos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los tipos de usuarios
    this.servi.getExportTiposUs().subscribe((data: { tiposusuarios: [] }) => {
      this.tiposUsuarios = data;
      console.log(this.tiposUsuarios);
    },
      error => { console.error(error + " ") });

    this.ListaPersonas = this.formBuilder.group(
      {

      });
    this.filtrarPersona = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
