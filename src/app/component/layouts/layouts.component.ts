import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent {

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr', 'pt']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    const supportedLangs = ['en', 'fr', 'pt'];
    const defaultLang = 'en';

    if (browserLang && supportedLangs.includes(browserLang)) {
      this.translate.use(browserLang).subscribe({
        error: () => this.translate.use(defaultLang)
      });
    } else {
      this.translate.use(defaultLang);
    }
  }

  // Dil seçimini değiştirme fonksiyonu
  switchLanguage(language: string) {
    this.translate.use(language).subscribe({
      error: () => console.error('Error switching language')
    });
  }
}