import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { TrackComponent } from './track/track.component';
import { AjaxComponent } from './ajax/ajax.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    TrackComponent,
    AjaxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
