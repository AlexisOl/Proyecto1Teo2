import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../models/producto';
import { Observable } from 'rxjs';
import { retribucion } from '../models/retribucion';
import { voluntariado } from '../models/voluntariado';
import { articulosVoluntariado } from '../models/articulosVoluntariado';
import { insignias } from '../models/insignias';
import { ayudaVoluntariado } from '../models/ayudaVoluntariado';
import { comprobanteAyudaVoluntariado } from '../models/comprobanteAyudaVoluntariado';

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

  //* voluntariado
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

  //funcion para la obtencion global de voluntariados

  public obtenerTodosvoluntariados():Observable<voluntariado> {
    return this.http.get<voluntariado>(this.URL+"/vistaTotalVoluntariado")
  }

  public voluntariadoEspecifico(id:number):Observable<voluntariado>{
    return this.http.get<voluntariado>(this.URL+"/vistaVoluntariadoInfo?id="+id);


  }

  //funcion para obtener los productos de voluntariados especificos

  public vistaVoluntariadoEspecifico(id:number):Observable<articulosVoluntariado> {
    return this.http.get<articulosVoluntariado>(this.URL+"/vistaVoluntariadoEspecifico?id="+id)
  }


  //*voluntariado cliente
  //*ingreso de ayuda de volubtariado constancia
  public ingresoConstanciaAyudaVoluntariado(ayudaVoluntariado:ayudaVoluntariado):Observable<ayudaVoluntariado> {
    return this.http.post<ayudaVoluntariado>(this.URL+"/ingresoConstanciaAyudaVoluntariado", {ayudaVoluntariado})
  }

  //* para detalle de comprobante
  public ingresoDetalleConstanciaAyudaVoluntariado(id:number|undefined, comprobanteAyudaVoluntariado:comprobanteAyudaVoluntariado):Observable<comprobanteAyudaVoluntariado> {
    return this.http.post<comprobanteAyudaVoluntariado>(this.URL+"/ingresoDetalleConstanciaAyudaVoluntariado", {comprobanteAyudaVoluntariado, id})
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
  public obtenerInsignia(id:number|undefined):Observable<insignias>{

    return this.http.get<insignias>(this.URL+"/obtenerInsignia?id="+id)


  }
  //obtener insignias de forma especifica voluntariado

  
  public obtenerInsigniaEspecifica(id:number|undefined):Observable<insignias>{

    return this.http.get<insignias>(this.URL+"/obtenerInsigniaEspecifica?id="+id)


  }
}
