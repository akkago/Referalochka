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
  variant: 'outlined' | 'filled'
  color: string
  icon?: string
}
