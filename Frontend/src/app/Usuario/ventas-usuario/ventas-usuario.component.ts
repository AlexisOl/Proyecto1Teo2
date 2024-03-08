import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreacionVentaComponent } from '../creacion-venta/creacion-venta.component';
@Component({
  selector: 'app-ventas-usuario',
  standalone: true,
  imports: [HeaderUsuarioComponent, MatIconModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './ventas-usuario.component.html',
  styleUrl: './ventas-usuario.component.css'
})
export class VentasUsuarioComponent implements OnInit{


  constructor(public dialog: MatDialog){}


  //CREACION--------------------------------
  //modal para las ventas
  openDialog() {
    this.dialog.open(CreacionVentaComponent, {
      width:'80%',
      height:"650px"
    });
  }



  ngOnInit(): void {
  }
}
