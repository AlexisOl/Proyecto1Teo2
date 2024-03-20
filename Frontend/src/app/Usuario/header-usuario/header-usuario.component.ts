import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [MatButtonModule, MatSliderModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements OnInit {

  nombreUsuario:string|undefined = ''
  cantidadMonedas:number|undefined=0
  constructor(private sesionServicio: SesionServicioService,
              private rutas:Router){}

  //funciones para navegacion

  iraInicio(){
    this.rutas.navigate(['./generalUsuario'])
  }
  iraCompras(){
    this.rutas.navigate(['./generalUsuario/compras'])
  }

  iraVentas(){
    this.rutas.navigate(['./generalUsuario/ventas'])
  }

  iraVoluntariado(){
  }
  //funcion para cerrar la sesion

  cerrarSesion(){
    this.sesionServicio.eliminarUsuario()
    this.rutas.navigate(['./inicio'])
  }
  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
    this.cantidadMonedas =this.sesionServicio.getUsuario()?.cantidad_monedas;
    console.log(this.cantidadMonedas, this.nombreUsuario);

  }


}
