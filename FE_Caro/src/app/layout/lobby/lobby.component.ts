import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/Room.model';
import { User } from 'src/app/models/User.model';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from 'src/app/service/Login.service';
import { RoomService } from 'src/app/service/Room.service';
import * as signalR from '@microsoft/signalr';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  room: Room[] = []
  user: User[] = []
  private connection!: signalR.HubConnection;

  constructor(private authService: LoginService, private router: Router, private roomService: RoomService, private userService: UserService) { }

  ngOnInit(): void {
    this.GetClaims(this.tokenString)
    this.GetAllRoom()
    this.GetAllUser()
    this.startConnection()
    this.ReceiveJoin()
    this.ReceiveLeave()
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

  Client: any = ''

  tokenString: any = localStorage.getItem('userToken');

  CheckStatus(index: number): boolean {
    if(this.room[index-1].player_1 != "___" && this.room[index-1].player_2 != "___"){
      return true
    }
    return false
  }

  GetClaims(token: string) {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);

        const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        this.Client = name;
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      this.logout();
    }
  }

  GetAllRoom() {
    this.roomService.GetAllRoom().subscribe({
      next: (data: any) => {
        this.room = data;
        this.room = this.room.sort((a, b) => a.id > b.id ? 1 : -1)
      }
    });
  }

  GetAllUser() {
    this.userService.GetAllUser().subscribe({
      next: (data:any) => {
        this.user = data
      }
    })
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  JoinRoom(index: number) {
    this.connection.invoke('JoinRoom', index.toString(), this.Client).then(() => {
      console.log("Join Room: " + index)
    });
    this.roomService.JoinRoom(index, this.Client).subscribe({
      next: (data: any) => { 
          this.room[index] = data
       },
      error: (error: HttpErrorResponse) => {
        alert("Phòng đã đủ người")
        this.router.navigate(['/lobby']);

      }
    })
    this.router.navigate(['/room', index, this.Client]);
  }


  ReceiveLeave() {
    this.connection.on("LeaveRoom", (data: any) => {
      this.GetAllRoom()
    })
  }

  ReceiveJoin() {
    this.connection.on("JoinRoom", (data: any) => {
      this.GetAllRoom()
    })
  }
}
