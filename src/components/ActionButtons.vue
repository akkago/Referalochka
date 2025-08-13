<template>
  <div class="flex justify-end gap-4 pt-8 border-t border-gray-200 mt-8">
    <v-btn
      v-if="showCancel"
      variant="outlined"
      color="gray"
      size="large"
      @click="$emit('cancel')"
    >
      {{ cancelText }}
    </v-btn>
    
    <v-btn
      v-if="showSecondary"
      variant="text"
      color="gray"
      size="large"
      @click="$emit('secondary')"
    >
      {{ secondaryText }}
    </v-btn>
    
    <v-btn
      color="primary"
      variant="elevated"
      size="large"
      :disabled="disabled"
      :loading="loading"
      @click="$emit('primary')"
    >
      {{ primaryText }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
interface Props {
  primaryText: string
  cancelText?: string
  secondaryText?: string
  showCancel?: boolean
  showSecondary?: boolean
  disabled?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'primary'): void
  (e: 'cancel'): void
  (e: 'secondary'): void
}

withDefaults(defineProps<Props>(), {
  cancelText: 'Отмена',
  secondaryText: '',
  showCancel: true,
  showSecondary: false,
  disabled: false,
  loading: false
})

defineEmits<Emits>()
</script>

