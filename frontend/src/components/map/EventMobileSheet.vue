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
    <div class="badge">
      {{ event.city }}
    </div>

    <div class="meta-row">
      <div>
        📅 {{ formatEventDate(event.date) }}
      </div>

      <div>
        👥 {{ event.participants }} Teilnehmer
      </div>
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

  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.98),
    rgba(255,255,255,0.94)
  );

  border-radius: 28px 28px 0 0;

  padding: 18px 24px 28px;

  box-shadow:
    0 -15px 40px rgba(0,0,0,0.15);

  z-index: 9999;

  display: flex;
  flex-direction: column;
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
  margin-top: 16px;

  font-size: 22px;
  line-height: 1.3;

  color: #0f3b66;
}

.meta-row {
  margin-top: 18px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  color: #4a4a4a;
}

.badge {
  display: inline-flex;

  align-self: flex-start;

  margin-top: 6px;

  padding: 6px 12px;

  border-radius: 999px;

  background: #d9eefc;
  color: #0b558f;

  font-weight: 600;
  font-size: 14px;
}

button {
  margin-top: 24px;

  width: 100%;
  height: 52px;

  border: none;
  border-radius: 16px;

  background: #0f3b66;
  color: white;

  font-size: 16px;
  font-weight: 600;
}
</style>