import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';

export type WorkspaceViewState = {
  isSearchBarNeedToBeShown?: boolean;
  isFooterBarNeedToBeShown?: boolean;
  isTabBarNeedToBeShown?: boolean;
  currentTab?: string;
};

// export type Enterprise = {
//   isSearchBarNeedToBeShown?: boolean;
//   isFooterBarNeedToBeShown?: boolean;
//   isTabBarNeedToBeShown?: boolean;
//   currentTab?: string;
// };

@Injectable({
  providedIn: 'root'
})
export class WorkspaceStateService {
  viewState!: BehaviorSubject<WorkspaceViewState>;

  constructor() {
    this.viewState = new BehaviorSubject<WorkspaceViewState>({
      currentTab: '',
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true
    });
  }
  changeViewState(newValue: WorkspaceViewState): void{
    const prev = this.viewState.getValue();
    const newState = {...prev, ...newValue};
    this.viewState.next(newState);
  }


}
