import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVistaComponent } from './login-vista.component';

describe('LoginVistaComponent', () => {
  let component: LoginVistaComponent;
  let fixture: ComponentFixture<LoginVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
