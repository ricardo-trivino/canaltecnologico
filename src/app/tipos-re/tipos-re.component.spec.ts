import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposReComponent } from './tipos-re.component';

describe('TiposReComponent', () => {
  let component: TiposReComponent;
  let fixture: ComponentFixture<TiposReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposReComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
