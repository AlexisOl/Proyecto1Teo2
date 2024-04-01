import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionCuponesComponent } from './seccion-cupones.component';

describe('SeccionCuponesComponent', () => {
  let component: SeccionCuponesComponent;
  let fixture: ComponentFixture<SeccionCuponesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionCuponesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
