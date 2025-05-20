// composables/useToast.js
import { ref } from 'vue'

export const toasts = ref([])

export function showToast(message) {
  const id = Date.now() + Math.random()
  toasts.value.push({ id, message })
  setTimeout(() => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }, 10000)
}