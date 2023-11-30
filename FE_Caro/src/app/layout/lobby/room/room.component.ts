import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/Room.model';
import * as signalR from "@microsoft/signalr";
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/service/Room.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SignalRService } from 'src/app/service/SignalR.service';
import { MessageService } from 'src/app/service/Message.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private connection: signalR.HubConnection | undefined
  stringChat: any
  historyChat: string[] = []
  Username: any = this.route.snapshot.paramMap.get('username')
  idParam = this.route.snapshot.paramMap.get('id')
  Room_Id: any = this.idParam ? parseInt(this.idParam)+1 : 1
  room: Room = new Room
  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router, private chatService: SignalRService, private messageService: MessageService ) { }

  ngOnInit(): void {
    if(this.Room_Id !== null){
        this.roomService.GetRoombyId(this.Room_Id).subscribe({
          next: (data: any) => {
            if(data !== null){
              this.room = data
              console.log(this.room)
            }
            else {
              console.log("lỗiiii")
            }
          }
        })
    }

    this.chatService.startConnection()
      .then(() => {
        console.log('SignalR connection started successfully.');
      })
      .catch(error => {
        console.error('Error starting SignalR connection:', error);
      });

      this.messageService.getMessage().subscribe(message => {
        this.historyChat.push(message);
      });

      this.messageService.getchess().subscribe(chess => {
        this.room.ChessBoard_state = chess
      })
}

  chat() {
    this.historyChat.push(this.stringChat)
    this.chatService.sendMessage(this.Username, this.stringChat, this.Room_Id.toString())
  }


  async LeaveRoom() {
    this.chatService.leaveRoom(this.Room_Id.toString())
    this.roomService.LeaveRoom(this.Room_Id, this.Username).subscribe({
      next: (data: any) => { }
    })
    this.router.navigate(['/lobby'])
  }

  reset() {
    this.squares.fill('_');
    this.room.ChessBoard_state = this.squares.join('')
    this.chatService.playChess(this.Username, this.room.ChessBoard_state, this.room.Id.toString())
  }
  squares: string[] = this.room.ChessBoard_state.split('');
  tick(index: number) {
    this.roomService.GetTurn(this.Room_Id).subscribe({
      next: (data: any) => {
        this.room.Turn = data;
      }
    })
    if (this.squares[index] === '_' && this.room.Turn == 1) {
      this.squares[index] = 'x';
    }
    else if (this.squares[index] === '_' && this.room.Turn == 2) {
      this.squares[index] = 'o';
    }

    this.room.ChessBoard_state = this.squares.join('')
    this.chatService.playChess(this.Username, this.room.ChessBoard_state, this.room.Id.toString())

  }

}
