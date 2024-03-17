import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionComentarioVistaComponent } from './seccion-comentario-vista.component';

describe('SeccionComentarioVistaComponent', () => {
  let component: SeccionComentarioVistaComponent;
  let fixture: ComponentFixture<SeccionComentarioVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionComentarioVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionComentarioVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
