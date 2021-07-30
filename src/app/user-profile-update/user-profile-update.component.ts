import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', DOB: '' };

  constructor(
    public fetchUserData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  
  editUser(): void {
    this.fetchUserData.editUser(this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', res.Username);
      this.snackBar.open('Profile updated successfully!', 'Ok', {
        duration: 2000
      });
    }, (res) => {
      console.log(res);
      this.snackBar.open(res, 'Ok', {
        duration: 2000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

}
