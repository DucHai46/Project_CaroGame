import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    readonly Url = 'https://localhost:7130'
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem("userToken");

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    GetAllUser() {
        const headers = this.getHeaders();

        return this.http.get(`${this.Url}/api/User/GetAllUser`, { headers });
    }



}
