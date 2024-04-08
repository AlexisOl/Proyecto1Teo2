import { Component, OnInit } from '@angular/core';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { voluntariado } from '../../models/voluntariado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CaruselPublicacioesComponent } from '../carusel-publicacioes/carusel-publicacioes.component';
import { VistaVoluntariadoVisitaComponent } from '../../General/vista-voluntariado-visita/vista-voluntariado-visita.component';
import { VistaVoluntariadousuarioCompraComponent } from '../vista-voluntariadousuario-compra/vista-voluntariadousuario-compra.component';

@Component({
  selector: 'app-vista-especifica-voluntariado',
  standalone: true,
  imports: [HeaderUsuarioComponent, CaruselPublicacioesComponent,CommonModule, MatCardModule, MatButtonModule, HeaderUsuarioComponent, MatPaginator, MatPaginatorModule, FormsModule],
  templateUrl: './vista-especifica-voluntariado.component.html',
  styleUrl: './vista-especifica-voluntariado.component.css'
})
export class VistaEspecificaVoluntariadoComponent implements OnInit{
    // elementos de uso
    todosVoluntariados:any;
    voluntariadoEspecifico:any
    busquedaVoluntariado:string=''
    idUsuario:number|undefined
    productosAsociados:any
  constructor(private ventasServicio: VentasServicioService,
    public dialog: MatDialog,
    private sesionServicio:SesionServicioService,
    private comprasServicio: ComprasServicioService,
    private voluntariadoServicio:VoluntariadoServicioService){}




        //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: any){
    console.log(informacion.id);

    this.voluntariadoServicio.voluntariadoEspecifico(informacion.id).subscribe(
      (info:voluntariado)=> {
        console.log(info, "datos", informacion);
        this.voluntariadoEspecifico=info
        this.openModal();
      }
    )



  }

  openModal(){
    this.dialog.open(VistaVoluntariadousuarioCompraComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.voluntariadoEspecifico}
    });
  }

    //funcion para obtener voluntariados
    obtenerVoluntariados(){
      this.voluntariadoServicio.obtenerTodosvoluntariados().subscribe(
        (voluntariado: voluntariado) => {
          this.todosVoluntariados = voluntariado;
        }
      );
    }



    ngOnInit(): void {
      this.idUsuario = this.sesionServicio.getUsuario()?.id
      this.obtenerVoluntariados();
  }

}
