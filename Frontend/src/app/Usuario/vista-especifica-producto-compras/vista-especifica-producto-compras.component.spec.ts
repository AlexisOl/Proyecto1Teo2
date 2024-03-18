import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaEspecificaProductoComprasComponent } from './vista-especifica-producto-compras.component';

describe('VistaEspecificaProductoComprasComponent', () => {
  let component: VistaEspecificaProductoComprasComponent;
  let fixture: ComponentFixture<VistaEspecificaProductoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaEspecificaProductoComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaEspecificaProductoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
