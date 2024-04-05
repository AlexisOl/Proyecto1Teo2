import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTruequesComponent } from './vista-trueques.component';

describe('VistaTruequesComponent', () => {
  let component: VistaTruequesComponent;
  let fixture: ComponentFixture<VistaTruequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaTruequesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaTruequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
