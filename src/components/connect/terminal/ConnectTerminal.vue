<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { sendOffer } from '@/apis/offer'
import { initChannel } from '@/utils/rtc'
import type { Server } from '@/models/server'
import type { Offer } from '@/models/offer'
import { initDuplex } from '@/utils/rtc/duplex'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

const props = defineProps<{
  server: Server | null
}>()

const { getAccessTokenSilently } = useAuth0()

const isOnline = computed(() => props.server?.online)
const isConnected = ref<boolean>(false)

const terminalRef = ref<HTMLDivElement | null>(null)

const { sendData, setChannel, onData, onOpen } = initChannel()

let terminal: Terminal

onMounted(async () => {
  const terminalEl = terminalRef.value
  if (!terminalEl) {
    return
  }

  terminal = new Terminal({ rows: 30, cols: 80 })
  terminal.open(terminalEl)
  console.log(terminal)
})

onBeforeUnmount(() => {
  if (terminal) {
    terminal.dispose()
  }
})

const startTerminal = async () => {
  const { sendChannel, setRemoteDescription, getLocalDescription } = initDuplex()
  setChannel(sendChannel)

  onData((data) => {
    terminal.write(new Uint8Array(data))
  })

  onOpen(() => {
    isConnected.value = true
  })

  const localDescription = await getLocalDescription()

  const offer: Offer = {
    sdp: localDescription!!.sdp,
    type: localDescription!!.type,
    app_id: -1,
    codec: { type: 'vp8', bitrate: 0 }
  }

  const token = await getAccessTokenSilently()
  const answer = await sendOffer(token, props.server?.id, offer)

  try {
    await setRemoteDescription(answer)
  } catch (e) {
    alert(e)
  }

  terminal.onData((data) => {
    sendData(data)
  })
}
</script>

<template>
  <button
    v-show="!isConnected"
    :disabled="!isOnline"
    class="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
    @click="startTerminal"
  >
    Start Terminal
  </button>

  <div v-show="isConnected" ref="terminalRef"></div>
</template>
