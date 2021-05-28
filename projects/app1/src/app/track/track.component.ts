import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'xtc1-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  constructor(private cookieService: CookieService) {
    let date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 15);
    this.cookieService.set('Test', 'Hello World', { sameSite: 'None', secure: true });
    // this.cookieService.set('Test', 'Hello World', { expires: date, sameSite: 'None', secure: true });
    // this.cookieService.set('Test', 'Hello World');
    localStorage.setItem('Test', 'Hello World!');
  }

  ngOnInit(): void {
  }

}
