import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServicioService {
  readonly URL ="http://localhost:5500"

  constructor(private http: HttpClient) { }


  ingresoDinero(id:number|undefined, dinero:number):Observable<number>{
    return this.http.post<number>(this.URL + "/ingresoMonedas", {id,  dinero });
  }
  extaerMonedas(id:number|undefined, dinero:number):Observable<number>{
    return this.http.post<number>(this.URL + "/extaerMonedas", {id,  dinero });
  }

}
