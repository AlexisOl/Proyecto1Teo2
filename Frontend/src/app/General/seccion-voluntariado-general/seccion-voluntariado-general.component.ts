import { Component , OnInit, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { HeaderComponent } from '../header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ComprasServicioService } from '../../services/compras-servicio.service';
import { VentasServicioService } from '../../services/ventas-servicio.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VoluntariadoServicioService } from '../../services/voluntariado-servicio.service';
import { voluntariado } from '../../models/voluntariado';
import { VistaVoluntariadoVisitaComponent } from '../vista-voluntariado-visita/vista-voluntariado-visita.component';
import { VistaVoluntariadousuarioCompraComponent } from '../../Usuario/vista-voluntariadousuario-compra/vista-voluntariadousuario-compra.component';
@Component({
  selector: 'app-seccion-voluntariado-general',
  standalone: true,
  imports: [BaseChartDirective, HeaderComponent, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './seccion-voluntariado-general.component.html',
  styleUrl: './seccion-voluntariado-general.component.css'
})



export class SeccionVoluntariadoGeneralComponent implements OnInit{
  // elementos de uso
  todosVoluntariados:any;
  todosTrueques:any;
  busquedaPublicacion!:string
  publicacionEspecifica:any

  constructor(private ventasServicio: VentasServicioService,
    public dialog: MatDialog,
    private comprasServicio: ComprasServicioService,
  private voluntariadoServicio: VoluntariadoServicioService){

  }



    //* este modal es para ver las publicaciones de forma
  //* asi que le mando la info de la publicacion como tal para que desgloce mas
  modalParaVistaEspecifica(informacion: number){
    console.log(informacion+"id");

    this.voluntariadoServicio.voluntariadoEspecifico(informacion).subscribe(
      (info:voluntariado)=> {
        console.log(info,'info');
        this.publicacionEspecifica=info
        this.openModal();
      }
    )



  }

  openModal(){
    this.dialog.open(VistaVoluntariadousuarioCompraComponent, {
      width:'80%',
      height:"650px",
      data: {datos: this.publicacionEspecifica}
    });
  }


  obtenerPublicaciones(){
    this.voluntariadoServicio.obtenerTodosvoluntariados().subscribe(
      (voluntariado: voluntariado) => {
        this.todosVoluntariados = voluntariado
      }
    )
  }


  obtenerTrueques(){
    this.voluntariadoServicio.obtenerTodoslosTruques().subscribe(
      (voluntariado: voluntariado) => {
        this.todosTrueques = voluntariado;
      }
    );
  }

  ngOnInit(): void {
    this.obtenerPublicaciones();
    this.obtenerTrueques();
  }
}
