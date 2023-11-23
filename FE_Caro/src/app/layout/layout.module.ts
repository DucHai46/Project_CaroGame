import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomComponent } from './lobby/room/room.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    LobbyComponent,
    RoomComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
