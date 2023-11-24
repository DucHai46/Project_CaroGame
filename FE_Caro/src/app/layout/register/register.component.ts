import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { UserRegister } from 'src/app/models/UserRegister.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userregister: UserRegister = new UserRegister;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(form: Form) {
    alert("Đăng ký thành công")
    this.router.navigate(['/login'])
  }

}
