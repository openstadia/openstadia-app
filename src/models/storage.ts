export interface StorageItem {
    name: string
    size_total: number
    size_uploaded: number
    time_edited: string
}

export interface StorageItems {
    objects: StorageItem[]
}

export interface StorageInfo {
    used_space: number
    total_space: number
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
