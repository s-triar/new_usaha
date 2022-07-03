import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DashboardViewState = {
  // isSearchBarNeedToBeShown?: boolean;
  isFooterBarNeedToBeShown?: boolean;
  // isTabBarNeedToBeShown?: boolean;
  currentTab?: string;
};

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  viewState: BehaviorSubject<DashboardViewState> ;

  constructor() {
    this.viewState = new BehaviorSubject<DashboardViewState>({
      currentTab: '',
      isFooterBarNeedToBeShown: false,
      // isSearchBarNeedToBeShown: true,
      // isTabBarNeedToBeShown: true
    });
  }
  changeViewState(newValue: DashboardViewState): void{
    const prev = this.viewState.getValue();
    const newState = {...prev, ...newValue};
    this.viewState.next(newState);
  }
}
