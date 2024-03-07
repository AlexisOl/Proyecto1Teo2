import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { HttpClient } from '@angular/common/http';
import { SesionServicioService } from '../../services/sesion-servicio.service';
@Component({
  selector: 'app-general-usuario',
  standalone: true,
  imports: [HeaderUsuarioComponent],
  templateUrl: './general-usuario.component.html',
  styleUrl: './general-usuario.component.css'
})
export class GeneralUsuarioComponent implements OnInit{


  nombreUsuario:string|undefined = ''
  constructor(private sesionServicio: SesionServicioService){}


  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
      console.log(
       this.sesionServicio.getUsuario()?.password);
  }
}
