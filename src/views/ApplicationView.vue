<template>
  <div class="application-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Заполнение анкеты инвестора
        </h1>
      </div>
      
      <!-- Application Content with Border -->
      <div class="border-2 border-dashed border-blue-400 rounded-lg p-6 bg-white">
        <!-- Form Header -->
        <div class="text-center mb-8">
          <!-- Status Icon -->
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
              <v-icon
                size="48"
                :color="applicationForm.iconColor"
                class="text-white"
              >
                {{ applicationForm.icon }}
              </v-icon>
            </div>
          </div>
          
          <!-- Title -->
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            {{ applicationForm.title }}
          </h2>
          
          <!-- Description -->
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {{ applicationForm.description }}
          </p>
        </div>

        <!-- Form Progress -->
        <div class="mb-8">
          <FormProgress
            :sections="applicationForm.sections"
            :progress="getFormProgress"
            :form-data="formData"
          />
        </div>

        <!-- Form Sections -->
        <v-form ref="form" v-model="isFormValid" class="space-y-8">
          <div
            v-for="section in applicationForm.sections"
            :key="section.id"
            class="form-section"
          >
            <!-- Section Header -->
            <div class="mb-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                {{ section.title }}
              </h3>
              <p v-if="section.description" class="text-gray-600">
                {{ section.description }}
              </p>
            </div>

            <!-- Section Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="field in section.fields"
                :key="field.id"
                :class="[
                  'field-wrapper',
                  field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''
                ]"
              >
                <!-- Text Input -->
                <v-text-field
                  v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                  v-model="formData[field.id]"
                  :label="field.label"
                  :placeholder="field.placeholder"
                  :type="field.type"
                  :rules="getFieldRules(field)"
                  variant="outlined"
                  density="comfortable"
                  class="field-input"
                />

                <!-- Select Input -->
                <v-select
                  v-else-if="field.type === 'select'"
                  v-model="formData[field.id]"
                  :label="field.label"
                  :placeholder="field.placeholder"
                  :items="field.options || []"
                  :rules="getFieldRules(field)"
                  variant="outlined"
                  density="comfortable"
                  class="field-input"
                />

                <!-- Textarea -->
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  v-model="formData[field.id]"
                  :label="field.label"
                  :placeholder="field.placeholder"
                  :rules="getFieldRules(field)"
                  variant="outlined"
                  density="comfortable"
                  rows="4"
                  class="field-input"
                />

                <!-- File Upload -->
                <div v-else-if="field.type === 'file'" class="file-upload-wrapper">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ field.label }}
                    <span v-if="field.required" class="text-red-500">*</span>
                  </label>
                  <v-file-input
                    v-model="formData[field.id]"
                    :placeholder="field.placeholder || 'Выберите файл'"
                    :rules="getFieldRules(field)"
                    variant="outlined"
                    density="comfortable"
                    accept="image/*,.pdf,.doc,.docx"
                    prepend-icon="mdi-file-upload"
                    class="field-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center pt-8">
            <v-btn
              :variant="applicationForm.submitButton.variant"
              :color="applicationForm.submitButton.color"
              size="large"
              class="px-8"
              :disabled="!isFormValid"
              @click="onSubmit"
            >
              <v-icon
                v-if="applicationForm.submitButton.icon"
                :icon="applicationForm.submitButton.icon"
                start
                class="mr-2"
              />
              {{ applicationForm.submitButton.text }}
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useApplicationForm } from '@/composables/useApplicationForm'
import FormProgress from '@/components/FormProgress.vue'

const router = useRouter()

// Use composable
const {
  form,
  isFormValid,
  formData,
  applicationForm,
  getFormProgress,
  getFieldRules,
  handleSubmit,
  initializeFormData
} = useApplicationForm()

// Handle form submission
const onSubmit = async () => {
  const result = await handleSubmit()
  
  if (result.success) {
    // Переход к детальной форме инвестора
    router.push({ name: 'investor-form' })
  }
}

// Initialize form on mount
initializeFormData()
</script>

<style scoped>
.application-view {
  min-height: 100vh;
  background-color: #f9fafb;
}

.form-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}

.form-section:last-child {
  border-bottom: none;
}

.field-wrapper {
  min-height: 80px;
}

.field-input {
  width: 100%;
}

.file-upload-wrapper {
  width: 100%;
}

/* Custom purple background for icon */
.bg-purple-100 {
  background-color: #f3e8ff;
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .field-wrapper {
    grid-column: span 1;
  }
}
</style>
