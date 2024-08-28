import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  
    encryptText(text: string, key: string): string {
      return CryptoJS.AES.encrypt(text, key).toString();
    }
  
    decryptText(ciphertext: string, key: string): string {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  
    encryptFile(file: File, key: string): Promise<Blob> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const wordArray = CryptoJS.lib.WordArray.create(reader.result as any);
          const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();
          const blob = new Blob([encrypted], { type: file.type });
          resolve(blob);
        };
        reader.onerror = error => reject(error);
        reader.readAsArrayBuffer(file);
      });
    }
  
    decryptFile(encryptedBlob: Blob, key: string): Promise<Blob> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const encrypted = reader.result as string;
          const bytes = CryptoJS.AES.decrypt(encrypted, key);
          const decryptedData = CryptoJS.enc.Base64.stringify(bytes);
  
          if (!decryptedData) {
            reject('El archivo no pudo ser descifrado o la clave es incorrecta.');
          } else {
            const byteCharacters = atob(decryptedData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });
            resolve(blob);
          }
        };
        reader.onerror = error => reject(error);
        reader.readAsText(encryptedBlob);
      });
    }
}
