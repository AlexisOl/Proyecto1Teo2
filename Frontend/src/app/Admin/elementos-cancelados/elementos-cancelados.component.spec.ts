import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosCanceladosComponent } from './elementos-cancelados.component';

describe('ElementosCanceladosComponent', () => {
  let component: ElementosCanceladosComponent;
  let fixture: ComponentFixture<ElementosCanceladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementosCanceladosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementosCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
