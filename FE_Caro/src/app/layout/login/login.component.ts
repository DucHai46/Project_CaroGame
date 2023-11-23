import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading_overlay: boolean = false;

  ngOnInit(): void {
    this.loading();
  }

  constructor() { }

  public loading = async () => {
    await new Promise(f => setTimeout(f, 3000));
    this.loading_overlay = true;
  }

}
