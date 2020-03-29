import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly user$: Observable<User | null> = this.user.asObservable();

  constructor() { }

  login(email: string, password: string): Observable<User | null> {
    return null;
  }

  register(userName: string, email: string, password: string): Observable<User | null> {
    return null;
  }

  logOut() {
    this.user.next(null);
  }
}

