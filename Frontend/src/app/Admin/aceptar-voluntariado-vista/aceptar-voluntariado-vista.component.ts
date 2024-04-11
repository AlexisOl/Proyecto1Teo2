import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { publicacion } from '../../models/publicacion';
import { AdminServicioService } from '../../services/admin-servicio.service';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { voluntariado } from '../../models/voluntariado';
import { VistaVoluntariadousuarioCompraComponent } from '../../Usuario/vista-voluntariadousuario-compra/vista-voluntariadousuario-compra.component';

@Component({
  selector: 'app-aceptar-voluntariado-vista',
  standalone: true,
  imports: [HeaderAdminComponent],
  templateUrl: './aceptar-voluntariado-vista.component.html',
  styleUrl: './aceptar-voluntariado-vista.component.css'
})
export class AceptarVoluntariadoVistaComponent implements OnInit {

  //listado de publicaciones
  listaPublicaciones:any
  publicacionEspecifica:any

  constructor(private ventasServicio: VentasServicioService,
    public dialog: MatDialog,
    private adminServicio:AdminServicioService,
    private comprasServicio: ComprasServicioService,
    private voluntariadoServicio: VoluntariadoServicioService
    ){}


    //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: number){
    console.log(informacion+"id");

    this.voluntariadoServicio.voluntariadoEspecifico(informacion).subscribe(
      (info:publicacion)=> {
        console.log(info);
        this.publicacionEspecifica=info
        this.openModal();
      }
    )



  }

  openModal(){
    this.dialog.open(VistaVoluntariadousuarioCompraComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.publicacionEspecifica}
    });
  }



  //funcion para aceptar o rechazar las publicaciones
  aceptar(id:number){
    this.adminServicio.aceptarVoluntariado(id).subscribe();
  }

  rechazar(id:number){
    this.adminServicio.rechazarVoluntariado(id).subscribe();

  }


  ngOnInit(): void {
    this.adminServicio.vistaVoluntariadoAdmin().subscribe(
      (publicaciones: voluntariado) => {
        this.listaPublicaciones=publicaciones;
      }
    )
  }

}
