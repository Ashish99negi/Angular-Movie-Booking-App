import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css'],
})
export class BookingPageComponent implements OnInit {
  movie: any;
  availableTimes: string[] = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];
  today: Date = new Date();
  tomorrow: Date = new Date(this.today);
  dayAfterTomorrow: Date = new Date(this.today);
  selectedDate: Date = new Date();

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.movie = navigation.extras.state['movie'];
    }
  }

  ngOnInit(): void {
    if (!this.movie) {
      this.router.navigate(['/movies']);
    }
    // Set tomorrow's and day after tomorrow's dates
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.dayAfterTomorrow.setDate(this.dayAfterTomorrow.getDate() + 2);
  }

  dateChange(event: any): void {
    this.selectedDate = event;
  }

  selectTime(time: string): void {
    this.router.navigate(['/seat-selection'], {
      state: {
        movie: this.movie,
        time,
        date: this.selectedDate,
      },
    });
  }
}
