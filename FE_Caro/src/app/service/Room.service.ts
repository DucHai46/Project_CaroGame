import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/Room.model';

@Injectable()
export class RoomService {

    readonly Url = 'https://localhost:7130'
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem("userToken");

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    UpdateBoard(id: number, chess: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('idroom', id.toString());
        params = params.append('chessboard', chess);

        return this.http.post(`${this.Url}/api/Room/UpdateBoard`, null, { headers, params });
    }

    GetAllRoom() {
        const headers = this.getHeaders();

        return this.http.get(`${this.Url}/api/Room/GetAllRoom`, { headers });
    }

    GetRoombyId(id: number) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('id', id.toString());

        return this.http.get(`${this.Url}/api/Room/GetRoom`, { headers, params });
    }

    GetTurn(id: number) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('idroom', id.toString());

        return this.http.post(`${this.Url}/api/Room/GetTurn`, null, { headers, params });
    }



    JoinRoom(id: number, name: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        if(id !== undefined && id !== null){
            params = params.append('id', id.toString());
            params = params.append('name', name);
        }
        else {
            console.log("không tồn tại")
        }
        return this.http.post(`${this.Url}/api/Room/JoinRoom`, null, { headers, params });
    }

    LeaveRoom(id: number, name: string) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('id', id.toString());
        params = params.append('name', name);

        return this.http.post(`${this.Url}/api/Room/LeaveRoom`, null, { headers, params });
    }

    Score(id: number, score1: number, score2: number) {
        const headers = this.getHeaders();
        let params = new HttpParams();
        params = params.append('idroom', id.toString());
        params = params.append('score1', score1.toString());
        params = params.append('score2', score2.toString());

        return this.http.post(`${this.Url}/api/Room/Score`, null, { headers, params });
    }


    checkWin(Squares: any, player: any): boolean {
        const rowCount = Squares.length;
        const colCount = Squares[0].length;

        const directions: Array<[number, number]> = [
            [1, 0],         // Kiểm tra hàng ngang
            [0, 1],         // Kiểm tra hàng dọc
            [1, 1],         // Kiểm tra đường chéo chính
            [1, -1]         // Kiểm tra đường chéo phụ
        ];

        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                if (Squares[row][col] === player) {
                    for (const direction of directions) {
                        if (this.checkDirection(Squares, row, col, direction, player)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    checkDirection(board: any, startRow: number, startCol: number, direction: [number, number], player: any): boolean {
        const rowCount = board.length;
        const colCount = board[0].length;
        const [deltaRow, deltaCol] = direction;

        for (let i = 0; i < 5; i++) {
            const row = startRow + i * deltaRow;
            const col = startCol + i * deltaCol;

            if (row < 0 || row >= rowCount || col < 0 || col >= colCount || board[row][col] !== player) {
                return false;
            }
        }

        return true;
    }

}
