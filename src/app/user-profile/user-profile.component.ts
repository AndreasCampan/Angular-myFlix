import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  isUser(): boolean {
    const user = localStorage.getItem('user');

    if(user === "testuser"){
      return false;
    } else {
      return true;
    }
  }
  editUserData(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '400px'
    });
  }

  deleteUser(): void {
    this.dialog.open(UserProfileDeleteComponent);
  }  

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.movieFav.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  removeFavorites(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }
  
}
