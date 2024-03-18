import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { producto } from '../../models/producto';
import { asignacionProductos } from '../../models/asignacionProductos';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { comentario } from '../../models/comentario';
import { SesionServicioService } from '../../services/sesion-servicio.service';

@Component({
  selector: 'app-vista-especifica-publicacion',
  standalone: true,
  imports: [],
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


  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private referencia: MatDialogRef<VistaEspecificaPublicacionComponent>,
              private ventasServicio: VentasServicioService,
              private comprasServicio: ComprasServicioService,
              private sesionServicio: SesionServicioService){}

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

  ngOnInit(): void {
    console.log("a", this.data, this.data.datos.id);

    this.ventasServicio.obtenerTodaInfoporPublicacionId(this.data.datos.id).subscribe(
      (elemento:asignacionProductos)=> {
        this.datosProductosPublicacion = elemento
        console.log(elemento);


      }
    );

  }

}
