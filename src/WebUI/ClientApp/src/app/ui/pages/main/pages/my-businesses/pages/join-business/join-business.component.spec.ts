import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBusinessComponent } from './join-business.component';

describe('JoinBusinessComponent', () => {
  let component: JoinBusinessComponent;
  let fixture: ComponentFixture<JoinBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
