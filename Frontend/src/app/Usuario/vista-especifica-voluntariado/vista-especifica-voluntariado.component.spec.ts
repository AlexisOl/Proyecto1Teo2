import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEspecificaVoluntariadoComponent } from './vista-especifica-voluntariado.component';

describe('VistaEspecificaVoluntariadoComponent', () => {
  let component: VistaEspecificaVoluntariadoComponent;
  let fixture: ComponentFixture<VistaEspecificaVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaEspecificaVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaEspecificaVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
