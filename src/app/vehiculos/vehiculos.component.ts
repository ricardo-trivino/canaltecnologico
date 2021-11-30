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

  tiposVehiculos: any = [];
  marcasVehiculos: any = [];
  Clientes: any = [];

  //Form group 
  ListaVehiculos = new FormGroup(
    {

    });
  filtrarVehiculo = new FormGroup(
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

    //se invoca el servicio y se carga el combobox de los tipos de vehiculos
    this.servi.getExportTiposVe().subscribe((data: { tiposusuarios: [] }) => {
      this.tiposVehiculos = data;
      console.log(this.tiposVehiculos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de las marcas de vehiculos
    this.servi.getExportMarcasVe().subscribe((data: { tiposusuarios: [] }) => {
      this.marcasVehiculos = data;
      console.log(this.marcasVehiculos);
    },
      error => { console.error(error + " ") });

    //se invoca el servicio y se carga el combobox de los clientes
    this.servi.getExportClientes().subscribe((data: { clientes: [] }) => {
      this.Clientes = data;
      console.log(this.Clientes);
    },
      error => { console.error(error + " ") });

    this.ListaVehiculos = this.formBuilder.group(
      {

      });
    this.filtrarVehiculo = this.formBuilder.group(
      {
        combofiltro: []
      });
  }

}