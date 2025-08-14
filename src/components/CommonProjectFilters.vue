<template>
  <div class="filters-container">
    <div class="filters-row">
      <!-- Search -->
      <v-text-field
        v-model="searchQuery"
        :placeholder="searchPlaceholder"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details
        class="search-input"
        @update:model-value="handleSearch"
      />
      
      <!-- Stage Filter -->
      <v-select
        v-model="selectedStage"
        :items="PROJECT_STAGES"
        :label="PROJECT_FILTERS.STAGE"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleStageChange"
      />
      
      <!-- Industry Filter -->
      <v-select
        v-model="selectedIndustry"
        :items="PROJECT_INDUSTRIES"
        :label="PROJECT_FILTERS.INDUSTRY"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleIndustryChange"
      />
      
      <!-- Region Filter -->
      <v-select
        v-model="selectedRegion"
        :items="PROJECT_REGIONS"
        :label="PROJECT_FILTERS.REGION"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleRegionChange"
      />
      
      <!-- Type Filter -->
      <v-select
        v-model="selectedType"
        :items="PROJECT_TYPES"
        :label="PROJECT_FILTERS.TYPE"
        variant="outlined"
        density="compact"
        hide-details
        class="filter-select"
        @update:model-value="handleTypeChange"
      />
      
      <!-- Add Project Button -->
      <v-btn
        v-if="showAddButton"
        color="primary"
        class="add-project-btn"
        @click="handleAddProject"
      >
        {{ addButtonText }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  PROJECT_FILTERS,
  PROJECT_STAGES,
  PROJECT_INDUSTRIES,
  PROJECT_REGIONS,
  PROJECT_TYPES
} from '@/constants'

interface Props {
  searchPlaceholder?: string
  showAddButton?: boolean
  addButtonText?: string
  initialFilters?: {
    search?: string
    stage?: string
    industry?: string
    region?: string
    type?: string
  }
}

interface Emits {
  (e: 'search', query: string): void
  (e: 'stage-change', stage: string): void
  (e: 'industry-change', industry: string): void
  (e: 'region-change', region: string): void
  (e: 'type-change', type: string): void
  (e: 'add-project'): void
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Поиск',
  showAddButton: true,
  addButtonText: 'Добавить проект'
})

const emit = defineEmits<Emits>()

// Reactive data
const searchQuery = ref(props.initialFilters?.search || '')
const selectedStage = ref(props.initialFilters?.stage || PROJECT_STAGES[0])
const selectedIndustry = ref(props.initialFilters?.industry || PROJECT_INDUSTRIES[0])
const selectedRegion = ref(props.initialFilters?.region || PROJECT_REGIONS[0])
const selectedType = ref(props.initialFilters?.type || PROJECT_TYPES[0])

// Methods
const handleSearch = (query: string) => {
  emit('search', query)
}

const handleStageChange = (stage: string) => {
  emit('stage-change', stage)
}

const handleIndustryChange = (industry: string) => {
  emit('industry-change', industry)
}

const handleRegionChange = (region: string) => {
  emit('region-change', region)
}

const handleTypeChange = (type: string) => {
  emit('type-change', type)
}

const handleAddProject = () => {
  emit('add-project')
}

// Watch for external filter changes
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    if (newFilters.search !== undefined) searchQuery.value = newFilters.search
    if (newFilters.stage !== undefined) selectedStage.value = newFilters.stage
    if (newFilters.industry !== undefined) selectedIndustry.value = newFilters.industry
    if (newFilters.region !== undefined) selectedRegion.value = newFilters.region
    if (newFilters.type !== undefined) selectedType.value = newFilters.type
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
  width: 100%;
}

.search-input {
  flex: 2 !important; /* Занимает в 2 раза больше пространства */
  min-width: 300px !important;
}

.filter-select {
  flex: 1 !important; /* Занимает доступное пространство */
  min-width: 120px !important;
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
