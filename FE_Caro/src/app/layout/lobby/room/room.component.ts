import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/Room.model';
import * as signalR from "@microsoft/signalr";
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/service/Room.service';
import { HttpErrorResponse } from '@angular/common/http';


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
  Room_Id: any = this.idParam ? parseInt(this.idParam) : 1
  room: Room = new Room
  squares: string[][] = [];
  private connection!: signalR.HubConnection;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    if(this.Room_Id !== null){
      this.getRoom()
      this.startConnection()
      this.ReceiveMessage()
    }
  }

  public startConnection = () => {
      this.connection = new signalR.HubConnectionBuilder()
          .withUrl('https://localhost:7130/chatHub')
          .build();
  
    return  this.connection
    .start()
    .then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
  }
  
  getRoom() {
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

  chat() {
    this.connection.invoke('SendMessage', this.Username, this.stringChat, this.Room_Id.toString()).then( () => {
      console.log("chattt")
    });
    this.stringChat = ''
  }

  ReceiveMessage = () => {
    this.connection.on("ReceiveMessage", (user: any, message: any) => {
      console.log(message)
      this.historyChat.push(user + ": " + message)
    })
  }

  async LeaveRoom() {
    this.connection.invoke('LeaveRoom', this.Room_Id.toString()).then(() => {
      console.log("Leave Room: " + this.Room_Id)
    });
    this.roomService.LeaveRoom(this.Room_Id, this.Username).subscribe({
      next: (data: any) => {
      }
    })
    this.router.navigate(['/lobby'])
  }

  reset() {
    for (let i = 0; i < this.squares.length; i++) {
      for (let j = 0; j < this.squares[i].length; j++) {
        this.squares[i][j] = '_';
      }
    }
    this.room.chessBoard_state = this.squares.map(row => row.join('')).join('');
    // this.chatService.PlayChess(this.Username, this.room.chessBoard_state, this.room.id.toString())
    this.roomService.UpdateBoard(this.Room_Id, this.room.chessBoard_state).subscribe({
      next: (data: any) => {
        this.roomService.GetRoombyId(this.Room_Id).subscribe({
          next: (data: any) => {
            console.log(data)
          }
        })
      }
    })
  }
  tick(row: number, col: number) {
    if(this.room.player_1 != "___" && this.room.player_2 != "___"){
      if (this.squares[row][col] === '_' && this.room.turn == 1) {
        if(this.Username == this.room.player_1){
          this.squares[row][col] = 'x';
        }
        else {
          alert("Lượt đối thủ")
        }
      }
      else if (this.squares[row][col] === '_' && this.room.turn == 2) {
        if(this.Username == this.room.player_2){
          this.squares[row][col] = 'o';
        }
        else {
          alert("Lượt đối thủ")
        }
      }
      
      if(this.roomService.checkWin(this.squares, 'x')){
        this.room.score_1++
        this.roomService.Score(this.Room_Id, this.room.score_1, this.room.score_2)
        alert("Người chơi " + this.room.player_1 + " chiến thắng")
        this.reset()
        return
      }
      else if(this.roomService.checkWin(this.squares, 'o')){
        this.room.score_2++
        this.roomService.Score(this.Room_Id, this.room.score_1, this.room.score_2)
        alert("Người chơi " + this.room.player_2 + " chiến thắng")
        this.reset()
        return
      }

      this.roomService.GetTurn(this.Room_Id).subscribe({
        next: (data: any) => {
          this.room.turn = data;
          console.log(data)
        }
      })

      this.room.chessBoard_state = this.squares.map(row => row.join('')).join('');
      // this.chatService.PlayChess(this.Username, this.room.chessBoard_state, this.room.id.toString())
      this.roomService.UpdateBoard(this.Room_Id, this.room.chessBoard_state).subscribe({
        next: (data: any) => {
          this.roomService.GetRoombyId(this.Room_Id).subscribe({
            next: (data: any) => {
              this.room = data
              console.log(data)
            }
          })
        }
      })
    }
    else {
      alert("Chưa đủ người!");
    }
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
