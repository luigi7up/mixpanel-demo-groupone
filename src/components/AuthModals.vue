<template>
  <div>
    <!-- Login Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      id="loginModal"
      ref="loginModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="handleLogin">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="btn-close" @click="hideLogin" />
          </div>
          <div class="modal-body">
            <input
              v-model="loginEmail"
              type="email"
              class="form-control mb-3"
              placeholder="Email"
              required
            />
            <input
              v-model="loginPassword"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Signup Modal -->
    <div
      class="modal fade"
      tabindex="-1"
      id="signupModal"
      ref="signupModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="handleSignup">
          <div class="modal-header">
            <h5 class="modal-title">Sign up</h5>
            <button type="button" class="btn-close" @click="hideSignup" />
          </div>
          <div class="modal-body">
            <input
              v-model="signupEmail"
              type="email"
              class="form-control mb-3"
              placeholder="Email"
              required
            />
            <input
              v-model="signupPassword"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary w-100">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import Cookies from 'js-cookie'
  
  import mp from '@/mixpanel';
  import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
  import { useRouter } from 'vue-router'

  const loginEmail = ref('')
  const loginPassword = ref('')
  const signupEmail = ref('')
  const signupPassword = ref('')

  const router = useRouter()

  let loginModalInstance = null
  let signupModalInstance = null

  const showLogin = () => {
    if (loginModalInstance) {
      loginModalInstance.show()
    }
  }

  const hideLogin = () => {
    if (loginModalInstance) {
      loginModalInstance.hide()
    }
  }

  const showSignup = () => {
    if (signupModalInstance) {
      signupModalInstance.show()
    }
  }

  const hideSignup = () => {
    if (signupModalInstance) {
      signupModalInstance.hide()
    }
  }

  const identifyAndRedirect = (email) => {
    const userId = email.split('@')[0]
    Cookies.set('userEmail', email, { expires: 7 }) // 7 days cookie
    Cookies.set('userId', userId, { expires: 7 }) // 7 days cookie

    const userProfile = {
      userId: userId,
      email: email,
      plan: "Beginner",
      role: "admin",
      total_domains: 3,
      domains: ["www.mydomain1.com", "www.mydomain2.com", "www.mydomain3.com"]
    
    }
    
    // Userpilot identify - using lowercase as per the SDK
    if (typeof window.userpilot !== 'undefined') {
      window.userpilot.identify('456987', {
        name: 'John Doe',
        email: email,
        created_at: '2018-07-11',
        company: { // (optional) in case of company user, we can add company properties
          id: '123456', // (required) in case of company user, used to identify the company
          name: 'Acme Labs',
          industry: 'Technology',
          plan: 'Free',
        },
      });
    }

    window.hj('identify', userProfile.userId, {
      email: userProfile.email,
      role: userProfile.role,
      plan: userProfile.plan,
      ab_test: "myabtest_group",
      ab_test_group: "myabtest_group_new",
      ab_test_variant: "myabtest_variant_new"
    });

    mp.identify(userId)

    mp.set_user_profile({
        $email: userProfile.email,
        plan: userProfile.plan,
        total_domains: userProfile.total_domains,
        domains: userProfile.domains,
        role: userProfile.role,
      })
    mp.track('User Signed Up')
    hideLogin()
    hideSignup()
    router.push('/application/dashboard');
  }

  const handleLogin = () => {
    // for demo, just accept any credentials
    identifyAndRedirect(loginEmail.value)
  }

  const handleSignup = () => {
    identifyAndRedirect(signupEmail.value)
  }

  onMounted(() => {
    // Use nextTick to ensure DOM is fully rendered
    nextTick(() => {
      try {
        // Check if Bootstrap is available
        if (typeof bootstrap === 'undefined') {
          console.error('Bootstrap is not loaded')
          return
        }
        
        const loginModalElement = document.getElementById('loginModal')
        const signupModalElement = document.getElementById('signupModal')
        
        if (loginModalElement) {
          loginModalInstance = new bootstrap.Modal(loginModalElement)
        } else {
          console.warn('Login modal element not found')
        }
        
        if (signupModalElement) {
          signupModalInstance = new bootstrap.Modal(signupModalElement)
        } else {
          console.warn('Signup modal element not found')
        }
      } catch (error) {
        console.error('Error initializing modals:', error)
      }
    })
  })

  // Expose modal show functions to parent via events
  defineExpose({ showLogin, showSignup })
</script>