import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carusel-publicacioes',
  standalone: true,
  imports: [NgbCarouselModule, FormsModule],
  templateUrl: './carusel-publicacioes.component.html',
  styleUrl: './carusel-publicacioes.component.css'
})
export class CaruselPublicacioesComponent {
  @Input() data: any

	images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

  constructor() { }

}
