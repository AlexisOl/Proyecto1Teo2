import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { publicacion } from '../../models/publicacion';
@Component({
  selector: 'app-vista-compra-visita',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vista-compra-visita.component.html',
  styleUrl: './vista-compra-visita.component.css'
})
export class VistaCompraVisitaComponent implements OnInit {

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
