<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { sendOffer } from '@/apis/offer'
import { initChannel } from '@/utils/rtc'
import type { Server } from '@/models/server'
import type { Offer } from '@/models/offer'
import { initDuplex } from '@/utils/rtc/duplex'
import type { File, LsRes } from '@/models/explorer'
import IconHdd from '@/components/icons/IconHdd.vue'
import IconCaretRight from '@/components/icons/IconCaretRight.vue'
import ExplorerItem from '@/components/connect/explorer/ExplorerItem.vue'

const props = defineProps<{
  server: Server | null
}>()

const { getAccessTokenSilently } = useAuth0()

const isOnline = computed(() => props.server?.online)
const isConnected = ref<boolean>(false)

const path = ref<string[]>([])
const files = ref<File[]>([])

const selectedFile = ref<File | null>(null)

const onFocusFile = (file: File) => {
  selectedFile.value = file
}

const onBlurFile = () => {
  selectedFile.value = null
}

const { sendData, setChannel, onData, onOpen } = initChannel()

const sendRequest = (path: string[]) => {
  const header = {
    type: 'EVENT',
    id: 22,
    name: 'LS'
  }

  const payload = {
    path
  }

  const packet = JSON.stringify(header) + '|' + JSON.stringify(payload)
  sendData(packet)
}

const startExplorer = async () => {
  const { sendChannel, setRemoteDescription, getLocalDescription } = initDuplex()
  setChannel(sendChannel)

  onData((data) => {
    let decoder = new TextDecoder('utf-8')
    const text = decoder.decode(data)
    const [header, rawPayload] = text.split('|')

    const payload: LsRes = JSON.parse(rawPayload)
    path.value = payload.path
    files.value = payload.files
  })

  onOpen(() => {
    isConnected.value = true
    sendRequest([])
  })

  const localDescription = await getLocalDescription()

  const offer: Offer = {
    sdp: localDescription!!.sdp,
    type: localDescription!!.type,
    app_id: -2,
    codec: { type: 'vp8', bitrate: 0 }
  }

  const token = await getAccessTokenSilently()
  const answer = await sendOffer(token, props.server.id, offer)

  try {
    await setRemoteDescription(answer)
  } catch (e) {
    alert(e)
  }
}

const onDbClick = (file: File) => {
  if (file.is_dir) {
    sendRequest([...path.value, file.name])
  }
}

const onPathClick = (index: number) => {
  const newPath = path.value.slice(0, index)
  sendRequest(newPath)
}

const sortedFiles = computed(() => {
  const filesCopy = [...files.value]
  return filesCopy.sort((a) => (a.is_dir ? -1 : 1))
})
</script>

<template>
  <button
    v-if="!isConnected"
    :disabled="!isOnline"
    class="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none disabled:bg-blue-400 disabled:cursor-not-allowed"
    @click="startExplorer"
  >
    Start Explorer
  </button>

  <div v-if="isConnected">
    <nav class="mb-6 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <button
            class="inline-flex text-lg items-center font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            @click="onPathClick(0)"
          >
            <IconHdd class="w-6 h-6 me-2 text-gray-400"></IconHdd>
            Drive
          </button>
        </li>

        <li v-for="(directory, index) in path" :key="directory">
          <div class="flex items-center">
            <IconCaretRight class="w-6 h-6 text-gray-400 mx-1"></IconCaretRight>
            <button
              type="button"
              class="ms-1 text-lg font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              @click="onPathClick(index + 1)"
            >
              {{ directory }}
            </button>
          </div>
        </li>
      </ol>
    </nav>

    <div>
      <div v-if="files.length === 0" class="text-sm">No files in directory</div>

      <div class="border-t border-gray-400" v-else>
        <div v-for="file in sortedFiles" :key="file.name">
          <ExplorerItem
            class="border-b border-gray-400"
            :file="file"
            :selected="selectedFile === file"
            @dblclick="onDbClick(file)"
            @focus="onFocusFile(file)"
            @blur="onBlurFile"
            tabindex="0"
          ></ExplorerItem>
        </div>
      </div>
    </div>
  </div>
</template>
