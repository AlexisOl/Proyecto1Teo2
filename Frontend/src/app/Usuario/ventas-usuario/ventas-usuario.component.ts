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
import { usuario } from '../../models/usuario';
import { ProductoEspecificoComponent } from '../producto-especifico/producto-especifico.component';
import { Chart } from 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-ventas-usuario',
  standalone: true,
  imports: [BaseChartDirective, MatExpansionModule,HeaderUsuarioComponent, MatIconModule, MatCardModule, FormsModule, MatButtonModule],
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
  facturasDetalle:any[]=[]
  $indice: any;
  nombreUsuario!:string|undefined;
  tipoEstadoProducto:number = 1
  // grafica
  chart:any

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
      height:"650px",
      data: { datos: this.tipoEstadoProducto },

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
  //* este modal es para ver los productos de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecificaProducto(informacion: producto){
    this.dialog.open(ProductoEspecificoComponent, {
      width:'80%',
      height:"350px",
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
      console.log(valores);

      //ahora si retorna todo
//contador+=1
      return this.categoriasServicio.obtenerInformacionVentasRealizadas(this.servicioUsuario.getUsuario()?.id,valores.id).subscribe(
        (valores:any) =>{
          console.log(valores);
          this.facturasDetalle.push(valores)

         // contador+=2
         // this.generarGrafica(valores, contador)
          console.log(valores,"///");

        }
      )
    })

  }


  generarGraficas() {
    this.facturasDetalle.forEach((detalle: any, index: number) => {
      this.generarGrafica(detalle, index);
    });
  }

  generarGrafica(datos: any, index: number) {
    if (this.chart) {
      this.chart.destroy(); // Destruir la instancia anterior del gráfico
    }

    this.chart = new Chart('canvas' + index, {
      type: 'pie',
      data: {
        labels: datos.map((row: { nombre_producto: any; }) => row.nombre_producto),
        datasets: [{
          label: 'Precio Parcial',
          data: datos.map((row: { precioParcial: any; }) => row.precioParcial)
        }]
      }
    });
  }


  obtenerTotal(valor:number){
    let element =0
    for (let index = 0; index < this.facturasDetalle[valor].length; index++) {
       element += Number(this.facturasDetalle[valor][index].precioParcial);
    }
    return element;
  }


///-------------------------
///-------------------------
  ngOnInit(): void {
    this.nombreUsuario = this.servicioUsuario.getUsuario()?.user;

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
    this.categoriasServicio.obtenerProductosId(this.servicioUsuario.getUsuario()?.id, this.tipoEstadoProducto).subscribe(
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
