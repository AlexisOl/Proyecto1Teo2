import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { AdminServicioService } from '../../services/admin-servicio.service';
import { publicacion } from '../../models/publicacion';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { voluntariado } from '../../models/voluntariado';
import { VistaVoluntariadousuarioCompraComponent } from '../../Usuario/vista-voluntariadousuario-compra/vista-voluntariadousuario-compra.component';

@Component({
  selector: 'app-publicaciones-elimindas',
  standalone: true,
  templateUrl: './publicaciones-elimindas.component.html',
  styleUrl: './publicaciones-elimindas.component.css',
  imports: [HeaderAdminComponent],
})
export class PublicacionesElimindasComponent implements OnInit {
  listaPublicaciones: any;
  listaVoluntariados: any;
  publicacionEspecifica: any;
  voluntariadosEspecifica: any;

  constructor(
    private adminServicio: AdminServicioService,
    private ventasServicio: VentasServicioService,
    private comprasServicio: ComprasServicioService,
    private voluntariadoServicio: VoluntariadoServicioService,
    public dialog: MatDialog
  ) {}

  //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: number) {
    console.log(informacion + 'id');

    this.comprasServicio
      .verPublicacionEspecificaCompras(informacion)
      .subscribe((info: publicacion) => {
        console.log(info);
        this.publicacionEspecifica = info;
        this.openModal();
      });
  }

  openModal() {
    this.dialog.open(VistaEspecificaProductoComprasComponent, {
      width: '80%',
      height: '650px',
      data: { datos: this.publicacionEspecifica },
    });
  }

  //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecificaVoluntariado(informacion: number) {
    console.log(informacion + 'id');

    this.voluntariadoServicio
      .voluntariadoEspecifico(informacion)
      .subscribe((info: publicacion) => {
        console.log(info);
        this.voluntariadosEspecifica = info;
        this.openModalVoluntariado();
      });
  }

  openModalVoluntariado() {
    this.dialog.open(VistaVoluntariadousuarioCompraComponent, {
      width: '80%',
      height: '650px',
      data: { datos: this.voluntariadosEspecifica },
    });
  }

  //funcion para aceptar o rechazar las publicaciones
  aceptar(id: number) {
    this.adminServicio.aceptarVenta(id).subscribe();
  }

  aceptarVoluntariado(id: number) {
    this.adminServicio.aceptarVoluntariado(id).subscribe();
  }

  rechazarVenta(id: number) {
    this.adminServicio.dardeBajaVenta(id).subscribe();
  }

  rechazarVoluntariado(id: number) {
    this.adminServicio.dardeBajaVoluntariado(id).subscribe();
  }

  ngOnInit(): void {
    this.adminServicio.ventasReportadas().subscribe((ventas: publicacion) => {
      this.listaPublicaciones = ventas;
    });

    this.adminServicio
      .voluntariadosReportados()
      .subscribe((voluntariados: voluntariado) => {
        this.listaVoluntariados = voluntariados;
      });
  }
}
