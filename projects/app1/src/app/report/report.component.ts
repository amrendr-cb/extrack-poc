import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'xtc1-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private cookieService: CookieService) {
    let date = new Date(Date.now());
    date.setSeconds(date.getSeconds() - 1);
    // this.cookieService.set('Test2', 'Hello World', { sameSite: 'None', secure: true });
    this.cookieService.set('Test', 'Hello World', { expires: date, sameSite: 'None', secure: true });
    // this.cookieService.set('Test', 'Hello World');
  }

  ngOnInit(): void {
  }

}
