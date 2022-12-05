import { environment } from 'src/environments/environment';

const prefixApi = '/api';
export const AccountAPI = {
  Login : `${prefixApi}/Account/Login`, // POST
  Register : `${prefixApi}/Account/Register`, // POST
  CheckEmailExist : `${prefixApi}/Account/CheckDuplicateEmail`, // GET
  CheckPhoneExist : `${prefixApi}/Account/CheckDuplicatePhone`, // GET
}
export const EnterpriseTypeAPI = {
    All: `${prefixApi}/EnterpriseType/GetAll` // GET
};
export const EnterpriseAPI = {
    GetOwned: `${prefixApi}/Enterprise/GetOwned`, // GET
    Create: `${prefixApi}/Enterprise/Create`, // POST
    CheckAvailableEnterpriseCode: `${prefixApi}/Enterprise/CheckAvailableEnterpriseCode`, // GET
    GetAvailableEnterpriseCode: `${prefixApi}/Enterprise/GetAvailableEnterpriseCode`, // GET
    GetEnterpriseToken: `${prefixApi}/Enterprise/GetEnterpriseToken`, // GET
    GetMyEnterpriseInfo:`${prefixApi}/Enterprise/GetMyEnterpriseInfo`, // GET
};
export const GoodsAPI = {
    Create: `${prefixApi}/Goods/Create`, // POST
    UpdateInfo: `${prefixApi}/Goods/UpdateInfo`, // PUT
    AddItem: `${prefixApi}/Goods/AddItem`, // POST
    Update: `${prefixApi}/Goods/Update`, // PUT
    UpdateSellingPrice: `${prefixApi}/Goods/UpdateSellingPrice`, // PUT
    AddStock: `${prefixApi}/Goods/AddStock`, // PUT
    AdjustStock: `${prefixApi}/Goods/AdjustStock`, // PUT
    CheckDuplicateBarcode: `${prefixApi}/Goods/CheckDuplicateBarcode`, // GET
    GetMyGoodses: `${prefixApi}/Goods/GetMyGoodses`, // GET
    GetMyGoodsesRelation: `${prefixApi}/Goods/GetMyGoodsesRelation`, // GET
    GetInfoOfGoodsForUpdating: `${prefixApi}/Goods/GetInfoOfGoodsForUpdating`, // GET
    GetListProductForCashier: `${prefixApi}/Goods/GetListProductForCashier`, // GET
};
export const GoodsGroupAPI = {
    Create: `${prefixApi}/GoodsGroup/Create`, // POST
    GetMyGoodsGroup: `${prefixApi}/GoodsGroup/GetMyGoodsGroups`, // GET
    CheckDuplicateGoodsGroupName: `${prefixApi}/GoodsGroup/CheckDuplicateGoodsGroupName` // GET
};
export const GoodsTypeAPI = {
    All: `${prefixApi}/GoodsType/GetAll`, // GET
};
export const GoodsPackagingAPI = {
    All: `${prefixApi}/GoodsPackaging/GetAll` // GET
};
export const OrderAPI = {
    CreateOrderFromCashier: `${prefixApi}/Order/CreateOrderCashier`, // POST
    EnterpriseTrasaction: `${prefixApi}/Order/GetEnterpriseOrder`, // GET
    DetailEnterpriseTransaction : `${prefixApi}/Order/GetEnterpriseOrderDetail`, // GET
};
export const EmployeeAPI = {
    GetEnterpriseEmployeeList: `${prefixApi}/Employee/GetEnterpriseEmployeeList`, // GET
    CheckAvailableCandidateEmployee: `${prefixApi}/Employee/CheckAvailableCandidateEmployee`, // GET
    GetCandidateEmployee: `${prefixApi}/Employee/GetCandidateEmployee`, // GET
    GetDetailEnterpriseEmployee: `${prefixApi}/Employee/GetDetailEnterpriseEmployee`, // GET
    CreateEmployee: `${prefixApi}/Employee/CreateEmployee`, // POST
    UpdateEmployee: `${prefixApi}/Employee/UpdateEmployee`, // PUT
    DeleteEmployee: `${prefixApi}/Employee/DeleteEmployee`, // PUT
    JoinEmployee: `${prefixApi}/Employee/JoinEmployee`, // POST
};
export const RoleAPI = {
    GetEnterpriseClaim: `${prefixApi}/Role/GetEnterpriseClaim`, // GET
    GetEnterpriseRoleClaim: `${prefixApi}/Role/GetEnterpriseRoleClaim`, // GET
    CheckDuplicateRoleName: `${prefixApi}/Role/CheckDuplicateRoleName`, // GET
    GetEnterpriseRolePage: `${prefixApi}/Role/GetEnterpriseRolePage`, // GET
    GetEnterpriseRoleList: `${prefixApi}/Role/GetEnterpriseRoleList`, // GET
    CreateEnterpriseRole: `${prefixApi}/Role/CreateRole`, // POST
    UpdateEnterpriseRole: `${prefixApi}/Role/UpdateRole`, // PUT
    DeleteEnterpriseRole: `${prefixApi}/Role/DeleteRole`, // PUT
};
