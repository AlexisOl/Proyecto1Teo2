import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { publicacion } from '../../models/publicacion';
import { AdminServicioService } from '../../services/admin-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { ComprasServicioService } from '../../services/compras-servicio.service';

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
  publicacionEspecifica:any

  constructor(private ventasServicio: VentasServicioService,
    public dialog: MatDialog,
    private adminServicio:AdminServicioService,
    private comprasServicio: ComprasServicioService){}


    //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: number){
    console.log(informacion+"id");

    this.comprasServicio.verPublicacionEspecificaCompras(informacion).subscribe(
      (info:publicacion)=> {
        console.log(info);
        this.publicacionEspecifica=info
        this.openModal();
      }
    )



  }

  openModal(){
    this.dialog.open(VistaEspecificaProductoComprasComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.publicacionEspecifica}
    });
  }



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
