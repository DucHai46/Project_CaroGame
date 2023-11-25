import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from '../../models/UserLogin.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading_overlay: boolean = false;

  userlogin: UserLogin = new UserLogin;

  ngOnInit(): void {
    this.loading();
  }

  constructor(private router: Router) { }

  public loading = async () => {
    await new Promise(f => setTimeout(f, 1000));
    this.loading_overlay = true;
  }

  OnSubmit(form: Form) {
    if (this.userlogin.Email == "" && this.userlogin.Password == "") {
      this.router.navigate(["/lobby"]);
    }
  }

}
