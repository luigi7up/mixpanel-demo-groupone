<!-- Toasts.vue -->
<template>
  <div class="toasts-container">
    <transition-group name="toast" tag="div">
      <div v-for="toast in toasts" :key="toast.id" class="toast show">
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toasts } from '@/composables/useToast.js' // path to your file


</script>

<style scoped>
.toasts-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 250px;
  z-index: 2147483647; /* Maximum possible z-index */
  display: flex;
  flex-direction: column-reverse; /* Newest toasts appear at bottom */
  gap: 8px;
  pointer-events: none; /* Allows clicks to pass through when toasts are transparent */

}

.toast {
  background: rgba(36, 84, 138, 0.455); /* Slightly darker for better contrast */
  color: white;
  padding: 12px 16px; /* Slightly larger padding */
  border-radius: 6px;
  margin-bottom: .5rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2), 
              0 0 0 1px rgba(255,255,255,0.1); /* Added subtle border effect */
  font-size: 0.9rem;
  user-select: none;
  backdrop-filter: blur(2px); /* Subtle modern effect */
  transform: translateZ(0); /* Force hardware acceleration */
  pointer-events: auto; /* Re-enable clicks on toast */
  will-change: transform, opacity; /* Optimize animations */
}

/* Enhanced transitions */
.toast-enter-active {
  transition: 
    opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
.toast-leave-active {
  transition: 
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>