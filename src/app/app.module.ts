import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import {ToastrModule} from 'ngx-toastr';
import { AppComponent } from './app.component';
import {LoaderComponent} from './shared/components/loader/loader.component';

import { LoginLayoutComponent } from './shared/layouts/login-layout/login-layout.component';

import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {NavBarComponent} from './shared/layouts/main-layout/nav-bar/nav-bar.component';
import {MenuNavComponent} from './shared/layouts/main-layout/menu-nav/menu-nav.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';

import {SettingPageComponent} from './setting-page/setting-page.component';
import {UserFormComponent} from './setting-page/users-page/user-form/user-form.component';
import {UsersPageComponent} from './setting-page/users-page/users-page.component';
import {WarehousePageComponent} from './setting-page/warehouse-page/warehouse-page.component';
import {WarehouseFormComponent} from './setting-page/warehouse-page/warehouse-form/warehouse-form.component';
import {ProfessionsPageComponent} from './setting-page/professions-page/professions-page.component';
import { UserOneComponent } from './setting-page/users-page/user-one/user-one.component';



import {FinancePageComponent} from './finance-page/finance-page.component';
import {StateComponent} from './finance-page/state/state.component';
import {StateIncomeFormComponent} from './finance-page/state/state-income-form/state-income-form.component';
import {StateExpensesFormComponent} from './finance-page/state/state-expenses-form/state-expenses-form.component';
import {IncomePageComponent} from './finance-page/income-page/income-page.component';
import {ExpensesFormComponent} from './finance-page/expenses-page/expenses-form/expenses-form.component';
import {CashPageComponent} from './finance-page/cash-page/cash-page.component';
import {CashOnlineStoreComponent} from './finance-page/cash-online-store/cash-online-store.component';
import {CashlessPageComponent} from './finance-page/cashless-page/cashless-page.component';
import {ExpensesPageComponent} from './finance-page/expenses-page/expenses-page.component';
import {IncomeFormComponent} from './finance-page/income-page/income-form/income-form.component';


import {BrandFormComponent} from './products-page/brand-page/brand-form/brand-form.component';
import { CategoryPageComponent } from './products-page/category-page/category-page.component';
import {ProductsPageComponent} from './products-page/products-page.component';
import {ProductListComponent} from './products-page/product-list/product-list.component';
import {ProductFormComponent} from './products-page/product-form/product-form.component';
import {CategoryListComponent} from './products-page/category-list/category-list.component';
import {CategoryFormComponent} from './products-page/category-page/category-form/category-form.component';
import {CategoryFilterPipe} from './shared/pipes/category-filter.pipe';
import {ProductsFilterPipe} from './shared/pipes/products-filter.pipe';
import {ProductsFilterBarCodePipe} from './shared/pipes/products-filter-bar-code.pipe';
import { BrandPageComponent } from './products-page/brand-page/brand-page.component';
import { ProductNavComponent } from './products-page/product-nav/product-nav.component';
import { OneCategoryPageComponent } from './products-page/category-page/one-category-page/one-category-page.component';
import { OneProductPageComponent } from './products-page/one-product-page/one-product-page.component';
import {SupplierPageComponent} from './setting-page/suplier-page/suplier-page.component';
import { SupplierFormComponent } from './setting-page/suplier-page/supplier-form/supplier-form.component';
import { SupplierOnePageComponent } from './setting-page/suplier-page/supplier-one-page/supplier-one-page.component';
import { ProductBalanceComponent } from './product-balance/product-balance.component';
import { BalanceFilterPipe } from './shared/pipes/balance-filter.pipe';
import {PurchasePageComponent} from './purchase-page/purchase-page.component';
import { PurchaseFormComponent } from './purchase-page/purchase-form/purchase-form.component';
import { TopBlockFormComponent } from './purchase-page/purchase-form/top-block-form/top-block-form.component';
import { LeftoversSellComponent } from './purchase-page/purchase-form/leftovers-sell/leftovers-sell.component';
import { PurchaseListProductsComponent } from './purchase-page/purchase-form/purchase-list-products/purchase-list-products.component';
import { PurchaseOnePageComponent } from './purchase-page/purchase-one-page/purchase-one-page.component';
import { PurchaseOneListComponent } from './purchase-page/purchase-one-page/purchase-one-list/purchase-one-list.component';
import { TablePurchaseBlockComponent } from './purchase-page/table-purchase-block/table-purchase-block.component';
import { FilterPurchaseBlockComponent } from './purchase-page/filter-purchase-block/filter-purchase-block.component';
import {AddProductFormComponent} from './purchase-page/purchase-one-page/add-product-form/add-product-form.component';
import { SalePageComponent } from './sale-page/sale-page.component';
import { ClientListPageComponent } from './sale-page/client-list-page/client-list-page.component';
import { ClientFormComponent } from './sale-page/client-list-page/client-form/client-form.component';
import { ClientOnePageComponent } from './sale-page/client-list-page/client-one-page/client-one-page.component';
import { ClientSurnamePipe } from './shared/pipes/client-surname.pipe';
import { SaleFormPageComponent } from './sale-page/sale-form-page/sale-form-page.component';
import { SaleFormListComponent } from './sale-page/sale-form-page/sale-form-list/sale-form-list.component';
import { SaleBalanceListComponent } from './sale-page/sale-form-page/sale-balance-list/sale-balance-list.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatWorkgroupPageComponent } from './chat-page/chat-workgroup-page/chat-workgroup-page.component';
import { DialogPageComponent } from './chat-page/dialog-page/dialog-page.component';
import { MessageBlockComponent } from './chat-page/dialog-page/message-block/message-block.component';
import { UsersChatBlockComponent } from './chat-page/dialog-page/users-chat-block/users-chat-block.component';
import { MessageFormBlockComponent } from './chat-page/dialog-page/message-block/message-form-block/message-form-block.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { OneSalePageComponent } from './sale-page/one-sale-page/one-sale-page.component';
import { InfoBlockSaleComponent } from './sale-page/one-sale-page/info-block-sale/info-block-sale.component';
import { TableProductsSaleComponent } from './sale-page/one-sale-page/table-products-sale/table-products-sale.component';
import { FooterComponent } from './shared/layouts/main-layout/footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SaleWebSitesComponent } from './sale-web-sites/sale-web-sites.component';
import { SpaceLashesPageComponent } from './sale-web-sites/space-lashes-page/space-lashes-page.component';
import { BeautySpacePageComponent } from './sale-web-sites/beauty-space-page/beauty-space-page.component';
import { HeaderSpaceBlockComponent } from './sale-web-sites/space-lashes-page/header-space-block/header-space-block.component';
import { OrderSpaceListComponent } from './sale-web-sites/space-lashes-page/order-space-list/order-space-list.component';
import { OneSpaceOrderComponent } from './sale-web-sites/space-lashes-page/one-space-order/one-space-order.component';
import {NgxPaginationModule} from 'ngx-pagination';







@NgModule({
  declarations: [

    AppComponent,
    LoaderComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    NavBarComponent,
    MenuNavComponent,
    DashboardPageComponent,

    CategoryFilterPipe,
    ProductsFilterPipe,
    ProductsFilterBarCodePipe,

    SettingPageComponent,
    UsersPageComponent,
    WarehousePageComponent,
    ProfessionsPageComponent,
    UserFormComponent,
    WarehouseFormComponent,
    UserOneComponent,

    FinancePageComponent,
    StateComponent,
    StateIncomeFormComponent,
    StateExpensesFormComponent,
    IncomePageComponent,
    IncomeFormComponent,
    ExpensesPageComponent,
    ExpensesFormComponent,
    CashlessPageComponent,
    CashPageComponent,
    CashOnlineStoreComponent,


    SupplierPageComponent,
    ProductsPageComponent,
    ProductListComponent,
    ProductFormComponent,
    BrandFormComponent,
    CategoryPageComponent,
    CategoryListComponent,
    CategoryFormComponent,
    BrandPageComponent,
    ProductNavComponent,
    OneCategoryPageComponent,
    OneProductPageComponent,
    SupplierFormComponent,
    SupplierOnePageComponent,
    ProductBalanceComponent,
    BalanceFilterPipe,


    PurchasePageComponent,
    PurchaseFormComponent,
    TopBlockFormComponent,
    LeftoversSellComponent,
    PurchaseListProductsComponent,
    PurchaseOnePageComponent,
    PurchaseOneListComponent,
    TablePurchaseBlockComponent,
    FilterPurchaseBlockComponent,
    AddProductFormComponent,
    SalePageComponent,
    ClientListPageComponent,
    ClientFormComponent,
    ClientOnePageComponent,
    ClientSurnamePipe,
    SaleFormPageComponent,
    SaleFormListComponent,
    SaleBalanceListComponent,
    ChatPageComponent,
    ChatWorkgroupPageComponent,
    DialogPageComponent,
    MessageBlockComponent,
    UsersChatBlockComponent,
    MessageFormBlockComponent,
    AnalyticsPageComponent,
    OneSalePageComponent,
    InfoBlockSaleComponent,
    TableProductsSaleComponent,
    FooterComponent,
    SaleWebSitesComponent,
    SpaceLashesPageComponent,
    BeautySpacePageComponent,
    HeaderSpaceBlockComponent,
    OrderSpaceListComponent,
    OneSpaceOrderComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxBarcodeModule,
    ToastrModule.forRoot(),
    NgxPrintModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],

  providers: [
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
