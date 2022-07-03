import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToolbarHeaderComponent } from './main-toolbar-header.component';

describe('MainToolbarHeaderComponent', () => {
  let component: MainToolbarHeaderComponent;
  let fixture: ComponentFixture<MainToolbarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainToolbarHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
