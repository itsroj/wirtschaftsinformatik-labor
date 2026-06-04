<template>
  <section class="contact-bg-block">
    <div class="block-container">
      <!-- LEFT SIDE: HINTERGRUND -->
      <div class="left-section">
        <div class="left-content">
          <h2>Hintergrund</h2>
          
          <div class="text-content">
            <p v-for="(para, i) in backgroundContent" :key="i" v-html="para"></p>
          </div>

          <!-- QUESTIONS LIST -->
          <ul class="questions-list">
            <li v-for="(question, i) in questions" :key="i">
              {{ question }}
            </li>
          </ul>

          <!-- CTA LINK -->
          <div class="cta-section">
            <a href="mailto:k.o.kuertz@dmun.de" class="cta-link">
              <strong>Nehmen Sie gerne Kontakt mit uns auf!</strong>
            </a>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: KONTAKT -->
      <div class="right-section">
        <h2>Ansprechpartner</h2>
        
        <!-- CONTACT IMAGE -->
        <div class="contact-image">
          <img 
            src="@/assets/images/kontakt-person.jpg" 
            alt="Ansprechpartner"
          >
        </div>

        <!-- CONTACT INFO -->
        <div class="contact-details">
          <div class="contact-item">
            <h3>Klaas Ole Kürtz</h3>
          </div>
          <div class="contact-item">
            <a href="mailto:k.o.kuertz@dmun.de" class="contact-link">
              k.o.kuertz@dmun.de
            </a>
          </div>
          <div class="contact-item">
            <a href="tel:+49434349294" class="contact-link">
              +49 (4343) 49 29 433
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  backgroundContent: {
    type: Array,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.contact-bg-block {
  margin-bottom: 40px;
}

.block-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
  gap: 30px;
  align-items: start;
}

/* LEFT SECTION - HINTERGRUND BLOCK */
.left-section {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 28px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.left-content {
  padding: 60px;
}

/* LEFT SECTION */
.left-section h2 {
  font-size: 2rem;
  margin: 0 0 30px 0;
  color: #121212;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: #2d2d2d;
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 30px;
}

.text-content p {
  margin: 0;
}

.questions-list {
  list-style: disc;
  list-style-position: outside;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #2d2d2d;
  line-height: 1.8;
  font-size: 1rem;
  margin: 30px 0;
}

.questions-list li {
  margin-left: 0;
}

/* CTA LINK */
.cta-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid rgba(0, 0, 0, 0.08);
}

.cta-link {
  display: inline-block;
  color: #0f3b66;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 16px 24px;
  background: transparent;
}

.cta-link:hover {
  background: #0f3b66;
  color: white;
}

.cta-link strong {
  font-weight: 700;
}

/* RIGHT SECTION - KONTAKT BLOCK */
.right-section {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
}

.right-section h2 {
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  color: #121212;
}

.contact-image {
  width: 100%;
  max-width: 220px;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #f5f5f5;
  margin: 0 auto;
}

.contact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-details {
  padding: 16px;
  background: linear-gradient(135deg, rgba(15, 59, 102, 0.05) 0%, rgba(15, 59, 102, 0.02) 100%);
  border-radius: 10px;
  border-left: 4px solid #0f3b66;
}

.contact-item {
  margin-bottom: 12px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-item h3 {
  font-size: 1rem;
  margin: 0;
  color: #121212;
  font-weight: 700;
}

.contact-link {
  display: block;
  color: #0f3b66;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;
  word-break: break-word;
}

.contact-link:hover {
  opacity: 0.7;
  text-decoration: underline;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .block-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .left-section,
  .right-section {
    box-shadow: none;
  }

  .left-content {
    padding: 40px 24px;
  }

  .left-section h2,
  .right-section h2 {
    font-size: 1.5rem;
  }

  .text-content {
    gap: 14px;
    font-size: 0.95rem;
  }

  .questions-list {
    gap: 10px;
    font-size: 0.95rem;
  }

  .cta-link {
    font-size: 1rem;
    padding: 12px 20px;
  }

  .contact-image {
    max-width: 180px;
    margin: 0 auto;
  }
}
</style>
