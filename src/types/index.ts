export interface User {
  id: string
  name: string
  type: 'individual' | 'company'
  avatar: string
  balance: number
}

export interface Project {
  id: string
  title: string
  date: string
  description: string
  isFavorite: boolean
  stage: ProjectStage
  industry: string
  location: string
  type: ProjectType
}

export interface ProjectStage {
  id: string
  name: string
}

export interface Industry {
  id: string
  name: string
}

export interface ProjectType {
  id: string
  name: string
}

export interface NavigationItem {
  id: string
  title: string
  icon: string
  badge?: number
  isActive?: boolean
}

export interface FilterOption {
  id: string
  name: string
  isSelected: boolean
}

export interface ProfileTab {
  id: string
  title: string
  isActive: boolean
}

export interface InvestorProfile {
  status: 'pending' | 'verified' | 'rejected'
  title: string
  description: string
  icon: string
  iconColor: string
  actions: ProfileAction[]
}

export interface ProfileAction {
  id: string
  title: string
  variant: 'outlined' | 'elevated' | 'flat' | 'text' | 'tonal' | 'plain'
  color: string
  icon?: string
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'file'
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: string
}

export interface FormSection {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

export interface ApplicationForm {
  id: string
  title: string
  description: string
  icon: string
  iconColor: string
  sections: FormSection[]
  submitButton: {
    text: string
    variant: 'outlined' | 'elevated' | 'flat' | 'text' | 'tonal' | 'plain'
    color: string
    icon?: string
  }
}

export interface InvestorFormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'number' | 'url'
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: string
  value?: any
}

export interface InvestorFormSection {
  id: string
  title: string
  description?: string
  fields: InvestorFormField[]
}

export interface InvestorForm {
  id: string
  status: string
  sections: InvestorFormSection[]
  submitButton: {
    text: string
    variant: 'outlined' | 'elevated' | 'flat' | 'text' | 'tonal' | 'plain'
    color: string
  }
}

export interface ResourceLink {
  id: string
  type: string
  url: string
}

export interface InvestmentCategory {
  id: string
  name: string
  isSelected: boolean
}

export interface PartnerFormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'number' | 'url'
  placeholder?: string
  required: boolean
  options?: string[]
  validation?: string
  value?: any
}

export interface PartnerFormSection {
  id: string
  title: string
  description?: string
  fields: PartnerFormField[]
}

export interface PartnerForm {
  id: string
  status: string
  sections: PartnerFormSection[]
  submitButton: {
    text: string
    variant: 'outlined' | 'elevated' | 'flat' | 'text' | 'tonal' | 'plain'
    color: string
  }
}

export interface PartnerResourceLink {
  id: string
  type: string
  url: string
}

export interface PartnerCategory {
  id: string
  name: string
  isSelected: boolean
}

export interface PartnerProfile {
  status: 'pending' | 'verified' | 'rejected'
  title: string
  description: string
  icon: string
  iconColor: string
  actions: ProfileAction[]
}

// Requisites interfaces
export interface BankRequisite {
  id: string
  bic: string
  currentAccount: string
  bank: string
  correspondentAccount: string
  isDefault: boolean
}

export interface CompanyDetails {
  fullName: string
  shortName: string
  inn: string
  kpp: string
  ogrn: string
  legalAddress: string
  mailingAddress: string
}

export interface HeadDetails {
  position: string
  fullName: string
  basis: string
}

export interface RequisitesData {
  company: CompanyDetails
  head: HeadDetails
  bankRequisites: BankRequisite[]
}

export interface DeleteModalData {
  id: string
  title: string
  message: string
  itemName?: string
}

export interface DeleteModalConfig {
  isOpen: boolean
  data: DeleteModalData | null
  onConfirm: (id: string) => void
  onCancel: () => void
}
