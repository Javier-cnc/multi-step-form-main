import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationButtonsBarComponent } from './navigation-buttons-bar.component';

describe('NavigationButtonsBarComponent', () => {
  let component: NavigationButtonsBarComponent;
  let fixture: ComponentFixture<NavigationButtonsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationButtonsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
