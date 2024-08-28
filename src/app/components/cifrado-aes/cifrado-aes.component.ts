import { Component, inject } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cifrado-aes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cifrado-aes.component.html',
  styleUrl: './cifrado-aes.component.css'
})
export class CifradoAesComponent {
  text: string = '';
  key: string = '';
  encryptedText: string = '';
  decryptedText: string = '';

  cryptoService= inject (CryptoService)

  encryptText() {
    this.encryptedText = this.cryptoService.encrypt(this.text, this.key);
  }

  decryptText() {
    this.decryptedText = this.cryptoService.decrypt(this.encryptedText, this.key);
  }
}
