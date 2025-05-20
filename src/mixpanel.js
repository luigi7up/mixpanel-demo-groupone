// mixpanel.js
import mixpanel from 'mixpanel-browser'
import { showToast } from './composables/useToast.js'

let isInitialized = false

function initMixpanel() {
  if (isInitialized) return
  mixpanel.init('d0e303b17f7dcaca6360c9f976ddb6f6')
  isInitialized = true
}

function track(eventName, properties) {
  initMixpanel()
  mixpanel.track(eventName, properties)
  showToast(`Mixpanel event: ${eventName} props are {${JSON.stringify(properties)}}`)
  console.log('Mixpanel event:', eventName, properties)
}

function identify(userId) {
  initMixpanel()
  mixpanel.identify(userId)
  showToast(`Mixpanel identify: ${userId}`)
  console.log('Mixpanel identify:', userId)
}

export default {
  ...mixpanel,
  track,
  identify,
}