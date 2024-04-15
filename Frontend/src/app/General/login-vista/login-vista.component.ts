import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginServicioService } from '../../services/login-servicio.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { usuario } from '../../models/usuario';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-vista',
  standalone: true,
  imports: [HeaderComponent, MatSidenavModule, FormsModule, NgbAlert, CommonModule, MatInputModule],
  templateUrl: './login-vista.component.html',
  styleUrl: './login-vista.component.css'
})
export class LoginVistaComponent implements OnInit{
  password:any
  nombre:any
  elemntos:any
  // valor de eleccion
  eleccion:number =0
  noCoincide:boolean = false

  constructor(private servicioLogin:LoginServicioService,
              private rutas: Router,
              private sesion:SesionServicioService){}


  //funcion para registrarse
  registrate(){
    this.rutas.navigate(['/registro'])
  }

  //funcion con la cual intentamos logearnos
  intentarIngresar(){
    this.servicioLogin.getUsuario(this.nombre, this.password).subscribe(
      (usuario:usuario) => {
        if (usuario && usuario.user && usuario.password) {
          if (usuario.user ===this.nombre && usuario.password === this.password) {
            console.log('ingreso bueno');
            this.sesion.setUsuario(usuario);
            // redireccion a las paginas
            console.log(usuario);

            this.redireccion(usuario)
          } else {
            this.noCoincide=true
          }
        } else {
          console.log('no ingreso nada');
          this.noCoincide=true

        }
      }
    );
  }




  //funcion de determinacion de usuario registrado


  // funcion para ingreso de usuarios al sisttema
  public redireccion(usuarioIngresado:usuario){
    switch(usuarioIngresado.idRol){
      case 1 :
          this.rutas.navigate(['/generalUsuario'])
          break;
      case 2:
        this.rutas.navigate(['/generalAdmin'])
        break;
    }
  }
  // obtencion
  ngOnInit(): void {
    this.servicioLogin.prueba().subscribe(
      elementos => {
        this.elemntos = elementos
      }
    )
  }

}
