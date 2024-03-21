import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEspecificoComponent } from './producto-especifico.component';

describe('ProductoEspecificoComponent', () => {
  let component: ProductoEspecificoComponent;
  let fixture: ComponentFixture<ProductoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEspecificoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
