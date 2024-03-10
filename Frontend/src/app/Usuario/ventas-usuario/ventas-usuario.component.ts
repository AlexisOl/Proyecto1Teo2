import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreacionVentaComponent } from '../creacion-venta/creacion-venta.component';
import { CreacionProductosComponent } from '../creacion-productos/creacion-productos.component';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { producto } from '../../models/producto';
@Component({
  selector: 'app-ventas-usuario',
  standalone: true,
  imports: [HeaderUsuarioComponent, MatIconModule, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './ventas-usuario.component.html',
  styleUrl: './ventas-usuario.component.css'
})
export class VentasUsuarioComponent implements OnInit{
  // valors de vista de productos y ventas
  productosIngresados:producto[]=[];
  productosValores:any;

  constructor(public dialog: MatDialog,
    private categoriasServicio: VentasServicioService,
    private servicioUsuario: SesionServicioService
    ){}


  //CREACION--------------------------------
  //modal para las ventas
  openDialog() {
    this.dialog.open(CreacionVentaComponent, {
      width:'80%',
      height:"650px"
    });
  }

  // modal para la creacion de productos

  creacionProductosModal(){
    this.dialog.open(CreacionProductosComponent, {
      width:'80%',
      height:"650px"
    });
  }



  ngOnInit(): void {
    this.categoriasServicio.obtenerProductosId(this.servicioUsuario.getUsuario()?.idRol).subscribe(
      (nuevosProd:producto) => {

       this.productosIngresados.push(nuevosProd)
      this.productosValores =nuevosProd
       console.log(nuevosProd[1], typeof(nuevosProd));

      }
    )
    console.log("a",this.productosIngresados);


  }
}
