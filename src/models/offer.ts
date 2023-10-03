type CodecType = 'vp8' | 'vp9' | 'openh264' | 'x264'

interface Codec {
  type: CodecType
  bitrate: number
}

interface Offer {
  sdp: string
  type: string
  app: App
  codec: Codec
}
