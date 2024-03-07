import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicioService {
  readonly URL ="http://localhost:5500/"
  constructor(private http:HttpClient) { }


  // funcion de prueba
    public prueba():Observable<any> {
      return this.http.get<any>(this.URL+"prueba");

    }
  //funciones para el uso
}
