import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MovieListService } from 'src/app/services/movie-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private searchSubject = new Subject<string>();

  constructor(
    private movieListService: MovieListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTextValue) => {
        this.movieListService.setSearchQuery(searchTextValue);
      });
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchText);
  }

  onTitleClick() {
    this.router.navigate(['../']);
  }
}
