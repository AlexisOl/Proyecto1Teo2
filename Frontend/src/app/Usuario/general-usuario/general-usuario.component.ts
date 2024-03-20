import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { HttpClient } from '@angular/common/http';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-general-usuario',
  standalone: true,
  imports: [HeaderUsuarioComponent, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './general-usuario.component.html',
  styleUrl: './general-usuario.component.css'
})
export class GeneralUsuarioComponent implements OnInit{

  //informacion para presentar en la tabla
  nombreUsuario:string|undefined = ''
  areaUsuario:string = ''
  panelAbierto:boolean = false

  constructor(private sesionServicio: SesionServicioService){}


  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
    switch(this.sesionServicio.getUsuario()?.idRol) {
      case 1:
        this.areaUsuario = "Administrador"
        break;
      case 2:
        this.areaUsuario = "Usuario"
        break;
      default:
        this.areaUsuario = 'error'
        break;
    }
      console.log(
       this.sesionServicio.getUsuario()?.password);

  }
}
