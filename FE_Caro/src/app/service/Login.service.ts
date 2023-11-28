import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../models/UserLogin.model';

@Injectable()
export class LoginService {

    public readonly url = 'https://localhost:7130';
    authChanged: any;
    constructor(private http: HttpClient) { }

    loginUser(user: UserLogin) {
        const body: UserLogin = {
            Email: user.Email,
            Password: user.Password
        }

        return this.http.post(this.url + "/api/Account/Login", body);
    }



    public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
        this.authChanged = isAuthenticated;
    }

    public logout = () => {
        localStorage.removeItem("userToken");
        this.sendAuthStateChangeNotification(false);
    }

}
