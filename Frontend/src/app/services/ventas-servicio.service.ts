import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categorias } from '../models/categorias';
import { producto } from '../models/producto';
import { publicacion } from '../models/publicacion';

@Injectable({
  providedIn: 'root'
})
export class VentasServicioService {
  readonly URL ="http://localhost:5500"

  constructor(private http: HttpClient) { }

  // funcion para obtener las cateogias


  public obtenerCategorias():Observable<categorias>{
    return this.http.get<categorias>(this.URL+"/obtenerCategorias")
  }
  // funcion para el ingreso de productos asociados a un cliente
  public ingresoProducto(producto:producto):Observable<producto> {
    return this.http.post<producto>(this.URL+"/ingresoProducto",{producto})
  }
  // funcion para obtener todos los productos solo en base al id
  public obtenerProductosId(id: number|undefined):Observable<producto> {
    return this.http.get<producto>(this.URL+"/vistaProducto?id="+ id)
  }

  //funcion para el ingreso de publicaciones
  public ingresoPublicacion(publicacion:publicacion):Observable<publicacion> {
    return this.http.post<publicacion>(this.URL+"/ingresoPublicacion",{publicacion})
  }
  //funcion para la vista global de publucaicones
  public obtenerPublicacionesId(id: number|undefined):Observable<publicacion> {
    return this.http.get<publicacion>(this.URL+"/vistaPublicacion?id="+ id)
  }

  //funcion para la obtencion global de publicaciones

  public obtenerTodasPublicaciones():Observable<publicacion> {
    return this.http.get<publicacion>(this.URL+"/obtenerTodaPublicacion")
  }



}
