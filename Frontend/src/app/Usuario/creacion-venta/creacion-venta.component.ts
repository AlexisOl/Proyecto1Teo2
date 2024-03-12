import { Component , OnInit, inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { publicacion } from '../../models/publicacion';
import { VentasServicioService } from '../../services/ventas-servicio.service';


@Component({
  selector: 'app-creacion-venta',
  standalone: true,
  imports: [FormsModule, NgbDatepickerModule,JsonPipe, MatInputModule
  ,MatFormFieldModule],
  templateUrl: './creacion-venta.component.html',
  styleUrl: './creacion-venta.component.css'
})
export class CreacionVentaComponent implements OnInit {

  //info general de los valores
  nombre:string = ''
  // generacion para info de usuario
  nombreUsuario: string|undefined =''
  idUsuario:number|undefined = 0

  nombreProducto:number= 0
  descripcion:string = ''
  // para el date picker


  constructor(private referencia: MatDialogRef<CreacionVentaComponent>,
              private sesion:SesionServicioService,
              private publicacionServicio: VentasServicioService){}


  //funcion para obtener el valor de ingreso
  ingreso(){
    // creacion de objeto
    const publicacionNueva:publicacion = new publicacion()
    publicacionNueva.titulo = this.nombre
    publicacionNueva.descripcion = this.descripcion
    publicacionNueva.identificador_usuario = this.idUsuario
    publicacionNueva.identificador_producto = this.nombreProducto

    this.publicacionServicio.ingresoPublicacion(publicacionNueva).subscribe();
  }

  //modal para el cierre
  cerrar(){
    this.referencia.close();
  }


  ngOnInit(): void {
      this.nombreUsuario =this.sesion.getUsuario()?.user
      this.idUsuario =this.sesion.getUsuario()?.id
  }
}
