import {Component, OnInit} from '@angular/core';
import {MainMenu} from '../../../interfeices';



@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  constructor() {}

  menuList: MainMenu[] =  [
    {name: 'Настройки', icon: 'fas fa-cogs', subMenu: [
        {nameSub: 'Настройки', urlSub: '/setting'},
        {nameSub: 'Пользователи', urlSub: '/setting/users'},
        {nameSub: 'Список должностей', urlSub: '/setting/professions'},
        {nameSub: 'Склады', urlSub: '/setting/warehouse'}
      ]},

    {name: 'Финансы', icon: 'fas fa-money-bill-alt', subMenu: [
        {nameSub: 'Финансы', urlSub: '/finance'},
        {nameSub: 'Касса', urlSub: '/finance/cash'},
        {nameSub: 'Безнал', urlSub: '/finance/cashless'},
        {nameSub: 'Расход', urlSub: '/finance/expenses'},
        {nameSub: 'Приход', urlSub: '/finance/income'},
        {nameSub: 'Статьи', urlSub: '/finance/state'},
        {nameSub: 'Проплаты на карту', urlSub: '/finance/cash-store'},
      ]},

    {name: 'Товары и категории', icon: 'far fa-list-alt', subMenu: [
        {nameSub: 'Товары', urlSub: '/products'},
        {nameSub: 'Категории', urlSub: '/category'},
        {nameSub: 'Торговы марки', urlSub: '/brand'},
      ]},

    {name: 'Закупки', icon: 'fas fa-cart-plus', subMenu: [
        {nameSub: 'Закупки', urlSub: '/purchase'},
        {nameSub: 'Создать закупку', urlSub: '/purchase/form-purchase'},
        {nameSub: 'Поставщики', urlSub: '/setting/supplier'},
        {nameSub: 'Продажи товара за период', urlSub: '/purchase/sell-period'},
        {nameSub: 'Планирование закупок', urlSub: '/purchase/plan'},
      ]},

    {name: 'Остатки товара', icon: 'fas fa-box-open', subMenu: [
        {nameSub: 'Остатки товара на складах', urlSub: '/product-balance'},
      ]},

    {name: 'Продажи', icon: 'fas fa-plus-circle', subMenu: [

        {nameSub: 'Продажи', urlSub: '/sale'},
        {nameSub: 'Создать продажу', urlSub: '/sale/sale-form'},
        {nameSub: 'Покупатели', urlSub: '/sale/clients'},
      ]},
    {name: 'Клиенты', icon: 'fas fa-users', subMenu: [
        {nameSub: 'Список клиентов', urlSub: '/client-page'},
      ]},
    {name: 'Перемещение', icon: 'fas fa-shipping-fast', subMenu: [
        {nameSub: 'Перемещение', urlSub: '/traffic'},
        {nameSub: 'Создать перемещение', urlSub: '/traffic/create'},
        {nameSub: 'Список перемещений', urlSub: '/traffic/list'},
      ]},

    {name: 'Интернет продажи', icon: 'fas fa-shopping-bag', countAllOrder: 0, subMenu: [
        {nameSub: 'Beauty space', urlSub: '/sites/beauty-space', countOrder: 0},
        {nameSub: 'Space lashes', urlSub: '/sites/space-lashes', countOrder: 0},
        {nameSub: 'Общая статистика', urlSub: '/sites'},

      ]},

    {name: 'Общение', icon: 'fab fa-rocketchat', subMenu: [
        {nameSub: 'Чат', urlSub: '/chat'},
        {nameSub: 'Рабочие группы', urlSub: '/chat/work-group'},
        {nameSub: 'Личные сообщения', urlSub: '/chat/dialog'},

      ]},
  ];





  ngOnInit() {


  }




}
