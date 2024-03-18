import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { comentario } from '../models/comentario';
import { publicacion } from '../models/publicacion';

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
}
