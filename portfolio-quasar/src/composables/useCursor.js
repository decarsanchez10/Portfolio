import { ref } from 'vue'

const isHovering = ref(false)

export function useCursor () {
  const onEnter = () => { isHovering.value = true }
  const onLeave = () => { isHovering.value = false }
  return { isHovering, onEnter, onLeave }
}