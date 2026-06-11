<template>

  <header class="navbar-wrapper">

    <nav class="navbar">

      <!-- Logo -->
      <div class="logo">
        <img :src="logoSrc" alt="DMUN Logo">
      </div>

      <!-- Desktop Navigation -->
      <ul class="nav-links">


        <li>
          <RouterLink to="/">{{ languageStore.t('navbar.home') }}</RouterLink>
        </li>

        <li>
          <RouterLink to="/was-ist-mun">{{ languageStore.t('navbar.wasIstMun') }}</RouterLink>
        </li>

        <li>
          <RouterLink to="/konferenzen">{{ languageStore.t('navbar.konferenzen') }}</RouterLink>
        </li>

        <li>
          <RouterLink to="/teilnahme">{{ languageStore.t('navbar.teilnahme') }}</RouterLink>
        </li>


      </ul>

      <!-- Rechte Seite -->
      <div class="nav-actions">

        <!-- Sprache -->
        <button class="language-button" @click="languageStore.toggleLanguage()"
          :title="languageStore.currentLanguage === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'">
          {{ languageStore.currentLanguage === 'de' ? '🇩🇪' : '🇬🇧' }}
        </button>

        <!-- Dark Mode -->
        <button class="theme-button" @click="themeStore.toggleDark()"
          :title="themeStore.isDark ? 'Light Mode' : 'Dark Mode'">
          <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
            <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
            <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
            <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Mobile Menü -->
        <button class="menu-button" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Navigation öffnen">

          <span class="line" :class="{ active: isMenuOpen }"></span>

          <span class="line" :class="{ active: isMenuOpen }"></span>

          <span class="line" :class="{ active: isMenuOpen }"></span>

        </button>

      </div>

    </nav>

    <!-- Mobile Dropdown -->
    <transition name="dropdown">

      <div v-if="isMenuOpen" class="mobile-menu">

        <RouterLink to="/" @click="closeMenu">
          {{ languageStore.t('navbar.home') }}
        </RouterLink>

        <RouterLink to="/was-ist-mun" @click="closeMenu">
          {{ languageStore.t('navbar.wasIstMun') }}
        </RouterLink>

        <RouterLink to="/konferenzen" @click="closeMenu">
          {{ languageStore.t('navbar.konferenzen') }}
        </RouterLink>

        <RouterLink to="/teilnahme" @click="closeMenu">
          {{ languageStore.t('navbar.teilnahme') }}
        </RouterLink>

        <RouterLink to="/service" @click="closeMenu">
          Service
        </RouterLink>

      </div>

    </transition>

  </header>

</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useThemeStore } from '@/stores/useThemeStore'
import logoLight from '@/assets/images/logo.png'
import logoDark from '@/assets/images/logo_weiss.png'

const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const isMenuOpen = ref(false)

const logoSrc = computed(() => themeStore.isDark ? logoDark : logoLight)

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
    0 10px 30px rgba(0, 0, 0, 0.08);

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
    0 6px 18px rgba(0, 0, 0, 0.08);
}

/* DARK MODE BUTTON */
.theme-button {
  width: 46px;
  height: 46px;

  border-radius: 12px;
  border: none;
  background: white;
  color: #1b1b1b;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.theme-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.theme-button svg {
  width: 20px;
  height: 20px;
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
    rgba(255, 255, 255, 0.96);

  backdrop-filter: blur(12px);

  border-radius: 22px;

  padding:
    12px 24px;

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.08);

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
    1px solid rgba(0, 0, 0, 0.06);

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