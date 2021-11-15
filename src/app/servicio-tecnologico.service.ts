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

  // Método Listar de los Tipos de documentos 
  getTiposId(): Observable<any> {

    return this.http.get(this.Url + "/tipoid", httpOptions);

  }

  // Método mostrar un solo Tipo de documento
  getTipoId(id: any): Observable<any> {

    return this.http.get(this.Url + "/tipoid" + id, httpOptions);

  }

  // Método para insertar un nuevo Tipo de documento 
  async insertTipoId(TipoIdD: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/tipoid", TipoIdD, httpOptions).toPromise()
    });

  }

  // Método para modificar un  Tipo de documento
  async updateTipoId(cadena: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/tipoid", cadena, httpOptions).toPromise()
    });

  }

}