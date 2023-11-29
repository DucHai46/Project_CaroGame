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
  private connection: signalR.HubConnection | undefined;


  constructor(private authService: LoginService, private router: Router, private roomService: RoomService, private userService: UserService) { }

  ngOnInit(): void {
    this.GetClaims(this.tokenString)
    this.GetAllRoom()

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();
  }

  Client: any = ''

  tokenString: any = localStorage.getItem('userToken');

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

  JoinRoom(index: number) {
    this.connection?.invoke("JoinRoom", this.room[index].Id.toString())
    this.roomService.JoinRoom(this.room[index].Id, this.Client).subscribe({
      next: (data: any) => { },
      error: (error: HttpErrorResponse) => {
        alert("Phòng đã đủ người")
      }
    })
    this.router.navigate(['/room', this.room[index].Id, this.Client]);
  }

}
