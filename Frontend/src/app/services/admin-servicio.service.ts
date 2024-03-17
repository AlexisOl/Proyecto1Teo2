import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publicacion } from '../models/publicacion';

@Injectable({
  providedIn: 'root'
})
export class AdminServicioService {
  readonly URL ="http://localhost:5500"
  constructor(private http: HttpClient) { }

  //funcion para ver todas las publicaciones (determinar si son en espera o ya en venta)

  public obtenerPublicaciones():Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/obtenerTodaPublicacionAdmin");
  }

  //funcion para aceptar ventas
  public aceptarVenta(id: number):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/aceptarVenta?id="+ id);
  }

  //funcion para rechazar ventas
  public rechazarVenta(id: number):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/rechazarVenta?id="+ id);
  }


}
