import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterService } from './service/Register.service';
import { LoginService } from './service/Login.service';
import { AuthGuard } from './service/Auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutRoutingModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [RegisterService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
