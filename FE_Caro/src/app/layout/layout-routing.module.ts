import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomComponent } from './lobby/room/room.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'lobby', component: LobbyComponent,
    children: [{ path: 'room', component: RoomComponent }]
  },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

