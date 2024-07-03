import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private apiKey: string = '6f098d9d'; // Your OMDb API key
  private apiUrl: string = 'http://www.omdbapi.com/';
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  fetchMovies(page: number): Observable<any> {
    const url = `${this.apiUrl}?s=movie&page=${page}&apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}?s=${query}&apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getSearchObservable(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }
}
