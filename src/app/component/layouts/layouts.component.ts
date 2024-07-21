import { Component } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {
  
  // Mevcut dil ve dil seçenekleri
  public selectedLanguage: string = 'en'; // Varsayılan dil
  public languages: { code: string, name: string, flag: string }[] = [
    { code: 'en', name: 'English', flag: 'flag-united-kingdom' },
    { code: 'fr', name: 'Français', flag: 'flag-france' },
    { code: 'pt', name: 'Português', flag: 'flag-portugal' }
  ];

  // Dil seçimini değiştirme fonksiyonu
  selectLanguage(languageCode: string): void {
    this.selectedLanguage = languageCode;
  }


}