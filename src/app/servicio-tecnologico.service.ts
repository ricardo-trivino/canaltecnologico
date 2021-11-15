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
  async insertTipoRe(TipoUsD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tiporep", TipoUsD, httpOptions).toPromise()
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
  async insertTipoVe(TipoUsD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipove", TipoUsD, httpOptions).toPromise()
    });

  }

  // Método para modificar un tipo de vehículo
  async updateTipoVe(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipove", cadena, httpOptions).toPromise()
    });

  }

}