<template>
  <div class="filters-container">
    <div class="filters-row">
      <!-- Search -->
      <v-text-field
        v-model="searchQuery"
        placeholder="Поиск"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        class="search-input"
        @update:model-value="handleSearch"
      />
      
      <!-- Project Stage Filter -->
      <v-select
        v-model="selectedStage"
        :items="projectStages"
        item-title="name"
        item-value="id"
        placeholder="Стадия проекта"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleStageChange"
      />
      
      <!-- Industry Filter -->
      <v-menu
        v-model="industryMenuOpen"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            class="filter-btn"
            :class="selectedIndustries.length > 0 ? 'text-blue-600' : ''"
          >
            <span class="truncate">
              {{ getIndustryButtonText() }}
            </span>
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        
        <v-card min-width="300" class="pa-4">
          <div class="text-sm font-medium text-gray-700 mb-3">
            Отрасль
          </div>
          
          <v-text-field
            v-model="industrySearch"
            placeholder="Поиск"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            class="mb-4"
          />
          
          <div class="max-h-64 overflow-y-auto">
            <v-checkbox
              v-for="industry in filteredIndustries"
              :key="industry.id"
              v-model="selectedIndustries"
              :value="industry.id"
              :label="industry.name"
              density="compact"
              hide-details
              class="mb-2"
            />
          </div>
        </v-card>
      </v-menu>
      
      <!-- Location Filter -->
      <v-select
        v-model="selectedLocation"
        :items="locations"
        placeholder="Москва"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleLocationChange"
      />
      
      <!-- Type Filter -->
      <v-select
        v-model="selectedType"
        :items="projectTypes"
        item-title="name"
        item-value="id"
        placeholder="Тип"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleTypeChange"
      />
      
      <!-- Add Project Button -->
      <v-btn
        color="primary"
        class="add-project-btn"
        @click="handleAddProject"
      >
        Добавить проект
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProjectStage, Industry, ProjectType } from '@/types'
import { projectStages, industries, projectTypes } from '@/data/mockData'

const emit = defineEmits<{
  search: [query: string]
  stageChange: [stageId: string | null]
  industryChange: [industryIds: string[]]
  locationChange: [location: string | null]
  typeChange: [typeId: string | null]
  addProject: []
}>()

// Reactive data
const searchQuery = ref('')
const selectedStage = ref<string | null>(null)
const selectedIndustries = ref<string[]>([])
const selectedLocation = ref<typeof LOCATIONS[number] | null>(null)
const selectedType = ref<string | null>(null)
const industryMenuOpen = ref(false)
const industrySearch = ref('')

// Available locations
import { LOCATIONS } from '@/constants'
const locations = [...LOCATIONS]

// Computed
const filteredIndustries = computed(() => {
  if (!industrySearch.value) return industries
  return industries.filter(industry => 
    industry.name.toLowerCase().includes(industrySearch.value.toLowerCase())
  )
})

// Methods
const handleSearch = (query: string) => {
  emit('search', query)
}

const handleStageChange = (stageId: string | null) => {
  emit('stageChange', stageId)
}

const handleLocationChange = (location: string | null) => {
  emit('locationChange', location)
}

const handleTypeChange = (typeId: string | null) => {
  emit('typeChange', typeId)
}

const handleAddProject = () => {
  emit('addProject')
}

const getIndustryButtonText = (): string => {
  if (selectedIndustries.value.length === 0) return 'Отрасль'
  if (selectedIndustries.value.length === 1) {
    const industry = industries.find(i => i.id === selectedIndustries.value[0])
    return industry?.name || 'Отрасль'
  }
  return `Отрасль (${selectedIndustries.value.length})`
}

// Watch for industry changes
import { watch } from 'vue'

watch(selectedIndustries, (newValue) => {
  emit('industryChange', newValue)
})
</script>

<style scoped>
.filters-container {
  padding: 0;
}

.filters-row {
  display: flex;
  align-items: center;
  gap: 16px; /* Отступы между элементами */
  flex-wrap: nowrap; /* Запрещаем перенос на новую строку */
}

.search-input {
  min-width: 350px !important; /* Немного уменьшаем для размещения всех элементов */
  max-width: 350px !important;
}

.filter-select {
  min-width: 160px !important; /* Немного уменьшаем ширину */
  max-width: 160px !important;
}

.filter-btn {
  min-width: 160px !important; /* Немного уменьшаем ширину */
  max-width: 160px !important;
  justify-content: flex-start !important;
}

.add-project-btn {
  margin-left: auto !important;
  background-color: #7587F4 !important;
  color: white !important;
  white-space: nowrap !important; /* Запрещаем перенос текста в кнопке */
}

.add-project-btn:hover {
  background-color: #6b7ae8 !important;
}
</style>
