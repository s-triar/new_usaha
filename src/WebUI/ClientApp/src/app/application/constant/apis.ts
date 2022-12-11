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
export const MyEnterpriseAPI = {
    GetOwned: `${prefixApi}/MyEnterprise/GetOwned`, // GET
    Create: `${prefixApi}/MyEnterprise/Create`, // POST
    CheckAvailableEnterpriseCode: `${prefixApi}/MyEnterprise/CheckAvailableEnterpriseCode`, // GET
    GetAvailableEnterpriseCode: `${prefixApi}/MyEnterprise/GetAvailableEnterpriseCode`, // GET
    GetMyEnterpriseToken: `${prefixApi}/MyEnterprise/GetEnterpriseToken`, // GET
    GetMyEnterpriseInfo:`${prefixApi}/MyEnterprise/GetMyEnterpriseInfo`, // GET
};
export const MyGoodsAPI = {
    Create: `${prefixApi}/MyGoods/Create`, // POST
    UpdateInfo: `${prefixApi}/MyGoods/UpdateInfo`, // PUT
    AddItem: `${prefixApi}/MyGoods/AddItem`, // POST
    Update: `${prefixApi}/MyGoods/Update`, // PUT
    UpdateSellingPrice: `${prefixApi}/MyGoods/UpdateSellingPrice`, // PUT
    AddStock: `${prefixApi}/MyGoods/AddStock`, // PUT
    AdjustStock: `${prefixApi}/MyGoods/AdjustStock`, // PUT
    CheckDuplicateBarcode: `${prefixApi}/MyGoods/CheckDuplicateBarcode`, // GET
    GetMyGoodses: `${prefixApi}/MyGoods/GetMyGoodses`, // GET
    GetMyGoodsesRelation: `${prefixApi}/MyGoods/GetMyGoodsesRelation`, // GET
    GetInfoOfGoodsForUpdating: `${prefixApi}/MyGoods/GetInfoOfGoodsForUpdating`, // GET
    GetListProductForCashier: `${prefixApi}/MyGoods/GetListProductForCashier`, // GET
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
