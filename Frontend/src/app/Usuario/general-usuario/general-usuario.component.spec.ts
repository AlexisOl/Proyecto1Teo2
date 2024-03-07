import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUsuarioComponent } from './general-usuario.component';

describe('GeneralUsuarioComponent', () => {
  let component: GeneralUsuarioComponent;
  let fixture: ComponentFixture<GeneralUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
