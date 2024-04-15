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
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { voluntariado } from '../../models/voluntariado';
import { publicacion } from '../../models/publicacion';
import { ProductoEspecificoComponent } from '../producto-especifico/producto-especifico.component';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { VistaVoluntariadosComponent } from '../vista-voluntariados/vista-voluntariados.component';

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
  productosTruque:any
  productosValores:any;
  publicacionesIngresadas:any
  truequesIngresados:any
  panelAbierto:boolean = false

  constructor(
    public dialog: MatDialog,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService,
    private voluntariadoServicio:VoluntariadoServicioService
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

    //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: voluntariado){
    this.dialog.open(VistaVoluntariadosComponent, {
      width:'80%',
      height:"650px",
      data: {datos: informacion}
    });
  }
  //* este modal es para ver los productos de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecificaProducto(informacion: producto){
    this.dialog.open(ProductoEspecificoComponent, {
      width:'80%',
      height:"350px",
      data: {datos: informacion}
    });
  }


  ngOnInit(): void {
    this.nombreUsuario = this.servicioUsuario.getUsuario()?.user;


    // para las voluntariados
        // para las publicaciones
        this.voluntariadoServicio.vistaVoluntariadoEstado(this.servicioUsuario.getUsuario()?.id, 1).subscribe(
          (nuevasPublicaciones:voluntariado) => {
            if (nuevasPublicaciones){
              this.publicacionesIngresadas=(nuevasPublicaciones)
            } else {
              this.publicacionesIngresadas = []
            }

          }
        )
              // para las trueques
              this.voluntariadoServicio.vistaVoluntariadoEstado(this.servicioUsuario.getUsuario()?.id, 2).subscribe(
                (nuevasPublicaciones:voluntariado) => {
                  if (nuevasPublicaciones){
                    this.truequesIngresados=(nuevasPublicaciones)
                  } else {
                    this.truequesIngresados = []
                  }
      
                }
              )


      //para productos de truque 
          // para los productos
    this.categoriasServicio
    .obtenerProductosId(this.servicioUsuario.getUsuario()?.id, 3)
    .subscribe((nuevosProd: producto | producto[]) => {
      if (Array.isArray(nuevosProd)) {
        this.productosTruque = nuevosProd;
      } else {
        this.productosTruque = [nuevosProd]; // Convierte el objeto único a un array
      }

      console.log(nuevosProd, typeof nuevosProd);
    });
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
