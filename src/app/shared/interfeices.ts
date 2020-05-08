export interface MainMenu {
  name: string
  subMenu?: SubMenu[]
  icon: string
  countAllOrder?: number
}

export interface SubMenu {
  nameSub: string
  urlSub: string
  countOrder?: number
}

export interface Result {
  status: boolean;
  message: any;
}

export interface Warehouse {
  _id?: string;
  name: string;
}

export interface Profession {
  _id?: string;
  professionName: string;
}

export interface User {
  _id?: string;
  name?: string;
  surname?: string;
  phone: string;
  password: string;
  workWarehouse?: string;
  accessUser?: string;
  salary?: number;
  photoUser?: any;
  instagramUrl?: string;
  documentsUser?: [string];
  date: Date;
  saleAmountInMonth?: number
  allSaleAmount?: number
}

export interface Category {
  _id?: string;
  name: string;
  parentCategories?: [{
    nameParent?: string,
    parent?: string
  }];

}

export interface List {
  idProd: string;
  nameProd: string;
  cost: number;
  quantity: number;
  allCost: number;
}

export interface State {
  _id?: string;
  name: string;
}

export interface Cash {
  _id?: any;
  idWarehouse: any;
  dateCash: Date;
  balanceBeginning: number;
  balanceEnding: number;
  changesDay: number;
  balanceCash: number;
}

export interface Cashless {
  _id?: any;
  idWarehouse: any;
  dateCashless: Date;
  balanceBeginning: number;
  balanceEnding: number;
  changesDay: number;
  balanceCashless: number;
}

export interface Expense {
  _id?: string;
  date?: Date;
  author: string;
  warehouseId: string;
  stateExpense: State;
  cancellation?: string;
  value: number;
  description: string;
}

export interface Income {
  _id?: string;
  date?: Date;
  author: string;
  warehouseId: string;
  stateIncome: State;
  cancellation?: string;
  value: number;
  description: string;
}

export interface Product {
  _id?: string;
  name: string;
  category: any;
  barCode?: number;
  salePrice: number;
  purchasePrice: number;
  brand?: Brand;
  photo?: string;
  description?: string;
  minSalePrice?: number;
  dateCreate?: Date;
  dateLastUpdate?: Date;
  categoryName?: string
}

export interface Balance {
  _id?: string;
  barCode: number;
  productId: string;
  leftovers: LeftoversWarehouse[];
  fullBalance?: number
  products: Product
  saleCount?: number
}

export interface LeftoversWarehouse {
  idWarehouse: string;
  balance: number;
}

export interface Brand {
  _id?: string;
  name: string;
  operator?: string;
}

export interface Purchase {
  _id?: string;
  warehouseId: string
  date: Date;
  updatedDate: Date
  productPurchase: PurchaseProduct[];
  user: string
  allAmount: number
  cancellation: string
  delivered?: boolean
  supplier: any
  track?: string
  status: string

}

export interface PurchaseProduct {
  productId: string
  name: string
  count: number
  pricePurchase: number
  amount: number
  status?: string
}

export interface Supplier {
  _id?: string
  name: string
  surname: string
  contact: string
  contactTwo: string
  amount: number
  brands?: Brand[];
  postTown: string
  review?: any
}
export interface Client {
  _id: string
  name?: string
  surname: string
  phone: string
  discount: number
  amountPurchase: number
}


export interface Sale {
  _id?: string;
  warehouse: string
  date: Date;
  updatedDate?: Date
  productsSale: SaleProduct[];
  user: string
  allAmount: number
  cancellation: string
  delivered?: boolean
  client: any
  track?: string
  status?: string
  deleteProductSale?: SaleProduct[];
  addProductSale?: SaleProduct[];
}

export interface SaleProduct {
  productId: string
  name: string
  count: number
  pricePurchase: number
  priceSale: number
  amount: number
  discount?: number
  discountAmount?: number
}

export interface LeftoversForWarehouse {
  leftovers: LeftoversWarehouse
  products: Product
  barCode: number
  productId: string
}

export interface Traffic {
  _id?: string
  warehouseIncome: string
  warehouseExpense: string
  date: Date;
  updatedDate: Date
  productTraffic: TrafficProduct[];
  user: string
  status: string
}

export interface TrafficProduct {
  product: string
  productName: string
  count: number
}

export interface MainDetailOrderBeautySpace {
  ID: number
  post_date: Date
  post_status: string
  order_total?: string
  billing_last_name?: string
  billing_first_name?: string
}

export interface OrderDetailBeautySpace {
    ID: number
    post_date: Date
    post_status: string
    billing_first_name: string
    billing_last_name: string
    billing_city: string
    billing_phone: string
    order_total: string
    billing_new_fild5: string
    payment_method_title: string
    shipping_address_index?: string
    img?: string
}

export interface ProductsOrderBeautySpace {
  order_item_name: string
  qty: number
  line_total: number
  cost?: number
  img?: string
  product_id: number
}

export interface CommitBeautySpace {
  comment_post_ID: number
  comment_author: string
  comment_author_email: string
  comment_date: Date
  comment_date_gmt: Date
  comment_content: string
  comment_approved: string
  comment_agent: string
  comment_type: string
  comment_parent: number
  user_id: number
}

export interface OrderCount {
  processing: number
  completed: number
  failed: number
  hold: number
  cancelled: number
  allCount: number

}
export interface TtnInfo {
  name: string
  surname: string
  phone: string
  paymentMethod: string
  orderTotal: number
  state: number
  weight: number
  cityRef: string
  cityFullName: string
  postOfficeNumber: string
}

export interface PrivateMessage {
  message: string
  userPost: any
  userRecipient: any
  date: Date
}


export interface SpaceOrderProduct {
  nameProd: string
  cost: number
  quantity: number
  _id?: string
  imageCart?: string
  allCost?: number

}


export interface SpaceOrder {
  _id: string
  order: number
  list: SpaceOrderProduct[]
  allSumOrder?: number
  status: string
  client: {
    name: string
    surname: string
    phone: number
    city: string
    postOffice: string
    email?: string
  }
  date?: Date
}


export interface SpaceCategory {
  name: string
  _id?: string
  countProduct?: number
  linkCategoryName?: string
}

export interface SpaceProduct {
  name: string
  category: string
  cost: number
  description: string
  shortDescription: string
  availability?: string
  rate?: number
  purchases?: number
  image?: string
  _id?: string
  gallery?: SpaceProductGallery[]
  character?: string
  linkUrl: string
  countReview?: number
  starArray?: any
  categoryLink?: string
}
export interface SpaceProductGallery  {
  urlImage: string
}
