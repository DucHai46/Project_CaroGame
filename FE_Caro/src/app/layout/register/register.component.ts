import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { UserRegister } from 'src/app/models/UserRegister.model';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/Register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegister = new UserRegister;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm() {
    this.user = {
      UserName: "",
      Email: "",
      Password: "",
      ConfirmPass: "",
    }
  }


  checks(user: UserRegister) {
    if (user.ConfirmPass === '') {
      return null;
    }

    if (user.Password !== user.ConfirmPass) {
      return { mustMatch: true };
    }

    return false;
  }



  OnSubmit(form: NgForm) {
    if (!this.checks(this.user)) {
      this.userService.registerUser(this.user)
        .subscribe({
          next: (data: any) => {
            if (data.isSuccessfulRegistration == true) {
              this.resetForm();
              // console.log(data.errors)
              alert('User registration successful');
              this.router.navigate(['/login']);
            }
          }
        });
    }
  }

}
