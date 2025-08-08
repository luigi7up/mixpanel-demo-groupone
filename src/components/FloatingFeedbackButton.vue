<template>
  <div class="floating-feedback-button" @click="handleFeedbackClick">
    <div class="feedback-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
        <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" fill="currentColor"/>
      </svg>
    </div>
    <span class="feedback-text">Feedback</span>
  </div>
</template>

<script setup>
const handleFeedbackClick = () => {
  console.log('Feedback button clicked')
  
  // Trigger Userpilot custom event
  if (typeof window.userpilot !== 'undefined') {
    window.userpilot.track('click_on_general_feedback', {
      button_location: 'floating_feedback_button',
      timestamp: new Date().toISOString()
    })
  }
  
  // You can customize this to open a feedback modal, form, or external link
  // window.open('https://your-feedback-form.com', '_blank')
  
  // For now, just show an alert
  console.log('Feedback button clicked')
}
</script>

<style scoped>
.floating-feedback-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  font-size: 14px;
  font-weight: 500;
}

.floating-feedback-button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
}

.floating-feedback-button:active {
  transform: translateY(0);
}

.feedback-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-text {
  white-space: nowrap;
}

/* Responsive design */
@media (max-width: 768px) {
  .floating-feedback-button {
    right: 15px;
    bottom: 15px;
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .feedback-text {
    display: none; /* Hide text on mobile, show only icon */
  }
}

/* Animation for initial appearance */
@keyframes slideIn {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.floating-feedback-button {
  animation: slideIn 0.5s ease-out;
}
</style>
