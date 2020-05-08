import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {LoginLayoutComponent} from './shared/layouts/login-layout/login-layout.component';
import {AuthGuard} from './shared/classes/auth.guard';

import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';

import {SettingPageComponent} from './setting-page/setting-page.component';
import {UsersPageComponent} from './setting-page/users-page/users-page.component';
import {WarehousePageComponent} from './setting-page/warehouse-page/warehouse-page.component';
import {ProfessionsPageComponent} from './setting-page/professions-page/professions-page.component';
import {UserOneComponent} from './setting-page/users-page/user-one/user-one.component';

import {FinancePageComponent} from './finance-page/finance-page.component';
import {CashPageComponent} from './finance-page/cash-page/cash-page.component';
import {CashlessPageComponent} from './finance-page/cashless-page/cashless-page.component';
import {IncomePageComponent} from './finance-page/income-page/income-page.component';
import {ExpensesPageComponent} from './finance-page/expenses-page/expenses-page.component';
import {StateComponent} from './finance-page/state/state.component';
import {CashOnlineStoreComponent} from './finance-page/cash-online-store/cash-online-store.component';


import {ProductsPageComponent} from './products-page/products-page.component';
import {CategoryPageComponent} from './products-page/category-page/category-page.component';
import {BrandPageComponent} from './products-page/brand-page/brand-page.component';
import {OneCategoryPageComponent} from './products-page/category-page/one-category-page/one-category-page.component';
import {OneProductPageComponent} from './products-page/one-product-page/one-product-page.component';
import {SupplierPageComponent} from './setting-page/suplier-page/suplier-page.component';
import {SupplierOnePageComponent} from './setting-page/suplier-page/supplier-one-page/supplier-one-page.component';
import {ProductBalanceComponent} from './product-balance/product-balance.component';
import {PurchasePageComponent} from './purchase-page/purchase-page.component';
import {PurchaseFormComponent} from './purchase-page/purchase-form/purchase-form.component';
import {PurchaseOnePageComponent} from './purchase-page/purchase-one-page/purchase-one-page.component';
import {SalePageComponent} from './sale-page/sale-page.component';
import {ClientListPageComponent} from './sale-page/client-list-page/client-list-page.component';
import {ClientOnePageComponent} from './sale-page/client-list-page/client-one-page/client-one-page.component';
import {SaleFormPageComponent} from './sale-page/sale-form-page/sale-form-page.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {ChatWorkgroupPageComponent} from './chat-page/chat-workgroup-page/chat-workgroup-page.component';
import {DialogPageComponent} from './chat-page/dialog-page/dialog-page.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {OneSalePageComponent} from './sale-page/one-sale-page/one-sale-page.component';
import {SaleWebSitesComponent} from './sale-web-sites/sale-web-sites.component';
import {SpaceLashesPageComponent} from './sale-web-sites/space-lashes-page/space-lashes-page.component';
import {BeautySpacePageComponent} from './sale-web-sites/beauty-space-page/beauty-space-page.component';
import {OneSpaceOrderComponent} from './sale-web-sites/space-lashes-page/one-space-order/one-space-order.component';



const routes: Routes = [

  {path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'products', component: ProductsPageComponent},
      {path: 'products/:id', component: OneProductPageComponent},
      {path: 'category', component: CategoryPageComponent},
      {path: 'category/:id', component: OneCategoryPageComponent},
      {path: 'brand', component: BrandPageComponent},

      {path: 'finance', component: FinancePageComponent},
      {path: 'finance/cash', component: CashPageComponent},
      {path: 'finance/cashless', component: CashlessPageComponent},
      {path: 'finance/income', component: IncomePageComponent},
      {path: 'finance/expenses', component: ExpensesPageComponent},
      {path: 'finance/state', component: StateComponent},
      {path: 'finance/cash-store', component: CashOnlineStoreComponent},

      {path: 'setting', component: SettingPageComponent},
      {path: 'setting/users', component: UsersPageComponent},
      {path: 'setting/users/:id', component: UserOneComponent},
      {path: 'setting/warehouse', component: WarehousePageComponent},
      {path: 'setting/professions', component: ProfessionsPageComponent},
      {path: 'setting/supplier', component: SupplierPageComponent},
      {path: 'setting/supplier/:id', component: SupplierOnePageComponent},

      {path: 'product-balance', component: ProductBalanceComponent},


      {path: 'purchase', component: PurchasePageComponent},
      {path: 'purchase/form-purchase', component: PurchaseFormComponent},
      {path: 'purchase/:id', component: PurchaseOnePageComponent},


      {path: 'sale', component: SalePageComponent },
      {path: 'sale/sale-form', component: SaleFormPageComponent },
      {path: 'sale/clients', component: ClientListPageComponent },
      {path: 'sale/clients/:id', component: ClientOnePageComponent },
      {path: 'sale/:id', component: OneSalePageComponent},


      {path: 'chat', component: ChatPageComponent },
      {path: 'chat/work-group', component: ChatWorkgroupPageComponent },
      {path: 'chat/dialog', component: DialogPageComponent },


      {path: 'analytics', component: AnalyticsPageComponent},


      {path: 'sites', component: SaleWebSitesComponent},
      {path: 'sites/space-lashes', component: SpaceLashesPageComponent},
      {path: 'sites/space-lashes/:id', component: OneSpaceOrderComponent},
      {path: 'sites/beauty-space', component: BeautySpacePageComponent},
      // {path: 'sites/beautyspace/order', component: OrderBeautyspaceComponent},
      // {path: 'sites/beautyspace/order/:id', component: OneOrderComponent},

      // {path: 'leftovers', component: LeftoversPageComponent},
      // {path: 'purchase/supplier', component: SupplierPageComponent},
      // {path: 'purchase/plan', component: PurchasePlanComponent},
      // {path: 'purchase/sell-period', component: PurchasePeriodSellComponent},

      //

      //

      // {path: 'sale'/history', component: SellHistoryComponent},
      // {path: 'sale'/create', component: SallFormComponent},
      // {path: 'sale'/list/:id', component: SaleOneInfoComponent},
      //
      // {path: 'account', component: AccountPageComponent},
      //
      // {path: 'client-page', component: ClientPageComponent},
      //
      // {path: 'task', component: TaskPageComponent},
      // {path: 'test/index', component: TestPageComponent},
      //
      // {path: 'traffic', component: TrafficPageComponent},
      // {path: 'traffic/create', component: TrafficFormComponent},
      // {path: 'traffic/list', component: TrafficListComponent},
      //
      //


    ]},

  {path: 'login', component: LoginLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
