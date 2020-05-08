import {Component, Input, OnInit} from '@angular/core';
import {Brand} from '../../shared/interfeices';

@Component({
  selector: 'app-product-nav',
  templateUrl: './product-nav.component.html',
  styleUrls: ['./product-nav.component.css']
})
export class ProductNavComponent implements OnInit {
  @Input() brands: Brand[];

  constructor() { }


  ngOnInit() {

  }


}
