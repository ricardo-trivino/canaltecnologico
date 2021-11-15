import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposUsComponent } from './tipos-us.component';

describe('TiposUsComponent', () => {
  let component: TiposUsComponent;
  let fixture: ComponentFixture<TiposUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
