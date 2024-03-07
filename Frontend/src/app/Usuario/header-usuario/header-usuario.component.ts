import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SesionServicioService } from '../../services/sesion-servicio.service';

@Component({
  selector: 'app-header-usuario',
  standalone: true,
  imports: [MatButtonModule, MatSliderModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header-usuario.component.html',
  styleUrl: './header-usuario.component.css'
})
export class HeaderUsuarioComponent implements OnInit {

  nombreUsuario:string|undefined = ''
  constructor(private sesionServicio: SesionServicioService){}


  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
  }


}
