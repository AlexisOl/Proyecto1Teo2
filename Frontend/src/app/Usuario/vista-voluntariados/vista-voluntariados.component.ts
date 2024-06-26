import { Component, Inject, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaProductoComprasComponent } from '../vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { articulosVoluntariado } from '../../models/articulosVoluntariado';
import { insignias } from '../../models/insignias';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { comentario } from '../../models/comentario';
import { ComentariosEspecificosVentaComponent } from '../comentarios-especificos-venta/comentarios-especificos-venta.component';
import { comentariosVoluntariado } from '../../models/comentariosVoluntariado';
import { ComentarioVoluntariadoEspecificoComponent } from '../comentario-voluntariado-especifico/comentario-voluntariado-especifico.component';

@Component({
  selector: 'app-vista-voluntariados',
  standalone: true,
  templateUrl: './vista-voluntariados.component.html',
  styleUrl: './vista-voluntariados.component.css',
  imports: [HeaderUsuarioComponent, MatCardModule, MatButtonModule],
})
export class VistaVoluntariadosComponent implements OnInit {
  productosVoluntariado: any;
  insigniaVoluntariado: any;
  //personas que comentaron
  personasqueComentaron: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencia: MatDialogRef<VistaEspecificaProductoComprasComponent>,
    private ventasServicio: VentasServicioService,
    private comprasServicio: ComprasServicioService,
    private sesionServicio: SesionServicioService,
    private voluntariadoServicio: VoluntariadoServicioService,
    public dialog: MatDialog
  ) {}

  // para comentarios
  //fucnion para obtener a los que comenten en base al voluntariado

  verComentarioPublicacion() {
    this.voluntariadoServicio
      .verComentariosPorIdVoluntariado(this.data.datos.id)
      .subscribe((comentarios: comentariosVoluntariado) => {
        this.personasqueComentaron = comentarios;
        console.log(comentarios);
      });
  }

  //modal para ir a la seccion de comentarios especificos
  modalParaVistaEspecificaComentario(informacion: comentario) {
    this.dialog.open(ComentarioVoluntariadoEspecificoComponent, {
      width: '80%',
      height: '650px',
      data: { datos: informacion },
    });
  }

  // para ver las imagenes
  //funcion para obtener imagenes
  obtenerImagen(): void {
    console.log(this.productosVoluntariado, 'ya es');

    for (let index = 0; index < this.productosVoluntariado.length; index++) {
      const element = this.productosVoluntariado[index].imagen;
      let valor = element.split('.');
      console.log(element, 'para imagen');

      this.ventasServicio.obtenerImagen(valor[0], valor[1]).subscribe(
        (imagenBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.productosVoluntariado[index].imagen = reader.result as string;
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
    // para insiginias
    this.voluntariadoServicio
      .obtenerInsigniaEspecifica(this.data.datos.id)
      .subscribe((tipo: any) => {
        console.log(tipo, 'tipo', this.data.datos);

        this.insigniaVoluntariado = tipo[0].nombre;
        console.log(this.insigniaVoluntariado);
      });

    // para articulos
    this.voluntariadoServicio
      .obtenerProductosVoluntariado(this.data.datos.id)
      .subscribe((articulos: articulosVoluntariado) => {
        this.productosVoluntariado = articulos;
        this.obtenerImagen();
      });

    // para comentarios

    this.verComentarioPublicacion();
  }
}
