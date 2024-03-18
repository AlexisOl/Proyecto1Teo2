import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { comentario } from '../../models/comentario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vista-especifica-producto-compras',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vista-especifica-producto-compras.component.html',
  styleUrl: './vista-especifica-producto-compras.component.css'
})
export class VistaEspecificaProductoComprasComponent implements OnInit{
  comentariosPublicacion:any
  textoComentario:any

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private referencia: MatDialogRef<VistaEspecificaProductoComprasComponent>,
  private ventasServicio: VentasServicioService,
  private comprasServicio: ComprasServicioService,
  private sesionServicio: SesionServicioService){}


  cerrar(){
    this.referencia.close();
  }

  //funcion para ingreso de comentarios
  registroComentario(){
    const nuevoComentario: comentario = new comentario()
    nuevoComentario.id_publicacion = this.data.datos[0].id;
    nuevoComentario.id_usuarioPregunta = this.sesionServicio.getUsuario()?.id
    nuevoComentario.mensaje =this.textoComentario
    nuevoComentario.respuestaUsuarioOriginal = this.data.datos[0].identificador_usuario === nuevoComentario.id_usuarioPregunta;

    this.comprasServicio.envioComentario(nuevoComentario).subscribe();
  }

  //obtencion de los comentarios asociados a la publicacion
  //! COMO CLIENTE
  obtenerComentarios(){
    this.comprasServicio.verConversacionCliente( this.sesionServicio.getUsuario()?.id, this.data.datos[0].id).subscribe(
      (comentarios:comentario) => {
        this.comentariosPublicacion = comentarios
      }
    )
  }


  ngOnInit(): void {
    // ver bien porque le mande el all en el php por eso asi
    console.log(this.data.datos[0].fecha,"<", this.data);
    //para obtener comentarios
    this.obtenerComentarios();

  }
}
