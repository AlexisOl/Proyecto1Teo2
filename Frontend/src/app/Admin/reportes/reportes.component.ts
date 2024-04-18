import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { AdminServicioService } from '../../services/admin-servicio.service';
import { factura } from '../../models/factura';
import { usuario } from '../../models/usuario';
import { publicacion } from '../../models/publicacion';

@Component({
  selector: 'app-reportes',
  standalone: true,
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
  imports: [HeaderAdminComponent],
})
export class ReportesComponent implements OnInit {
  listaPublicaciones: any;
  masPublicaciones: any;
  usuariosVetados: any;
  usuariosMasIngreso: any;
  constructor(private adminServicio: AdminServicioService) {}

  usuariosVetadosMetodo() {
    this.adminServicio.usuariosVetados().subscribe((elementos: usuario) => {
      this.usuariosVetados = elementos;
    });
  }

  usuariosMasIngresoMetodo() {
    this.adminServicio.usuariosMasIngreso().subscribe((elementos: usuario) => {
      this.usuariosMasIngreso = elementos;
    });
  }

  masPublicacionesMetodo() {
    this.adminServicio
      .masPublicaciones()
      .subscribe((elementos: publicacion) => {
        console.log(elementos);

        this.masPublicaciones = elementos;
      });
  }
  obtenerMasGastado() {
    this.adminServicio.masGastado().subscribe((elementos: factura) => {
      this.listaPublicaciones = elementos;
    });
  }
  ngOnInit(): void {
    this.obtenerMasGastado();
    this.usuariosVetadosMetodo();
    this.masPublicacionesMetodo();
    this.usuariosMasIngresoMetodo();
  }
}
