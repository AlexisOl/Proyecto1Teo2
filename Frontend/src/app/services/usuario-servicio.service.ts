import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { cupones } from '../models/cupones';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicioService {
  readonly URL = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  ingresoDinero(id: number | undefined, dinero: number): Observable<number> {
    return this.http.post<number>(this.URL + '/ingresoMonedas', { id, dinero });
  }
  extaerMonedas(id: number | undefined, dinero: number): Observable<number> {
    return this.http.post<number>(this.URL + '/extaerMonedas', { id, dinero });
  }
  registroUsuario(usuario: usuario): Observable<usuario> {
    return this.http.post<usuario>(this.URL + '/registroUsuario', { usuario });
  }

  //funcion para obtener los cupones por usuario
  obtenerCupones(id: number | undefined): Observable<cupones> {
    return this.http.get<cupones>(this.URL + '/obtenerCupones?id=' + id);
  }

  obtenerCuponesSoloParaUsar(id: number | undefined): Observable<cupones> {
    return this.http.get<cupones>(
      this.URL + '/obtenerCuponesSoloParaUsar?id=' + id
    );
  }
}
