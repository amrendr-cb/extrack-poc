import { Component } from '@angular/core';

@Component({
  selector: 'xtc2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app2';

  ngOnInit(): void {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log('Response\n', this.responseText);
    //     console.log('Headers\n', this.getAllResponseHeaders());
    //     // console.log('Header Data\n', this.getResponseHeader('Set-cookie'));

    //   }
    // };
    // xhttp.open("GET", "https://app1.test/assets/pixel.png", true);
    // xhttp.send();
  }

}
