import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonBackDirective } from './button-back.directive';
import { NavigationBackService } from './navigation-back.service';


describe('ButtonBackDirective', () => {
  it('should create an instance', () => {
    const service = TestBed.inject(NavigationBackService);
    const directive = new ButtonBackDirective(service);
    expect(directive).toBeTruthy();
  });
});
