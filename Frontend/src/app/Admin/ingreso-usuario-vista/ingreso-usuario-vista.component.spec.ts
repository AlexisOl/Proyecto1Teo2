import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoUsuarioVistaComponent } from './ingreso-usuario-vista.component';

describe('IngresoUsuarioVistaComponent', () => {
  let component: IngresoUsuarioVistaComponent;
  let fixture: ComponentFixture<IngresoUsuarioVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoUsuarioVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoUsuarioVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
