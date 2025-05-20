
<template>
  <div class="container mt-4">
    <h1>Oor packages & prices</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus numquam.</p>

    <div class="slider-container mt-5">
      <div class="labels">
        <div v-for="tier in tiers" :key="tier.id" class="label">
          <div class="label-top">{{ tier.label }}</div>
          <div class="label-bottom">{{ tier.price }}</div>
        </div>
      </div>

      <input
        type="range"
        min="1"
        max="4"
        step="1"
        v-model="selectedTier"
        @change="onSliderChange"
        class="tier-slider"
      />

      <div class="tier-info" :class="`tier-${selectedTier}`">
        <h3>{{ tiers[selectedTier - 1].label }} includes:</h3>
        <ul>
          <li v-for="(item, index) in tiers[selectedTier - 1].features" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import mp from '@/mixpanel' // adjust if needed

const tiers = [
  {
    id: 1,
    label: 'Tier one',
    price: '$200',
    features: [
      'Up to 2 GB bandwidth',
      'Basic analytics dashboard',
      'Email support'
    ]
  },
  {
    id: 2,
    label: 'Tier two',
    price: '$700',
    features: [
      'Up to 10 GB bandwidth',
      'Advanced analytics dashboard',
      'Priority email support'
    ]
  },
  {
    id: 3,
    label: 'Tier three',
    price: '$2000',
    features: [
      'Up to 50 GB bandwidth',
      'Custom analytics reports',
      '24/7 phone support'
    ]
  },
  {
    id: 4,
    label: 'Tier four',
    price: '$5000',
    features: [
      'Unlimited bandwidth',
      'Dedicated account manager',
      'Personalized onboarding'
    ]
  }
]

const selectedTier = ref(1)

const onSliderChange = () => {
  const tier = tiers.find(t => t.id === Number(selectedTier.value))
  if (tier) {
    mp.track('Tier Slider Moved', { position: tier.label.toLowerCase() })
  }
}
</script>

<style scoped>
.slider-container {
  max-width: 400px;
  margin: 0 auto;
  user-select: none;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  text-align: center;
  flex: 1;
}

.label-top {
  font-weight: 600;
  margin-bottom: 4px;
}

.label-bottom {
  color: #666;
  font-size: 0.9rem;
}

.tier-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  background: #ddd;
  border-radius: 10px;
  outline: none;
  position: relative;
  margin: 0;
}

/* slider thumb */
.tier-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  border: 2px solid #0056b3;
  margin-top: -9px;
  transition: background-color 0.3s ease;
}

.tier-slider::-webkit-slider-thumb:hover {
  background: #0056b3;
}

.tier-slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
  border: 2px solid #0056b3;
  transition: background-color 0.3s ease;
}

.tier-slider::-moz-range-thumb:hover {
  background: #0056b3;
}

.tier-info {
  margin-top: 20px;
  border-radius: 12px;
  color: white;
  padding: 20px;
  font-weight: 500;
  user-select: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.tier-info h3 {
  margin-bottom: 12px;
}

/* Gradients for each tier */
.tier-1 {
  background: linear-gradient(135deg, #6bc1ff, #1e90ff);
}

.tier-2 {
  background: linear-gradient(135deg, #f6d365, #fda085);
}

.tier-3 {
  background: linear-gradient(135deg, #a8ff78, #78ffd6);
  color: #004d40;
}

.tier-4 {
  background: linear-gradient(135deg, #ff758c, #ff7eb3);
}
</style>