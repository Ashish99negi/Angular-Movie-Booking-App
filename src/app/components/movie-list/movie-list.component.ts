import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListService } from 'src/app/services/movie-list.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  title = 'Movies';
  movies: any[] = [];

  constructor(
    private movieListService: MovieListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMoviesData();
    this.movieListService.getSearchObservable().subscribe((query) => {
      if (query) {
        this.searchMovies(query);
      } else {
        this.getMoviesData();
      }
    });
  }

  getMoviesData() {
    this.movies = []; // Reset movies list
    for (let page = 1; page <= 1; page++) {
      this.movieListService.fetchMovies(page).subscribe(
        (data) => {
          if (data.Search) {
            this.movies = this.movies.concat(data.Search);
          }
        },
        (error) => {
          console.error('Error fetching movies', error);
        }
      );
    }
  }

  searchMovies(query: string) {
    this.movieListService.searchMovies(query).subscribe(
      (data) => {
        this.movies = data.Search || [];
      },
      (error) => {
        console.error('Error searching movies', error);
      }
    );
  }

  bookTickets(movie: any): void {
    this.router.navigate(['/booking'], { state: { movie } });
  }
}
