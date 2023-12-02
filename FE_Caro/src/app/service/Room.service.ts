import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/Room.model';

@Injectable()
export class RoomService {

    readonly Url = 'https://localhost:7130'
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem("userToken");

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    UpdateBoard(id: number, chess: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('idroom', id.toString());
        params = params.append('chessboard', chess);

        return this.http.post(`${this.Url}/api/Room/UpdateBoard`, null, { headers, params });
    }

    GetAllRoom() {
        const headers = this.getHeaders();

        return this.http.get(`${this.Url}/api/Room/GetAllRoom`, { headers });
    }

    GetRoombyId(id: number) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('id', id.toString());

        return this.http.get(`${this.Url}/api/Room/GetRoom`, { headers, params });
    }

    GetTurn(id: number) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('idroom', id.toString());

        return this.http.post(`${this.Url}/api/Room/GetTurn`, null, { headers, params });
    }



    JoinRoom(id: number, name: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        if(id !== undefined && id !== null){
            params = params.append('id', id.toString());
            params = params.append('name', name);
        }
        else {
            console.log("không tồn tại")
        }
        return this.http.post(`${this.Url}/api/Room/JoinRoom`, null, { headers, params });
    }

    LeaveRoom(id: number, name: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('id', id.toString());
        params = params.append('name', name);

        return this.http.post(`${this.Url}/api/Room/LeaveRoom`, null, { headers, params });
    }

}
