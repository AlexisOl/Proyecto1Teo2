import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { publicacion } from '../../models/publicacion';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { VistaEspecificaPublicacionComponent } from '../vista-especifica-publicacion/vista-especifica-publicacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { VistaEspecificaProductoComprasComponent } from '../vista-especifica-producto-compras/vista-especifica-producto-compras.component';

@Component({
  selector: 'app-compras-usuario',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HeaderUsuarioComponent],
  templateUrl: './compras-usuario.component.html',
  styleUrl: './compras-usuario.component.css'
})
export class ComprasUsuarioComponent implements OnInit{
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
        }
      )
  }

}
