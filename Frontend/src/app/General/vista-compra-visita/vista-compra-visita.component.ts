import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { publicacion } from '../../models/publicacion';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-vista-compra-visita',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './vista-compra-visita.component.html',
  styleUrl: './vista-compra-visita.component.css'
})
export class VistaCompraVisitaComponent implements OnInit {

  // elementos de uso
  todasPublicaciones:any;
  publicacionEspecifica:any
  constructor(private ventasServicio: VentasServicioService,
              public dialog: MatDialog,
              private comprasServicio: ComprasServicioService){}



    //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: number){
    console.log(informacion+"id");

    this.comprasServicio.verPublicacionEspecificaCompras(informacion).subscribe(
      (info:publicacion)=> {
        console.log(info);
        this.publicacionEspecifica=info
        this.openModal();
      }
    )



  }

  openModal(){
    this.dialog.open(VistaEspecificaProductoComprasComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.publicacionEspecifica}
    });
  }


  ngOnInit(): void {
      this.ventasServicio.obtenerTodasPublicaciones().subscribe(
        (publicaciones: publicacion) => {
          this.todasPublicaciones = publicaciones
          console.log(publicaciones);

        }
      )
  }
}
