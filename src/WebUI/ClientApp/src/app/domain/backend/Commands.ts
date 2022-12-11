export type LoginCommand = {
  Identifier:string;
  Password: string;
}

export type RegisterCommand={
    Fullname:string;
    Email:string;
    Phone:string;
    Password:string;
    ConfirmPassword:string;
}

export type EnterpriseAddressCommand = {
    Street: string;
    SubDistrict: string;
    District: string;
    City: string;
    Province: string;
    PostalCode: string;
    Latitude: number;
    Longitude: number;
};
export type CreateEnterpriseCommand  =  {
    Name: string;
    Description: string;
    EnterpriseType: string;
    Photo: string;
    Phone: string;
    Email: string;
    Address: EnterpriseAddressCommand;
    EnterpriseTypeId: number;
    PhotoFile: File | null;
};

export type WholesalesPrice={
    WholesalerPrice: number;
    WholesalerMin: number;
}
export type CreateGoodsCommand = {
    GoodsTypeId: number;
    Barcode: string;
    Name: string;
    Description: string;
    Photo: string;
    PhotoFile: File |null;
    PhotoString: string|ArrayBuffer |null;
    Contain: number;
    Price: number;
    N: number;
    Threshold: number;
    AvailableOnline: boolean;
    BuyPrice: number;
    WholesalesPrices: WholesalesPrice[];
    IsWholesalerPriceAuto: boolean;
    ParentBarcode: string;
    GoodsGroups: string[];
};

export type EditGoodsCommand = {
    Id: string;
    GoodsTypeId: number;
    Barcode: string;
    Name: string;
    Description: string;
    Photo: string;
    PhotoFile: File |null;
    PhotoString: string|ArrayBuffer |null;
    Contain: number;
    AvailableOnline: boolean;
    ParentBarcode: string;
    AddGoodsGroups: string[];
    RemoveGoodsGroups: string[];
};


// export type POSCashierItemCommand = {
//     Id: string;
//     IsWholesalerPricesUsed: boolean;
//     Promos: any[];
//     SinglePriceDiscount: number;
//     TotalPriceDiscount: number;
//     UsedPrice: number;
//     UsedTotalPrice: number;
//     Qty: number;
// };
// export type CreatePaymentCommand = {
//     Items: POSCashierItemCommand[],
//     TotalPayment: number,
//     Payment: number,
//     Return: number
// };

export type  AdjustStockCommand= {
    Id: string,
    ActualStock: number,
};
export type  AddStockCommand= {
    Id: string,
    Increment: number,
    BuyPriceTotal: number,
};
export type  UpdateGoodsSellingPriceCommand= {
    Id: string,
    Price: number,
    WholesalerPrices: WholesalesPrice[],
};
export type ItemOrdered= {
    GoodsId: string;
    IsWholesalerPrice: boolean;
    DiscountItem: number;
    DiscountItemTotal: number;
    PricePerItem: number;
    PricePerItemAfterDiscount: number;
    PriceTotal: number;
    PriceTotalAfterDiscount: number;
    PriceTotalFinal: number;
    N: number;
};
export type CreateOrderCashierCommand = {
    EnterpriseId: string;
    Total: number;
    Payment: number;
    Return: number;
    To: string;
    Items: ItemOrdered[];
};
export type RoleClaimItemCommand = {
    Id: string;
    Authorize: boolean;
};
export type CreateRoleCommand = {
    Name: string;
    Claims: RoleClaimItemCommand[];
};
export type UpdateRoleCommand = {
    Id: string;
    Name: string;
    Claims: RoleClaimItemCommand[];
};
export type DeleteRoleCommand = {
    Id: string;
};
export type CreateGoodsGroupCommand = {
    Name: string;
    Description: string|null;
};
