import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [MatButtonModule, MatSliderModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent  implements OnInit {


  nombreUsuario:string|undefined = ''
  constructor(private sesionServicio: SesionServicioService,
              private rutas:Router){}

  //funciones para navegacion

  iraInicio(){
    this.rutas.navigate(['./generalAdmin'])
  }
  iraPublicaciones(){
    this.rutas.navigate(['./generalAdmin/publicacion'])
  }

  iraVoluntariado(){
    this.rutas.navigate(['./generalAdmin/voluntariado'])
  }

  iraUsuarios(){
    this.rutas.navigate(['./generalAdmin/usuarios'])
  }
  //funcion para cerrar la sesion

  cerrarSesion(){
    this.sesionServicio.eliminarUsuario()
    this.rutas.navigate(['./inicio'])
  }
  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
  }
}
