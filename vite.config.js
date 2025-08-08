import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { execSync } from 'child_process'

// Function to get git commit hash
function getGitCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch (error) {
    console.warn('Could not get git commit hash:', error.message)
    return 'unknown'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    {
      name: 'git-commit-hash',
      config(config, { command }) {
        const commitHash = getGitCommitHash()
        return {
          define: {
            __GIT_COMMIT_HASH__: JSON.stringify(commitHash)
          }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
