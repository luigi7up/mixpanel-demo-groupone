<template>
  <div class="container my-5">
    <!-- Hero Section -->
    <section class="row align-items-center mb-5">
      <div class="col-md-6 text-center text-md-start">
        <h1 class="display-4 fw-bold">Welcome to our Demo</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, earum. Unde suscipit obcaecati....</p>
        <router-link
          to="/products"
          class="btn btn-primary mt-3"
          @click="onCtaClick('See Products - Hero')"
        >See Products</router-link>
      </div>
      <div class="col-md-6 text-center">
        <img src="https://placehold.co/500x300" alt="Hero image" class="img-fluid rounded shadow" />
      </div>
    </section>

    <!-- Products Section -->
    <section class="row align-items-center mb-5">
      <div class="col-md-6 text-center">
        <img src="https://placehold.co/500x300" alt="Products image" class="img-fluid rounded shadow" />
      </div>
      <div class="col-md-6 text-center text-md-start">
        <h2 class="fw-bold">Our Products</h2>
        <p>Explore our suite of products designed to make your workflow more efficient and scalable.</p>
        <router-link
          to="/products"
          class="btn btn-outline-primary mt-3"
          @click="onCtaClick('See Products - Section')"
        >See Products</router-link>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="row align-items-center">
      <div class="col-md-6 text-center text-md-start">
        <h2 class="fw-bold">Pricing Plans</h2>
        <p>Flexible pricing to fit every stage of your business growth.</p>
        <router-link
          to="/pricing"
          class="btn btn-outline-success mt-3"
          @click="onCtaClick('See Pricing')"
        >See Pricing</router-link>
      </div>
      <div class="col-md-6 text-center">
        <img src="https://placehold.co/500x300" alt="Pricing image" class="img-fluid rounded shadow" />
      </div>
    </section>
  </div>
</template>

<script setup>
import mp from '@/mixpanel'

const onCtaClick = (label) => {
  mp.track('Home CTA Clicked', { button: label })
}
</script>

<style scoped>
/* Add any extra custom styles here if needed */
section {
  margin-bottom: 6rem;
}
</style>