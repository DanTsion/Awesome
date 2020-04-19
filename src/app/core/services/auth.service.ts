import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, tap, catchError, finalize, concatMap, mergeMap } from 'rxjs/operators';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly user$: Observable<User | null> = this.user.asObservable();

  constructor(private http: HttpClient,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService) { }

  public login(email: string, password: string): Observable<User | null> {
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
                   ${environment.firebase.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        return this.usersService.get(userId, jwt);
      })
    );
  }


  public register(name: string, email: string, password: string): Observable<User | null> {

    const url =
      `${environment.firebase.auth.baseURL}/signupNewUser?key=
    ${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.loaderService.setLoading(true);

    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name
        });

        return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  logOut() {
    this.user.next(null);
  }
}

