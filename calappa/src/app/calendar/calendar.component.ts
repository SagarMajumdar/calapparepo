import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currymo: {selectedyr: number , selectedmo: number } ;

  constructor(private calser: CalendarService) { }

  ngOnInit() {
    this.currymo = {selectedyr: 2019, selectedmo: 2};
  }

  onmmyyselected(d: {selectedyr: number, selectedmo: number }) {
    console.log(d);
    this.calser.updatedGridData(d);
  }
}
