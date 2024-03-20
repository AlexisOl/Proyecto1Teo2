import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { comentario } from '../../models/comentario';
import { FormsModule } from '@angular/forms';
import { asignacionProductos } from '../../models/asignacionProductos';
import { factura } from '../../models/factura';
import { detalleFactura } from '../../models/detalleFactura';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-vista-especifica-producto-compras',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vista-especifica-producto-compras.component.html',
  styleUrl: './vista-especifica-producto-compras.component.css',
})
export class VistaEspecificaProductoComprasComponent implements OnInit {
  comentariosPublicacion: any;
  datosProductosPublicacion: any;
  datosParaComprar: any = [];
  textoComentario: any;
  precioTotal: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencia: MatDialogRef<VistaEspecificaProductoComprasComponent>,
    private ventasServicio: VentasServicioService,
    private comprasServicio: ComprasServicioService,
    private sesionServicio: SesionServicioService
  ) { }

  cerrar() {
    this.referencia.close();
  }

  //funcion para ingreso de comentarios
  registroComentario() {
    const nuevoComentario: comentario = new comentario();
    nuevoComentario.id_publicacion = this.data.datos[0].id;
    nuevoComentario.id_usuarioPregunta = this.sesionServicio.getUsuario()?.id;
    nuevoComentario.mensaje = this.textoComentario;
    nuevoComentario.respuestaUsuarioOriginal =
      this.data.datos[0].identificador_usuario ===
      nuevoComentario.id_usuarioPregunta;

    this.comprasServicio.envioComentario(nuevoComentario).subscribe();
  }

  //obtencion de los comentarios asociados a la publicacion
  //! COMO CLIENTE
  obtenerComentarios() {
    this.comprasServicio
      .verConversacionCliente(
        this.sesionServicio.getUsuario()?.id,
        this.data.datos[0].id
      )
      .subscribe((comentarios: comentario) => {
        this.comentariosPublicacion = comentarios;
      });
  }

  // funcion para agregar los elementos seleccionados
  agregar(idItem: number, elemento: asignacionProductos, precio: number) {
    this.datosParaComprar = this.datosParaComprar.filter(
      (elemento: { id: number }) => elemento.id !== idItem
    );

    this.datosProductosPublicacion.push(elemento);
    this.precioTotal -= elemento.cantidadProducto * precio;
  }

  eliminar(idItem: asignacionProductos, id_producto: number, precio: number) {
    //elimino del general
    this.datosProductosPublicacion = this.datosProductosPublicacion.filter(
      (elemento: { id: number }) => elemento.id !== id_producto
    );
    //agrego en el de compras
    this.datosParaComprar.push(idItem);
    this.precioTotal += idItem.cantidadProducto * precio;
  }

  //funcion para generar la compra

  generarCompra() {
    const generarFactura: factura = new factura();
    generarFactura.id_cliente = this.sesionServicio.getUsuario()?.id;
    generarFactura.id_publicacion = this.data.datos[0].id;
    generarFactura.precioTotal = this.precioTotal;

    this.comprasServicio
      .insertarFactura(generarFactura)
      .pipe(
        switchMap((factura: any) => {
          return this.generarDetalleFactura(factura.insertedId);
        })
      )
      .subscribe();
  }

  //funcion para generar el detalle de las facturas

  generarDetalleFactura(id_factura: number) {
    const generardetalleFactura: detalleFactura = new detalleFactura();
    generardetalleFactura.id_factura = id_factura;
    return this.datosParaComprar.map((productos: any) => {
      generardetalleFactura.id_producto = productos.id;
      generardetalleFactura.cantidadComprado = productos.cantidadProducto;
      generardetalleFactura.precioParcial =
        productos.cantidadProducto * productos.precio;

      console.log(productos);
      //productos.id_factura = id_factura;
      return this.comprasServicio
        .insertarDetalleFactura(generardetalleFactura)
        .subscribe();
    });
  }

  ngOnInit(): void {
    //vista especifica
    this.ventasServicio
      .obtenerTodaInfoporPublicacionId(this.data.datos[0].id)
      .subscribe((elemento: asignacionProductos) => {
        this.datosProductosPublicacion = elemento;
        console.log(elemento);
      });
    // ver bien porque le mande el all en el php por eso asi
    console.log(this.data.datos[0].fecha, '<', this.data);
    //para obtener comentarios
    this.obtenerComentarios();
  }
}