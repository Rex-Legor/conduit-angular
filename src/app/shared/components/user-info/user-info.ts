import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo {
  avatar = input<string>();
  username = input.required<string>();
  date = input.required<string>();
}
