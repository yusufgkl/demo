import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'commerce-demo';
  querySubscription: any;
  posts: any;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    
  }
}
