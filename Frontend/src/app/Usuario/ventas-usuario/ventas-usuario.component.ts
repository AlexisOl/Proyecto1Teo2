import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreacionVentaComponent } from '../creacion-venta/creacion-venta.component';
import { CreacionProductosComponent } from '../creacion-productos/creacion-productos.component';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { producto } from '../../models/producto';
import { publicacion } from '../../models/publicacion';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-ventas-usuario',
  standalone: true,
  imports: [MatExpansionModule,HeaderUsuarioComponent, MatIconModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './ventas-usuario.component.html',
  styleUrl: './ventas-usuario.component.css'
})
export class VentasUsuarioComponent implements OnInit{
  // valors de vista de productos y ventas
  productosIngresados:producto[]=[];
  publicacionesIngresadas:any;
  productosValores:any;
  panelAbierto:boolean = false
  todasLasFacturas:any;
  facturasDetalle:any=[]

  constructor(public dialog: MatDialog,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService
    ){}


  //CREACION--------------------------------
  //modal para las ventas
  openDialog() {
    this.dialog.open(CreacionVentaComponent, {
      width:'80%',
      height:"650px"
    });
  }

  // modal para la creacion de productos

  creacionProductosModal(){
    this.dialog.open(CreacionProductosComponent, {
      width:'80%',
      height:"650px"
    });
  }


  //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: publicacion){
    this.dialog.open(VistaEspecificaPublicacionComponent, {
      width:'80%',
      height:"650px",
      data: {datos: informacion}
    });
  }



//*obtener todas las ventas realizadas

  ventasRealizadas(){
    this.categoriasServicio.obtenerTodasLasPublicacionesporId(this.servicioUsuario.getUsuario()?.id).pipe(
      switchMap((publicaciones:any) =>{
        this.todasLasFacturas = publicaciones;
        console.log(publicaciones,"a");

        return this.ventasDetallesIndividuales();
      })
    ).subscribe();
  }

  ventasDetallesIndividuales(){
    return this.todasLasFacturas.map((valores:any)=>{
      console.log(valores.id);

      //ahora si retorna todo
      return this.categoriasServicio.obtenerInformacionVentasRealizadas(this.servicioUsuario.getUsuario()?.id,valores.id).subscribe(
        (valores:any) =>{
          console.log(valores);
          this.facturasDetalle.push(valores)

        }
      )

    })
  }



///-------------------------
///-------------------------
  ngOnInit(): void {


    // para las publicaciones
    this.categoriasServicio.obtenerPublicacionesId(this.servicioUsuario.getUsuario()?.id).subscribe(
      (nuevasPublicaciones:publicacion) => {
        console.log("a", typeof(nuevasPublicaciones), nuevasPublicaciones);
        if (nuevasPublicaciones){
          this.publicacionesIngresadas=(nuevasPublicaciones)
        } else {
          this.publicacionesIngresadas = []
        }

      }
    )
    // para los productos
    this.categoriasServicio.obtenerProductosId(this.servicioUsuario.getUsuario()?.id).subscribe(
      (nuevosProd: producto | producto[]) => {
        if (Array.isArray(nuevosProd)) {
          this.productosIngresados = nuevosProd;
          this.productosValores = nuevosProd;
        } else {
          this.productosIngresados = [nuevosProd]; // Convierte el objeto único a un array
          this.productosValores = [nuevosProd];
        }

        console.log(nuevosProd, typeof nuevosProd);
      }
    );
    this.ventasRealizadas();

  }
}
