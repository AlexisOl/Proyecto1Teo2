import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCompraVisitaComponent } from './vista-compra-visita.component';

describe('VistaCompraVisitaComponent', () => {
  let component: VistaCompraVisitaComponent;
  let fixture: ComponentFixture<VistaCompraVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCompraVisitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaCompraVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
