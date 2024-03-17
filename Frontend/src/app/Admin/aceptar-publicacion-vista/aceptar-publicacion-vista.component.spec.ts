import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarPublicacionVistaComponent } from './aceptar-publicacion-vista.component';

describe('AceptarPublicacionVistaComponent', () => {
  let component: AceptarPublicacionVistaComponent;
  let fixture: ComponentFixture<AceptarPublicacionVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarPublicacionVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptarPublicacionVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
