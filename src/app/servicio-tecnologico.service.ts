import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServicioTecnologicoService {

  private Url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  //*****************************************************************************//

  // Método listar de los tipos de identificación 
  getTiposId(): Observable<any> {

    return this.http.get(this.Url + "/tipoid", httpOptions);

  }

  // Método mostrar un solo tipo de identificación
  getTipoId(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipoid" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de identificación 
  async insertTipoId(TipoIdD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipoid", TipoIdD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de identificación
  async updateTipoId(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipoid", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de los tipos de usuario 
  getTiposUs(): Observable<any> {

    return this.http.get(this.Url + "/tipous", httpOptions);

  }

  // Método mostrar un solo tipo de usuario
  getTipoUs(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipous" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de usuario 
  async insertTipoUs(TipoUsD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipous", TipoUsD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de usuario
  async updateTipoUs(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipous", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de los tipos de repuesto 
  getTiposRe(): Observable<any> {

    return this.http.get(this.Url + "/tiporep", httpOptions);

  }

  // Método mostrar un solo tipo de repuesto
  getTipoRe(id: any): Observable<any> {

    return this.http.get(this.Url + "/tiporep" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de repuesto 
  async insertTipoRe(TipoReD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tiporep", TipoReD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de repuesto
  async updateTipoRe(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tiporep", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de los tipos de vehículo 
  getTiposVe(): Observable<any> {

    return this.http.get(this.Url + "/tipove", httpOptions);

  }

  // Método mostrar un solo tipo de vehículo
  getTipoVe(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipove" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de vehículo 
  async insertTipoVe(TipoVeD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipove", TipoVeD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de vehículo
  async updateTipoVe(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipove", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de las marcas de vehículo 
  getMarcasVe(): Observable<any> {

    return this.http.get(this.Url + "/marcave", httpOptions);

  }

  // Método mostrar un solo tipo de vehículo
  getMarcaVe(id: any): Observable<any> {

    return this.http.get(this.Url + "/marcave" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de vehículo 
  async insertMarcaVe(MarcaVeD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/marcave", MarcaVeD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de vehículo
  async updateMarcaVe(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/marcave", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de las formas de pago 
  getFormasPa(): Observable<any> {

    return this.http.get(this.Url + "/formapago", httpOptions);

  }

  // Método mostrar un solo tipo de vehículo
  getFormaPa(id: any): Observable<any> {

    return this.http.get(this.Url + "/formapago" + id, httpOptions);

  }

  // Método para insertar un nuevo tipo de vehículo 
  async insertFormaPa(FormaPaD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/formapago", FormaPaD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de vehículo
  async updateFormaPa(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/formapago", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de las personas
  getPersonas(): Observable<any> {

    return this.http.get(this.Url + "/persona", httpOptions);

  }

  // Método listar de las personas
  getClientes(): Observable<any> {

    return this.http.get(this.Url + "/persona/cliente", httpOptions);

  }

  // Método mostrar una sola persona
  getPersona(id: any): Observable<any> {

    return this.http.get(this.Url + "/persona" + id, httpOptions);

  }

  // Método mostrar una sola persona
  getCliente(id: any): Observable<any> {

    return this.http.get(this.Url + "/persona/cliente" + id, httpOptions);

  }

  // Método para insertar una nueva persona
  async insertPersona(PersonaD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/persona", PersonaD, httpOptions).toPromise()
    });

  }

  // Método para modificar una persona
  async updatePersona(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/persona", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de los vehículos
  getVehiculos(): Observable<any> {

    return this.http.get(this.Url + "/vehiculo", httpOptions);

  }

  // Método mostrar una sola persona
  getVehiculo(id: any): Observable<any> {

    return this.http.get(this.Url + "/vehiculo" + id, httpOptions);

  }

  // Método para insertar una nueva persona
  async insertVehiculo(VehiculoD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/vehiculo", VehiculoD, httpOptions).toPromise()
    });

  }

  // Método para modificar una persona
  async updateVehiculo(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/vehiculo", cadena, httpOptions).toPromise()
    });

  }

  //*****************************************************************************//

  // Método listar de los repuestos
  getRepuestos(): Observable<any> {

    return this.http.get(this.Url + "/repuesto", httpOptions);

  }

  // Método mostrar un solo repuesto
  getRepuesto(id: any): Observable<any> {

    return this.http.get(this.Url + "/repuesto" + id, httpOptions);

  }

  // Método para insertar un repuesto
  async insertRepuesto(RepuestoD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/repuesto", RepuestoD, httpOptions).toPromise()
    });

  }

  // Método para modificar un repuesto
  async updateRepuesto(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/repuesto", cadena, httpOptions).toPromise()
    });

  }

    //*****************************************************************************//

  // Método listar de las ordenes de trabajo
  getOrdsTrab(): Observable<any> {

    return this.http.get(this.Url + "/ordtrab", httpOptions);

  }

  // Método mostrar una sola orden de trabajo
  getOrdTrab(id: any): Observable<any> {

    return this.http.get(this.Url + "/ordtrab" + id, httpOptions);

  }

  // Método para insertar una orden de trabajo
  async insertOrdTrab(OrdenTrD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/ordtrab", OrdenTrD, httpOptions).toPromise()
    });

  }

  // Método para modificar una orden de trabajo
  async updateOrdTrab(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/ordtrab", cadena, httpOptions).toPromise()
    });

  }

}