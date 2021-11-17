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
  TiposId: any = []; //Lista de tipos de identificación
  TiposUs: any = []; //Lista de tipos de usuario
  TituloPersonas = ""; //Titulo lista de tipos de usuario
  TituloTiposId = ""; //Titulo lista de tipos de identificación
  TituloTiposUs = ""; //Titulo lista de tipos de usuario
  TablaPersonas: any = []; //Encabezados tabla lista de tipos de usuario
  TablaTiposId: any = []; //Encabezados tabla lista de tipos de identificación
  TablaTiposUs: any = []; //Encabezados tabla lista de tipos de usuario

  TituloPersona = ""; //Titulo del tipo de id buscado
  TituloTipoId = ""; //Titulo del tipo de id buscado
  TituloTipoUs = ""; //Titulo del tipo de id buscado
  MiPersona: any = []; //Tipo de usuario buscado
  MiTipoId: any = []; //Tipo de identificación buscado
  MiTipoUs: any = []; //Tipo de usuario buscado
  TabBusPersonas: any = []; //Encabezados tabla tipo de usuario Buscado
  TabBusTiposId: any = []; //Encabezados tabla Tipo de identificación Buscado
  TabBusTiposUs: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaPersona: any = [];
  comboListaTipoIdP: any = [];
  comboListaTipoUs: any = [];

  title = "Manejo de personas";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloPersonaEdit = ""; //Titulo de tipo de usuario a editar
  TituloTipoIdEdit = ""; //Titulo de tipo de identificación a editar
  TituloTipoUsEdit = ""; //Titulo de tipo de usuario a editar
  MiPersonaE: any = []; //Tipo de usuario a editar
  MiTipoIdE: any = []; //Tipo de identificación a editar
  MiTipoUsE: any = []; //Tipo de usuario a editar
  comboEditarPersona: any = []; //Combo editar tipo de usuario
  comboEditarTipoId: any = []; //Combo editar tipo de identificación
  comboEditarTipoUs: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaPersonas = new FormGroup(
    {

    });
  filtrarPersona = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarTipoId = new FormGroup(
    {
      combofiltroid: new FormControl()
    });
  filtrarTipoUs = new FormGroup(
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
          this.TablaPersonas[1] = "Tipo identificación";
          this.TablaPersonas[2] = "Número identificación";
          this.TablaPersonas[3] = "Primer nombre";
          this.TablaPersonas[4] = "Segundo nombre";
          this.TablaPersonas[5] = "Primer apellido";
          this.TablaPersonas[6] = "Segundo apellido";
          this.TablaPersonas[7] = "Teléfono";
          this.TablaPersonas[8] = "Correo";
          this.TablaPersonas[9] = "Dirección";
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
        }
        else if (op == 2) {
          this.comboListaTipoIdP = data;
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
      this.TabBusPersonas[1] = "Tipo identificación";
      this.TabBusPersonas[2] = "Número identificación";
      this.TabBusPersonas[3] = "Primer nombre";
      this.TabBusPersonas[4] = "Segundo nombre";
      this.TabBusPersonas[5] = "Primer apellido";
      this.TabBusPersonas[6] = "Segundo apellido";
      this.TabBusPersonas[7] = "Teléfono";
      this.TabBusPersonas[8] = "Correo";
      this.TabBusPersonas[9] = "Dirección";
      this.TabBusPersonas[10] = "Rol";
    },
      error => { console.log(error) });

  }

  //Buscar un tipo de identificación por su id
  public buscarTipoId() {

    var filtrovalorid = this.filtrarTipoId.getRawValue()['combofiltroid'];
    this.servi.getTipoId('/' + filtrovalorid).subscribe((data: {}) => {
      this.MiTipoId = data;
      this.TituloTipoId = "TIPO DE DOCUMENTO SELECCIONADO";
      this.TabBusTiposId[0] = "Indicador";
      this.TabBusTiposId[1] = "Denominación";
    },
      error => { console.log(error) });

  }

  //Buscar un tipo de usuario por su id
  public buscarTipoUs() {

    var filtrovalor = this.filtrarTipoUs.getRawValue()['combofiltro'];
    this.servi.getTipoUs('/' + filtrovalor).subscribe((data: {}) => {
      this.MiTipoUs = data;
      this.TituloTipoUs = "TIPO DE USUARIO SELECCIONADO";
      this.TabBusTiposUs[0] = "Indicador";
      this.TabBusTiposUs[1] = "Denominación";
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

    this.ListaPersonas = this.formBuilder.group(
      {

      });
    this.filtrarPersona = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarTipoId = this.formBuilder.group(
      {
        combofiltroid: []
      });
    this.filtrarTipoUs = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}
