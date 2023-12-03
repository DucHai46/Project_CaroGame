import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from './Message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SignalRService {

    private connection!: signalR.HubConnection;
    readonly Url = 'https://localhost:7130'
    
    constructor(private messageService: MessageService, private http: HttpClient ) { }
  
    public startConnection = () => {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7130/chatHub')
            .build();
    
      return  this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem("userToken");

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    ChatRoom(user: string, message: string, roomName: string) {
        this.connection.invoke('SendMessage', user, message, roomName)
        .catch(err => console.error(err));
    }

    public ReceiveMessage(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.connection.on('ReceiveMessage', (data, data_1) => {
                const message = data + ": " + data_1; // Tạo thông điệp
            
                resolve(message); // Trả về giá trị thông điệp qua Promise
            });
        });
    }

    async MessageFucn() {
        const message = await this.ReceiveMessage();
    }


    PlayChess(user: string, message: string, roomName: string) {
        this.connection.invoke('PlayChess', user, message, roomName)
        .catch(err => console.error(err));
    }

    public ReceiveChess(): Promise<string>  {
        return new Promise((resolve, reject) => {
            this.connection.on('ReceiveChess', (data, data_1) => {
                const message =  data_1; // Tạo thông điệp
            
                resolve(message); // Trả về giá trị thông điệp qua Promise
            });
        });
    }

    async ChessFucn() {
        const message = await this.ReceiveChess();
    }




    JoinRoom(roomName: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('roomName', roomName);

        return this.http.post(`${this.Url}/api/Chat/JoinRoom`, null, { headers, params });
    }



    LeaveRoom(roomName: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('roomName', roomName);

        return this.http.post(`${this.Url}/api/Chat/LeaveRoom`, null, { headers, params });
    }

}
