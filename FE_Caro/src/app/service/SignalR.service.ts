import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from './Message.service';

@Injectable()
export class SignalRService {

    private connection!: signalR.HubConnection;

    constructor(private messageService: MessageService ) { }
  
    public startConnection(): Promise<void> {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7130/chatHub')
            .build();
        
        this.connection.on('ReceiveMessage', (user: string, message: string) => {
            // Gửi tin nhắn nhận được tới MessageService
            this.messageService.sendMessage({ user, message });
        });

        this.connection.on('ReceiveChess', (user: string, message: string) => {
            // Gửi tin nhắn nhận được tới MessageService
            this.messageService.sendchess({ user, message });
        });
      return this.connection.start();
    }

    public sendMessage(user: string, message: string, roomName: string): Promise<void> {
      return this.connection.invoke('SendMessage', user, message, roomName);
    }
    
    public playChess(user: string, message: string, roomName: string): Promise<void>{
        return this.connection.invoke('PlayChess', user, message, roomName)
    }

    public joinRoom(room: string): Promise<void>{
        return this.connection.invoke('JoinRoom', room)
    }

    public leaveRoom(room: string): Promise<void>{
        return this.connection.invoke('LeaveRoom', room)
    }
}
