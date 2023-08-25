import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageComponent } from './info-page.component';

describe('InfoPageComponentComponent', () => {
  let component: InfoPageComponent;
  let fixture: ComponentFixture<InfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
