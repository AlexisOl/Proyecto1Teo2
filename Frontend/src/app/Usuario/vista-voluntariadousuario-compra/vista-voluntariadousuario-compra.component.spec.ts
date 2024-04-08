import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVoluntariadousuarioCompraComponent } from './vista-voluntariadousuario-compra.component';

describe('VistaVoluntariadousuarioCompraComponent', () => {
  let component: VistaVoluntariadousuarioCompraComponent;
  let fixture: ComponentFixture<VistaVoluntariadousuarioCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaVoluntariadousuarioCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaVoluntariadousuarioCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
