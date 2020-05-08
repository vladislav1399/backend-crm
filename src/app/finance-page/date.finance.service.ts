import { Injectable } from '@angular/core';


@Injectable()

export class StaticDateFinanceService {

  public dateOt: any;
  public dateDo: any;

  getDateForStatus(status: string): any {
      let dayNow = new Date().getDate() + 1;
      const yearNow = new Date().getFullYear();
      let mountNow = new Date().getMonth();

      if (status === 'За сегодня') {
        this.dateOt = new Date(yearNow, mountNow, dayNow, -22, 1);
        this.dateDo = new Date();
        return {dateOt: this.dateOt,  dateDo: this.dateDo};
      } else if (status === 'За вчера') {
        this.dateOt = new Date(yearNow, mountNow, dayNow - 1 , -21, 5);
        this.dateDo = new Date(yearNow, mountNow, dayNow - 1, 1, 0);
        return {dateOt: this.dateOt,  dateDo: this.dateDo};
      } else if (status === 'За Неделю') {
        this.dateOt = new Date(yearNow, mountNow, dayNow - 6 , -21, 5);
        this.dateDo = new Date();
        return {dateOt: this.dateOt,  dateDo: this.dateDo};
      } else if (status === 'За последний месяц') {
        dayNow = dayNow  - dayNow;
        this.dateOt = new Date(yearNow, mountNow, dayNow - 1, 0, 0);
        this.dateDo = new Date();
        return {dateOt: this.dateOt,  dateDo: this.dateDo};
      } else if (status === 'За последний год') {
        mountNow = mountNow - mountNow;
        dayNow = dayNow - dayNow + 2;
        this.dateOt = new Date(yearNow, mountNow, dayNow, 0, 0);
        this.dateDo = new Date();
        return {dateOt: this.dateOt,  dateDo: this.dateDo};
      }
  }

  getDayForDate(dateOt: any, dateDo: any): any {
    if (dateDo === undefined || dateOt === undefined) {
      return false;
    } else {
      return { dateDo, dateOt};
    }
  }


}





