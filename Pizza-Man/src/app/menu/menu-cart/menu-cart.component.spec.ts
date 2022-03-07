import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCartComponent } from './menu-cart.component';

describe('MenuCartComponent', () => {
  let component: MenuCartComponent;
  let fixture: ComponentFixture<MenuCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
