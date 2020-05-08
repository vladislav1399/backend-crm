import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StaticDateFinanceService} from '../../finance-page/date.finance.service';
import {ToastrService} from 'ngx-toastr';
import {Supplier} from '../../shared/interfeices';

@Component({
  selector: 'app-filter-purchase-block',
  templateUrl: './filter-purchase-block.component.html',
  styleUrls: ['./filter-purchase-block.component.css'],
  providers: [StaticDateFinanceService]
})
export class FilterPurchaseBlockComponent implements OnInit {
  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeFilterPeriod: EventEmitter<string> = new EventEmitter<any>();
  @Output() changeStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterSupplier: EventEmitter<string> = new EventEmitter<string>();
  @Input() suppliers: Supplier[] = [];

  constructor(private dateFinanceService: StaticDateFinanceService,
              private toastrService: ToastrService) { }

  loading = false;
  dateOt;
  dateDo;

  ngOnInit() {

  }

  changeFilter(event) {
    const date = this.dateFinanceService.getDateForStatus(event.target.value);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
    } else {
      this.changeFilterPeriod.emit(date);
    }
  }

  changeDate() {
    const date = this.dateFinanceService.getDayForDate(this.dateOt, this.dateDo);
    if (date === false) {
      this.toastrService.warning('Что то пошло не так. Выберите правильно дату!');
      this.loading = false;
    } else {
        this.dateChange.emit(date);
    }
  }

  changeStatusPurchase(event) {
    this.changeStatus.emit(event.target.value);

  }

  selectFilterSupplier(event) {
    this.filterSupplier.emit(event.target.value);

  }
}
