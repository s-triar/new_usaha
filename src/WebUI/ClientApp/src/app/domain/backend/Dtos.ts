export type Result = {
    succeeded:boolean;
    errors:string[];
}

export type ResultWithMessage = Result & {
    message:string;
}

export type ResultUserLogin = ResultWithMessage & {
  token: string|null;
}

export type EnterpriseTypeDto = {
    id: number;
    name: string;
    provide: string;
};
export type EnterpriseAddressDto = {
    id: string;
    enterpriseId: string;
    street: string;
    subDistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    latitude: number;
    longitude: number;
};
export type EnterpriseDto = {
    id: string;
    name: string;
    description: string;
    enterpriseType: string;
    photo: string;
    phone: string;
    email: string;
    address: EnterpriseAddressDto;
};
export type EnterpriseTokenDto = {
    token: string;
};

export type MyEnterpriseDto = {
    id: string;
    name: string;
    enterpriseType: string;
    photo: string;
    phone: string;
    email: string;
    code:string;
    address: string;
    owned: boolean;

};
export type MyEnterpriseContainerDto = SearchPageResponse<MyEnterpriseDto> & {

};
export type GoodsPackagingDto= {
    id: number;
    name: string;
};
export type GoodsTypeDto= {
    id: number;
    name: string;
    parentGoodsTypeId: number|null;
    subGoodsTypes: GoodsTypeDto[] | null;
};
export type MyGoodsRelationDto= {
    id: string;
    name: string;
};

export type MyGoodsesListItemDto = {
    id: string;
    goodsInfoId: string;
    enterpriseId: string;
    barcode: string;
    name: string;
    goodsPackaging: string;
    price: number;
    stock: string;
};

export type SearchPageResponse<T> = {
    items: T[],
    totalPages: number,
    totalCount: number,
    pageNumber: number
};

export type MyGoodsesListContainerDto = SearchPageResponse<MyGoodsesListItemDto> & {

};

export type MyGoodsesDto = {
    id: string;
    enterpriseId: string;
    barcode: string;
    name: string;
    description: string;
    photo: string;
    goodsType: string;
    goodsPackaging: string;
    contain: number;
    price: number;
    wholesalerPrice: number;
    n: number;
    stock: string;
};
export type GoodsGroupInfoDto = {
    id: string;
    members: GoodsGroupMemberInfoDto[];
    name: string;
};
export type GoodsGroupMemberInfoDto = {
    id: string;
    barcode: string;
    name: string;
};
export type GoodsParentInfoDto = {
    id: string;
    barcode: string;
    name: string;
    description: string;
    photo: string;
    contain: number;
    n: number;
};
export type InfoOfGoodsForUpdatingDto = {
    id: string;
    enterpriseId: string;
    name: string;
    description: string;
    goodsTypeId: number;
    barcode: string;
    photo: string;
    contain: number;
    n: number;
    price: number;
    buyPrice: number;
    baseBuyPrice: number;
    wholesalerPrice: number;
    wholesalerMin: number;
    isWholesalerPriceAuto: boolean;
    parentGoodsId: string;
    availableOnline: boolean;
    threshold: number;
    parent: GoodsParentInfoDto | null;
    groups: GoodsGroupInfoDto[];
};

export type MyGoodsForCashierDto = {
    id: string;
    enterpriseId: string;
    barcode: string;
    name: string;
    price: number;
    wholesalerPrice: number;
    wholesalerMin: number;
    promos: any[];
    isWholesalerPriceAuto: boolean;
    goodsPackaging: string;
};

export type TransactionListContainerDto = SearchPageResponse<OrderDto> & {

};

export type OrderDto = {
    id: string;
    total: number;
    payment: number;
    return: number;
    orderProgress: string;
    paymentMethod: string;
    isOnline: boolean;
    createdAt: Date;
};

export type OrderProgressList= {
    id: string;
    createdAt: Date;
    name: string;
};

export type OrderGoodsList= {
    id: string;
    barcode: string;
    name: string;
    isWholesalerPrice: boolean;
    discountItem: number;
    discountItemTotal: number;
    pricePerItem: number;
    pricePerItemAfterDiscount: number;
    priceTotal: number;
    priceTotalAfterDiscount: number;
    priceTotalFinal: number;
    n: number;
};

export type DetailOrderDto = {
    id: string;
    total: number;
    payment: number;
    return: number;
    orderProgress: string;
    paymentMethodName: string;
    isOnline: boolean;
    createdAt: Date;
    orderProgresses: OrderProgressList[];
    goodsOrdereds: OrderGoodsList[]
    to: string;
    createdById: string;
    createdByName: string;

};

export type EnterpriseClaimDto = {
    id: string;
    context: string;
    feature: string;
    action: string;
    description: string;
};
export type EnterpriseRoleDetailDto = {
    id: string;
    name: string;
    claims: string[];
};

export type EnterpriseRoleDto= {
    id: string;
    name: string;
};

export type EnterpriseRoleContainerDto = SearchPageResponse<EnterpriseRoleDto> & {

};


export type MyGoodsGroupsListMemberItemDto = {
    id: string;
    name: string;
    photoUrl: string|null;
};

export type MyGoodsGroupsListItemDto = {
    id: string;
    name: string;
    members: MyGoodsGroupsListMemberItemDto[];
};

export type MyGoodsGroupsListContainerDto = SearchPageResponse<MyGoodsGroupsListItemDto> & {

};

export type EnterpriseEmployeeDetailDto =
{
    userId :string;
    employeeId :string;
    email :string;
    name:string;
    enterpriseRoleName:string;
}
export type EnterpriseEmployeeDto =
{
    userId:string;
    employeeId:string;
    employeeName:string;
    enterpriseRoleName:string;
}
export type EnterpriseEmployeeListContainerDto = SearchPageResponse<EnterpriseEmployeeDto> & {

};

export type UserMinimalInfo={
    id:string
    name:string
    email:string
}
