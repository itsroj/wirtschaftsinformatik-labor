<template>
  <div class="socials">

    <a v-if="facebook" :href="facebook" target="_blank" rel="noopener">
      <FacebookIcon class="icon" />
    </a>

    <a v-if="instagram" :href="instagram" target="_blank" rel="noopener">
      <InstagramIcon class="icon" />
    </a>

    <a v-if="x" :href="x" target="_blank" rel="noopener">
      <XIcon class="icon" />
    </a>

  </div>
</template>

<script setup>
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'

defineProps({
  facebook: String,
  instagram: String,
  x: String
})
</script>

<style scoped>
.socials {
  display: flex;
  gap: 10px;
}

.icon {
  width: 26px;
  height: 26px;
  color: #0f3b66;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

a:hover .icon {
  transform: translateY(-2px);
  opacity: 0.7;
}
</style>