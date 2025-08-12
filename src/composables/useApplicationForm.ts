import { ref, reactive, computed } from 'vue'
import type { ApplicationForm, FormField } from '@/types'
import { applicationForm } from '@/data/mockData'
import { createValidationRule } from '@/utils/validation'

export function useApplicationForm() {
  // Form validation
  const form = ref()
  const isFormValid = ref(false)

  // Form data
  const formData = reactive<Record<string, any>>({})

  // Initialize form data
  const initializeFormData = () => {
    applicationForm.sections.forEach(section => {
      section.fields.forEach(field => {
        formData[field.id] = null
      })
    })
  }

  // Field validation rules
  const getFieldRules = (field: FormField) => {
    const rules: any[] = []
    
    if (field.required) {
      rules.push(createValidationRule('required', field.label))
    }
    
    if (field.validation) {
      rules.push(createValidationRule(field.validation, field.label))
    }
    
    return rules
  }

  // Form submission
  const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    
    if (valid) {
      console.log('Form data:', formData)
      // Здесь будет логика отправки данных
      return { success: true, data: formData }
    }
    
    return { success: false, data: null }
  }

  // Reset form
  const resetForm = () => {
    initializeFormData()
    if (form.value) {
      form.value.reset()
    }
  }

  // Get form progress
  const getFormProgress = computed(() => {
    const totalFields = applicationForm.sections.reduce((total, section) => {
      return total + section.fields.length
    }, 0)
    
    const filledFields = Object.values(formData).filter(value => value !== null && value !== '').length
    
    return Math.round((filledFields / totalFields) * 100)
  })

  // Check if section is complete
  const isSectionComplete = (sectionId: string) => {
    const section = applicationForm.sections.find(s => s.id === sectionId)
    if (!section) return false
    
    return section.fields.every(field => {
      const value = formData[field.id]
      return field.required ? (value !== null && value !== '') : true
    })
  }

  return {
    // State
    form,
    isFormValid,
    formData,
    applicationForm,

    // Computed
    getFormProgress,

    // Methods
    initializeFormData,
    getFieldRules,
    handleSubmit,
    resetForm,
    isSectionComplete
  }
}
