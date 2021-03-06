import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-todocalendar',
  templateUrl: './todocalendar.component.html',
  styleUrls: ['./todocalendar.component.css']
})
export class TodocalendarComponent implements OnInit {
  yrlist = [];
  yrmo: {yr: number, mo: number} = { yr: new Date().getFullYear() , mo: ( new Date().getMonth() + 1 )};
  modays = [
    { mo: 'jan', num : 1 , days: 31},
    { mo:  'feb', num : 2 , days: this.getlpdays()},
    { mo: 'mar', num : 3 , days: 31},
    { mo: 'apr', num : 4 , days: 30},
    { mo: 'may', num : 5 , days: 31},
    { mo: 'june', num : 6 , days: 30},
    { mo: 'july', num : 7 ,  days: 31},
    { mo: 'aug', num : 8 , days: 31},
    { mo: 'sept', num : 9 , days: 30},
    { mo: 'oct', num : 10 ,  days: 31},
    { mo: 'nov', num : 11 , days: 30},
    { mo: 'dec', num : 12 ,  days: 31}
 ];
 yrmofrm: FormGroup;
 weekdays = [
  {day: 'Mon' , num: 1},
  {day: 'Tue' , num: 2 },
  {day: 'Wed' , num: 3},
  {day: 'Thu' , num: 4},
  {day: 'Fri' , num: 5},
  {day: 'Sat' , num: 6},
  {day: 'Sun' , num: 7 }
];
dayStructure = {
  yr: this.yrmo.yr,
  mo: this.yrmo.mo ,
  days: [ ]
};
flagGotMoTodos = false;
todosmo;
  constructor() { }


  makeds () {
    //
    this.flagGotMoTodos = false;
    this.yrmo.yr = this.yrmo.yr;
    this.yrmo.mo = this.yrmo.mo;
    let flg = 1;
    let  rownum = 0;
    this.dayStructure.yr =  +this.yrmo.yr;
    this.dayStructure.mo =  +this.yrmo.mo;
    this.dayStructure.days.length = 0;
    for (let i = 1; i <= this.modays[this.yrmo.mo - 1].days; i++) {
      if (flg === 1) {
        this.dayStructure.days.push (
          {cols: [
            {
              day : i,
              dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay()].day,
              dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() + 1
              , todos : this.getotodos(this.yrmo.yr, this.yrmo.mo, i)
            }
          ]} );
        flg = 0;
        this.flagGotMoTodos = true;
      } else {
        this.dayStructure.days[rownum].cols.push(
          {
            day : i,
            dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay()].day,
            dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() + 1
            , todos : this.getotodos(this.yrmo.yr, this.yrmo.mo, i)
          }
        );
      }
      if ( (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() === 6 ) {
        flg = 1;
        rownum = rownum + 1;
      }
    }
    this.dayStructure = this.fillblanks(this.dayStructure);
  }
  ngOnInit() {
    for ( let i = 2015; i < 2035 ; i++) { 
      this.yrlist.push(i); 
    }
    this.yrmofrm = new FormGroup({
      selectedyr: new FormControl( this.yrmo.yr ),
      selectedmo: new FormControl( this.yrmo.mo )
    });
    this.makeds();
  }
  
    //
  

  getotodos(yr: number, mo: number, dd: number) {
    if (this.flagGotMoTodos === false) {
      this.todosmo = this.returnMoTodos(mo, yr);
    }
    let flg = 0;
    for (let k = 0; k < this.todosmo.length; k++) {
      if (this.todosmo[k].day === dd) {
        flg = 1;
        return this.todosmo[k].todoitems;
      }
    }
    if (flg === 0) {
      return [];
    }
  }

  getlpdays() {
    if (this.checkYear(this.yrmo.yr) ) {
      return 29;
    } else {
      return 28;
    }
  }

  checkYear(year: number) {
    return (((year % 4 === 0) && (year % 100 !== 0)) ||
                             (year % 400 === 0));
  }

  yrmosel() {
    this.yrmo.yr = this.yrmofrm.value.selectedyr ;
    this.yrmo.mo = this.yrmofrm.value.selectedmo ;
    this.makeds();
  }

  fillblanks(ds) {
    let tmpv = 0;
    // pushing blank data at the start
    if (ds.days[0].cols[0].dayofweek > 1) {
      tmpv = ds.days[0].cols[0].dayofweek - 1;
      for (let r = 0 ; r < tmpv ; r++) {
        ds.days[0].cols.splice(r, 0, {day: -1, dayname: '', dayofweek: -1, todos : []} );
      }
    }
    // pushing blank data at the end
    if (ds.days[ this.dayStructure.days.length - 1 ]
          .cols.length < 7 ) {
          tmpv =   7 - ( ds.days[ this.dayStructure.days.length - 1 ].cols.length ) ;
          for (let r = 0 ; r < tmpv ; r++) {
            ds.days[this.dayStructure.days.length - 1].cols.push(  {day: -1, dayname: '', dayofweek: -1, todos: []} );
          }
    }
    return ds;
  }

  sendMoEvtData(yr: number, mo: number, day: number) {
    console.log('selected date : ' + day + '-' + mo + '-' + yr);
  }

  currDay(d: number, m: number, y: number) {
    const today = new Date();
    if ( d === today.getDate() && y === today.getFullYear() && m === (today.getMonth() + 1) ) {
      return true;
    } else {
      return false;
    }
  }
  returnMoTodos(mm: number, yy: number) {
    // go to db and get the events for a month in the following format
    return  [
      {
        day: 1, todoitems: [
          { itemdesc :  'buy vegetables', status : 'remaining'},
          { itemdesc :  'buy fruits', status : 'done'},
          { itemdesc :  'transfer rent money', status : 'done'}
        ]
      },
      {
        day: 2, todoitems : [
          { itemdesc :  'finish learining chapter 12', status : 'done'},
          { itemdesc :  'visit museum with freinds', status : 'done'},
          { itemdesc :  'Book train tickets to Guahati', status : 'done'},
          { itemdesc :  'complete unfinished proj work', status : 'done'},
          { itemdesc :  'buy grocerries', status : 'remaining'},
          { itemdesc :  'buy vegetables', status : 'done'},
          { itemdesc :  'buy paper clips', status : 'remaining'}
        ]
      },
      {
        day: 6, todoitems : [
          { itemdesc :  'visit museum with freinds', status : 'done'},
          { itemdesc :  'Book train tickets to Guahati', status : 'done'},
          { itemdesc :  'complete unfinished proj work', status : 'done'},
          { itemdesc :  'buy grocerries', status : 'remaining'}
        ]
      },
      {
        day: 7, todoitems : [
          { itemdesc :  'buy chicken', status : 'done'},
          { itemdesc :  'feed sparrows', status : 'remaining'},
        ]
      },
      {
        day: 8, todoitems : [
          { itemdesc :  'finish work on INC 123466', status : 'done'},
          { itemdesc :  'fix bug #13455', status : 'done'},
          { itemdesc :  'bug retest failed #42566 -- analyze', status : 'done'},
          { itemdesc :  'talk to supervisor -- appraisal', status : 'done'},
          { itemdesc :  'buy bread', status : 'done'},
          { itemdesc :  'buy rice', status : 'remaining'},
          { itemdesc :  'check train ticket status', status : 'done'},
          { itemdesc :  'change mail password', status : 'done'},
          { itemdesc :  'fix bug #3532', status : 'remaining'},
          { itemdesc :  'fix bug #753', status : 'remaining'},
          { itemdesc :  'fix-bug #98473', status : 'done'}
        ]
      },
      {
        day: 14, todoitems : [
          { itemdesc :  'finish work on INC 123466', status : 'done'},
          { itemdesc :  'fix bug #13455', status : 'done'},
          { itemdesc :  'bug retest failed #42566 -- analyze', status : 'done'},
          { itemdesc :  'talk to supervisor -- appraisal', status : 'done'}
        ]
      },
      {
        day: 19, todoitems : [
          { itemdesc :  'finish work on INC 123466', status : 'done'},
          { itemdesc :  'fix bug #13455', status : 'done'},
          { itemdesc :  'fix bug #3532', status : 'remaining'},
          { itemdesc :  'fix bug #753', status : 'remaining'},
          { itemdesc :  'fix-bug #98473', status : 'done'}
        ]
      },
      {
        day: 22, todoitems : [
          { itemdesc :  'buy bread', status : 'done'},
          { itemdesc :  'buy rice', status : 'remaining'},
          { itemdesc :  'check train ticket status', status : 'done'},
          { itemdesc :  'change mail password', status : 'done'},
          { itemdesc :  'fix bug #3532', status : 'remaining'},
          { itemdesc :  'fix bug #753', status : 'remaining'},
          { itemdesc :  'fix-bug #98473', status : 'done'}
        ]
      },
      {
        day: 25, todoitems : [
          { itemdesc :  'finish learining chapter 21', status : 'remaining'},
        ]
      }
    ];
  }
}
