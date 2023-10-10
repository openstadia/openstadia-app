<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { getServer, isServerOnline } from '@/services/serversApi'
import { sendOffer } from '@/services/offerApi'
import { useRoute } from 'vue-router'
import { getServersApps } from '@/services/serversAppsApi'
import IconFullscreen from '@/components/icons/IconFullscreen.vue'
import { initChannel, initRtc } from '@/utils/rtc'
import { initGamepad, initKeyboard, initMouse } from '@/utils/inputs'

const props = defineProps<{
  id: number
}>()

const { getAccessTokenSilently } = useAuth0()
const route = useRoute()

const selectedAppId = route.query.app_id as string

const videoRef = ref<HTMLVideoElement | null>(null)
const videoWrapperRef = ref<HTMLDivElement | null>(null)

const server = ref<Server | null>(null)
const apps = ref<App[]>([])

const isOnline = ref(false)
const isConnected = ref(true)

const { sendData, setChannel } = initChannel()

onMounted(async () => {
  const token = await getAccessTokenSilently()

  server.value = await getServer(token, props.id)
  isOnline.value = await isServerOnline(token, props.id)

  apps.value = await getServersApps(token, props.id)
})

const startVideo = async () => {
  const videoEl = videoRef.value
  if (!videoEl) {
    return
  }

  initGamepad(sendData)
  initKeyboard(sendData)
  initMouse(videoEl, sendData)

  const { sendChannel, setRemoteDescription, getLocalDescription } = initRtc(videoEl, null)
  setChannel(sendChannel)

  const formElements = document.forms['connect'].elements
  const codecType = formElements.type.value
  const bitrate = formElements.bitrate.valueAsNumber * 1_000_000
  // const app = formElements.app.value
  const app = 'screen'

  const localDescription = await getLocalDescription()

  const offer = {
    sdp: localDescription!!.sdp,
    type: localDescription!!.type,
    app: { name: app },
    codec: { type: codecType, bitrate: bitrate }
  }

  const token = await getAccessTokenSilently()
  const answer = await sendOffer(token, props.id, offer)

  try {
    await setRemoteDescription(answer)
  } catch (e) {
    alert(e)
  }
}

const enterFullScreen = () => {
  if (!document.fullscreenElement) {
    const videoWrapper = videoWrapperRef.value

    if (videoWrapper) {
      videoWrapper.requestFullscreen()
    }
  }
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Server Connect</h2>

  <div class="mb-6 flex justify-between">
    <div class="font-semibold text-gray-900">{{ server?.name }}</div>

    <div class="flex items-center">
      <div :class="isOnline ? 'bg-green-600' : 'bg-red-600'" class="w-4 h-4 rounded-full"></div>
      <div class="ml-2 font-semibold text-gray-900">{{ isOnline ? 'Online' : 'Offline' }}</div>
    </div>
  </div>

  <form id="connect">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="type"
          >Select codec</label
        >
        <select
          id="type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="type"
        >
          <option value="vp8">VP8</option>
          <option value="vp9">VP9</option>
          <option value="openh264">OpenH264</option>
        </select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="bitrate"
          >Select bitrate</label
        >
        <div class="flex">
          <input
            id="bitrate"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            value="10"
          />
          <span class="text-gray-900 text-sm p-2.5 dark:text-white"> Mb/s </span>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="app"
        >Select apps</label
      >
      <select
        id="app"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="app"
      >
        <option disabled selected value="">None</option>
        <option v-for="app in apps" :key="app.id" :selected="app.id == selectedAppId" :value="app">
          {{ app.name }}
        </option>
      </select>
    </div>
  </form>

  <button
    :disabled="!isOnline"
    class="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
    @click="startVideo"
  >
    Start Video
  </button>

  <div
    ref="videoWrapperRef"
    class="videoWrapper flex justify-center items-center mb-6 max-w-[1000px] bg-gray-600 rounded-lg"
  >
    <video ref="videoRef" autoplay></video>
  </div>

  <button
    v-if="isConnected"
    class="mb-6 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
    type="button"
    @click="enterFullScreen"
  >
    <IconFullscreen class="w-5 h-5"></IconFullscreen>
    <span class="sr-only">Enter fullscreen</span>
  </button>
</template>

<style scoped>
.videoWrapper:fullscreen video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.videoWrapper:not(:fullscreen) video {
  width: 100%;
  height: 100%;
}
</style>
