<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="field-group">
      <div class="flex items-center gap-2 mb-2">
        <label class="text-sm font-medium text-gray-700">
          {{ fields.REGION.label }}
        </label>
        <v-tooltip location="top">
          <template v-slot:activator="{ props }">
            <v-icon
              v-bind="props"
              size="small"
              color="primary"
              class="cursor-help"
            >
              mdi-help-circle
            </v-icon>
          </template>
          <span>Выберите регион проекта</span>
        </v-tooltip>
      </div>
      <v-select
        v-model="formData.region"
        :items="regions"
        :placeholder="fields.REGION.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="$emit('validate', 'region')"
      />
    </div>
    
    <div class="field-group">
      <label class="text-sm font-medium text-gray-700 mb-2">
        {{ fields.PROJECT_TYPE.label }}
      </label>
      <v-select
        v-model="formData.projectType"
        :items="projectTypes"
        :placeholder="fields.PROJECT_TYPE.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="$emit('validate', 'projectType')"
      />
    </div>
    
    <div class="field-group">
      <label class="text-sm font-medium text-gray-700 mb-2">
        {{ fields.INDUSTRY.label }}
      </label>
      <v-select
        v-model="formData.industry"
        :items="industries"
        :placeholder="fields.INDUSTRY.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="$emit('validate', 'industry')"
      />
    </div>
    
    <div class="field-group">
      <label class="text-sm font-medium text-gray-700 mb-2">
        {{ fields.PROJECT_STAGE.label }}
      </label>
      <v-select
        v-model="formData.projectStage"
        :items="projectStages"
        :placeholder="fields.PROJECT_STAGE.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="$emit('validate', 'projectStage')"
      />
    </div>
  </div>
  
  <div class="mt-6">
    <label class="text-sm font-medium text-gray-700 mb-2">
      {{ fields.ABOUT.label }}
    </label>
    <div class="space-y-4">
      <v-text-field
        v-model="formData.about.headline"
        :placeholder="fields.ABOUT.headline.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        @update:model-value="$emit('validate', 'about.headline')"
      />
      <v-textarea
        v-model="formData.about.description"
        :placeholder="fields.ABOUT.description.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        rows="4"
        auto-grow
        @update:model-value="$emit('validate', 'about.description')"
      />
    </div>
  </div>
  
  <div class="mt-6">
    <label class="text-sm font-medium text-gray-700 mb-2">
      {{ fields.PROJECT_LINK.label }}
    </label>
    <p class="text-sm text-gray-500 mb-3">
      {{ fields.PROJECT_LINK.description }}
    </p>
    <div class="flex">
      <div class="flex-shrink-0 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-600">
        https://
      </div>
      <v-text-field
        v-model="formData.projectLink"
        :placeholder="fields.PROJECT_LINK.placeholder"
        variant="outlined"
        density="compact"
        hide-details
        class="flex-1"
        style="border-radius: 0 8px 8px 0;"
        @update:model-value="$emit('validate', 'projectLink')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  formData: any
  fields: any
  regions: readonly string[]
  projectTypes: readonly string[]
  industries: readonly string[]
  projectStages: readonly string[]
}

interface Emits {
  (e: 'validate', field: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.field-group {
  display: flex;
  flex-direction: column;
}
</style>
