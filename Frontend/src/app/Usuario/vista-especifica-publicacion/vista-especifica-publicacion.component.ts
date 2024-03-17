import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { producto } from '../../models/producto';
import { asignacionProductos } from '../../models/asignacionProductos';

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


  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              private referencia: MatDialogRef<VistaEspecificaPublicacionComponent>,
              private ventasServicio: VentasServicioService){}

  cerrar(){
    this.referencia.close();
  }


  ngOnInit(): void {
    console.log(this.data, this.data.datos.id);

    this.ventasServicio.obtenerTodaInfoporPublicacionId(this.data.datos.id).subscribe(
      (elemento:asignacionProductos)=> {
        this.datosProductosPublicacion = elemento
        console.log(elemento);


      }
    );

  }

}
