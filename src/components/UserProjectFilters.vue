<template>
  <div class="filters-container">
    <div class="filters-row">
      <!-- Search -->
      <v-text-field
        v-model="filters.search"
        :placeholder="USER_PROJECTS_SECTIONS.SEARCH_PLACEHOLDER"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        class="search-input"
        @update:model-value="handleSearchChange"
      />
      
      <!-- Stage Filter -->
      <v-select
        v-model="filters.stage"
        :items="PROJECT_STAGES"
        :label="USER_PROJECTS_FILTERS.STAGE"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleFilterChange"
      />
      
      <!-- Industry Filter -->
      <v-select
        v-model="filters.industry"
        :items="PROJECT_INDUSTRIES"
        :label="USER_PROJECTS_FILTERS.INDUSTRY"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleFilterChange"
      />
      
      <!-- Region Filter -->
      <v-select
        v-model="filters.region"
        :items="PROJECT_REGIONS"
        :label="USER_PROJECTS_FILTERS.REGION"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleFilterChange"
      />
      
      <!-- Type Filter -->
      <v-select
        v-model="filters.type"
        :items="PROJECT_TYPES"
        :label="USER_PROJECTS_FILTERS.TYPE"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleFilterChange"
      />
      
      <!-- Add Project Button -->
      <v-btn
        color="primary"
        class="add-project-btn"
        @click="handleAddProject"
      >
        {{ USER_PROJECTS_SECTIONS.ADD_PROJECT }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ProjectFiltersState } from '@/types'
import {
  USER_PROJECTS_SECTIONS,
  USER_PROJECTS_FILTERS,
  PROJECT_STAGES,
  PROJECT_INDUSTRIES,
  PROJECT_REGIONS,
  PROJECT_TYPES
} from '@/constants/userProjects'

interface Props {
  initialFilters?: Partial<ProjectFiltersState>
}

interface Emits {
  (e: 'filters-change', filters: ProjectFiltersState): void
  (e: 'add-project'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialFilters: () => ({})
})

const emit = defineEmits<Emits>()

const filters = reactive<ProjectFiltersState>({
  search: '',
  stage: PROJECT_STAGES[0],
  industry: PROJECT_INDUSTRIES[0],
  region: PROJECT_REGIONS[0],
  type: PROJECT_TYPES[0],
  ...props.initialFilters
})

const handleSearchChange = (value: string) => {
  filters.search = value
  emitFiltersChange()
}

const handleFilterChange = () => {
  emitFiltersChange()
}

const emitFiltersChange = () => {
  emit('filters-change', { ...filters })
}

const handleAddProject = () => {
  emit('add-project')
}

// Watch for external filter changes
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    Object.assign(filters, newFilters)
  }
}, { deep: true })
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
  min-width: 350px !important; /* Ширина поля поиска */
  max-width: 350px !important;
}

.filter-select {
  min-width: 160px !important; /* Ширина селектов */
  max-width: 160px !important;
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
