import { Component , OnInit, inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { publicacion } from '../../models/publicacion';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { producto } from '../../models/producto';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  asignacionProductos } from '../../models/asignacionProductos';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-creacion-venta',
  standalone: true,
  imports: [FormsModule,MatButtonModule, MatIconModule,NgbDatepickerModule,JsonPipe, MatInputModule
  ,MatFormFieldModule, MatSelectModule],
  templateUrl: './creacion-venta.component.html',
  styleUrl: './creacion-venta.component.css'
})
export class CreacionVentaComponent implements OnInit {

  //lista para los productos
  productosCliente:any;
  selectedValue: any;

  //lista para guardar los demas productos
  listaProductos: asignacionProductos[] = []
  cantidadProducto:any
  precioProducto:any

  //info general de los valores
  nombre:string = ''
  // generacion para info de usuario
  nombreUsuario: string|undefined =''
  idUsuario:number|undefined = 0

  nombreProducto:number= 0
  descripcion:string = ''
  // para la obtencion de publicacion creada
  idPublicacionCreada:number =0;


  constructor(private referencia: MatDialogRef<CreacionVentaComponent>,
              private sesion:SesionServicioService,
              private publicacionServicio: VentasServicioService){}



  //funcion para agragar multiples productos
  agregarProducto(){


    const productosNuevos: asignacionProductos = new asignacionProductos()
    productosNuevos.cantidadProducto = this.cantidadProducto;
    productosNuevos.identificador_producto = this.selectedValue.id
    productosNuevos.nombre = this.selectedValue.nombre
    productosNuevos.precioProducto = this.selectedValue.precio*this.cantidadProducto;

    this.listaProductos.push(productosNuevos)

  }
  //funcion para obtener el valor de ingreso
  ingreso() {
    const publicacionNueva: publicacion = new publicacion();
    publicacionNueva.titulo = this.nombre;
    publicacionNueva.descripcion = this.descripcion;
    publicacionNueva.identificador_usuario = this.idUsuario;
    publicacionNueva.identificador_producto = this.selectedValue.id;

    this.publicacionServicio.ingresoPublicacion(publicacionNueva).pipe(
      switchMap((info: any) => {
        console.log(info);
        this.idPublicacionCreada = info.insertedId;
        // Después de ingresar la publicación, procesamos la lista de productos
        return this.procesarListaProductos();
      })
    ).subscribe();
  }

  procesarListaProductos() {
    return this.listaProductos.map((elemento: any) => {
      elemento.identificador_publicacion = this.idPublicacionCreada;
      return this.publicacionServicio.ingresoArticuloPublicacion(elemento).subscribe();
    });
  }

  //modal para el cierre
  cerrar(){
    this.referencia.close();
  }


  ngOnInit(): void {
    //obtiene los productos por usuario
    this.publicacionServicio.obtenerProductosId(this.sesion.getUsuario()?.id).subscribe(
      (producto:producto) => {
        this.productosCliente = producto;
      }
    )
      this.nombreUsuario =this.sesion.getUsuario()?.user
      this.idUsuario =this.sesion.getUsuario()?.id
  }
}
