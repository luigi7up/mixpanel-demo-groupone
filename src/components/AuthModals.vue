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
  import { ref, onMounted } from 'vue'
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
    loginModalInstance.show()
  }

  const hideLogin = () => {
    loginModalInstance.hide()
  }

  const showSignup = () => {
    signupModalInstance.show()
  }

  const hideSignup = () => {
    signupModalInstance.hide()
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
    loginModalInstance = new bootstrap.Modal(
      document.getElementById('loginModal')
    )
    signupModalInstance = new bootstrap.Modal(
      document.getElementById('signupModal')
    )
  })

  // Expose modal show functions to parent via events
  defineExpose({ showLogin, showSignup })
</script>