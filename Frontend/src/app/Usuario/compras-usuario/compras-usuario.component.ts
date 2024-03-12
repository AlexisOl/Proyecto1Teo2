import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { publicacion } from '../../models/publicacion';
import { VentasServicioService } from '../../services/ventas-servicio.service';

@Component({
  selector: 'app-compras-usuario',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HeaderUsuarioComponent],
  templateUrl: './compras-usuario.component.html',
  styleUrl: './compras-usuario.component.css'
})
export class ComprasUsuarioComponent implements OnInit{
  // elementos de uso
  todasPublicaciones:any;
  constructor(private ventasServicio: VentasServicioService){}

  ngOnInit(): void {
      this.ventasServicio.obtenerTodasPublicaciones().subscribe(
        (publicaciones: publicacion) => {
          this.todasPublicaciones = publicaciones
        }
      )
  }

}
