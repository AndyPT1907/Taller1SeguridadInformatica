import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CifradoAesComponent } from './components/cifrado-aes/cifrado-aes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CifradoAesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cifrado_AES';
}
