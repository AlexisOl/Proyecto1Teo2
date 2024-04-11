import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from "../header/header.component";
import { usuario } from '../../models/usuario';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private usuarioServicio:UsuarioServicioService){}

  registroUsuarios(){
    console.log(this.repetir, this.password);
    
    if(this.repetir === this.password) {
      const crearUsuarios:usuario = new usuario();

      crearUsuarios.cantidad_monedas = 500
      crearUsuarios.contacto = this.contacto
      crearUsuarios.user = this.nombre
      crearUsuarios.idRol = 2
      crearUsuarios.password = this.password
      this.usuarioServicio.registroUsuario(crearUsuarios).subscribe(

      );
    } else {
      this.malaContrasenia = true
    }
   
  }

  ngOnInit(): void {
    
  }



}
