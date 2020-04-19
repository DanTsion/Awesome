import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isSidenavCollapsed: BehaviorSubject<boolean | null> = new BehaviorSubject(false);
  public readonly isSidenavCollapsed$: Observable<boolean|null> = this.isSidenavCollapsed.asObservable();
  
  constructor() { }

  public toggleSidenav() {
    // if(this.isSidenavCollapsed.value == true){
    //   this.isSidenavCollapsed.next(false);
    // }
    // else this.isSidenavCollapsed.next(true);
  
    this.isSidenavCollapsed.next(!this.isSidenavCollapsed.value);
  }
}
