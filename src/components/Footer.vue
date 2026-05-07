<template>
  <footer class="footer">

    <img
      src="@/assets/images/flags.jpg"
      class="flags"
      alt="Flags"
    >

    <div class="divider"></div>

    <div class="footer-content">

      <div class="footer-logo">

        <img src="@/assets/images/logo.png">

        <div class="socials">
          <span>📷</span>
          <span>📘</span>
          <span>▶️</span>
        </div>

      </div>

      <div class="footer-column">
        <h4>Konferenzen</h4>
        <p>Studierende</p>
        <p>Schüler:innen</p>
        <p>Internationale MUN's</p>
      </div>

      <div class="footer-column">
        <h4>Teilnahme</h4>
        <p>Studierende</p>
        <p>Schüler:innen</p>
        <p>Internationale MUN's</p>
      </div>

      <div class="footer-column">
        <h4>Service</h4>
        <p>Kontakt</p>
        <p>Impressum</p>
        <p>Datenschutz</p>
      </div>

    </div>

  </footer>
</template>

<style scoped>
.footer {
  margin-top: 40px;
  background: #cfe4ef;
}

.flags {
  width: 100%;
  height: 60%;
  object-fit: cover;

  display: block;
}

.footer-content {
  width: min(1200px, 92%);

  margin: auto;

  display: flex;
  justify-content: space-between;
  gap: 40px;

  padding: 60px 0;

  flex-wrap: wrap;
}

.footer-logo img {
  width: 170px;
}

.socials {
  display: flex;
  gap: 18px;

  margin-top: 22px;

  font-size: 28px;
}

.footer-column h4 {
  margin-bottom: 18px;
  font-size: 28px;
}

.footer-column p {
  margin-bottom: 12px;
  color: #444;
}

.divider {
  width: 100%;
  height: 3px;

  background:
    rgba(0, 0, 0, 0.7);
}

@media (max-width: 800px) {

  .footer-content {
    flex-direction: column;
  }

  .flags {
    height: 220px;
  }
}
</style>