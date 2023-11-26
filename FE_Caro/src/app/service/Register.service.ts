import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../models/UserRegister.model';

@Injectable()
export class RegisterService {

    readonly Url = 'https://localhost:7207'
    constructor(private http: HttpClient) { }

    registerUser(user: UserRegister) {
        const body: UserRegister = {
            UserName: user.UserName,
            Email: user.Email,
            Password: user.Password,
            ConfirmPass: user.ConfirmPass,
        }

        return this.http.post(this.Url + '/api/Account/Registration', body);
    }
}
