import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomComponent } from './lobby/room/room.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { routes } from './layout-routing.module'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LoginComponent,
    LobbyComponent,
    RoomComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ]
})
export class LayoutModule { }
