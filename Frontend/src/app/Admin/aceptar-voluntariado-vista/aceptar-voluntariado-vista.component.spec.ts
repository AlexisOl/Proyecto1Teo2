import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarVoluntariadoVistaComponent } from './aceptar-voluntariado-vista.component';

describe('AceptarVoluntariadoVistaComponent', () => {
  let component: AceptarVoluntariadoVistaComponent;
  let fixture: ComponentFixture<AceptarVoluntariadoVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarVoluntariadoVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarVoluntariadoVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
