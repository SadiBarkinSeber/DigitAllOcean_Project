import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  //roof component
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title= 'DigitAllOcean';

  constructor(private translate: TranslateService){
    translate.setDefaultLang('tr');
  }
}
