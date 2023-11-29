import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/Room.model';

@Injectable()
export class RoomService {

    readonly Url = 'https://localhost:7130'
    constructor(private http: HttpClient) { }

    GetAllRoom() {
        // const body: Room = {
        //     Id: room.Id,
        //     Player1: room.Player1,
        //     Player2: room.Player2,
        //     ChessBoard_state: room.ChessBoard_state,
        //     Score_1: room.Score_1,
        //     Score_2: room.Score_2,
        //     Turn: room.Turn

        // }

        return this.http.get(this.Url + '/api/Room/GetAllRoom');
    }

    GetRoombyId(id: number) {
        let params = new HttpParams();
        params = params.append('id', id);

        return this.http.get(this.Url + '/api/room/GetRoom', { params });
    }

    JoinRoom(id: number, name: string) {
        let params = new HttpParams();
        params = params.append('id', id);
        params = params.append('name', name);

        return this.http.post(this.Url + '/api/room/JoinRoom', { params });
    }

    LeaveRoom(id: number, name: string) {
        let params = new HttpParams();
        params = params.append('id', id);
        params = params.append('name', name);

        return this.http.post(this.Url + '/api/room/LeaveRoom', { params });
    }

}
