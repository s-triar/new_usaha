export type SearchPageRequest = {
    Search: string;
    PageNumber: number;
    PageSize: number;
};

export type SearchPageResponse<T> = {
    items: T[],
    totalPages: number,
    totalCount: number,
    pageNumber: number,
};