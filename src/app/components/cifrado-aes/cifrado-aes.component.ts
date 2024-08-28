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
  fileToEncrypt: File | null = null;
  fileToDecrypt: File | null = null;
  key: string = '';

  constructor(private cryptoService: CryptoService) {}

  onFileSelected(event: any, mode: 'encrypt' | 'decrypt') {
    const file = event.target.files[0];
    if (mode === 'encrypt') {
      this.fileToEncrypt = file;
    } else {
      this.fileToDecrypt = file;
    }
  }

  async encryptFile() {
    if (this.fileToEncrypt && this.key) {
      try {
        const encryptedBlob = await this.cryptoService.encryptFile(this.fileToEncrypt, this.key);
        this.downloadFile(encryptedBlob, `${this.fileToEncrypt.name}.enc`);
      } catch (error) {
        console.error('Error al cifrar el archivo:', error);
      }
    } else {
      alert('Por favor, selecciona un archivo y proporciona una clave.');
    }
  }

  async decryptFile() {
    if (this.fileToDecrypt && this.key) {
      try {
        const decryptedBlob = await this.cryptoService.decryptFile(this.fileToDecrypt, this.key);
        this.downloadFile(decryptedBlob, this.fileToDecrypt.name.replace('.enc', ''));
      } catch (error) {
        console.error('Error al descifrar el archivo:', error);
        alert('Hubo un problema al descifrar el archivo. Por favor, verifica la clave y el archivo.');
      }
    } else {
      alert('Por favor, selecciona un archivo y proporciona una clave.');
    }
  }

  downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
