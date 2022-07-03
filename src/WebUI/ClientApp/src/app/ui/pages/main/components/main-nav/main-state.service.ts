import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MainStateState = {
  isFooterBarNeedToBeShown?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class MainStateService {
  viewState!: BehaviorSubject<MainStateState>;

  constructor() {

    this.viewState = new BehaviorSubject<MainStateState>({
      isFooterBarNeedToBeShown: true,
    });
  }

  changeViewState(newValue: MainStateState): void{
    const prev = this.viewState.getValue();
    const newState = {...prev, ...newValue};
    this.viewState.next(newState);
  }
}
