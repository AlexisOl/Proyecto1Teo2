import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosEspecificosVentaComponent } from './comentarios-especificos-venta.component';

describe('ComentariosEspecificosVentaComponent', () => {
  let component: ComentariosEspecificosVentaComponent;
  let fixture: ComponentFixture<ComentariosEspecificosVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariosEspecificosVentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentariosEspecificosVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
