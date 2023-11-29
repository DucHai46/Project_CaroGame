import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/Room.model';
import * as signalR from "@microsoft/signalr";
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/service/Room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private connection: signalR.HubConnection | undefined
  room: Room = new Room

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) { }
  stringChat: any
  historyChat: string[] = []
  Username: any
  Room_Id: any

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.Room_Id = idParam ? parseInt(idParam) : 0;

    this.Username = this.route.snapshot.paramMap.get('username');


    this.roomService.GetRoombyId(this.Room_Id).subscribe({
      next: (data: any) => {
        this.room = data
      }
    })

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();

    this.connection.on("ReceiveMessage", (user: string, message: string) => {
      this.historyChat.push(user + ": " + message)
    });

    this.connection.on("PlayChess", (user: string, message: string) => {
      this.room.ChessBoard_state = message
      this.squares = this.room.ChessBoard_state.split('');
    });
  }

  chat() {
    this.connection?.invoke("SendMessage", this.Username, this.stringChat, this.room.Id.toString())
  }


  LeaveRoom() {
    this.connection?.invoke("LeaveRoom", this.Room_Id.toString());
    this.roomService.LeaveRoom(this.Room_Id, this.Username).subscribe({
      next: (data: any) => { }
    })
    this.router.navigate(['/lobby'])
  }



  reset() {
    this.squares.fill('_');
    this.room.ChessBoard_state = this.squares.join('')
    this.connection?.invoke("PlayChess", this.Username, this.room.ChessBoard_state, this.room.Id.toString())
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
    this.connection?.invoke("PlayChess", this.Username, this.room.ChessBoard_state, this.room.Id.toString())
  }

}
