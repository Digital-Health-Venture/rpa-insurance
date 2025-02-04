export interface Company {
  src: string
  label: string
}

export interface SelectedCompany extends Company {
  images: string[]
}
