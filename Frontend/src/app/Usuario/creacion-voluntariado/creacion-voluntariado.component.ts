import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaProductoComprasComponent } from '../vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { FormsModule } from '@angular/forms';
import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { asignacionProductos } from '../../models/asignacionProductos';
import { comentario } from '../../models/comentario';
import { detalleFactura } from '../../models/detalleFactura';
import { factura } from '../../models/factura';
import { usuario } from '../../models/usuario';
import { producto } from '../../models/producto';
import { publicacion } from '../../models/publicacion';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creacion-voluntariado',
  standalone: true,
  imports: [FormsModule,MatButtonModule, MatIconModule,NgbDatepickerModule,JsonPipe, MatInputModule
    ,MatFormFieldModule, MatSelectModule],
  templateUrl: './creacion-voluntariado.component.html',
  styleUrl: './creacion-voluntariado.component.css'
})
export class CreacionVoluntariadoComponent implements OnInit{
//lista para los productos
productosCliente:any;
selectedValue: any;

//lista para guardar los demas productos
listaProductos: asignacionProductos[] = []
valoresEliminados:any=[];
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


constructor(private referencia: MatDialogRef<CreacionVoluntariadoComponent>,
            private sesion:SesionServicioService,
            private publicacionServicio: VentasServicioService){}



//funcion para agragar multiples productos
agregarProducto(){

  const indiceSeleccionado = this.productosCliente.findIndex(
    (      producto: { id: any; }) => producto.id === this.selectedValue.id
  )

  this.valoresEliminados.push(this.selectedValue);
  this.productosCliente.splice(indiceSeleccionado, 1)
  console.log(this.selectedValue);

  const productosNuevos: asignacionProductos = new asignacionProductos()
  productosNuevos.cantidadProducto = this.cantidadProducto;
  productosNuevos.identificador_producto = this.selectedValue.id
  productosNuevos.nombre = this.selectedValue.nombre
  productosNuevos.precioProducto = this.selectedValue.precio*this.cantidadProducto;

  this.listaProductos.push(productosNuevos)

}

//funcion para elimnar el producto y reincoporarlo
eliminar(valor:any){
  const indiceSeleccionadoFinal =this.valoresEliminados.findIndex(
    (producto: any) => producto.id === valor.identificador_producto

  )

  this.productosCliente.push(this.valoresEliminados[indiceSeleccionadoFinal]);
  this.valoresEliminados.splice(indiceSeleccionadoFinal, 1)
  //eliminar de lista de productos
  const indiceSeleccionado = this.listaProductos.findIndex(
    (producto: any) => producto.identificador_producto === valor.identificador_producto
  )
  this.listaProductos.splice(indiceSeleccionado, 1)
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
      this.idPublicacionCreada = info.insertedId;
      console.log(info.insertedId);
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
  this.publicacionServicio.obtenerProductosId(this.sesion.getUsuario()?.id,2).subscribe(
    (producto:producto) => {
      this.productosCliente = producto;
    }
  )
    this.nombreUsuario =this.sesion.getUsuario()?.user
    this.idUsuario =this.sesion.getUsuario()?.id
}
}
