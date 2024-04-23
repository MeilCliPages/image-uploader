export interface ListResponse<T> {
    total: number;
    maxPage: number;
    currentPage: number;
    items: T[];
}

export interface GalleryV1 {
    uuid: string;
    createdAt: string;
    blobs: { url: string }[];
}
