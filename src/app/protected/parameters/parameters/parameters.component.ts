import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'al-parameters',
  templateUrl: './parameters.component.html',
  styles: []
})
export class ParametersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  user: User;
  parametersForm: FormGroup;
  pomodoros: number[] = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  constructor(public fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => this.user = user);
    this.parametersForm = this.fb.group({
      pomodoro: ['', [Validators.required]]
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const user: User = this.authService.currentUser;
    user.pomodoroDuration = this.parametersForm.get('pomodoro').value * 60;
    this.authService.updateUserState(user).subscribe();

    console.log(this.user);
  }
}
