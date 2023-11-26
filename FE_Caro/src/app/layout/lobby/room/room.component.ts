import { Component } from '@angular/core';
import { Room } from 'src/app/models/Room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
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
  room: Room = { "Player1": "Bui Duc Hai", "Player2": "Pham Hong Quan", "ChessBoard_state": "_________________________________________________", "Score_1": 0, "Score_2": 0, "History_Chat": "" }
  squares: string[] = this.room.ChessBoard_state.split('');

}
