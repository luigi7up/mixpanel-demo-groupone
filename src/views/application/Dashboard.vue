<template>
  <div class="dashboard-container">
    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filters">
        <input type="date" v-model="dateFrom" class="filter-input" />
        <span>to</span>
        <input type="date" v-model="dateTo" class="filter-input" />
        <select v-model="selectedSegment" class="filter-input">
          <option value="all">All Segments</option>
          <option value="segment1">Segment 1</option>
          <option value="segment2">Segment 2</option>
        </select>
      </div>
      <button class="feedback-btn outlined small" @click="triggerFeedback">Leave feedback</button>
    </div>

    <!-- Data Widgets -->
    <div class="widgets-grid">
      <div class="widget" v-for="(widget, i) in widgets" :key="i">
        <component :is="widget.component" v-bind="widget.props" />
        <div class="widget-title">{{ widget.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bar, Pie, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

const dateFrom = ref('2024-06-01')
const dateTo = ref('2024-06-30')
const selectedSegment = ref('all')

function triggerFeedback() {
  if (window.hj) {
    window.hj('trigger', 'trigger_dashboard_filterbar_survey')
    console.log('HotJar triggered: trigger_dashboard_filterbar_survey')
  
    
  }

  if(FeedbackSurvey) {
    // Example initialization (customize as needed):
    window.FeedbackSurvey.create({
      title: 'Leave Feedback',
      subtitle: 'How was your experience?',
      trigger: '.feedback-btn', // or use openNow: true to open immediately
    });

  }
}

// Mock chart data
const pieData = {
  labels: ['A', 'B', 'C'],
  datasets: [{ data: [40, 30, 30], backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'] }]
}
const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{ label: 'Visitors', data: [120, 90, 100, 140, 80, 70, 110], backgroundColor: '#42a5f5' }]
}
const lineData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{ label: 'Revenue', data: [400, 600, 550, 700], borderColor: '#66bb6a', fill: false }]
}
const doughnutData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [{ data: [60, 30, 10], backgroundColor: ['#42a5f5', '#ffa726', '#66bb6a'] }]
}

const widgets = [
  { title: 'User Segments', component: Pie, props: { data: pieData } },
  { title: 'Weekly Visitors', component: Bar, props: { data: barData } },
  { title: 'Revenue Trend', component: Line, props: { data: lineData } },
  { title: 'Device Split', component: Doughnut, props: { data: doughnutData } },
  { title: 'Conversion Rate', component: Pie, props: { data: pieData } },
  { title: 'Signups', component: Bar, props: { data: barData } },
  { title: 'Churn Rate', component: Line, props: { data: lineData } },
  { title: 'Traffic Sources', component: Doughnut, props: { data: doughnutData } },
  { title: 'Active Users', component: Bar, props: { data: barData } },
]
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f9fa;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.filter-input {
  padding: 0.4rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}
.feedback-btn {
  background: transparent;
  color: #42a5f5;
  border: 1.5px solid #42a5f5;
  border-radius: 4px;
  padding: 0.25rem 0.8rem;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.feedback-btn.outlined {
  background: transparent;
  color: #42a5f5;
  border: 1.5px solid #42a5f5;
}
.feedback-btn.outlined:hover {
  background: #e3f2fd;
  color: #1e88e5;
  border-color: #1e88e5;
}
.feedback-btn.small {
  padding: 0.18rem 0.7rem;
  font-size: 0.88rem;
}
.widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.widget {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.widget-title {
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}
</style>
