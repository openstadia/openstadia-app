import { onUnmounted, ref } from 'vue'

export function useGamepad() {
  const state = ref<ArrayBuffer | null>(null)

  let rafID: number | null = null

  const pollGamepad = () => {
    const gamepads = navigator.getGamepads()
    for (const gamepad of gamepads) {
      if (!gamepad) {
        continue
      }

      const buffer = new ArrayBuffer(20)

      let buttons = 0
      gamepad.buttons.forEach((button, index) => {
        buttons = buttons | (button.pressed << index)
      })

      const buttonsData = new Uint32Array(buffer, 16, 1)
      buttonsData[0] = buttons

      const axes = new Float32Array(buffer, 0, 4)
      gamepad.axes.forEach((axe, index) => {
        axes[index] = axe
      })

      state.value = buffer
    }
    rafID = window.requestAnimationFrame(pollGamepad)
  }

  onUnmounted(() => {
    if (rafID) {
      window.cancelAnimationFrame(rafID)
    }
  })

  // expose managed state as return value
  return { pollGamepad, state }
}
