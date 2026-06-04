<template>
  <section class="service-block">
    <div class="block-content">
      <h2>{{ title }}</h2>
      <div class="text">
        <template v-if="Array.isArray(content)">
          <p v-for="(paragraph, i) in content" :key="i" v-html="paragraph"></p>
        </template>
        <template v-else>
          <p v-html="content"></p>
        </template>
      </div>

      <div v-if="contactInfo" class="contact-info">
        <div class="contact-item" v-for="(item, key) in contactInfo" :key="key">
          <strong>{{ formatLabel(key) }}:</strong>
          <component 
            :is="item.type === 'link' ? 'a' : 'span'"
            :href="item.type === 'link' ? item.value : undefined"
            :class="{ 'contact-link': item.type === 'link' }"
          >
            {{ item.label }}
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: [String, Array],
    required: true
  },
  contactInfo: {
    type: Object,
    default: null
  }
})

const formatLabel = (key) => {
  const labels = {
    organization: 'Organisation',
    address: 'Adresse',
    email: 'E-Mail',
    website: 'Website',
    phone: 'Telefon',
    contact_email: 'Kontakt-E-Mail'
  }
  return labels[key] || key
}
</script>

<style scoped>
.service-block {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 28px;
  padding: 60px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.block-content {
  width: 100%;
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #121212;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #2d2d2d;
  line-height: 1.8;
  font-size: 1rem;
}

.text p {
  margin: 0;
}

.contact-info {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.contact-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  line-height: 1.6;
}

.contact-item strong {
  min-width: 140px;
  color: #0f3b66;
  font-weight: 600;
}

.contact-link {
  color: #0f3b66;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.2s ease;
}

.contact-link:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .service-block {
    padding: 40px 24px;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .text {
    gap: 16px;
    font-size: 0.95rem;
  }

  .contact-item {
    flex-direction: column;
    gap: 4px;
  }

  .contact-item strong {
    min-width: auto;
  }
}
</style>
<style>
.service-block .text a {
  color: #0f3b66;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: opacity 0.2s ease;
}

.service-block .text a:hover {
  opacity: 0.7;
}
</style>