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

  // Método para modificar un tipo de usuario
  async updateTipoId(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipoid", cadena, httpOptions).toPromise()
    });

  }

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
  
    // Método para modificar un tipo de identificación
    async updateTipoUs(cadena: any): Promise<any> {
  
      return new Promise((resolve, reject) => {
        this.http.put(this.Url + "/tipous", cadena, httpOptions).toPromise()
      });
  
    }

}