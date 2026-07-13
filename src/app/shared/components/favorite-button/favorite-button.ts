import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  standalone: false,
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteButton {
  favorited = input.required<boolean>();
  favoritesCount = input.required<number>();
  // Presentational only — the parent decides what favoriting actually does (Epic 4).
  toggled = output<void>();
}
