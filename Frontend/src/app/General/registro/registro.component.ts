import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from "../header/header.component";
import { usuario } from '../../models/usuario';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { Router } from '@angular/router';
import { LoginServicioService } from '../../services/login-servicio.service';

@Component({
    selector: 'app-registro',
    standalone: true,
    templateUrl: './registro.component.html',
    styleUrl: './registro.component.css',
    imports: [MatSidenavModule, FormsModule, HeaderComponent, NgbAlert]
})
export class RegistroComponent implements OnInit{
  nombre!:string
  password!:string
  repetir!:string
  contacto!:string
  malaContrasenia:boolean = false
  usuarioExistente:boolean = false
  constructor(private usuarioServicio:UsuarioServicioService,
    private sesion:SesionServicioService,
    private rutas: Router,
    private servicioLogin:LoginServicioService
  ){}

  registroUsuarios(){
    console.log(this.repetir, this.password);
    
    if(this.repetir === this.password) {
      const crearUsuarios:usuario = new usuario();

      crearUsuarios.cantidad_monedas = 500
      crearUsuarios.contacto = this.contacto
      crearUsuarios.user = this.nombre
      crearUsuarios.idRol = 1
      crearUsuarios.password = this.password
      this.usuarioServicio.registroUsuario(crearUsuarios).subscribe(
        (respones:any) => {
          if (!respones.success){
            this.contacto =''
            this.nombre =''
            this.password =''
            this.repetir =''
            this.usuarioExistente=true
          } else {
            this.servicioLogin.getUsuario(this.nombre, this.password).subscribe(
              (usuario:usuario) => {
                if (usuario && usuario.user && usuario.password) {
                  if (usuario.user ===this.nombre && usuario.password === this.password) {
                    this.sesion.setUsuario(usuario);
                    this.redireccion(usuario)
                  } else {
                    console.log('no coinciden los valores de ingreso');
                  }
                } else {
                  console.log('no ingreso nada');
                }
              }
            );
          }
        }
      );
    } else {
      this.malaContrasenia = true
    }
   
  }
  // funcion para ingreso de usuarios al sisttema
  public redireccion(usuarioIngresado:usuario){
    switch(usuarioIngresado.idRol){
      case 1 :
          this.rutas.navigate(['/generalUsuario'])
          break;

    }
  }
  ngOnInit(): void {
    
  }



}
