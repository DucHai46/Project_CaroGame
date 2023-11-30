import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
    private messageSubject = new Subject<any>();

    public getMessage(): Subject<any> {
      return this.messageSubject;
    }
  
    public sendMessage(message: any): void {
      this.messageSubject.next(message);
    }

    private chessSubject = new Subject<any>();

    public getchess(): Subject<any> {
      return this.chessSubject;
    }
  
    public sendchess(chess: any): void {
      this.chessSubject.next(chess);
    }
    
constructor() { }

}
