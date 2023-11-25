import { Component } from '@angular/core';
import { Room } from 'src/app/models/Room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  reset() {
    this.squares.fill('0');
  }
  tick(index: number) {
    if (this.squares[index] === '0') {
      this.squares[index] = 'x';
    }
  }
  room: Room = { "Player1": "Bui Duc Hai", "Player2": "Pham Hong Quan", "ChessBoard_state": "0000000000000000000000000", "Score_1": 0, "Score_2": 0, "History_Chat": "" }
  squares: string[] = this.room.ChessBoard_state.split('');

}
