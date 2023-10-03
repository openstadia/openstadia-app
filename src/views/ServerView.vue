<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { getServer, isServerOnline } from '@/services/serversApi'
import { getOffer } from '@/services/offerApi'
import { useRoute } from 'vue-router'
import { getServersApps } from '@/services/serversAppsApi'
import router from '@/router'

const props = defineProps<{
  id: number
}>()

const { getAccessTokenSilently } = useAuth0()
const route = useRoute()

const selectedAppId = route.query.app_id
console.log(selectedAppId)

const server = ref(null)
const apps = ref<App[]>([])
const videoRef = ref<HTMLVideoElement | null>(null)
const logsRef = ref<HTMLDivElement | null>(null)
const isOnline = ref(false)

let sendChannel
let sendChannelState = false
let pc

const videoMouseMove = (event) => {
  if (!sendChannelState) {
    return
  }

  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const data = new Uint32Array(3)
  data[0] = 0
  data[1] = x
  data[2] = y
  sendChannel.send(data)
}

const videoClick = () => {
  if (!sendChannelState) {
    return
  }

  const data = new Uint32Array(3)
  data[0] = 1
  sendChannel.send(data)
}

const videoWheel = (event) => {
  if (!sendChannelState) {
    return
  }

  event.preventDefault()
  const data = new Int32Array(3)
  data[0] = 2
  data[1] = event.deltaX
  data[2] = event.deltaY
  sendChannel.send(data)
}

const log = (msg) => {
  const logs = logsRef.value
  if (logs) {
    logs.textContent += msg + '<br>'
  }
}

onMounted(async () => {
  const token = await getAccessTokenSilently()

  server.value = await getServer(token, props.id)
  isOnline.value = await isServerOnline(token, props.id)

  pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  })

  pc.addEventListener('track', (event) => {
    const video = videoRef.value

    if (video) {
      video.srcObject = event.streams[0]
    }

    sendChannelState = true
  })

  pc.addEventListener('iceconnectionstatechange', () => log(pc.iceConnectionState))

  // Offer to receive 1 video track
  pc.addTransceiver('video', {
    direction: 'recvonly'
  })

  apps.value = await getServersApps(token, props.id)
})

const startVideo = async () => {
  sendChannel = pc.createDataChannel('sendDataChannel')
  sendChannel.onopen = () => console.log('sendChannel.onopen')
  sendChannel.onmessage = () => console.log('sendChannel.onmessage')
  sendChannel.onclose = () => console.log('sendChannel.onclose')

  const formElements = document.forms['connect'].elements
  const codecType = formElements.type.value
  const bitrate = formElements.bitrate.valueAsNumber
  // const app = formElements.app.value
  const app = 'ppsspp'

  const rtcOffer = await pc.createOffer()
  await pc.setLocalDescription(rtcOffer)

  const offer = {
    sdp: pc.localDescription.sdp,
    type: pc.localDescription.type,
    app: { name: app },
    codec: { type: codecType, bitrate: bitrate }
  }

  const token = await getAccessTokenSilently()
  const answer = await getOffer(token, props.id, offer)

  await pc.setRemoteDescription(
    new RTCSessionDescription({ sdp: answer.sdp, type: answer.type as RTCSdpType })
  )
}

const enterFullScreen = () => {
  if (!document.fullscreenElement) {
    const video = videoRef.value

    if (video) {
      video.requestFullscreen()
    }
  }
}
</script>

<template>
  <div>
    {{ server }}
  </div>

  <form id="connect">
    <label for="type">Codecs:</label>
    <select id="type" name="type">
      <option value="vp8">VP8</option>
      <option value="vp9">VP9</option>
      <option value="openh264">OpenH264</option>
    </select>

    <label for="bitrate">Bitrate:</label>
    <input id="bitrate" type="number" value="10000000" />

    <label for="app">Apps:</label>
    <select id="app" name="app">
      <option value="" disabled selected>Select app</option>
      <option v-for="app in apps" :key="app" :value="app" :selected="app.id == selectedAppId">
        {{ app }}
      </option>
    </select>
  </form>

  <div v-if="isOnline">Online</div>
  <div v-else>Offline</div>

  <button @click="startVideo">Start Video</button>

  <h3>Video</h3>
  <div>
    <video
      ref="videoRef"
      autoplay
      @mousemove="videoMouseMove"
      @click="videoClick"
      @wheel="videoWheel"
    ></video>
  </div>

  <button @click="enterFullScreen">Enter fullscreen</button>

  <h3>Logs</h3>
  <div id="logs"></div>
</template>
