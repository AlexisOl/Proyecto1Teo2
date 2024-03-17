import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { categorias } from '../../models/categorias';
import { producto } from '../../models/producto';
import { SesionServicioService } from '../../services/sesion-servicio.service';
@Component({
  selector: 'app-creacion-productos',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
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
  imagenTotal:any;

  extensiones: any[] = ['.txt', '.html'];
  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  selectedValue: string = '';
  constructor(
    private referencia: MatDialogRef<CreacionProductosComponent>,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService
  ) {}

  onFileSelected(event: any) {
    // Obtener el nombre del archivo
    const fileName: string = event.target.files[0].name;
    // Puedes hacer lo que necesites con fileName

    console.log('Nombre del archivo seleccionado:' ,fileName, event.target.files[0].name);
    // Asignar fileName a la propiedad imagen si lo necesitas

    this.imagen = fileName;
    this.imagenTotal = event.target.files[0]
  }

  crearProducto() {
    const productoNuevo: producto = new producto();
    productoNuevo.nombre = this.nombre;
    productoNuevo.precio = this.precio;
    productoNuevo.descripcion = this.descripcion;
    productoNuevo.imagen = this.imagen;
    productoNuevo.identificador_usuario = this.servicioUsuario.getUsuario()?.id;
    productoNuevo.identificador_categoria = Number(this.selectedValue);
    console.log(productoNuevo, this.descripcion);
    //ingreso del producto
    this.categoriasServicio.ingresoProducto(productoNuevo).subscribe();
  }

  cerrar() {
    this.referencia.close();
  }
  ngOnInit(): void {
    this.categoriasServicio
      .obtenerCategorias()
      .subscribe((valores: categorias) => {
        this.categorias = valores;
        console.log(valores);
      });
  }
}
