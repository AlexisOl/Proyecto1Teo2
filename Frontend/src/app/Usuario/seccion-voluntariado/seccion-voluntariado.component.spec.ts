import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionVoluntariadoComponent } from './seccion-voluntariado.component';

describe('SeccionVoluntariadoComponent', () => {
  let component: SeccionVoluntariadoComponent;
  let fixture: ComponentFixture<SeccionVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
