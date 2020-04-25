import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'al-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public homePath = 'home';
  public loginPath = 'login';
  public user: User;
  private subscription: Subscription;
  public registerPath = 'register';
  public protectedPath = 'app/parameters'

  constructor(private router: Router,
    private layoutService: LayoutService,
    private authService: AuthService, 
    private toastr:ToastrService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription =
      this.authService.user$.subscribe(
        _ => this.user = _
      );
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  public toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  public click() {
    this.authService.logOut();
    this.toastr.showToastr({
      category: "success",
      message: "Deconnexion effective"
    })
  }
}

