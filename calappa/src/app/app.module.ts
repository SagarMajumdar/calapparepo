import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodocalendarComponent } from './todocalendar/todocalendar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodocalendarComponent
  ],
  imports: [
    BrowserModule ,FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
