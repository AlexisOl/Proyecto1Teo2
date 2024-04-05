import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVoluntariadosComponent } from './vista-voluntariados.component';

describe('VistaVoluntariadosComponent', () => {
  let component: VistaVoluntariadosComponent;
  let fixture: ComponentFixture<VistaVoluntariadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaVoluntariadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaVoluntariadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
