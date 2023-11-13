export type CodecType = 'vp8' | 'vp9' | 'openh264' | 'x264'

export interface Codec {
  type: CodecType
  bitrate: number
}

export interface Offer {
  sdp: string
  type: string
  app_id: number
  codec: Codec
}
