import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GLOBAL_PATH } from 'src/app/core/constant/routes';

@Injectable()
export class NavigationBackService {
  private history: string[] = [];
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  back(link: string|null, replaceUrl: boolean): void {
    // console.log(this.history);
    // this.history.pop();
    if (link !== null){
      this.router.navigateByUrl(link,  {replaceUrl});
    }else if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl(GLOBAL_PATH.MAIN_HOME,  {replaceUrl: true});
    }
  }
}
