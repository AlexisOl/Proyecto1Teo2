import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginServicioService } from '../../services/login-servicio.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-vista',
  standalone: true,
  imports: [HeaderComponent, MatSidenavModule, FormsModule],
  templateUrl: './login-vista.component.html',
  styleUrl: './login-vista.component.css'
})
export class LoginVistaComponent implements OnInit{
  password:any
  nombre:any
  elemntos:any
  constructor(private servicioLogin:LoginServicioService){}


  // obtencion



  ngOnInit(): void {
    this.servicioLogin.prueba().subscribe(
      elementos => {
        this.elemntos = elementos
      }
    )
  }

}
