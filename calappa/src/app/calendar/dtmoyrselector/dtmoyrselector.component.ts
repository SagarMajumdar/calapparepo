import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-dtmoyrselector',
  templateUrl: './dtmoyrselector.component.html',
  styleUrls: ['./dtmoyrselector.component.css']
})
export class DtmoyrselectorComponent implements OnInit {

  yrmofrm: FormGroup;

  @Output() onselectmmyy = new EventEmitter<{selectedyr: number, selectedmo: number}>() ;

  constructor() { }

  ngOnInit() {
    this.yrmofrm = new FormGroup({
      selectedyr: new FormControl(new Date().getFullYear() ),
      selectedmo: new FormControl(( new Date().getMonth() + 1 ))
    });
  }
  yrmosel() {
    console.log(this.yrmofrm);
    // this.onselectmmyy.emit({selectedyr: this.yrmofrm.value.selectedyr , selectedmo: this.yrmofrm.value.selectedmo });
    this.onselectmmyy.emit(this.yrmofrm.value);
  }
}
