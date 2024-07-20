import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './component/layouts/layouts.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './component/home/home.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, '/assets/translate/');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient],
      },
    }),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
