import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }
/**
 * Retrieves the list of favoured movies
 */
  favedMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.movieFav;
    });
  }

/**
 * Retrieves all the movies from the database
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

/**
 * On initialization both {@link getMovies} and {@link favedMovies} will run
 * returning all the movies and the user's favoured movies list
 */
  ngOnInit(): void {
    this.getMovies();
    this.favedMovies();
  }

/**
 * Retrieves info about a movie's genre
 * @param name Name of the genre
 * @param description Description of the genre
 */
  genreDetails(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

/**
 * Retrieves info about a movie's director
 * @param name Name of the director
 * @param bio Biography of the director
 */
  directorDetails(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio },
    });
  }

/**
 * Retrieves synopsis of the movie
 * @param synopsis Summary of the movie
 */
  synopsisDetails(synopsis: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis },
    });
  }

/**
 * Checks to see if the movie favoured has been favoured already
 * @param movieID The id of the specific movie
 */
  isFavoured(movieID: string): boolean {
    return this.favoriteMovieIds.includes(movieID);
  };
 
/**
 * Runs {@link isFavoured} to see if the clicked movie has been favoured or not.
 * If the movie has been favoured this function will unfavour it and vice versa.
 * @param id The id of the specific movie clicked
 */
  toggleFavouriteMovies(id: string): any {
    if (this.isFavoured(id)) {
      this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favourites!', 'Ok', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.fetchApiData.addFavorite(id).subscribe((response: any) => {
        this.snackBar.open('Added to favourites!', 'Ok', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
  }

}