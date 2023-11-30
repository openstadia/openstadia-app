export interface File {
  name: string
  size: number
  is_dir: boolean
  is_hidden: boolean
}

export interface LsRes {
  files: File[]
  path: string[]
}
