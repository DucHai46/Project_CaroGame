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
import { SignalRService } from 'src/app/service/SignalR.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  room: Room[] = []
  user: User[] = []

  constructor(private authService: LoginService, private router: Router, private roomService: RoomService, private userService: UserService, private chatService: SignalRService) { }

  ngOnInit(): void {
    this.GetClaims(this.tokenString)
    this.GetAllRoom()
    this.chatService.startConnection()
      .then(() => {
        console.log('SignalR connection started successfully.');
      })
      .catch(error => {
        console.error('Error starting SignalR connection:', error);
      });
      this.GetAllUser()
  }

  Client: any = ''

  tokenString: any = localStorage.getItem('userToken');

  CheckStatus(index: number): boolean {
    if(this.room[index].player_1 != "___" && this.room[index].player_2 != "___"){
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

  async JoinRoom(index: number) {
    this.chatService.joinRoom(index.toString())
    this.roomService.JoinRoom(index+1, this.Client).subscribe({
      next: (data: any) => { 
          this.room[index] = data
          console.log("Join"+data)
       },
      error: (error: HttpErrorResponse) => {
        alert("Phòng đã đủ người")
      }
    })
    this.router.navigate(['/room', index, this.Client]);
  }
}
