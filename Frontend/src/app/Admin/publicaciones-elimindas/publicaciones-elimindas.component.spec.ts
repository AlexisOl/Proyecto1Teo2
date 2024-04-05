import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesElimindasComponent } from './publicaciones-elimindas.component';

describe('PublicacionesElimindasComponent', () => {
  let component: PublicacionesElimindasComponent;
  let fixture: ComponentFixture<PublicacionesElimindasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesElimindasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicacionesElimindasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
