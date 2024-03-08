import { Component , inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-creacion-venta',
  standalone: true,
  imports: [FormsModule, NgbDatepickerModule,JsonPipe, MatInputModule
  ,MatFormFieldModule],
  templateUrl: './creacion-venta.component.html',
  styleUrl: './creacion-venta.component.css'
})
export class CreacionVentaComponent {


  nombre:string = ''
  nombreProducto:string= ''

  // para el date picker

	model: NgbDateStruct | undefined;
	date: { year: number; month: number; } | undefined;


  constructor(private referencia: MatDialogRef<CreacionVentaComponent>){}


  cerrar(){
    this.referencia.close();
  }
}
