import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-compras-usuario',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './compras-usuario.component.html',
  styleUrl: './compras-usuario.component.css'
})
export class ComprasUsuarioComponent {

}
