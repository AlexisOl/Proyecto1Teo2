import { Component, OnInit } from '@angular/core';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-general-admin',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatButtonModule, HeaderAdminComponent],
  templateUrl: './general-admin.component.html',
  styleUrl: './general-admin.component.css'
})
export class GeneralAdminComponent implements OnInit {

    //informacion para presentar en la tabla
    nombreUsuario:string|undefined = ''
    areaUsuario:string = ''

    constructor(private sesionServicio: SesionServicioService){}


    ngOnInit(): void {
      this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
      switch(Number(this.sesionServicio.getUsuario()?.idRol)) {

        case 1:
          this.areaUsuario = "Usuario"
          break;
        case 2:
          this.areaUsuario = "Administrador"
          break;
      }
        console.log(
         this.sesionServicio.getUsuario()?.idRol);

    }
}
