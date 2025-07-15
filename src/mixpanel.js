// mixpanel.js
import mixpanel from 'mixpanel-browser'
import { showToast } from './composables/useToast.js'

let isInitialized = false

function initMixpanel() {
  if (isInitialized) return
  mixpanel.init('d0e303b17f7dcaca6360c9f976ddb6f6')
  // Expose globally for HotJar to see it
  window.mixpanel = mixpanel;
  console.log('Mixpanel initialized')
  isInitialized = true
}

function track(eventName, properties) {
  initMixpanel()
  mixpanel.track(eventName, properties)
  showToast(`Mixpanel event: ${eventName} props are {${JSON.stringify(properties)}}`)
  console.log('Mixpanel event:', eventName, properties)
}


function track_pageview(page) {
  initMixpanel()
  mixpanel.track_pageview(page)
  showToast(`Mixpanel pageview: ${page}`)
  console.log('Mixpanel pageview:', page)
}

function identify(userId) {
  initMixpanel()
  mixpanel.identify(userId)
  showToast(`Mixpanel identify: ${userId}`)
  console.log('Mixpanel identify:', userId)
}

function set_user_profile(userProfile) {
  initMixpanel();
  mixpanel.people.set({
    ...userProfile
  });
  showToast(`Mixpanel people.set: ${JSON.stringify(userProfile)}`);
  console.log('Mixpanel people.set:', userProfile);
}

function reset() {
  initMixpanel();
  mixpanel.reset();
  showToast('Mixpanel reset');
  console.log('Mixpanel reset');
}



export default {
  ...mixpanel,
  track,
  track_pageview,
  identify,
  set_user_profile,
  reset,
}