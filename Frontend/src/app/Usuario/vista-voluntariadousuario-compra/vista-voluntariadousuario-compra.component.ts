import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { asignacionProductos } from '../../models/asignacionProductos';
import { comentario } from '../../models/comentario';
import { detalleFactura } from '../../models/detalleFactura';
import { factura } from '../../models/factura';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaProductoComprasComponent } from '../vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { articulosVoluntariado } from '../../models/articulosVoluntariado';
import { voluntariado } from '../../models/voluntariado';
import { ayudaVoluntariado } from '../../models/ayudaVoluntariado';
import { comprobanteAyudaVoluntariado } from '../../models/comprobanteAyudaVoluntariado';

@Component({
  selector: 'app-vista-voluntariadousuario-compra',
  standalone: true,
  imports: [FormsModule,NgbAlert],
  templateUrl: './vista-voluntariadousuario-compra.component.html',
  styleUrl: './vista-voluntariadousuario-compra.component.css'
})
export class VistaVoluntariadousuarioCompraComponent implements OnInit {
  comentariosPublicacion: any;

  datosProductosPublicacion: any;
  datosParaComprar: any = [];

  textoComentario: any;
  precioTotal: number = 0;
  idUsuario!:number|undefined
  idRolUsuario!:number|undefined
  infoUsuario:any
  cantidadValida!:number
  imagenUrl!: string;

  // error
  dineroInsuficiente:boolean = false;
  prodcutosInsuficiente:boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencia: MatDialogRef<VistaEspecificaProductoComprasComponent>,
    private ventasServicio: VentasServicioService,
    private comprasServicio: ComprasServicioService,
    private sesionServicio: SesionServicioService,
    private voluntariadoServicio:VoluntariadoServicioService
  ) { }

  cerrar() {
    this.referencia.close();
  }



  //*MOVIMIENTOS
  // funcion para agregar los elementos seleccionados
  agregar(idItem: number, elemento: asignacionProductos, precio: number) {
    this.datosParaComprar = this.datosParaComprar.filter(
      (elemento: { id: number }) => elemento.id !== idItem
    );

    this.datosProductosPublicacion.push(elemento);
    this.precioTotal -= elemento.cantidadProducto * precio;
  }

  eliminar(idItem: comprobanteAyudaVoluntariado, id_producto: number, precio: number) {
    //elimino del general
    this.datosProductosPublicacion = this.datosProductosPublicacion.filter(
      (elemento: { id: number }) => elemento.id !== id_producto
    );
    //agrego en el de compras
    this.datosParaComprar.push(idItem);
    this.precioTotal += idItem.cantidad * precio;
  }
 //--------------------------------------
 //--------------------------------------
 //--------------------------------------


    //aqui determinamos si es valida esa compra
    determinaCantidadValida() {
      let cantidadValida = 0;

      for (let index = 0; index < this.datosParaComprar.length; index++) {
        const element = this.datosParaComprar[index];
        this.ventasServicio.cantidadProductosValida(element.id, element.cantidadProducto, this.data.datos[0].id).subscribe(
          (opcion: any) => {
            console.log("opcion:", opcion);
            if (opcion !== false) {
              cantidadValida += 1;
            }
          },
          (error: any) => {
            console.error("Error:", error);
          },
          () => {
            this.cantidadValida=cantidadValida
            // Esta función se ejecutará cuando la suscripción se complete
            console.log("Cantidad válida:", cantidadValida);
            // Llama a otra función aquí pasando la cantidad válida si es necesario
            this.generarVoluntariado()
          }
        );
      }
    }



  //funcion para generar la compra
  generarVoluntariado() {
    console.log(this.datosParaComprar);

    this.prodcutosInsuficiente=false
    //if(this.cantidadValida === this.datosParaComprar.length) {
      if(this.idUsuario){
        const generarConstanciaVoluntariado: ayudaVoluntariado = new ayudaVoluntariado();
        generarConstanciaVoluntariado.id_cliente = this.sesionServicio.getUsuario()?.id;
        generarConstanciaVoluntariado.id_voluntariado = this.data.datos[0].id;
        //ingreso
        this.voluntariadoServicio.ingresoConstanciaAyudaVoluntariado(generarConstanciaVoluntariado)
        .pipe(
          switchMap(
            (constancia:any) => {
            if(constancia){
              return this.generarDetalleFactura(constancia.insertedId);
            }   else {
              return of();
            }
          })
        ).subscribe(
          () => { },
          (error) => {
            console.error('Error al generar constancia y detalle:', error);
          }
        )

      }
   // } else {
     // this.prodcutosInsuficiente=true
   // }


  }
  generarDetalleConstancia(id_voluntariadoConstancia:number){

    return of(id_voluntariadoConstancia);
  }

  //funcion para generar el detalle de las facturas

  generarDetalleFactura(id_factura: number) {
    let factura =0;
    const generardetalleConstancia: comprobanteAyudaVoluntariado = new comprobanteAyudaVoluntariado();
    generardetalleConstancia.id_ayuda_Voluntariado = id_factura;
    return this.datosParaComprar.map((productos: any) => {
      generardetalleConstancia.id_articulo_Voluntariado = productos.id;
      generardetalleConstancia.cantidad = productos.cantidadProducto;
      generardetalleConstancia.precio =
      productos.cantidadProducto * productos.precio;

      console.log(productos);
      //productos.id_factura = id_factura;
      return this.voluntariadoServicio
        .ingresoDetalleConstanciaAyudaVoluntariado( this.sesionServicio.getUsuario()?.id, generardetalleConstancia)
        .subscribe((valores:any) => {
          console.log(valores.insertedId, "esto es el final");
          factura = valores.insertedId;
         // this.cambiarEstadoVentas(valores.insertedId);

        },
        //funcion final
        () => {
         // this.cambiarEstadoVentas(factura);
        });
    });
  }

  //funcion para la modificacion final
  cambiarEstadoVentas(valor:number){
    console.log('adios');
    this.ventasServicio.actualizarEstado(valor).subscribe();
  }

  //* para usuarios no ingresados
  obtencionInfoUsuarioPublicacion(){
    this.comprasServicio.obtenerInfoUsuarios(this.data.datos[0].identificador_usuario).subscribe(
      (usuario:usuario) =>{
        this.infoUsuario= usuario;
        try {
          console.log(usuario);
        } catch (error) {
          console.log(error);

        }

      }
    )
  }





  ngOnInit(): void {
    //ver usuario
    this.idUsuario = this.sesionServicio.getUsuario()?.id;
    this.idRolUsuario = this.sesionServicio.getUsuario()?.idRol;

    //imagenes especificas
    // this.comprasServicio.obtenerImagenesPorPublicaciones(this.data.datos[0].id)
    // .subscribe((imagenes:any) => {
    //   this.datosProductosPublicacion.imagenes =imagenes
    //   //console.log(imagenes);

    // }
    // para obtener el especifico
    this.voluntariadoServicio.vistaVoluntariadoEspecifico(this.data.datos[0].id).subscribe(
      (elementos:articulosVoluntariado) => {
        this.datosProductosPublicacion= elementos
        console.log(elementos);

      }
    )


    // ver bien porque le mande el all en el php por eso asi
    this.obtencionInfoUsuarioPublicacion();

  }
}
