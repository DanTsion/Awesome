import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isSidenavCollapsed: BehaviorSubject<boolean | null> = new BehaviorSubject(null);
  public readonly isSidenavCollapsed$: Observable<boolean|null> = this.isSidenavCollapsed.asObservable();
  
  constructor() { }

  public toggleSidenav(): void {
    
    this.isSidenavCollapsed.next(true);
  }

}
