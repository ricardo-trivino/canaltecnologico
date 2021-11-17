import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesTrComponent } from './ordenes-tr.component';

describe('OrdenesTrComponent', () => {
  let component: OrdenesTrComponent;
  let fixture: ComponentFixture<OrdenesTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenesTrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
