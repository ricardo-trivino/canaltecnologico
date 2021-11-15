import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposVeComponent } from './tipos-ve.component';

describe('TiposVeComponent', () => {
  let component: TiposVeComponent;
  let fixture: ComponentFixture<TiposVeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposVeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
