import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publicacion } from '../models/publicacion';
import { voluntariado } from '../models/voluntariado';

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

    //funcion para ver todos voluntariados (determinar si son en espera o ya en venta)

    public vistaVoluntariadoAdmin():Observable<voluntariado>{
      return this.http.get<voluntariado>(this.URL+"/vistaVoluntariadoAdmin");
    }


  //funcion para aceptar voluntariado
  public aceptarVoluntariado(id: number):Observable<voluntariado>{
    return this.http.get<voluntariado>(this.URL+"/aceptarVoluntariado?id="+ id);
  }

  //funcion para rechazar voluntariado
  public rechazarVoluntariado(id: number):Observable<voluntariado>{
    return this.http.get<voluntariado>(this.URL+"/rechazarVoluntariado?id="+ id);
  }


}
