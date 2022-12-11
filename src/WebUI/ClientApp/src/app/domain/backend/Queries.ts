

export type CheckAvailableEnterpriseCodeQuery = {
    Code: string
};

export type GetMyEnterprisesSearchQuery = SearchPageRequest & {

};
export type GetAvailableEnterpriseCodeQuery = {
    Name: string
};
export type CheckDuplicateBarcodeInAnEnterpriseQuery = {
    Barcode: string;
};
export type SearchPageRequest = {
    Search: string;
    PageNumber: number;
    PageSize: number;
};
export type GetMyEnterprisesQuery= SearchPageRequest & {

};
export type GetMyGoodsesSearchQuery = SearchPageRequest & {

};

export type GetMyGoodsesRelationQuery = {
    EnterpriseId: string;
    Search: string;
};
export type GetInfoOfGoodsForUpdatingQuery = {
    Id: string
};
export type CashierProductSearchQuery = {
    Search: string;
    EnterpriseId: string;
};
export type EnterpriseTokenQuery = {
    EnterpriseId: string;
};
export type GetMyEnterpriseInfoQuery = {
    Id: string;
};
export type GetAllEnterpriseClaimsQuery = {
    EnterpriseTypeId: number;
};
export type GetOrderEnterpriseQuery = SearchPageRequest & {
    EnterpriseId: string;
    StartCreatedAt: Date|null;
    EndCreatedAt: Date|null;
};
export type GetDetailOrderEnterpriseQuery= {
    Id: string;
};
export type CheckDuplicateRoleNameQuery= {
    Name: string;
};

export type RoleClaimItem = {
    id: string;
    authorize: boolean;
};

export type GetEnterpriseRoleClaimsQuery= {
    Id: string;
};

export type GetEnterpriseRoleQuery= SearchPageRequest&{

};
export type GetEnterpriseEmployeeQuery= SearchPageRequest&{

};
export type GetCandidateEmployeeQuery= {
    CandidateEmployeeEmail: string;
};
export type GetDetailEnterpriseEmployeeQuery= {
    Id: string;
};
export type CheckAvailableCandidateEmployeeQuery= {
    Email: string;
};
export type GetEnterpriseRoleListQuery= {
    Search: string;
};


export type GetMyGoodsGroupsSearchQuery = SearchPageRequest & {

};
export type CheckDuplicateGoodsGroupNameQuery = {
    Name: string;
};
