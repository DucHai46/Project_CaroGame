import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from './Message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SignalRService {

    private connection!: signalR.HubConnection;
    readonly Url = 'https://localhost:7130'
    public messageReceived: EventEmitter<any> = new EventEmitter<any>();

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

    public ChatRoom(user: string, message: string, roomName: string): Promise<void> {
        // Gửi tin nhắn bằng cách gọi phương thức SendMessage từ server SignalR
        return this.connection.invoke('SendMessage', user, message, roomName);
    }

    public ReceiveMessage(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.connection.on('ReceiveMessage', (data, data_1) => {
                const message = data + ": " + data_1; // Tạo thông điệp
            
                resolve(message); // Trả về giá trị thông điệp qua Promise
            });
        });
    }

    public OnReceiveMessageChat() {
        this.connection.on('ReceiveMessage', (data: any) => {
            console.log(data);
        })
    }

    async MessageFucn() {
        const message = await this.ReceiveMessage();
    }

    // public PlayChess(user: string, message: string, roomName: string): Promise<void> {
    //     // Gửi tin nhắn bằng cách gọi phương thức SendMessage từ server SignalR
    //     return this.connection.invoke('PlayChess', user, message, roomName);
    // }

    // public ReceiveChess(): Promise<string>  {
    //     return new Promise((resolve, reject) => {
    //         this.connection.on('ReceiveChess', (data, data_1) => {
    //             const message =  data_1; // Tạo thông điệp
            
    //             resolve(message); // Trả về giá trị thông điệp qua Promise
    //         });
    //     });
    // }

    // async ChessFucn() {
    //     const message = await this.ReceiveChess();
    // }

    public JoinRoom(roomName: string): Promise<void> {
        console.log("JoinRoom call");
        return this.connection.invoke('JoinRoom', roomName);
    }

    public LeaveRoom(roomName: string): Promise<void> {
        return this.connection.invoke('LeaveRoom', roomName);
    }
}
