import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStatusComponent } from './shared/user-status/user-status.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UserStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
