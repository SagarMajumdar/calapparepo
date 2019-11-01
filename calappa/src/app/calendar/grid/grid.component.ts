import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
  export class GridComponent implements OnInit, OnDestroy {
  ind = 1;
  days: number[] = [];
  yrmo: {yr: number, mo: number} = { yr: new Date().getFullYear() , mo: ( new Date().getMonth() + 1 )};
  sub: Subscription;
  weekdays = [
    {day: 'Mon' , num: 1},
    {day: 'Tue' , num: 2 },
    {day: 'Wed' , num: 3},
    {day: 'Thu' , num: 4},
    {day: 'Fri' , num: 5},
    {day: 'Sat' , num: 6},
    {day: 'Sun' , num: 7 }
  ];
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
  dayStructure = {
    yr: this.yrmo.yr,
    mo: this.yrmo.mo ,
    days: [
      // {
      //   cols: [
      //     {day: 1, dayname: 'thurs', dayofweek: 1 ,
      //        events : [
      //                       { evtdesc : 'lorem ipsum dolor', estarthr : 11, estartmin: 15, eendhr : 13, eendmin: 0 },
      //                       { evtdesc : 'xx xxx xxxxx xx', estarthr : 10, estartmin: 0, eendhr : 11, eendmin: 5 }
      //                 ]
      //     },
      //     {day: 2, dayname: 'fri', dayofweek:  2 }
      //   ]
      // },
      // {}
    ]
  };
  // @Input() curryrmo: {curryr: number, currmo: number};

  constructor(private calser: CalendarService, private router: Router, private actRoute: ActivatedRoute) { }
  ngOnInit() {
    let flg = 1;
    let rownum = 0;
    this.sub = this.calser.yrmochanged.subscribe((d) => {
      this.yrmo.yr = d.selectedyr;
      this.yrmo.mo = d.selectedmo;
      flg = 1;
      rownum = 0;
      this.dayStructure.yr =  +this.yrmo.yr;
      this.dayStructure.mo =  +this.yrmo.mo;
      console.log(this.dayStructure.yr + '  ' + this.dayStructure.mo);
      this.dayStructure.days.length = 0;
      for (let i = 1; i <= this.modays[this.yrmo.mo - 1].days; i++) {
        if (flg === 1) {
          this.dayStructure.days.push (
            {cols: [
              {
                day : i,
                dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay()].day,
                dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() + 1
              }
            ]} );
          flg = 0;
        } else {
          this.dayStructure.days[rownum].cols.push(
            {
              day : i,
              dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo, i - 1) ).getDay()].day,
              dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo, i - 1) ).getDay() + 1
            }
          );
        }
        if ( (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() === 6 ) {
          flg = 1;
          rownum = rownum + 1;
        }
      }

      console.log('\n---------------------------------------------------------------\n'
                  + this.dayStructure
                  + '\n---------------------------------------------------------------\n');
      this.dayStructure = this.fillblanks(this.dayStructure);
    });
    //
    this.dayStructure.days.length = 0;
    for (let i = 1; i <= this.modays[this.yrmo.mo - 1].days; i++) {
      if (flg === 1) {
        this.dayStructure.days.push (
          {cols: [
            {
              day : i,
              dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay()].day,
              dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() + 1
            }
          ]} );
        flg = 0;
      } else {
        this.dayStructure.days[rownum].cols.push(
          {
            day : i,
            dayname: this.weekdays[(new Date(this.yrmo.yr, this.yrmo.mo, i - 1) ).getDay()].day,
            dayofweek :  (new Date(this.yrmo.yr, this.yrmo.mo, i - 1) ).getDay() + 1
          }
        );
      }
      if ( (new Date(this.yrmo.yr, this.yrmo.mo - 1, i - 1) ).getDay() === 6 ) {
        flg = 1;
        rownum = rownum + 1;
      }
    }
    console.log('\n---------------------------------------------------------------\n'
                  + this.dayStructure
                  + '\n---------------------------------------------------------------\n');
    //
    this.dayStructure = this.fillblanks(this.dayStructure);
  }


  checkYear(year: number) {
    return (((year % 4 === 0) && (year % 100 !== 0)) ||
                            (year % 400 === 0));
  }
  getlpdays() {
    if (this.checkYear(this.yrmo.yr) ) {
      return 29;
    } else {
      return 28;
    }
  }
  fillblanks(ds) {
    let tmpv = 0;
    // pushing blank data at the start
    if (ds.days[0].cols[0].dayofweek > 1) {
      tmpv = ds.days[0].cols[0].dayofweek - 1;
      for (let r = 0 ; r < tmpv ; r++) {
        ds.days[0].cols.splice(r, 0, {day: -1, dayname: '', dayofweek: -1} );
      }
    }
    // pushing blank data at the end
    if (ds.days[ this.dayStructure.days.length - 1 ]
          .cols.length < 7 ) {
          tmpv =   7 - ( ds.days[ this.dayStructure.days.length - 1 ].cols.length ) ;
          for (let r = 0 ; r < tmpv ; r++) {
            ds.days[this.dayStructure.days.length - 1].cols.push(  {day: -1, dayname: '', dayofweek: -1} );
          }
    }
    return ds;
  }
  currDay(d: number, m: number, y: number) {
    const today = new Date();
    if ( d === today.getDate() && y === today.getFullYear() && m === (today.getMonth() + 1) ) {
      return true;
    } else {
      return false;
    }
  }
  sendMoEvtData(yr: number, mo: number, day: number) {
    this.calser.sendMoEvtData(this.dayStructure);
    this.router.navigate(['/evtadd/' + yr + '/' + mo + '/' + day ], {relativeTo: this.actRoute} );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
