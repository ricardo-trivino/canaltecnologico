import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasVeComponent } from './marcas-ve.component';

describe('MarcasVeComponent', () => {
  let component: MarcasVeComponent;
  let fixture: ComponentFixture<MarcasVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcasVeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
