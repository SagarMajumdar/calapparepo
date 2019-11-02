import { Subject } from 'rxjs';

export class CalendarService {
    yrmochanged = new Subject<{selectedyr: number, selectedmo: number}>();
    obj = new Subject<{}>();
    evtsub = new Subject <{ dd: number, month: number, year: number, starthr: number, startmin: number, endhr: number, 
        endmin: number, evtdesc: string }>();

    updatedGridData(d: {selectedyr: number, selectedmo: number}) {
        this.yrmochanged.next(d);
    }
}

