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
      userId: '123',
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
.fb-ov {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 41, 59, 0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
}
.fb-md {
  background: #fff;
  padding: 2.2rem 2rem 1.5rem 2rem;
  border-radius: 16px;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(30,41,59,0.18), 0 1.5px 6px rgba(30,41,59,0.08);
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  position: relative;
  animation: fb-fadein 0.3s;
}
@keyframes fb-fadein {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: none;}
}
.fb-md h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1e293b;
}
.fb-md p {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 1.2rem;
}
.fb-str {
  margin: 10px 0 18px 0;
}
.fb-s {
  font-size: 2.1rem;
  cursor: pointer;
  color: #e5e7eb;
  transition: color 0.18s;
  margin: 0 2px;
  user-select: none;
}
.fb-s.sel {
  color: #fbbf24;
  text-shadow: 0 2px 8px #fde68a55;
}
.fb-md textarea {
  width: 100%;
  min-height: 60px;
  max-height: 120px;
  margin: 0 0 1.1rem 0;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 7px;
  font-size: 1rem;
  color: #334155;
  background: #f8fafc;
  resize: vertical;
  transition: border 0.18s;
  outline: none;
}
.fb-md textarea:focus {
  border-color: #38bdf8;
  background: #fff;
}
.fb-sub {
  background: linear-gradient(90deg, #38bdf8 0%, #2563eb 100%);
  color: #fff;
  border: none;
  padding: 0.7rem 1.6rem;
  cursor: pointer;
  border-radius: 7px;
  font-size: 1.08rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(56,189,248,0.08);
  opacity: 0.7;
  transition: opacity 0.18s, box-shadow 0.18s, background 0.18s;
  margin-top: 0.2rem;
  letter-spacing: 0.01em;
}
.fb-sub.enabled {
  opacity: 1;
  box-shadow: 0 4px 16px rgba(56,189,248,0.13);
}
.fb-sub:disabled {
  opacity: 0.7;
  pointer-events: none;
}
.fb-md .fb-thankyou {
  font-size: 1.15rem;
  color: #22c55e;
  margin-top: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>
