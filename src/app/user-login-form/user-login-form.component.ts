import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;

  @Input() userData ={ Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.isLoading = true;
      this.dialogRef.close();
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      this.snackBar.open('Successful Login!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.isLoading = true;
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}