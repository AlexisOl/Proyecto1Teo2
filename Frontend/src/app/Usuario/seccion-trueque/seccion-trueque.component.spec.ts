import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionTruequeComponent } from './seccion-trueque.component';

describe('SeccionTruequeComponent', () => {
  let component: SeccionTruequeComponent;
  let fixture: ComponentFixture<SeccionTruequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionTruequeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionTruequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
