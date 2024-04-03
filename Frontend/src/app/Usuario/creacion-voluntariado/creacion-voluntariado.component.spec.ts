import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionVoluntariadoComponent } from './creacion-voluntariado.component';

describe('CreacionVoluntariadoComponent', () => {
  let component: CreacionVoluntariadoComponent;
  let fixture: ComponentFixture<CreacionVoluntariadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionVoluntariadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreacionVoluntariadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
