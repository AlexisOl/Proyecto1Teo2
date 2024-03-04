import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVentaVisitaComponent } from './vista-venta-visita.component';

describe('VistaVentaVisitaComponent', () => {
  let component: VistaVentaVisitaComponent;
  let fixture: ComponentFixture<VistaVentaVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaVentaVisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaVentaVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
