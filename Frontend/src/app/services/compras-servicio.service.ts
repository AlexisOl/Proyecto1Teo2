import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comentario } from '../models/comentario';
import { publicacion } from '../models/publicacion';
import { factura } from '../models/factura';
import { detalleFactura } from '../models/detalleFactura';
import { usuario } from '../models/usuario';
import { producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ComprasServicioService {

  readonly URL ="http://localhost:5500"
  constructor(private http: HttpClient) { }

  //funcion para enviar un comentario

  public envioComentario(comentario: comentario):Observable<comentario>{
    return this.http.post<comentario>(this.URL+"/ingresoComentario",{comentario})
  }

  //funcion para obtener publicacion especifica en cliente
  public verPublicacionEspecificaCompras(id: number):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/obtenerInfoPublicacionCompra?id="+id)
  }

  //funcion para obtener la conversacion CLIENTE
  public verConversacionCliente(idCliente:number|undefined, idPublicacion:number|undefined){
      return this.http.get<comentario>(this.URL+"/obtenerConversacionEspecifica?idCliente="+idCliente+"&idPublicacion="+idPublicacion)
  }

  //funcion para poder generar la factura
  public insertarFactura(factura:factura):Observable<factura> {
    return this.http.post<factura>(this.URL+'/ingresoFactura', {factura})
  }
  //funcion para poder generar el detalle de la compra
  public insertarDetalleFactura(detalleFactura:detalleFactura):Observable<detalleFactura>{
    return this.http.post<detalleFactura>(this.URL+"/ingresoDetalleFactura", {detalleFactura})
  }

  //funcion para obtener las facturas de los usuarios
  public obtenerFacturasId(id:number|undefined):Observable<factura> {
    return this.http.get<factura>(this.URL+"/obtenerFacturas?id="+id)
  }

  //funcion para obtener facturas totales
  public obtenerIdFacturasTotal(id:number|undefined):Observable<factura> {
    return this.http.get<factura>(this.URL+"/obtenerIdFacturasTotal?id="+id)
  }


  //funcion para obtener el detalle de cada factura
  public obtenerFacturasIdDetalle(id:number|undefined, idFactura:number):Observable<factura> {
    return this.http.get<factura>(this.URL+"/obtenerFacturasDetalle?id="+id+"&id_factura="+idFactura)
  }


  //funcion para obtener las publicaciones por nombre
  // de producto
  public obtenerPublicacionesNombre(nombre:string):Observable<publicacion>{
    return this.http.get<publicacion>(this.URL+"/obtenerPublicacionesNombre?nombre="+nombre);
  }

    //funcion para obtener imagenes por publicaciones
    public obtenerImagenesPorPublicaciones(id:number):Observable<producto>{
      return this.http.get<producto>(this.URL+"/obtenerImagenesPorPublicaciones?id="+id)
    }

  //!(generar que sean multiples)funcion para obtener publicaciones por categorias

  //* compras no logeados
  public obtenerInfoUsuarios(id:number|undefined):Observable<usuario>{
    return this.http.get<usuario>(this.URL+"/obtenerInfoUsuarios?id="+id);
  }

}
