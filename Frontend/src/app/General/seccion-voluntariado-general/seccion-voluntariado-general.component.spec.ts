import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionVoluntariadoGeneralComponent } from './seccion-voluntariado-general.component';

describe('SeccionVoluntariadoGeneralComponent', () => {
  let component: SeccionVoluntariadoGeneralComponent;
  let fixture: ComponentFixture<SeccionVoluntariadoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionVoluntariadoGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionVoluntariadoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
