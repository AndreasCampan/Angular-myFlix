import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  // Directs to registration modal
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
  // Assigning the dialog a width
    width: '280px'
    });
  }

  // Directs to login modal
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {});
  }
}