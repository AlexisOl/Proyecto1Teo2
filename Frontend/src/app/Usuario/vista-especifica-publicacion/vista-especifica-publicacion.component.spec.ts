import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEspecificaPublicacionComponent } from './vista-especifica-publicacion.component';

describe('VistaEspecificaPublicacionComponent', () => {
  let component: VistaEspecificaPublicacionComponent;
  let fixture: ComponentFixture<VistaEspecificaPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaEspecificaPublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaEspecificaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
