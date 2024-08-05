import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.css',
})
export class ShowCardComponent {
  @Input() movie: any;
  @Input() base_poster_url = 'https://image.tmdb.org/t/p/w500';
}
