import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioVoluntariadoEspecificoComponent } from './comentario-voluntariado-especifico.component';

describe('ComentarioVoluntariadoEspecificoComponent', () => {
  let component: ComentarioVoluntariadoEspecificoComponent;
  let fixture: ComponentFixture<ComentarioVoluntariadoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioVoluntariadoEspecificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioVoluntariadoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
