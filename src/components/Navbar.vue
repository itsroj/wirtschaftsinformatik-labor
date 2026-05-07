<template>
  <header class="navbar-wrapper">
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="DMUN Logo">
      </div>

      <ul class="nav-links">
        <li>Startseite</li>
        <li>Was ist MUN?</li>
        <li>Konferenzen</li>
        <li>Teilnahme</li>
      </ul>

      <button class="language-button">
        🇩🇪
      </button>
    </nav>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

.navbar {
  width: min(1200px, 92%);
  height: 88px;

  background: rgba(255, 255, 255, 0.94);

  border-radius: 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 35px;

  backdrop-filter: blur(10px);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);
}

.logo img {
  height: 54px;
}

.nav-links {
  display: flex;
  gap: 55px;
  list-style: none;

  color: #6f6f6f;
  font-weight: 500;
}

.nav-links li {
  cursor: pointer;
  transition: 0.2s ease;
}

.nav-links li:hover {
  color: #1b1b1b;
}

.language-button {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: white;
  font-size: 22px;
  cursor: pointer;
}

@media (max-width: 900px) {

  .nav-links {
    display: none;
  }

  .navbar {
    height: 78px;
  }

  .logo img {
    height: 46px;
  }
}
</style>