import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xtc1-ajax',
  templateUrl: './ajax.component.html',
  styleUrls: ['./ajax.component.scss']
})
export class AjaxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     console.log('Response\n', this.responseText);
    //     console.log('Headers\n', this.getAllResponseHeaders());
    //     console.log('Header Data\n', this.getResponseHeader('Set-Cookie'));
    //     this.get

    //   }
    // };
    // xhttp.open("GET", "https://app1.test/assets/pixel.png", true);
    // xhttp.send();
  }

}
