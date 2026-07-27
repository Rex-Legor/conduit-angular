import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: false,
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class Tab {
  isActive = input<boolean>(false);
  onClick = output();
}
