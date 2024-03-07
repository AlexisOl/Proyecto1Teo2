import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatSliderModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private rutas: Router){}


  //funciones de rutas
  irInicio(){
    this.rutas.navigate(['/inicio'])
  }
  iraLogin(){
    this.rutas.navigate(['/login'])
  }


  ngOnInit(): void {}

}
