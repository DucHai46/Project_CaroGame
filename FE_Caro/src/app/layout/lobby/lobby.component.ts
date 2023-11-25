import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/Room.model';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  room: Room[] = [
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
    { "Player1": "___", "Player2": "___", "ChessBoard_state": "000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" },
  ]

  user: User[] = [
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
    { "FirstName": 'Bui', "LastName": 'Hai', "Score": 0 },
  ]

  ngOnInit(): void {

  }

  constructor(private router: Router) { }

  JoinRoom() {
    this.router.navigate(['/room']);
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
