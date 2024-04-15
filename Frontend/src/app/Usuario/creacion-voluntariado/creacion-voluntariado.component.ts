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
import { retribucion } from '../../models/retribucion';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { articulosVoluntariado } from '../../models/articulosVoluntariado';
import { voluntariado } from '../../models/voluntariado';
import { insignias } from '../../models/insignias';
import { tipoVoluntariado } from '../../models/tipoVoluntariado';

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
selectedTipo: any;
selectedRetribuccion: any;

//lista para guardar los demas productos
listaProductos: articulosVoluntariado[] = []
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


//* para el voluntariado
formaRetribucion:any =[];
imagen:string = '';
insignia:string= '';
tipoVoluntariado!:any
valorSeleccionado!:number



constructor(private referencia: MatDialogRef<CreacionVoluntariadoComponent>,
            private sesion:SesionServicioService,
            private volutariadoServicio:VoluntariadoServicioService,
            private publicacionServicio: VentasServicioService){}



//funcion para agragar multiples productos
agregarProducto(){

  const indiceSeleccionado = this.productosCliente.findIndex(
    (      producto: { id: any; }) => producto.id === this.selectedValue.id
  )

  this.valoresEliminados.push(this.selectedValue);
  this.productosCliente.splice(indiceSeleccionado, 1)
  console.log(this.selectedValue);

  const productosNuevos: articulosVoluntariado = new articulosVoluntariado()
  productosNuevos.cantidadProducto = this.cantidadProducto;
  productosNuevos.identificador_producto = this.selectedValue.id
  productosNuevos.nombre = this.selectedValue.nombre
  productosNuevos.precioProducto = this.selectedValue.precio*this.cantidadProducto;
  if(this.valorSeleccionado == 1) {
    productosNuevos.id_retribucion = this.selectedRetribuccion.id
  } else {
    productosNuevos.id_retribucion = 3
  }
  productosNuevos.nombreRetribucion = this.selectedRetribuccion.descripcion
  console.log(productosNuevos);

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



//para la imagen]

onFileSelected(event: any) {
  // Obtener el nombre del archivo
  const fileName: string = event.target.files[0].name;
  // Puedes hacer lo que necesites con fileName

  console.log('Nombre del archivo seleccionado:' ,fileName, event.target.files[0]);
  // Asignar fileName a la propiedad imagen si lo necesitas

  this.imagen = fileName;


}
// mira el tipo de elemento seleccionado 
tipo(){
  this.valorSeleccionado = this.selectedTipo.id
  this.productosCliente=[]
  this.listaProductos=[]
  this.ontieneProductos(this.valorSeleccionado+1)
}
//funcion para obtener el valor de ingreso
ingreso() {
  const voluntariadoNuevo: voluntariado = new voluntariado();
  voluntariadoNuevo.titulo = this.nombre;
  voluntariadoNuevo.descripcion = this.descripcion;
  voluntariadoNuevo.identificador_usuario = this.idUsuario;
  voluntariadoNuevo.imagen = this.imagen;
  voluntariadoNuevo.tipo = this.valorSeleccionado

  this.volutariadoServicio.ingresoVoluntariado(voluntariadoNuevo).pipe(
    switchMap((info: any) => {
      this.idPublicacionCreada = info.insertedId;
      console.log(info.insertedId);
      if(voluntariadoNuevo.tipo == 1) {
        //creacion de insingiaas solo si es voluntariado
        const nuevaInsignia: insignias = new insignias();
        nuevaInsignia.nombre = this.insignia
        nuevaInsignia.id_voluntariado = info.insertedId
        this.crearInsignia(nuevaInsignia);
      }
      // Después de ingresar la publicación, procesamos la lista de productos
      return this.procesarListaProductos();
    })
  ).subscribe();
}

procesarListaProductos() {
  return this.listaProductos.map((elemento: any) => {
    elemento.identificador_voluntariado = this.idPublicacionCreada;
    return this.volutariadoServicio.ingresoArticuloVoluntariado(elemento).subscribe();
  });
}


// para crear las insignias
crearInsignia(insignia:insignias){
  this.volutariadoServicio.crearInsignia(insignia).subscribe();
}

//modal para el cierre
cerrar(){
  this.referencia.close();
}

ontieneProductos(tipo:number){
    //obtiene productos de truque
    this.publicacionServicio.obtenerProductosId(this.sesion.getUsuario()?.id,tipo).subscribe(
      (producto:producto) => {
        this.productosCliente = producto;
      }
    )
}

ngOnInit(): void {

  // para los tipos de voluntariado

  this.volutariadoServicio.obtenerTipoVoluntariado().subscribe(
    (tipos:tipoVoluntariado) => {
      this.tipoVoluntariado = tipos
    }
  );
  //obtienes las retribuciones
  this.volutariadoServicio.obtenerRetribuciones().subscribe(
    (retri:retribucion) => {
      this.formaRetribucion = retri
    }
  )
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
