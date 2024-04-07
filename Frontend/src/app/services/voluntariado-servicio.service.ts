import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../models/producto';
import { Observable } from 'rxjs';
import { retribucion } from '../models/retribucion';
import { voluntariado } from '../models/voluntariado';
import { articulosVoluntariado } from '../models/articulosVoluntariado';
import { insignias } from '../models/insignias';

@Injectable({
  providedIn: 'root'
})
export class VoluntariadoServicioService {
  readonly URL ="http://localhost:5500"

  constructor(private http: HttpClient) { }


  public obtenerProductoEstado(id:number):Observable<producto>{
    return this.http.get<producto>(this.URL+"/ingresoPublicaciones?id="+id);
  }

  //funcion para obtener los tipos de retribuciones

  public obtenerRetribuciones():Observable<retribucion>{
    return this.http.get<retribucion>(this.URL+"/obtenerRetribucion");
  }

  //funcion para el ingreso de voluntariados
  public ingresoVoluntariado(voluntariado:voluntariado):Observable<voluntariado> {
    return this.http.post<voluntariado>(this.URL+"/ingresoVoluntariado", {voluntariado})
  }
  //funcion para ingresar productos por voluntariado
  public ingresoArticuloVoluntariado(articulosVoluntariado:articulosVoluntariado):Observable<articulosVoluntariado> {
    return this.http.post<articulosVoluntariado>(this.URL+"/ingresoArticuloVoluntariado", {articulosVoluntariado});
  }
  // para ver los voluntariados

  public vistaVoluntariadoEstado(id:number|undefined):Observable<voluntariado>{
    return this.http.get<voluntariado>(this.URL+"/vistaVoluntariadoEstado?id="+id);
  }
  //* productos especificos
  public obtenerProductosVoluntariado(id:number):Observable<articulosVoluntariado>{
    return this.http.get<articulosVoluntariado>(this.URL+"/obtenerProductosIdVoluntariado?id="+id);

  }

  //* insignias
  // crear insignias

  public crearInsignia(insignia:insignias):Observable<insignias>{
    return this.http.post<insignias>(this.URL+"/crearInsignia",{insignia})
  }

  //obtener insignias
  public obtenerInsignia(id:number):Observable<insignias>{

    return this.http.get<insignias>(this.URL+"/obtenerInsignia?id="+id)


  }
}
