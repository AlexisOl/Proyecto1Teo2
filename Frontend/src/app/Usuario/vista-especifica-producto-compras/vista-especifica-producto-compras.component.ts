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
import { forkJoin, switchMap } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { usuario } from '../../models/usuario';

@Component({
  selector: 'app-vista-especifica-producto-compras',
  standalone: true,
  imports: [FormsModule, NgbAlert],
  templateUrl: './vista-especifica-producto-compras.component.html',
  styleUrl: './vista-especifica-producto-compras.component.css',
})
export class VistaEspecificaProductoComprasComponent implements OnInit {
  comentariosPublicacion: any;
  datosProductosPublicacion: any;
  datosParaComprar: any = [];
  textoComentario: any;
  precioTotal: number = 0;
  idUsuario!:number|undefined
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
    if(this.idUsuario){
      this.comprasServicio
      .verConversacionCliente(
        this.sesionServicio.getUsuario()?.id,
        this.data.datos[0].id
      )
      .subscribe((comentarios: comentario) => {
        this.comentariosPublicacion = comentarios;
      });
    }

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
            this.generarCompra()
          }
        );
      }
    }



  //funcion para generar la compra
  generarCompra() {
    this.prodcutosInsuficiente=false
    if(this.cantidadValida === this.datosParaComprar.length) {
      if(this.idUsuario){
        const generarFactura: factura = new factura();
        generarFactura.id_cliente = this.sesionServicio.getUsuario()?.id;
        generarFactura.id_publicacion = this.data.datos[0].id;
        generarFactura.precioTotal = this.precioTotal;

        this.comprasServicio
          .insertarFactura(generarFactura)
          .pipe(
            switchMap((factura: any) => {
              if(factura) {
                return this.generarDetalleFactura(factura.insertedId);

              } else {
                return this.dineroInsuficiente = true
              }

            })
          )
          .subscribe();
      }
    } else {
      this.prodcutosInsuficiente=true
    }


  }

  //funcion para generar el detalle de las facturas

  generarDetalleFactura(id_factura: number) {
    let factura =0;
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
        .subscribe((valores:any) => {
          console.log(valores.insertedId, "esto es el final");
          factura = valores.insertedId;
          this.cambiarEstadoVentas(valores.insertedId);

        },
        //funcion final
        () => {
          this.cambiarEstadoVentas(factura);
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



  //funcion para obtener imagenes
  obtenerImagen(): void {
    console.log(this.datosProductosPublicacion, "ya es");

    for (let index = 0; index < this.datosProductosPublicacion.length; index++) {
      const element = this.datosProductosPublicacion[index].imagen;
      let valor = element.split('.');
      console.log(element,"para imagen");

      this.ventasServicio.obtenerImagen(valor[0], valor[1]).subscribe(
        (imagenBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.datosProductosPublicacion[index].imagen = reader.result as string;
          };
          reader.readAsDataURL(imagenBlob);
        },
        (error) => {
          console.error('Error al obtener la imagen:', error);
        }
      );
    }


  }


  ngOnInit(): void {
    //ver usuario
    this.idUsuario = this.sesionServicio.getUsuario()?.id;
    //imagenes especificas
    // this.comprasServicio.obtenerImagenesPorPublicaciones(this.data.datos[0].id)
    // .subscribe((imagenes:any) => {
    //   this.datosProductosPublicacion.imagenes =imagenes
    //   //console.log(imagenes);

    // }

    // )
    //vista especifica
    this.ventasServicio
      .obtenerTodaInfoporPublicacionId(this.data.datos[0].id)
      .subscribe((elemento: asignacionProductos) => {
        this.datosProductosPublicacion = elemento;
        console.log(elemento,"ddd");
        //despues del subscribe porque si me interesa que cargue al instante
        this.obtenerImagen();

      });
    // ver bien porque le mande el all en el php por eso asi
    console.log(this.data.datos[0].identificador_usuario, '<', this.data);
    //para obtener comentarios
    this.obtenerComentarios();
    this.obtencionInfoUsuarioPublicacion();

  }
}
