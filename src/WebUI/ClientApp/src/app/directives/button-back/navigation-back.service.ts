import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class NavigationBackService {
  // private history: string[] = [];
  constructor(private router: Router, private location: Location) {
    // this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.history.push(event.urlAfterRedirects);
    //   }
    // });
  }
  back(link: string|null, replaceUrl: boolean): void {
    const historyState = this.location.getState() as any;
    if (link !== null){
      this.router.navigateByUrl(link,  {replaceUrl});
    }else if (historyState.navigationId > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('',  {replaceUrl: true});
    }
  }
}
