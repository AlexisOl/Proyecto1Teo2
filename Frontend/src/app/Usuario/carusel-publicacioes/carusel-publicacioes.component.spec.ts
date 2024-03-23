import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaruselPublicacioesComponent } from './carusel-publicacioes.component';

describe('CaruselPublicacioesComponent', () => {
  let component: CaruselPublicacioesComponent;
  let fixture: ComponentFixture<CaruselPublicacioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaruselPublicacioesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaruselPublicacioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
