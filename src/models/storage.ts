export interface StorageItem {
    name: string
    sizeTotal: number
    sizeUploaded: number
    time_edited: string
}

export interface StorageItemsAndState {
    used_space: number
    total_space: number
    objects: StorageItem[]
}

export interface DownloadFile {
    path: string
}

export interface DeleteFile {
    path: string[]
}

export interface UploadFile {
    path: string
}

export interface FileDownloadLink {
    url: string
}

export interface FileUploadLink {
    url: string
}
