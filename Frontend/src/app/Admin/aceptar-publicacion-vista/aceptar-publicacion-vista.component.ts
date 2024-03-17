import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { publicacion } from '../../models/publicacion';
import { AdminServicioService } from '../../services/admin-servicio.service';

@Component({
  selector: 'app-aceptar-publicacion-vista',
  standalone: true,
  imports: [HeaderAdminComponent],
  templateUrl: './aceptar-publicacion-vista.component.html',
  styleUrl: './aceptar-publicacion-vista.component.css'
})
export class AceptarPublicacionVistaComponent implements OnInit{

  //listado de publicaciones
  listaPublicaciones:any

  constructor(private adminServicio:AdminServicioService){}


  //funcion para aceptar o rechazar las publicaciones
  aceptar(id:number){
    this.adminServicio.aceptarVenta(id).subscribe();
  }

  rechazar(id:number){
    this.adminServicio.rechazarVenta(id).subscribe();

  }


  ngOnInit(): void {
    this.adminServicio.obtenerPublicaciones().subscribe(
      (publicaciones: publicacion) => {
        this.listaPublicaciones=publicaciones;
      }
    )
  }

}
