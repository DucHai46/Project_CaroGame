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



  turn: number = 1
  reset() {
    this.squares.fill('_');
  }
  tick(index: number) {
    if (this.squares[index] === '_' && this.turn == 1) {
      this.squares[index] = 'x';
      this.turn = 3 - this.turn
    }
    else if (this.squares[index] === '_' && this.turn == 2) {
      this.squares[index] = 'o';
      this.turn = 3 - this.turn
    }
  }
  squares: string[] = this.room.ChessBoard_state.split('');

}
