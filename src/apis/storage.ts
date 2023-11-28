import type {
  DownloadFile,
  DeleteFile,
  UploadFile,
  FileUploadLink,
  StorageItem
} from '@/models/storage'
import {getStorageBaseUrl} from '@/apis/baseUrl'

export async function getItemsAndState(token: string) {
  const baseUrl = getStorageBaseUrl()
  const response = await fetch(`${baseUrl}/storage/files_list`, {
    headers: {
      method: 'GET',
      Authorization: 'Bearer ' + token
    }
  })
  return await response.json()
}

export async function downloadFile(token: string, file: DownloadFile) {
  const baseUrl = getStorageBaseUrl()
  const response = await fetch(`${baseUrl}/storage/file_download`, {
      method: 'POST',
      body: JSON.stringify(file),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
  })
  return await response.json()
}

export async function deleteFile(token: string, file: DeleteFile) {
  const baseUrl = getStorageBaseUrl()
  const response = await fetch(`${baseUrl}/storage/file`, {
    method: 'DELETE',
    body: JSON.stringify(file),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function getFileUploadLink(token: string, file: UploadFile) {
  const baseUrl = getStorageBaseUrl()
  const response = await fetch(`${baseUrl}/storage/file`, {
    method: 'POST',
    body: JSON.stringify(file),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}

export async function uploadFileData(link: FileUploadLink, file: File, updateListFunc: Function, updateFileUploadPercent: Function, removeFileUpload: Function) {
  let formData = new FormData();
  formData.append("file", file);
  let xhr = new XMLHttpRequest();
  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      let obj: StorageItem = {name: file.name, sizeUploaded: event.loaded, sizeTotal: event.total, time_edited: ""}
      updateFileUploadPercent(obj)
    }
  });
  xhr.upload.addEventListener('loadend', (event) => {
    removeFileUpload(file.name)
    updateListFunc.call(null)
  })
  xhr.open('PUT', link.url, true);
  xhr.send(formData)

}
