import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { categorias } from '../../models/categorias';
import { producto } from '../../models/producto';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { tipoVoluntariado } from '../../models/tipoVoluntariado';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-creacion-productos',
  standalone: true,
  imports: [
    NgbAlert,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './creacion-productos.component.html',
  styleUrl: './creacion-productos.component.css',
})
export class CreacionProductosComponent implements OnInit {
  //valores de ingreso de producto
  categorias: any;
  nombre: string = '';
  precio: number = 0;
  descripcion: string = '';
  imagen: string = '';
  imagenTotal: any;

  extensiones: any[] = ['.txt', '.html'];
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  selectedValue: string = '';
  selectedValueTipoVoluntariado!: any;
  seleccion!: number;
  tipoVoluntariado: any;
  todobien: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private referencia: MatDialogRef<CreacionProductosComponent>,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService,
    private voluntariadoServicio: VoluntariadoServicioService
  ) {}

  onFileSelected(event: any) {
    // Obtener el nombre del archivo
    const fileName: string = event.target.files[0].name;
    // Puedes hacer lo que necesites con fileName

    console.log(
      'Nombre del archivo seleccionado:',
      fileName,
      event.target.files[0]
    );
    // Asignar fileName a la propiedad imagen si lo necesitas

    this.imagen = fileName;
    this.imagenTotal = event.target.files[0];
  }
  //para la seleccion del tipo de voluntariado
  tipo() {
    this.seleccion = this.selectedValueTipoVoluntariado.id;
  }
  crearProducto() {
    const productoNuevo: producto = new producto();
    //si es un truque
    if (this.seleccion == 2) {
      productoNuevo.precio = 0;
      productoNuevo.identificador_tipo_producto = 3;
    } else {
      productoNuevo.precio = this.precio;
      productoNuevo.identificador_tipo_producto = this.data.datos;
    }
    productoNuevo.nombre = this.nombre;
    productoNuevo.descripcion = this.descripcion;
    productoNuevo.imagen = this.imagen;
    productoNuevo.identificador_usuario = this.servicioUsuario.getUsuario()?.id;
    productoNuevo.identificador_categoria = Number(this.selectedValue);
    console.log(productoNuevo, this.descripcion);
    //ingreso del producto
    this.categoriasServicio.ingresoProducto(productoNuevo).subscribe(() => {
      this.todobien = true;
    });
    this.categoriasServicio.guardarImagen(this.imagenTotal).subscribe(
      () => {
        console.log('Imagen guardada con éxito');
      },
      (error) => {
        console.error('Error al guardar la imagen:', error);
      }
    );
  }

  cerrar() {
    this.referencia.close();
  }
  ngOnInit(): void {
    console.log(this.data.datos);
    this.voluntariadoServicio
      .obtenerTipoVoluntariado()
      .subscribe((tipo: tipoVoluntariado) => {
        this.tipoVoluntariado = tipo;
      });

    this.categoriasServicio
      .obtenerCategorias()
      .subscribe((valores: categorias) => {
        this.categorias = valores;
        console.log(valores);
      });
  }
}
