import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  seats: any[] = [];
  selectedSeats: any[] = [];
  totalPrice: number = 0;
  pricePerSeat: number = 10; // Example price per seat

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Mock data for seats
    this.seats = this.generateSeats();

    // Optionally, retrieve the selected movie and time slot from the route parameters or state
  }

  generateSeats(): any[] {
    const seats = [];
    for (let i = 1; i <= 100; i++) {
      seats.push({
        label: `Seat ${i}`,
        status: i % 3 === 0 ? 'booked' : 'available', // Randomly mark some seats as booked
      });
    }
    return seats;
  }

  selectSeat(seat: any): void {
    if (seat.status === 'booked') {
      return;
    }
    if (seat.status === 'available') {
      seat.status = 'selected';
      this.selectedSeats.push(seat);
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.selectedSeats.length * this.pricePerSeat;
  }

  bookSeats(): void {
    // Handle the booking logic here
    alert('Seats booked successfully!');
    this.router.navigate(['../']);
  }
}
