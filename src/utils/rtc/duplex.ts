export function initDuplex() {
    const pc = new RTCPeerConnection({
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302'
            }
        ]
    })

    pc.addEventListener('iceconnectionstatechange', console.log)

    const sendChannel = pc.createDataChannel('terminal')
    sendChannel.onopen = () => console.log('sendChannel.onopen')
    sendChannel.onmessage = () => console.log('sendChannel.onmessage')
    sendChannel.onclose = () => console.log('sendChannel.onclose')

    const getLocalDescription = async () => {
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        await new Promise<void>((resolve) => {
            if (pc.iceGatheringState === 'complete') {
                resolve()
            } else {
                const checkState = () => {
                    if (pc.iceGatheringState === 'complete') {
                        pc.removeEventListener('icegatheringstatechange', checkState)
                        resolve()
                    }
                }

                pc.addEventListener('icegatheringstatechange', checkState)
            }
        })

        return pc.localDescription
    }

    const setRemoteDescription = async (answer: any) => {
        await pc.setRemoteDescription(new RTCSessionDescription(answer))
    }

    return {
        sendChannel,
        getLocalDescription,
        setRemoteDescription
    }
}
