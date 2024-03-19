import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { producto } from '../../models/producto';
import { asignacionProductos } from '../../models/asignacionProductos';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { comentario } from '../../models/comentario';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ComentariosEspecificosVentaComponent } from '../comentarios-especificos-venta/comentarios-especificos-venta.component';

@Component({
  selector: 'app-vista-especifica-publicacion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vista-especifica-publicacion.component.html',
  styleUrl: './vista-especifica-publicacion.component.css'
})
export class VistaEspecificaPublicacionComponent implements OnInit {


  //* ahora los datos para la visualizacion
  datosProductosPublicacion: any
  datosEspecificosProductos:any
  nombrePublicacion:string=''
  fechaPublicacion!:Date
  estadoPublicacion!:string
  textoComentario:any

  //personas que comentaron
  personasqueComentaron:any;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private referencia: MatDialogRef<VistaEspecificaPublicacionComponent>,
              private ventasServicio: VentasServicioService,
              private comprasServicio: ComprasServicioService,
              private sesionServicio: SesionServicioService,
              public dialog: MatDialog
              ){}


  //funcion para crear el modal de comentarios
  cerrar(){
    this.referencia.close();
  }

  //funcion para ingreso de comentarios
  registroComentario(){
    const nuevoComentario: comentario = new comentario()

    nuevoComentario.id_publicacion = this.data.datos.id;
    nuevoComentario.id_usuarioPregunta = this.sesionServicio.getUsuario()?.id
    nuevoComentario.mensaje =this.textoComentario
  }

  //fucnion para obtener a los que comenten en base la publicacion

  verComentarioPublicacion() {
    this.ventasServicio.verComentarioEnPublicacion(this.data.datos.id).subscribe(
      (comentarios:comentario) => {
        this.personasqueComentaron = comentarios
        console.log(comentarios);

      }
    )
  }

  //modal para ir a la seccion de comentarios especificos
  modalParaVistaEspecificaComentario(informacion: comentario){
    this.dialog.open(ComentariosEspecificosVentaComponent, {
      width:'80%',
      height:"650px",
      data: {datos: informacion}
    });
  }

  ngOnInit(): void {
    console.log("a", this.data, this.data.datos.id);

    this.ventasServicio.obtenerTodaInfoporPublicacionId(this.data.datos.id).subscribe(
      (elemento:asignacionProductos)=> {
        this.datosProductosPublicacion = elemento
        console.log(elemento);
      }
    );
    // que genere los comentarios
    this.verComentarioPublicacion();
  }

}
