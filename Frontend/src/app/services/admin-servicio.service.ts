import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { publicacion } from '../models/publicacion';
import { voluntariado } from '../models/voluntariado';
import { categorias } from '../models/categorias';

@Injectable({
  providedIn: 'root',
})
export class AdminServicioService {
  readonly URL = 'http://localhost:5500';
  constructor(private http: HttpClient) {}

  //funcion para ver todas las publicaciones (determinar si son en espera o ya en venta)

  public obtenerPublicaciones(): Observable<publicacion> {
    return this.http.get<publicacion>(
      this.URL + '/obtenerTodaPublicacionAdmin'
    );
  }

  //funcion para aceptar ventas
  public aceptarVenta(id: number): Observable<publicacion> {
    return this.http.get<publicacion>(this.URL + '/aceptarVenta?id=' + id);
  }

  //funcion para rechazar ventas
  public rechazarVenta(id: number): Observable<publicacion> {
    return this.http.get<publicacion>(this.URL + '/rechazarVenta?id=' + id);
  }

  //funcion para ver todos voluntariados (determinar si son en espera o ya en venta)

  public vistaVoluntariadoAdmin(): Observable<voluntariado> {
    return this.http.get<voluntariado>(this.URL + '/vistaVoluntariadoAdmin');
  }

  //funcion para aceptar voluntariado
  public aceptarVoluntariado(id: number): Observable<voluntariado> {
    return this.http.get<voluntariado>(
      this.URL + '/aceptarVoluntariado?id=' + id
    );
  }

  //funcion para rechazar voluntariado
  public rechazarVoluntariado(id: number): Observable<voluntariado> {
    return this.http.get<voluntariado>(
      this.URL + '/rechazarVoluntariado?id=' + id
    );
  }

  //* funcion de dar baja
  public dardeBajaVenta(id: number): Observable<publicacion> {
    return this.http.post<publicacion>(this.URL + '/dardeBajaVenta', { id });
  }
  //* funcion de dar baja voluntariado
  public dardeBajaVoluntariado(id: number): Observable<voluntariado> {
    return this.http.post<voluntariado>(this.URL + '/dardeBajaVoluntariado', {
      id,
    });
  }

  //* funcion ontiene las ventas reportadas
  public ventasReportadas(): Observable<publicacion> {
    return this.http.get<publicacion>(this.URL + '/ventasReportadas');
  }

  //* funcion ontiene las voluntariados reportadas
  public voluntariadosReportados(): Observable<voluntariado> {
    return this.http.get<voluntariado>(this.URL + '/voluntariadosReportados');
  }

  //funcion para ver los elementos cancelados

  //* funcion ontiene las ventas reportadas
  public ventasCancelados(): Observable<publicacion> {
    return this.http.get<publicacion>(this.URL + '/ventasCanceladas');
  }
  //* funcion ontiene las voluntariados reportadas
  public voluntariadosCancelados(): Observable<voluntariado> {
    return this.http.get<voluntariado>(this.URL + '/voluntariadosCancelados');
  }

  //funcion para generar nuevas categorias
  public generarNuevasCategorias(
    categorias: categorias
  ): Observable<categorias> {
    return this.http.post<categorias>(this.URL + '/generarNuevasCategorias', {
      categorias,
    });
  }
}
