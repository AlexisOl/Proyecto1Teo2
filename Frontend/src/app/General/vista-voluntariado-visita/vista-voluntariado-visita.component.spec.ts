import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVoluntariadoVisitaComponent } from './vista-voluntariado-visita.component';

describe('VistaVoluntariadoVisitaComponent', () => {
  let component: VistaVoluntariadoVisitaComponent;
  let fixture: ComponentFixture<VistaVoluntariadoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaVoluntariadoVisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaVoluntariadoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
