<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span class="footer-text">© 2024 Your App Name</span>
      </div>
      <div class="footer-right">
        <span class="version-info">
          Version: {{ commitHash }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Access the git commit hash injected by Vite
const commitHash = typeof __GIT_COMMIT_HASH__ !== 'undefined' ? __GIT_COMMIT_HASH__ : 'dev'
</script>

<style scoped>
.app-footer {
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  padding: 1rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-text {
  color: #6c757d;
  font-size: 0.875rem;
}

.version-info {
  color: #6c757d;
  font-size: 0.75rem;
  font-family: monospace;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
