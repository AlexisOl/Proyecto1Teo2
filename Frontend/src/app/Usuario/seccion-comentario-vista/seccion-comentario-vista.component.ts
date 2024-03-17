import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seccion-comentario-vista',
  standalone: true,
  imports: [],
  templateUrl: './seccion-comentario-vista.component.html',
  styleUrl: './seccion-comentario-vista.component.css'
})
export class SeccionComentarioVistaComponent implements OnInit{
  mensajes:any;
  constructor( private referencia: MatDialogRef<SeccionComentarioVistaComponent>){}
  //funcion para cerrar modal
  cerrar(){
    this.referencia.close();
  }

  ngOnInit(): void {
  }
}
