import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { publicacion } from '../../models/publicacion';
import { MatDialog } from '@angular/material/dialog';
import { VistaEspecificaProductoComprasComponent } from '../../Usuario/vista-especifica-producto-compras/vista-especifica-producto-compras.component';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { FormsModule } from '@angular/forms';
import { usuario } from '../../models/usuario';
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
  busquedaPublicacion!:string
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
  //*busqueda
  // funcion para poder busacr en base a producto
  buscar(){
    if(this.busquedaPublicacion!=''){
      this.comprasServicio.obtenerPublicacionesNombre(this.busquedaPublicacion).subscribe(
        (publicaciones: publicacion) => {
          this.todasPublicaciones = publicaciones
        }
      );
    } else{
      this.obtenerPublicaciones();
    }
  }


  openModal(){
    this.dialog.open(VistaEspecificaProductoComprasComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.publicacionEspecifica}
    });
  }
  obtenerPublicaciones(){
    this.ventasServicio.obtenerTodasPublicaciones().subscribe(
      (publicaciones: publicacion) => {
        this.todasPublicaciones = publicaciones
        console.log(publicaciones);

      }
    )
  }

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }
}
