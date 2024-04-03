import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { CreacionVentaComponent } from '../creacion-venta/creacion-venta.component';
import { CreacionProductosComponent } from '../creacion-productos/creacion-productos.component';
import { producto } from '../../models/producto';
import { CreacionVoluntariadoComponent } from '../creacion-voluntariado/creacion-voluntariado.component';

@Component({
  selector: 'app-seccion-voluntariado',
  standalone: true,
  imports: [
    MatExpansionModule,
    HeaderUsuarioComponent,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './seccion-voluntariado.component.html',
  styleUrl: './seccion-voluntariado.component.css',
})
export class SeccionVoluntariadoComponent implements OnInit {
  nombreUsuario: string | undefined;
  tipoEstadoProducto: number = 2;
  productosIngresados:producto[]=[];
  productosValores:any;

  constructor(
    public dialog: MatDialog,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService
  ) {}

  //CREACION--------------------------------
  //modal para los voluntariados
  openDialog() {
    this.dialog.open(CreacionVoluntariadoComponent, {
      width: '80%',
      height: '650px',
    });
  }

  //modal para productos
  openDialogProductos() {
    this.dialog.open(CreacionProductosComponent, {
      width: '80%',
      height: '650px',
      data: { datos: this.tipoEstadoProducto },
    });
  }
  ngOnInit(): void {
    this.nombreUsuario = this.servicioUsuario.getUsuario()?.user;

    // para los productos
    this.categoriasServicio
      .obtenerProductosId(this.servicioUsuario.getUsuario()?.id, this.tipoEstadoProducto)
      .subscribe((nuevosProd: producto | producto[]) => {
        if (Array.isArray(nuevosProd)) {
          this.productosIngresados = nuevosProd;
          this.productosValores = nuevosProd;
        } else {
          this.productosIngresados = [nuevosProd]; // Convierte el objeto único a un array
          this.productosValores = [nuevosProd];
        }

        console.log(nuevosProd, typeof nuevosProd);
      });
  }
}
