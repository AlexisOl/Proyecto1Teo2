import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderUsuarioComponent } from '../header-usuario/header-usuario.component';
import { SesionServicioService } from '../../services/sesion-servicio.service';
import { UsuarioServicioService } from '../../services/usuario-servicio.service';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [MatExpansionModule, HeaderUsuarioComponent, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css'
})
export class FinanzasComponent implements OnInit {

  nombreUsuario: string |undefined
  cantidadMonedas: number |undefined
  monedasSeleccionadas:number=0
  monedasEntrada:number = 0
  monedaCambio:number=0
  monedaCambioExtraccion:number=0
  divisa:number = 10
  constructor(private sesionServicio:SesionServicioService,
            private usuarioServicio:UsuarioServicioService){}
  onCantidadInput(){
    this.monedaCambio = this.divisa*this.monedasEntrada

  }
  cantidadExtaerInput(){
    this.monedaCambioExtraccion = this.monedasSeleccionadas/this.divisa
  }
  ingresoDinero(){
    this.usuarioServicio.ingresoDinero(this.sesionServicio.getUsuario()?.id, this.monedaCambio).subscribe();
  }

  extraerDinero(){
    this.usuarioServicio.extaerMonedas(this.sesionServicio.getUsuario()?.id, this.monedasSeleccionadas).subscribe();
  }
  ngOnInit(): void {
    this.nombreUsuario = this.sesionServicio.getUsuario()?.user;
    this.cantidadMonedas = this.sesionServicio.getUsuario()?.cantidad_monedas


    this.sesionServicio.cantidadMonedas$.subscribe((cantidad: number|undefined) => {
      this.cantidadMonedas = cantidad;
      console.log(cantidad, this.nombreUsuario, "actualizacion");

    });
  }

}
