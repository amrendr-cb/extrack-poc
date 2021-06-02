import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjaxComponent } from './ajax/ajax.component';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: 'track', component: TrackComponent },
  { path: 'report', component: ReportComponent },
  { path: 'ajax', component: AjaxComponent },
  // { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
