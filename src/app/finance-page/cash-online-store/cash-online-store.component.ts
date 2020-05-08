import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PrivateService} from '../../shared/services/private.service';

@Component({
  selector: 'app-cash-online-store',
  templateUrl: './cash-online-store.component.html',
  styleUrls: ['./cash-online-store.component.css']
})
export class CashOnlineStoreComponent implements OnInit {

  constructor(private privatBankService: PrivateService) { }

  privateDateForm: FormGroup;
  statements: any;
  telPay = 0;

  ngOnInit() {

    this.privateDateForm = new FormGroup({
      dateStart: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      dateEnd: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  getStatement() {

     const year = this.privateDateForm.value.dateStart.substring(0, 4);
     const yearEnd = this.privateDateForm.value.dateEnd.substring(0, 4);

     const month = this.privateDateForm.value.dateStart.substring(5, 7);
     const monthEnd = this.privateDateForm.value.dateEnd.substring(5, 7);

     const day = this.privateDateForm.value.dateStart.substring(8, 10);
     const dayEnd = this.privateDateForm.value.dateEnd.substring(8, 10);

     const dateStartCompleted = day + '.' + month + '.' + year;
     const dateEndCompleted = dayEnd + '.' + monthEnd + '.' + yearEnd;

     const date = {
      dateStart: dateStartCompleted,
      dateEnd: dateEndCompleted
    };
    console.log(date)
     this.privatBankService.fetchStatement(date).subscribe(statements => {
        const stat = JSON.parse(statements);
        this.statements = stat.response.data[0].info[0].statements[0].statement;
        console.log(this.statements)
        for (const pay of this.statements) {
              if (pay.$.description === 'Пополнение мобильного +380963267417') {
                console.log(pay.$.cardamount)
                // this.telPay =+ a;
          }
        }
      });
  }
}
