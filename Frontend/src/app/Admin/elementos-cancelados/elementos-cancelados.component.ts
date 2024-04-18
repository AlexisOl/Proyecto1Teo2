import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { publicacion } from '../../models/publicacion';
import { voluntariado } from '../../models/voluntariado';
import { AdminServicioService } from '../../services/admin-servicio.service';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { VistaVoluntariadousuarioCompraComponent } from '../../Usuario/vista-voluntariadousuario-compra/vista-voluntariadousuario-compra.component';

@Component({
  selector: 'app-elementos-cancelados',
  standalone: true,
  templateUrl: './elementos-cancelados.component.html',
  styleUrl: './elementos-cancelados.component.css',
  imports: [HeaderAdminComponent],
})
export class ElementosCanceladosComponent implements OnInit {
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

  ngOnInit(): void {
    this.adminServicio.ventasCancelados().subscribe((ventas: publicacion) => {
      this.listaPublicaciones = ventas;
    });

    this.adminServicio
      .voluntariadosCancelados()
      .subscribe((voluntariados: voluntariado) => {
        this.listaVoluntariados = voluntariados;
      });
  }
}
