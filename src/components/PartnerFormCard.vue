<template>
  <div class="partner-form-card">
    <!-- Status -->
    <div class="mb-6">
      <div class="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
        {{ partnerForm.status }}
      </div>
    </div>

    <!-- Form Sections -->
    <v-form ref="form" v-model="isFormValid" class="space-y-8">
      <!-- General Information Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ partnerForm.sections[0].title }}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="field in partnerForm.sections[0].fields"
            :key="field.id"
            class="field-wrapper"
          >
            <v-text-field
              v-model="formData[field.id]"
              :label="field.label"
              :placeholder="field.placeholder"
              :type="field.type"
              :rules="getFieldRules(field)"
              variant="outlined"
              density="comfortable"
              class="field-input"
            />
          </div>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ partnerForm.sections[1].title }}
        </h3>
        
        <div class="space-y-4">
          <!-- Existing Links -->
          <div
            v-for="link in resourceLinksData"
            :key="link.id"
            class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <v-select
              v-model="link.type"
              :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
              variant="outlined"
              density="comfortable"
              class="flex-1"
            />
            <v-text-field
              v-model="link.url"
              placeholder="Ссылка"
              variant="outlined"
              density="comfortable"
              class="flex-1"
            />
            <v-btn
              icon
              variant="text"
              color="error"
              @click="removeLink(link.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>

          <!-- Add New Link -->
          <div class="flex items-center gap-4">
            <v-select
              v-model="newLinkType"
              :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
              placeholder="Выберите тип"
              variant="outlined"
              density="comfortable"
              class="flex-1"
            />
            <v-text-field
              v-model="newLinkUrl"
              placeholder="Ссылка"
              variant="outlined"
              density="comfortable"
              class="flex-1"
            />
            <v-btn
              color="primary"
              variant="outlined"
              @click="addLink"
            >
              + Добавить ссылку
            </v-btn>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ partnerForm.sections[2].title }}
        </h3>
        
        <div class="space-y-6">
          <v-text-field
            v-model="formData.headline"
            :label="partnerForm.sections[2].fields[0].label"
            :placeholder="partnerForm.sections[2].fields[0].placeholder"
            variant="outlined"
            density="comfortable"
            class="field-input"
          />
          
          <v-textarea
            v-model="formData.description"
            :label="partnerForm.sections[2].fields[1].label"
            :placeholder="partnerForm.sections[2].fields[1].placeholder"
            variant="outlined"
            density="comfortable"
            rows="6"
            class="field-input"
          />
        </div>
      </div>

      <!-- Categories Section -->
      <div class="form-section">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          {{ partnerForm.sections[3].title }}
        </h3>
        
        <div class="space-y-6">
          <v-textarea
            v-model="formData.tags"
            :label="partnerForm.sections[3].fields[0].label"
            :placeholder="partnerForm.sections[3].fields[0].placeholder"
            variant="outlined"
            density="comfortable"
            rows="4"
            class="field-input"
          />
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ partnerForm.sections[3].fields[1].label }}
            </label>
            <div class="space-y-2">
              <v-checkbox
                v-for="category in categoriesData"
                :key="category.id"
                v-model="category.isSelected"
                :label="category.name"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-right pt-8">
        <v-btn
          :variant="partnerForm.submitButton.variant"
          :color="partnerForm.submitButton.color"
          size="large"
          class="px-8"
          :disabled="!isFormValid"
          @click="onSubmit"
        >
          {{ partnerForm.submitButton.text }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { usePartnerForm } from '@/composables/usePartnerForm'

const {
  form,
  isFormValid,
  formData,
  partnerForm,
  resourceLinksData,
  newLinkType,
  newLinkUrl,
  categoriesData,
  getFieldRules,
  addLink,
  removeLink,
  handleSubmit
} = usePartnerForm()

const emit = defineEmits<{
  submit: [data: any]
}>()

const onSubmit = async () => {
  const result = await handleSubmit()
  
  if (result.success) {
    emit('submit', result.data)
  }
}
</script>

<style scoped>
.partner-form-card {
  min-height: 400px;
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

/* Custom purple button */
.v-btn--variant-filled.v-btn--color-purple {
  background-color: #8b5cf6;
  color: white;
}

.v-btn--variant-filled.v-btn--color-purple:hover {
  background-color: #7c3aed;
}
</style>
