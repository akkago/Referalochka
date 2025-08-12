import { ref, reactive, computed } from 'vue'
import type { PartnerForm, PartnerResourceLink, PartnerCategory } from '@/types'
import { partnerForm, partnerResourceLinks, partnerCategories } from '@/data/mockData'
import { createValidationRule } from '@/utils/validation'

export function usePartnerForm() {
  // Form validation
  const form = ref()
  const isFormValid = ref(false)
  const activeTab = ref('partner')

  // Form data
  const formData = reactive<Record<string, any>>({
    name: '',
    surname: '',
    phone: '',
    email: '',
    brand: '',
    company: '',
    inn: '',
    headline: '',
    description: '',
    tags: ''
  })

  // Resource links
  const resourceLinksData = ref<PartnerResourceLink[]>([...partnerResourceLinks])
  const newLinkType = ref('')
  const newLinkUrl = ref('')

  // Partner categories
  const categoriesData = ref<PartnerCategory[]>([...partnerCategories])

  // Field validation rules
  const getFieldRules = (field: any) => {
    const rules: any[] = []
    
    if (field.required) {
      rules.push(createValidationRule('required', field.label))
    }
    
    if (field.validation) {
      rules.push(createValidationRule(field.validation, field.label))
    }
    
    return rules
  }

  // Add new resource link
  const addLink = () => {
    if (newLinkType.value && newLinkUrl.value) {
      resourceLinksData.value.push({
        id: Date.now().toString(),
        type: newLinkType.value,
        url: newLinkUrl.value
      })
      newLinkType.value = ''
      newLinkUrl.value = ''
    }
  }

  // Remove resource link
  const removeLink = (id: string) => {
    const index = resourceLinksData.value.findIndex(link => link.id === id)
    if (index > -1) {
      resourceLinksData.value.splice(index, 1)
    }
  }

  // Form submission
  const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    
    if (valid) {
      const formDataToSubmit = {
        ...formData,
        resourceLinks: resourceLinksData.value,
        categories: categoriesData.value.filter(cat => cat.isSelected).map(cat => cat.name)
      }
      
      console.log('Partner form data:', formDataToSubmit)
      return { success: true, data: formDataToSubmit }
    }
    
    return { success: false, data: null }
  }

  // Reset form
  const resetForm = () => {
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })
    
    resourceLinksData.value = [...partnerResourceLinks]
    categoriesData.value = [...partnerCategories]
    
    if (form.value) {
      form.value.reset()
    }
  }

  // Get form progress
  const getFormProgress = computed(() => {
    const totalFields = partnerForm.sections.reduce((total, section) => {
      return total + section.fields.length
    }, 0)
    
    const filledFields = Object.values(formData).filter(value => {
      return value !== null && value !== ''
    }).length
    
    return Math.round((filledFields / totalFields) * 100)
  })

  // Check if section is complete
  const isSectionComplete = (sectionId: string) => {
    const section = partnerForm.sections.find(s => s.id === sectionId)
    if (!section) return false
    
    return section.fields.every(field => {
      const value = formData[field.id]
      if (field.required) {
        return value !== null && value !== ''
      }
      return true
    })
  }

  return {
    // State
    form,
    isFormValid,
    formData,
    partnerForm,
    activeTab,
    resourceLinksData,
    newLinkType,
    newLinkUrl,
    categoriesData,

    // Computed
    getFormProgress,

    // Methods
    getFieldRules,
    addLink,
    removeLink,
    handleSubmit,
    resetForm,
    isSectionComplete
  }
}
