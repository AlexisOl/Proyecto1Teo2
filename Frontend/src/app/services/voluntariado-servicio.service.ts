import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoServicioService {
  readonly URL ="http://localhost:5500"

  constructor(private http: HttpClient) { }


  public obtenerProductoEstado(id:number):Observable<producto>{
    return this.http.get<producto>(this.URL+"/ingresoPublicaciones?id="+id);
  }
}
