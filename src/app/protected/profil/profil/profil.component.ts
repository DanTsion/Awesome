import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-profil',
  templateUrl: './profil.component.html',
  styles: []
})
export class ProfilComponent implements OnInit {

  profilForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService) { }

  ngOnInit() {
    this.profilForm = this.fb.group(
      {
        name: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9_-]*$'),
        Validators.maxLength(20),
      ]],
        avatar: ['',
      [
        Validators.pattern('https?://.+')
      ]]
      }
    );
  }

  get name() { return this.profilForm.get('name') };
  get avatar() { return this.profilForm.get('avatar') };

  submit(){
    const user: User = this.authService.currentUser;
    user.name = this.name.value;
    user.avatar = this.avatar.value;
    this.authService.updateUserState(user).subscribe();
  }
}
