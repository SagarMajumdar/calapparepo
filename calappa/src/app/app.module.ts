import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DtmoyrselectorComponent } from './calendar/dtmoyrselector/dtmoyrselector.component';
import { GridComponent } from './calendar/grid/grid.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarService } from './calendar/calendar.service';
const appRoutes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DtmoyrselectorComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
