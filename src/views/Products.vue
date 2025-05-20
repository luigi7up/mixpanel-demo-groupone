<template>
  <div class="container mt-4">
    <h1>Products</h1>
    <p>Our product offerings.</p>

    <div class="row">
      <div
        class="card d-flex flex-row align-items-center p-3 mb-3"
        v-for="n in 5"
        :key="n"
      >
        <div class="me-3">
          <div
            style="width: 80px; height: 80px; background-color: #e0e0e0; border-radius: 8px;"
          ></div>
        </div>

        <div class="flex-grow-1">
          <h5 class="mb-1">Product {{ n }}</h5>
          <p class="mb-0 text-muted">This is a short description of product {{ n }}.</p>
        </div>

        <div class="ms-3">
          <input type="checkbox" v-model="selectedProducts[n]" />
        </div>
      </div>
    </div>

    <button class="btn btn-primary mt-3" @click="requestDemo">Request a Demo</button>
    <div v-if="showError" class="text-danger mt-2">Please select at least one product.</div>

    <!-- Demo confirmation modal -->
    <div
      class="modal fade"
      id="demoModal"
      tabindex="-1"
      aria-hidden="true"
      ref="demoModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Demo Requested</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div class="modal-body">
            ✅
            


            We recorded your request for demo. Our team will contact you soon.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import mixpanel from '@/mixpanel' // adjust path as needed

const selectedProducts = ref({})
const showError = ref(false)
const demoModal = ref(null)

let demoModalInstance = null

const requestDemo = () => {
  const selected = Object.keys(selectedProducts.value).filter(key => selectedProducts.value[key])
  if (selected.length === 0) {
    showError.value = true
    mixpanel.track('Demo Request Failed')
    return
  }

  showError.value = false
  mixpanel.track('Demo Requested', {
    products: selected.map(n => `Product ${n}`)
  })

  demoModalInstance.show()
}

onMounted(() => {
  demoModalInstance = new bootstrap.Modal(demoModal.value)
})
</script>