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

  // Método mostrar una sola persona
  getPersona(id: any): Observable<any> {

    return this.http.get(this.Url + "/persona" + id, httpOptions);

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

}