import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://filmquarry.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) {}  
  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  /*-------- Get all movies --------*/
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getAllMoviesHandleError)
    );

  }

  private getAllMoviesHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error extracting movie data, please contact the developer.');
  }

  /*-------- Movie Description --------*/
   getMovieByTitle(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getMovieByTitleHandleError)
    );
  }

  private getMovieByTitleHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error retieving movie synopsis, please contact the developer.');
  }

  /*-------- Director Info --------*/
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getDirectorHandleError)
    );
  }

  private getDirectorHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error retieving director info, please contact the developer.');
  }

  /*-------- Genre Info --------*/
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.getGenreHandleError)
    );
  }

  private getGenreHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error retieving genre info, please contact the developer.');
  }

    /*-------- New User --------*/
    public userRegistration(userDetails: any): Observable<any> {
      return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.userRegistrationHandleError)
      );
    }
  
    private userRegistrationHandleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
        );
      }
      
      if(error.status === 400 ){
        return throwError(`Username ${error.error}. Please login to your account`);
      } else {      
        return throwError(`Error registering user, please check all required fields`);
      }    
    }
  
    /*-------- Login user --------*/
    public userLogin(userDetails: any): Observable<any> {
      return this.http
        .post(apiUrl + 'login', userDetails)
        .pipe(catchError(this.userLoginHandleError));
    }
  
    private userLoginHandleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
        );
      }
      return throwError('Error logging in, please try again!');
    }
  
  /*-------- Get User Info --------*/
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.getUserHandleError));
  }

  private getUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body: ${error.error}`
      );
    }
    return throwError('Error retrieving user account data, please contact the developer.');
  }

  /*-------- Add movie to Fav --------*/
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.patch(apiUrl + `users/${user}/Movies/${id}`, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.addFavoriteHandleError)
    );
  }

  private addFavoriteHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error adding movie to favorites list, please contact the developer.');
  }

  /*-------- Remove movie from Fav --------*/
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}/Movies/${id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.removeFavoriteHandleError)
    );
  }

  private removeFavoriteHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error adding movie to favorites list, please contact the developer.');
  }

  /*-------- Edit User --------*/
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${user}`, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.editUserHandleError)
    );
  }

  private editUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error editing user info, please contact the developer.');
  }

  /*-------- Delete User --------*/
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.deleteUserHandleError)
    );
  }

  private deleteUserHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Error deleting profile, please contact the developer.');
  }
}