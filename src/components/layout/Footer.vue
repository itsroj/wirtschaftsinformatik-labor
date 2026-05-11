<template>
  <footer class="footer-top">

    <img
      src="@/assets/images/flags.png"
      class="flags"
      alt="Flags"
    >

    <div class="divider"></div>

    <div class="footer-bottom">

    <div class="footer-content">

      <div class="footer-logo">

        <img src="@/assets/images/logo.png">

       <div class="socials">
        <!-- Facebook -->
        <a href="https://facebook.com" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" class="icon">
            <path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.1V12h2.1v-2c0-2.1 1.2-3.3 3.2-3.3.96 0 1.96.17 1.96.17v2.1h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.38 2.9h-2.02v7A10 10 0 0 0 22 12z"/>
          </svg>
        </a>

        <!-- Instagram -->
        <a href="https://instagram.com" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" class="icon">
            <path fill="currentColor" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zM17.5 6.8a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
          </svg>
        </a>

        <!-- X (Twitter) -->
        <a href="https://x.com" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" class="icon">
            <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23 22h-6.8l-5.3-6.6L5 22H2l7.3-8.4L1 2h6.9l4.8 6.1L18.9 2zm-1.2 18h1.9L7.1 4H5.1l12.6 16z"/>
          </svg>
        </a>

      </div>

      </div>

      <div class="footer-column">
        <h4>Konferenzen</h4>
        <a href="">Studierende</a>
        <a href="">Schüler:innen</a>
        <a href="">Mini MUNs</a>
      </div>

      <div class="footer-column">
        <h4>Teilnahme</h4>
        <a href="">Infos zur Teilnahme</a>
        <a href="">Internationale MUNs</a>
        <a href="">Mini MUNs</a>
      </div>

      <div class="footer-column">
        <h4>Service</h4>
        <a href="">Kontakt</a>
        <a href="">Impressum</a>
        <a href="">Datenschutz</a>
      </div>
    </div>
    </div>

  </footer>
</template>

<style scoped>
.footer-top {
  margin-top: 0px;
  background: transparent;
}

.footer-bottom {
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

.footer-logo {
  display: flex;
  flex-direction: column;

  align-items: center;
  text-align: center;
}

.socials {
  display: flex;
  gap: 20px;

  margin-top: 20px; /* Abstand unter Logo */
  align-items: center;
}

.socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #1f2a37;

  width: auto;
  height: auto;

  background: transparent; /* 👈 wichtig */
  border-radius: 0;        /* kein Kreis mehr */

  transition: transform 0.2s ease, opacity 0.2s ease;
  text-decoration: none;
}

.socials a:hover {
  transform: translateY(-2px);
  opacity: 0.7;
}

.icon {
  width: 24px;
  height: 24px;
}

.footer-column h4 {
  margin-bottom: 18px;
  font-size: 28px;
}

.footer-column a {
  display: block;

  margin-bottom: 12px;

  color: #444;
  text-decoration: none;

  position: relative;

  transition: color 0.2s ease;
}

.footer-column a::after {
  content: "";
  position: absolute;

  left: 0;
  bottom: -2px;

  width: 0%;
  height: 1px;

  background: #0f3b66;

  transition: width 0.3s ease;
}

.footer-column a:hover::after {
  width: 100%;
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
    align-items: center;
    text-align: center;
  }

  .footer-column {
    align-items: center;
  }

  .footer-logo {
    align-items: center;
  }

}
</style>