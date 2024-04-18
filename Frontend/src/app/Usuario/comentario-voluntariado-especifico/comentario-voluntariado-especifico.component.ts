import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { comentario } from '../../models/comentario';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { ComentariosEspecificosVentaComponent } from '../comentarios-especificos-venta/comentarios-especificos-venta.component';
import { FormsModule } from '@angular/forms';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { comentariosVoluntariado } from '../../models/comentariosVoluntariado';

@Component({
  selector: 'app-comentario-voluntariado-especifico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comentario-voluntariado-especifico.component.html',
  styleUrl: './comentario-voluntariado-especifico.component.css',
})
export class ComentarioVoluntariadoEspecificoComponent implements OnInit {
  comentariosPublicacion: any;
  textoComentario!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencia: MatDialogRef<ComentarioVoluntariadoEspecificoComponent>,
    private comprasServicio: ComprasServicioService,
    private sesionServicio: SesionServicioService,
    private voluntariadoServicio: VoluntariadoServicioService
  ) {}

  //funcion para crear el modal de comentarios
  cerrar() {
    this.referencia.close();
  }

  //funcion para obtener los comentarios asociados a idpublicacion e idUsuario
  obtenerConversacion() {
    this.voluntariadoServicio
      .verConversacionClienteVoluntariado(
        this.data.datos.id_usuarioPregunta,
        this.data.datos.id_voluntariado
      )
      .subscribe((comentario: any) => {
        this.comentariosPublicacion = comentario;
      });
  }

  //funcion para comunicarser
  enviarMensaje() {
    const nuevoComentario: comentariosVoluntariado =
      new comentariosVoluntariado();
    nuevoComentario.id_voluntariado = this.data.datos.id_voluntariado;
    nuevoComentario.id_usuarioPregunta = this.data.datos.id_usuarioPregunta;
    nuevoComentario.mensaje = this.textoComentario;
    nuevoComentario.respuestaUsuarioOriginal =
      this.sesionServicio.getUsuario()?.id ===
      this.data.datos.id_usuario_publicacion;
    console.log(
      this.sesionServicio.getUsuario()?.id ===
        nuevoComentario.id_usuarioPregunta,
      this.sesionServicio.getUsuario()?.id,
      nuevoComentario.id_usuarioPregunta
    );

    this.voluntariadoServicio
      .envioComentarioVoluntariado(nuevoComentario)
      .subscribe(() => {
        this.obtenerConversacion();
        this.textoComentario = '';
      });
  }

  ngOnInit(): void {
    console.log(this.data.datos);
    this.obtenerConversacion();
  }
}
