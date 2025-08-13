<template>
  <div class="user-project-filters">
    <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      <!-- Search -->
      <div class="flex-1 min-w-0">
        <v-text-field
          v-model="filters.search"
          :placeholder="USER_PROJECTS_SECTIONS.SEARCH_PLACEHOLDER"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          class="max-w-md"
          @update:model-value="handleSearchChange"
        />
      </div>
      
      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <!-- Stage Filter -->
        <v-select
          v-model="filters.stage"
          :items="PROJECT_STAGES"
          :label="USER_PROJECTS_FILTERS.STAGE"
          variant="outlined"
          density="compact"
          hide-details
          class="min-w-40"
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
          class="min-w-40"
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
          class="min-w-40"
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
          class="min-w-40"
          @update:model-value="handleFilterChange"
        />
      </div>
      
      <!-- Add Project Button -->
      <v-btn
        color="primary"
        variant="elevated"
        @click="handleAddProject"
        class="whitespace-nowrap"
      >
        <v-icon start>mdi-plus</v-icon>
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
.user-project-filters {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}
</style>
