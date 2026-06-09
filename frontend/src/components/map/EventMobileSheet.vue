<template>
  <div
    class="popup"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >

    <!-- HANDLE gehört INS SHEET -->
    <div class="handle"></div>

    <h3>{{ event.title }}</h3>
    <p>{{ event.city }}</p>

    <div class="meta">
      {{ formatEventDate(event.date) }}
    </div>

    <button @click="$emit('closeAndGoToList')">
      Zur Konferenz
    </button>

  </div>
</template>

<script setup>
import { formatEventDate } from '@/utils/eventPresenter'
import { ref } from 'vue'

defineProps({
  event: Object
})

const emit = defineEmits(['close', 'closeAndGoToList'])

const startY = ref(0)
const currentY = ref(0)
const dragging = ref(false)

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY
  dragging.value = true
}

const onTouchMove = (e) => {
  if (!dragging.value) return

  currentY.value = e.touches[0].clientY
  const diff = currentY.value - startY.value

  // nur nach unten swipe
  if (diff > 80) {
    emit('close')
    dragging.value = false
  }
}

const onTouchEnd = () => {
  dragging.value = false
}

</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  background: white;
  border-radius: 24px 24px 0 0;

  padding: 16px 20px 24px;

  box-shadow: 0 -10px 40px rgba(0,0,0,0.15);

  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Handle jetzt korrekt positioniert */
.handle {
  width: 44px;
  height: 5px;

  background: rgb(127, 126, 126);
  border-radius: 999px;

  margin: 6px auto 12px;

  flex-shrink: 0;
}

h3 {
  margin-bottom: 8px;
}

.meta {
  margin-top: 10px;
  color: #666;
}
</style>