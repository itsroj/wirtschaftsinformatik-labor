<template>

  <header class="navbar-wrapper">

    <nav class="navbar">

      <!-- Logo -->
      <div class="logo">
        <img
          src="@/assets/images/logo.png"
          alt="DMUN Logo"
        >
      </div>

      <!-- Desktop Navigation -->
      <ul class="nav-links">


        <li>
          <RouterLink to="/">Startseite</RouterLink>
        </li>

        <li>
          <RouterLink to="/was-ist-mun">Was ist MUN?</RouterLink>
        </li>

        <li>
          <RouterLink to="/konferenzen">Konferenzen</RouterLink>
        </li>

        <li>
          <RouterLink to="/teilnahme">Teilnahme</RouterLink>
        </li>


      </ul>

      <!-- Rechte Seite -->
      <div class="nav-actions">

        <!-- Sprache -->
        <button class="language-button">
          🇩🇪
        </button>

        <!-- Mobile Menü -->
        <button
          class="menu-button"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Navigation öffnen"
        >

          <span
            class="line"
            :class="{ active: isMenuOpen }"
          ></span>

          <span
            class="line"
            :class="{ active: isMenuOpen }"
          ></span>

          <span
            class="line"
            :class="{ active: isMenuOpen }"
          ></span>

        </button>

      </div>

    </nav>

    <!-- Mobile Dropdown -->
    <transition name="dropdown">

      <div
        v-if="isMenuOpen"
        class="mobile-menu"
      >

        <a href="#" @click="closeMenu">
          Startseite
        </a>

        <a href="#" @click="closeMenu">
          Was ist MUN?
        </a>

        <a href="#" @click="closeMenu">
          Konferenzen
        </a>

        <a href="#" @click="closeMenu">
          Teilnahme
        </a>

      </div>

    </transition>

  </header>

</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>

.navbar-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 30px;

  position: relative;

  z-index: 9999;
}

/* NAVBAR */
.navbar {
  width: min(1200px, 92%);
  height: 88px;

  background:
    rgba(255, 255, 255, 0.94);

  border-radius: 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 35px;

  backdrop-filter: blur(4px);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.08);

  isolation: isolate;

  transform: translateZ(0);

  backface-visibility: hidden;
}

/* LOGO */
.logo img {
  height: 54px;

  display: block;
}

/* DESKTOP LINKS */
.nav-links {
  display: flex;

  gap: 55px;

  list-style: none;

  color: #6f6f6f;

  font-weight: 500;
}

.nav-links a {
  color: grey;
  text-decoration: none;
}

.nav-links a.router-link-active,
.nav-links a.router-link-exact-active {
  color: black;
}

.nav-links li {
  cursor: pointer;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-links li:hover a {
  color: #1b1b1b;

  transform: translateY(-1px);
}

/* RECHTE SEITE */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* SPRACHBUTTON */
.language-button {
  width: 46px;
  height: 46px;

  border-radius: 12px;

  border: none;

  background: white;

  font-size: 22px;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.language-button:hover {
  transform: translateY(-1px);

  box-shadow:
    0 6px 18px rgba(0,0,0,0.08);
}

/* MOBILE BUTTON */
.menu-button {
  display: none;

  width: 46px;
  height: 46px;

  border: none;

  background: white;

  border-radius: 12px;

  cursor: pointer;

  position: relative;

  padding: 0;

  transition:
    transform 0.2s ease;
}

.menu-button:hover {
  transform: scale(1.03);
}

/* HAMBURGER LINES */
.line {
  position: absolute;

  left: 10px;

  width: 26px;
  height: 2px;

  background: #1b1b1b;

  border-radius: 999px;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    top 0.25s ease;
}

.line:nth-child(1) {
  top: 14px;
}

.line:nth-child(2) {
  top: 22px;
}

.line:nth-child(3) {
  top: 30px;
}

/* X ANIMATION */
.line.active:nth-child(1) {
  top: 22px;

  transform:
    rotate(45deg);
}

.line.active:nth-child(2) {
  opacity: 0;
}

.line.active:nth-child(3) {
  top: 22px;

  transform:
    rotate(-45deg);
}

/* MOBILE MENU */
.mobile-menu {
  width: min(1200px, 92%);

  margin-top: 14px;

  background:
    rgba(255,255,255,0.96);

  backdrop-filter: blur(12px);

  border-radius: 22px;

  padding:
    12px 24px;

  box-shadow:
    0 12px 30px rgba(0,0,0,0.08);

  display: flex;
  flex-direction: column;

  overflow: hidden;
}

.mobile-menu a {
  text-decoration: none;

  color: #2b2b2b;

  font-weight: 500;

  padding: 18px 0;

  border-bottom:
    1px solid rgba(0,0,0,0.06);

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.mobile-menu a:last-child {
  border-bottom: none;
}

.mobile-menu a:hover {
  color: #0f3b66;

  transform: translateX(4px);
}

/* DROPDOWN ANIMATION */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;

  transform: translateY(-12px);
}

/* RESPONSIVE */
@media (max-width: 900px) {

  .nav-links {
    display: none;
  }

  .menu-button {
    display: block;
  }

  .navbar {
    height: 78px;

    padding: 0 22px;
  }

  .logo img {
    height: 46px;
  }
}

</style>