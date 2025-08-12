import { ref, computed } from 'vue'
import type { Project } from '@/types'
import { projects, industries } from '@/data/mockData'

export function useProjects() {
  // Reactive state
  const searchQuery = ref('')
  const selectedStage = ref<string | null>(null)
  const selectedIndustries = ref<string[]>([])
  const selectedLocation = ref<string | null>(null)
  const selectedType = ref<string | null>(null)

  // Computed
  const filteredProjects = computed(() => {
    let filtered = [...projects]
    
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.id.toLowerCase().includes(query)
      )
    }
    
    // Stage filter
    if (selectedStage.value) {
      filtered = filtered.filter(project => project.stage.id === selectedStage.value)
    }
    
    // Industry filter
    if (selectedIndustries.value.length > 0) {
      filtered = filtered.filter(project => 
        selectedIndustries.value.some(industryId => {
          const industry = industries.find(i => i.id === industryId)
          return industry && project.industry === industry.name
        })
      )
    }
    
    // Location filter
    if (selectedLocation.value) {
      filtered = filtered.filter(project => project.location === selectedLocation.value)
    }
    
    // Type filter
    if (selectedType.value) {
      filtered = filtered.filter(project => project.type.id === selectedType.value)
    }
    
    return filtered
  })

  // Methods
  const updateSearch = (query: string) => {
    searchQuery.value = query
  }

  const updateStage = (stageId: string | null) => {
    selectedStage.value = stageId
  }

  const updateIndustries = (industryIds: string[]) => {
    selectedIndustries.value = industryIds
  }

  const updateLocation = (location: string | null) => {
    selectedLocation.value = location
  }

  const updateType = (typeId: string | null) => {
    selectedType.value = typeId
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedStage.value = null
    selectedIndustries.value = []
    selectedLocation.value = null
    selectedType.value = null
  }

  return {
    // State
    searchQuery,
    selectedStage,
    selectedIndustries,
    selectedLocation,
    selectedType,
    
    // Computed
    filteredProjects,
    
    // Methods
    updateSearch,
    updateStage,
    updateIndustries,
    updateLocation,
    updateType,
    clearFilters
  }
}
