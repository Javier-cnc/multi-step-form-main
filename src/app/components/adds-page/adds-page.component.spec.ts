import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsPageComponent } from './adds-page.component';

describe('AddsPageComponent', () => {
  let component: AddsPageComponent;
  let fixture: ComponentFixture<AddsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
