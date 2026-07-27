import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: false,
  templateUrl: './tags.html',
  styleUrl: './tags.scss',
})
export class Tags {
  tags = input.required<string[]>();
  breakLines = input(false);
  clickable = input(false);
  onClick = output<string>();
}
