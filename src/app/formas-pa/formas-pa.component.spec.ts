import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasPaComponent } from './formas-pa.component';

describe('FormasPaComponent', () => {
  let component: FormasPaComponent;
  let fixture: ComponentFixture<FormasPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormasPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
