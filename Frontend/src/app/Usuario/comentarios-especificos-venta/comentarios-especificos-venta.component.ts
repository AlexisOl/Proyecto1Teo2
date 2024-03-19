import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { comentario } from '../../models/comentario';
import { SesionServicioService } from '../../services/sesion-servicio.service';

@Component({
  selector: 'app-comentarios-especificos-venta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comentarios-especificos-venta.component.html',
  styleUrl: './comentarios-especificos-venta.component.css'
})
export class ComentariosEspecificosVentaComponent implements OnInit{
  comentariosPublicacion:any
  textoComentario!:string

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private referencia: MatDialogRef<ComentariosEspecificosVentaComponent>,
  private comprasServicio: ComprasServicioService,
  private sesionServicio:SesionServicioService
  ){}


    //funcion para crear el modal de comentarios
    cerrar(){
      this.referencia.close();
    }

    //funcion para obtener los comentarios asociados a idpublicacion e idUsuario
    obtenerConversacion(){
      this.comprasServicio.verConversacionCliente(this.data.datos.id_usuarioPregunta, this.data.datos.id_publicacion).subscribe(
        (comentario:any) => {
          this.comentariosPublicacion = comentario;
        }
      );
    }

    //funcion para comunicarser
    enviarMensaje(){

      const nuevoComentario: comentario = new comentario()
      nuevoComentario.id_publicacion = this.data.datos.id_publicacion;
      nuevoComentario.id_usuarioPregunta = this.data.datos.id_usuarioPregunta
      nuevoComentario.mensaje =this.textoComentario
      nuevoComentario.respuestaUsuarioOriginal = this.sesionServicio.getUsuario()?.id === this.data.datos.id_usuario_publicacion;
      console.log( this.sesionServicio.getUsuario()?.id === nuevoComentario.id_usuarioPregunta,  this.sesionServicio.getUsuario()?.id ,nuevoComentario.id_usuarioPregunta);

      this.comprasServicio.envioComentario(nuevoComentario).subscribe();
    }

    ngOnInit(): void {
      console.log(this.data.datos);
      this.obtenerConversacion();
    }

}
