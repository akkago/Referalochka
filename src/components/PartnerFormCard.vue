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
        <div class="flex items-start gap-8">
          <!-- Profile Label -->
          <div class="flex-shrink-0 pt-6 w-1/3">
            <h3 class="text-xl font-semibold text-gray-800">
              Профиль
            </h3>
          </div>
          
                     <!-- Form Fields -->
           <div class="flex-1 w-2/3">
                                         <!-- Name and Surname on one line -->
              <div class="name-surname-row">
                <div class="field-wrapper flex-1">
                  <v-text-field
                    v-model="formData.name"
                    label="Имя"
                    placeholder="Введите имя"
                    type="text"
                    :rules="getFieldRules({ id: 'name', required: true })"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-wrapper flex-1">
                  <v-text-field
                    v-model="formData.surname"
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    type="text"
                    :rules="getFieldRules({ id: 'surname', required: true })"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
              
              <!-- Phone and Email on one line -->
               <div class="phone-email-row">
                <div class="field-wrapper flex-1">
                  <v-text-field
                    v-model="formData.phone"
                    label="Телефон"
                    placeholder="+7-900-000-00-00"
                    type="tel"
                    :rules="getFieldRules({ id: 'phone', required: true })"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-wrapper flex-1">
                  <v-text-field
                    v-model="formData.email"
                    label="E-Mail"
                    placeholder="example@email.com"
                    type="email"
                    :rules="getFieldRules({ id: 'email', required: true })"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
              
              <!-- Other fields in grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="field in partnerForm.sections[0].fields.filter(f => f.id !== 'name' && f.id !== 'surname' && f.id !== 'phone' && f.id !== 'email')"
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
        </div>
      </div>

      <!-- Resources Section -->
      <div class="form-section">
        <div class="flex items-start gap-8">
          <!-- Resources Label -->
          <div class="flex-shrink-0 pt-6 w-1/3">
            <h3 class="text-xl font-semibold text-gray-800">
              {{ partnerForm.sections[1].title }}
            </h3>
          </div>
          
          <!-- Resources Content -->
          <div class="flex-1 w-2/3">
            <div class="space-y-4">
              <!-- Website Type and URL on one line -->
              <div class="flex gap-6">
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    Тип сайта
                  </label>
                  <v-select
                    v-model="partnerNewResourceLink.type"
                    :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
                    placeholder="Выберите тип"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
                
                <div class="field-group flex-1">
                  <label class="text-sm font-medium text-gray-700 mb-2">
                    URL сайта
                  </label>
                  <v-text-field
                    v-model="partnerNewResourceLink.url"
                    placeholder="https://example.com"
                    type="url"
                    variant="outlined"
                    density="comfortable"
                    class="field-input"
                  />
                </div>
              </div>
              
              <!-- Add Link Button -->
              <div class="flex justify-start">
                <v-btn
                  color="grey"
                  variant="outlined"
                  size="large"
                  class="px-8"
                  @click="addResourceLink"
                >
                  + Добавить ссылку
                </v-btn>
              </div>
              
              <!-- Existing Links as Input Fields -->
              <div v-if="partnerResourceLinks.length > 0" class="space-y-4">
                <div
                  v-for="(link, index) in partnerResourceLinks"
                  :key="index"
                  class="flex gap-6"
                >
                  <div class="field-group flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-2">
                      Тип сайта
                    </label>
                    <v-select
                      v-model="link.type"
                      :items="['Сайт', 'Блог', 'Социальная сеть', 'YouTube', 'Другое']"
                      placeholder="Выберите тип"
                      variant="outlined"
                      density="comfortable"
                      class="field-input"
                    />
                  </div>
                  
                  <div class="field-group flex-1">
                    <label class="text-sm font-medium text-gray-700 mb-2">
                      URL сайта
                    </label>
                    <v-text-field
                      v-model="link.url"
                      placeholder="https://example.com"
                      type="url"
                      variant="outlined"
                      density="comfortable"
                      class="field-input"
                    />
                  </div>
                  
                  <div class="field-group flex-shrink-0 self-end">
                    <v-btn
                      icon
                      variant="text"
                      color="error"
                      size="small"
                      @click="removeResourceLink(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
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
import { ref } from 'vue'
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

// Resource links management for partner form
const partnerNewResourceLink = ref({
  type: '',
  url: ''
})

const partnerResourceLinks = ref<Array<{ type: string; url: string }>>([])

const emit = defineEmits<{
  submit: [data: any]
}>()

const onSubmit = async () => {
  const result = await handleSubmit()
  
  if (result.success) {
    emit('submit', result.data)
  }
}

const addResourceLink = (): void => {
  if (partnerNewResourceLink.value.type && partnerNewResourceLink.value.url) {
    partnerResourceLinks.value.push({
      type: partnerNewResourceLink.value.type,
      url: partnerNewResourceLink.value.url
    })
    // Очищаем поля после добавления
    partnerNewResourceLink.value.type = ''
    partnerNewResourceLink.value.url = ''
  }
}

const removeResourceLink = (index: number): void => {
  partnerResourceLinks.value.splice(index, 1)
}
</script>

<style scoped>
.partner-form-card {
  min-height: 400px;
  padding: 2rem;
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

.field-group {
  display: flex;
  flex-direction: column;
}

.field-input {
  width: 100%;
}

/* Custom row styles for better spacing */
.name-surname-row,
.phone-email-row {
  display: flex;
  gap: 4rem;
  margin-bottom: 1.5rem;
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
