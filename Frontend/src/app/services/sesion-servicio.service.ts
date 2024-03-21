import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class SesionServicioService {

  private usuario:usuario|null = null;

  private user = new BehaviorSubject<usuario | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));


  private cantidadMonedasSubject = new BehaviorSubject<number|undefined>(0);
  cantidadMonedas$ = this.cantidadMonedasSubject.asObservable();

  constructor(private http: HttpClient) {
//iniciar servicio
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      this.user.next(this.usuario);
      this.cantidadMonedasSubject.next(this.usuario?.cantidad_monedas);
    }

  }



  //ingresa al usuario -- en las variables globales
  setUsuario(nuevoUsuario: usuario) {
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.usuario = nuevoUsuario;
    this.user.next(nuevoUsuario);
  }
  // le elimina
  eliminarUsuario() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.user.next(null);
  }
  // solo obtenciones
  getUsuario(): usuario | null {
    return this.usuario;
  }

  isAuthenticated(): boolean {
    return !!this.getUsuario();
  }

  // para las monedas
  actualizarCantidadMonedas(cantidad: number): void {
    this.cantidadMonedasSubject.next(cantidad);
  }
}
