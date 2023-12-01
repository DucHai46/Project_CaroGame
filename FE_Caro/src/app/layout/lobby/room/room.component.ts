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

  stringChat: any
  historyChat: string[] = []
  Username: any = this.route.snapshot.paramMap.get('username')
  idParam = this.route.snapshot.paramMap.get('id')
  Room_Id: any = this.idParam ? parseInt(this.idParam)+1 : 1
  room: Room = new Room
  squares: string[][] = [];
  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router, private chatService: SignalRService, private messageService: MessageService ) { }

  ngOnInit(): void {
    if(this.Room_Id !== null){
        this.roomService.GetRoombyId(this.Room_Id).subscribe({
          next: (data: any) => {
            if(data !== null){
              this.room = data
              this.ChangeChessBoardtoSquares()
              console.log(data)              
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
        this.room.chessBoard_state = chess
      })
}

  chat() {
    this.historyChat.push(this.stringChat)
    this.chatService.sendMessage(this.Username, this.stringChat, this.Room_Id.toString())
  }


  async LeaveRoom() {
    this.chatService.leaveRoom(this.Room_Id.toString())
    this.roomService.LeaveRoom(this.Room_Id, this.Username)
    this.router.navigate(['/lobby'])
  }

  reset() {
    for (let i = 0; i < this.squares.length; i++) {
      for (let j = 0; j < this.squares[i].length; j++) {
        this.squares[i][j] = '_';
      }
    }
    this.room.chessBoard_state = this.squares.map(row => row.join('')).join('');
    this.chatService.playChess(this.Username, this.room.chessBoard_state, this.room.id.toString())
    this.roomService.UpdateBoard(this.Room_Id, this.room.chessBoard_state).subscribe({
      next: (data: any) => {
        console.log(data);
        this.roomService.GetRoombyId(this.Room_Id).subscribe({
          next: (data: any) => {
            console.log(data)
          }
        })
      }
    })
  }
  tick(row: number, col: number) {
    this.roomService.GetTurn(this.Room_Id).subscribe({
      next: (data: any) => {
        this.room.turn = data;
        console.log(data)
      }
    })
    if (this.squares[row][col] === '_' && this.room.turn == 1) {
      this.squares[row][col] = 'x';
    }
    else if (this.squares[row][col] === '_' && this.room.turn == 2) {
      this.squares[row][col] = 'o';
    }

    this.room.chessBoard_state = this.squares.map(row => row.join('')).join('');
    this.chatService.playChess(this.Username, this.room.chessBoard_state, this.room.id.toString())
    this.roomService.UpdateBoard(this.Room_Id, this.room.chessBoard_state).subscribe({
      next: (data: any) => {
        console.log(data);
        this.roomService.GetRoombyId(this.Room_Id).subscribe({
          next: (data: any) => {
            console.log(data)
          }
        })
      }
    })
  }

  ChangeChessBoardtoSquares(){
        // Tạo ma trận 7x7
    for (let i = 0; i < 7; i++) {
      this.squares[i] = [];
    }

    // Gán ký tự từ chuỗi vào ma trận
    let currentIndex = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        this.squares[i][j] = this.room.chessBoard_state[currentIndex];
        currentIndex++;
      }
    }
  }

}
