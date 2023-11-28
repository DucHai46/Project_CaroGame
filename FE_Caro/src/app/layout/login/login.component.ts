import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLogin } from '../../models/UserLogin.model';
import { LoginService } from 'src/app/service/Login.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: UserLogin = new UserLogin;
  isLoginError: boolean = false;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit() {
    this.user = {
      Email: "",
      Password: ""
    }
  }

  OnSubmit(form: NgForm) {
    this.loginservice.loginUser(this.user)
      .subscribe({
        next: (data: any) => {
          if (data.isAuthSuccessful == true) {
            localStorage.setItem('userToken', data.token);
            this.loginservice.sendAuthStateChangeNotification(true);
            // alert("Login Successful")
            this.router.navigate(['/lobby']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoginError = true;
          alert("Đăng nhập thất bại")
        }
      });
  }

}
