import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categorias } from '../../models/categorias';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { CreacionProductosComponent } from '../creacion-productos/creacion-productos.component';

@Component({
  selector: 'app-producto-especifico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-especifico.component.html',
  styleUrl: './producto-especifico.component.css'
})
export class ProductoEspecificoComponent implements OnInit{

  categorias: any;
  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  imagenTotal:any;
  imagenUrl!: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private referencia: MatDialogRef<ProductoEspecificoComponent>,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService
  ){}
  cerrar() {
    this.referencia.close();
  }


  obtenerImagen(): void {
    let valor = this.data.datos.imagen.split('.');


    this.categoriasServicio.obtenerImagen(valor[0], valor[1]).subscribe(
      (imagenBlob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagenUrl = reader.result as string;
        };
        reader.readAsDataURL(imagenBlob);
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }


  ngOnInit(): void {
    console.log("a", this.data.datos);
    this.obtenerImagen()

  }
}
