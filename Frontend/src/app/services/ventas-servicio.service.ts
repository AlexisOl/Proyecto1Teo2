import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categorias } from '../models/categorias';
import { producto } from '../models/producto';
import { publicacion } from '../models/publicacion';
import { asignacionProductos } from '../models/asignacionProductos';
import { comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class VentasServicioService {
  readonly URL ="http://localhost:5500"

  constructor(private http: HttpClient) { }

  // funcion para obtener las cateogias

// * para los productos
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
//* para las publicaciones

  //funcion para el ingreso de publicaciones
  public ingresoPublicacion(publicacion:publicacion):Observable<publicacion> {
    return this.http.post<publicacion>(this.URL+"/ingresoPublicacion",{publicacion})
  }

  //funcion  para los articulos por publicacion
  public ingresoArticuloPublicacion(asignacionProductos: asignacionProductos):Observable<asignacionProductos>{
    return this.http.post<asignacionProductos>(this.URL+"/asignacionProductos", {asignacionProductos})
  }
  //funcion para la vista global de publucaicones
  public obtenerPublicacionesId(id: number|undefined):Observable<publicacion> {
    return this.http.get<publicacion>(this.URL+"/vistaPublicacion?id="+ id)
  }
  //funcion para obtener que tipos de productos se tiene por publicacion POR ID
  public obtenerTodaInfoporPublicacionId(id: number|undefined):Observable<asignacionProductos>{
    return this.http.get<asignacionProductos>(this.URL+"/obtenerProductosPorPublicacion?id="+id)
  }
  //funcion para obtener todos los productos en base al id
  public obtenerProductoId_Producto(id: number|undefined):Observable<producto>{
    return this.http.get<producto>(this.URL+"/obtenerProductoId_Producto?id="+id)
  }



  //funcion para la obtencion global de publicaciones

  public obtenerTodasPublicaciones():Observable<publicacion> {
    return this.http.get<publicacion>(this.URL+"/obtenerTodaPublicacion")
  }
  //funcion para obtener que tipos de productos se tiene por publicacion
  public obtenerTodaInfoporPublicacion():Observable<asignacionProductos>{
    return this.http.get<asignacionProductos>(this.URL+"/obtenerInfoPorPublicacion")
  }






  //* SECCION DE COMENTARIOS
  public verComentarioEnPublicacion(id_publicacion:number):Observable<comentario>{

    return this.http.get<comentario>(this.URL+"/obtenerUsuariosComentarios?idPublicacion="+id_publicacion)
  }

  //**SECCION DE VENTAS ESPECIFICOS */

  public obtenerVentasRealizadas(idUsuario:number):Observable<publicacion> {
    return this.http.get<publicacion>(this.URL+"/obtenerVentasRealizadas");
  }

  //funcion para obtener todas las publciaciones aceptadas
  public obtenerInformacionVentasRealizadas(id:number|undefined, id_publicacion:number):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/obtenerInformacionVentasRealizadas?id="+id+"&id_publicacion="+id_publicacion)
  }

  //funcion para obtener todas las publciaciones por id
  public obtenerTodasLasPublicacionesporId(id:number|undefined):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/obtenerTodasLasPublicacionesporId?id="+id)
  }

}
