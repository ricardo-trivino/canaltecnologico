import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ServicioTecnologicoService } from '../servicio-tecnologico.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  Vehiculos: any = []; //Lista de tipos de usuario
  TituloVehiculos = ""; //Titulo lista de tipos de usuario
  TablaVehiculos: any = []; //Encabezados tabla lista de tipos de usuario

  TituloVehiculo = ""; //Titulo del tipo de id buscado
  MiVehiculo: any = []; //Tipo de usuario buscado
  TabBusVehiculos: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaVehiculo: any = [];

  title = "Manejo de vehículos";
  controlLista = 1;  //Control para limpiar lista
  BuscarEvalor = 1; //Control para carga el valor a buscar

  TituloVehiculoEdit = ""; //Titulo de tipo de usuario a editar
  MiVehiculoE: any = []; //Tipo de usuario a editar
  comboEditarVehiculo: any = []; //Combo editar tipo de usuario

  MarcasVe: any = []; //Lista de tipos de usuario
  TituloMarcasVe = ""; //Titulo lista de tipos de usuario
  TablaMarcasVe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloMarcaVe = ""; //Titulo de la marca buscada
  MiMarcaVe: any = []; //Tipo de usuario buscado
  TabBusMarcasVe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaMarcaVe: any = [];

  TituloMarcaVeEdit = ""; //Titulo de tipo de usuario a editar
  MiMarcaVeE: any = []; //Tipo de usuario a editar
  comboEditarMarcaVe: any = []; //Combo editar tipo de usuario

  TiposVe: any = []; //Lista de tipos de usuario
  TituloTiposVe = ""; //Titulo lista de tipos de usuario
  TablaTiposVe: any = []; //Encabezados tabla lista de tipos de usuario

  TituloTipoVe = ""; //Titulo del tipo de id buscado
  MiTipoVe: any = []; //Tipo de usuario buscado
  TabBusTiposVe: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaTipoVe: any = [];

  TituloTipoVeEdit = ""; //Titulo de tipo de usuario a editar
  MiTipoVeE: any = []; //Tipo de usuario a editar
  comboEditarTipoVe: any = []; //Combo editar tipo de usuario

  Personas: any = []; //Lista de tipos de usuario
  TituloPersonas = ""; //Titulo lista de tipos de usuario
  TablaPersonas: any = []; //Encabezados tabla lista de tipos de usuario

  TituloPersona = ""; //Titulo del tipo de id buscado
  MiPersona: any = []; //Tipo de usuario buscado
  TabBusPersonas: any = []; //Encabezados tabla tipo de usuario Buscado
  comboListaPersona: any = [];

  TituloPersonaEdit = ""; //Titulo de tipo de usuario a editar
  MiPersonaE: any = []; //Tipo de usuario a editar
  comboEditarPersona: any = []; //Combo editar tipo de usuario

  //Form group 
  ListaVehiculos = new FormGroup(
    {

    });
  filtrarVehiculo = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarTipoVe = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarMarcaVe = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  filtrarPersona = new FormGroup(
    {
      combofiltro: new FormControl()
    });
  InsertarGVehiculo = new FormGroup(
    {
      textVehiculo: new FormControl(),
      textPVehiculo: new FormControl(),
      textMAVehiculo: new FormControl(),
      textMOVehiculo: new FormControl(),
      textCOVehiculo: new FormControl(),
      textTVehiculo: new FormControl(),
      textCLVehiculo: new FormControl()
    });
  ActualizarAVehiculo = new FormGroup(
    {
      BuscarIdVehiculo: new FormControl(),
      textnuevopvehiculo: new FormControl(),
      textnuevomavehiculo: new FormControl(),
      textnuevomovehiculo: new FormControl(),
      textnuevocovehiculo: new FormControl(),
      textnuevotvehiculo: new FormControl(),
      textnuevoclvehiculo: new FormControl(),
    });

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServicioTecnologicoService,
      Router: Router
    ) { }

  //Consultar todos los vehiculos
  public consultaVehiculos(op: any) {

    if (this.controlLista == 1) {
      this.servi.getVehiculos().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.Vehiculos = data;
          this.TituloVehiculos = "LISTA DE VEHÍCULOS";
          this.TablaVehiculos[0] = "Indicador";
          this.TablaVehiculos[1] = "Placa";
          this.TablaVehiculos[2] = "Marca";
          this.TablaVehiculos[3] = "Modelo";
          this.TablaVehiculos[4] = "Color";
          this.TablaVehiculos[5] = "Tipo";
          this.TablaVehiculos[6] = "Cliente";
        }
        else if (op == 2) {
          this.comboListaVehiculo = data;
          this.MiVehiculo = null;
          this.TituloVehiculo = "";
          this.TabBusVehiculos[0] = "";
          this.TabBusVehiculos[1] = "";
          this.TabBusVehiculos[2] = "";
          this.TabBusVehiculos[3] = "";
          this.TabBusVehiculos[4] = "";
          this.TabBusVehiculos[5] = "";
          this.TabBusVehiculos[6] = "";
        }
        else if (op == 3) {
          this.comboEditarVehiculo = data;
          this.MiVehiculoE = null;
          this.TituloVehiculoEdit = "";
        }
      },
        error => { console.error(error + " ") });
    }
    else {
      this.Vehiculos = null;
      this.TituloVehiculos = "";
      this.TablaVehiculos[0] = "";
      this.TablaVehiculos[1] = "";
      this.TablaVehiculos[2] = "";
      this.TablaVehiculos[3] = "";
      this.TablaVehiculos[4] = "";
      this.TablaVehiculos[5] = "";
      this.TablaVehiculos[6] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todas las marcas
  public consultaMarcasVe(op: any) {

    if (this.controlLista == 1) {
      this.servi.getMarcasVe().subscribe((data: any) => {
        if (op == 1) {
          let dat = data;
          this.MarcasVe = data;
          this.TituloMarcasVe = "LISTA DE MARCAS DE VEHÍCULO";
          this.TablaMarcasVe[0] = "Indicador";
          this.TablaMarcasVe[1] = "Denominación";
          //this.TablaTiposId[2] = "Iniciales";
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
      //this.TablaTiposId[2] = "";
      this.controlLista = 1;
    }

  }

  //Consultar todos los tipos de vehículo
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

  //Consultar todas las personas
  public consultaPersonas(op: any) {

    if (this.controlLista == 1) {
      this.servi.getClientes().subscribe((data: any) => {
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

  //Limpiar la lista
  public LimpiarLista() {

    this.controlLista = 0;

  }

  //Buscar un vehículo por su id
  public buscarVehiculo() {

    var filtrovalor = this.filtrarVehiculo.getRawValue()['combofiltro'];
    this.servi.getVehiculo('/' + filtrovalor).subscribe((data: {}) => {
      this.MiVehiculo = data;
      this.TituloVehiculo = "VEHÍCULO SELECCIONADO";
      this.TabBusVehiculos[0] = "Indicador";
      this.TabBusVehiculos[1] = "Placa";
      this.TabBusVehiculos[2] = "Marca";
      this.TabBusVehiculos[3] = "Modelo";
      this.TabBusVehiculos[4] = "Color";
      this.TabBusVehiculos[5] = "Tipo";
      this.TabBusVehiculos[6] = "Cliente";
    },
      error => { console.log(error) });

  }

  //Buscar una marca por su id
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

  //Buscar un tipo de vehículo por su id
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

  //Buscar una persona por su id
  public buscarPersona() {

    var filtrovalor = this.filtrarPersona.getRawValue()['combofiltro'];
    this.servi.getCliente('/' + filtrovalor).subscribe((data: {}) => {
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

  //Insertar un vehículo
  public InsertarVehiculo() {

    var datosvalor1 = this.InsertarGVehiculo.getRawValue()['textPVehiculo'];
    var datosvalor2 = this.InsertarGVehiculo.getRawValue()['textMAVehiculo'];
    var datosvalor3 = this.InsertarGVehiculo.getRawValue()['textMOVehiculo'];
    var datosvalor4 = this.InsertarGVehiculo.getRawValue()['textCOVehiculo'];
    var datosvalor5 = this.InsertarGVehiculo.getRawValue()['textTVehiculo'];
    var datosvalor6 = this.InsertarGVehiculo.getRawValue()['textCLVehiculo'];
    var cadena = {
      "placa_vehiculo": datosvalor1, "marca_vehiculo": datosvalor2, "modelo_vehiculo": datosvalor3,
      "color_vehiculo": datosvalor4, "tipo_vehiculo": datosvalor5, "cliente_vehiculo": datosvalor6
    };

    this.servi.insertVehiculo(cadena).then
      (res => {
        console.log(res)
      }
      ).catch(err => {
        console.log(err)
      });
    this.InsertarGVehiculo.reset();

  }

  //Buscar un vehículo su id para editarlo
  buscarEditarVehiculo() {

    if (this.BuscarEvalor != 0) {
      this.BuscarEvalor = this.ActualizarAVehiculo.getRawValue()['BuscarIdVehiculo'];
      console.error(" dos el filtro " + this.BuscarEvalor);
    }
    console.error(" tres el filtro " + this.BuscarEvalor);

    this.servi.getVehiculo('/' + this.BuscarEvalor).subscribe((data: {}) => {

      this.MiVehiculoE = data;
      this.TituloVehiculoEdit = "VEHÍCULO A EDITAR";

    }, error => { console.log(error) });

  }

  // Actualizar el vehículo
  public ActualizarVehiculo() {

    var nuevopvehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevopvehiculo'];
    var nuevomavehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevomavehiculo'];
    var nuevomovehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevomovehiculo'];
    var nuevocovehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevocovehiculo'];
    var nuevotvehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevotvehiculo'];
    var nuevoclvehiculo = this.ActualizarAVehiculo.getRawValue()['textnuevoclvehiculo'];

    var cadena = {
      "id_vehiculo": this.BuscarEvalor, "placa_vehiculo": nuevopvehiculo, "marca_vehiculo": nuevomavehiculo,
      "modelo_vehiculo": nuevomovehiculo, "color_vehiculo": nuevocovehiculo, "tipo_vehiculo": nuevotvehiculo,
      "cliente_vehiculo": nuevoclvehiculo
    };

    this.servi.updateVehiculo(cadena).then
      (
        res => {
          console.log("res  ", res)
        }
      ).catch(err => {
        console.log(err)
      });

    //this.BuscarEvalor = 0;
    this.ActualizarAVehiculo.reset();

  }

  ngOnInit(): void {

    this.ListaVehiculos = this.formBuilder.group(
      {

      });
    this.filtrarVehiculo = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarMarcaVe = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarTipoVe = this.formBuilder.group(
      {
        combofiltro: []
      });
    this.filtrarPersona = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}