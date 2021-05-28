import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'xtc1-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  cookie = '';
  local: string | null = '' ;
  constructor(private cookieService: CookieService) {
    this.cookie = JSON.stringify(this.cookieService.getAll());

    let date = new Date(Date.now());
    date.setSeconds(date.getSeconds() - 1);
    // this.cookieService.set('Test2', 'Hello World', { sameSite: 'None', secure: true });
    this.cookieService.set('Test', 'Hello World', { expires: date, sameSite: 'None', secure: true });
    // this.cookieService.set('Test', 'Hello World');
    this.local = localStorage.getItem('Test');
  }

  ngOnInit(): void {
  }

}
