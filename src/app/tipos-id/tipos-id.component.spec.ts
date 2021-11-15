import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposIdComponent } from './tipos-id.component';

describe('TiposIdComponent', () => {
  let component: TiposIdComponent;
  let fixture: ComponentFixture<TiposIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
