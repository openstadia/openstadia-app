export function initChannel() {
  let sendChannel: RTCDataChannel | null

  return {
    sendData(data) {
      if (sendChannel && sendChannel.readyState === 'open') {
        sendChannel.send(data)
      }
    },
    setChannel(channel: RTCDataChannel | null) {
      sendChannel = channel
    },
    onData(listener: (data: any) => void) {
      if (sendChannel) {
        sendChannel.addEventListener('message', (event) => {
          listener(event.data)
        })
      }
    },
    onOpen(listener: (ev: Event) => void) {
      if (sendChannel) {
        sendChannel.addEventListener('open', listener)
      }
    }
  }
}
