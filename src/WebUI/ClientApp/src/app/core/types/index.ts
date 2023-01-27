export type currentPageDescription = {
    isCurrentPageStartPage: boolean;
    isCurrentPageLastPage: boolean;
};
export type NotificationDialogType = {
    type: 'success'|'error'|'warning'|'info';
    message: string|null
};

export type CustomUploadFileEventChange = {
    file: File |null;
    files: FileList |null;
    dataFile: string|ArrayBuffer|null;
    dataFiles: string[]|ArrayBuffer[]|null;
};
export type CameraCaptureEvent = {
    file: File |null;
    dataFile: string|ArrayBuffer|null;
};
export type ErrorObj= {
    icon: string |null;
    message: string |null;
    title: string|null;
    code: number | null;
    closeable: boolean;
};

export type DataError= {
    isError: boolean;
    errorObj: ErrorObj;
};

export type LoadingState= {
    progress: boolean;
};

export type AppState= {
    loading: LoadingState;
};

export type TakingPictureDialogData = {
    isMulti: boolean;
};


export type DataIconNav = {
    text: string;
    icon: any;
    // icon: string;
};

export type DataNavList = {
    data: DataIconNav;
    link: string;
    type: string;
};

export type DataMyShopListItem= {
    id: string;
    code: string;
    title: string;
    address: string;
    owned: boolean;
    image: string | null;
};

export type DataAddBusiness= {
    title: string;
    link: string;
    description: string;
};

export type WorkspaceLink= {
    link: string;
    title: string;
};


export type ProductListItemInfo= {
    id: number;
    barcode: string;
    title: string;
    typePackaging: string;
    price: number;
    stocks: string;
};
