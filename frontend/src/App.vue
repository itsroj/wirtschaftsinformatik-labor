<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'

// Store initialisieren – wendet die dark/light-Klasse auf <html> an
useThemeStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Moderne System-Schriftarten */
body {
  margin: 0;
  padding: 0;

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;

  background:
    radial-gradient(circle at top left,
      #6fc2ff 0%,
      #4fa9e3 35%,
      #3188c8 100%);

  overflow-x: hidden;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
}

/* ============================================================
   DARK MODE OVERRIDES
   Globale Selektoren überschreiben scoped Styles (höhere Spezifität)
   ============================================================ */

html.dark {
  color-scheme: dark;
}

/* Body / Seitenhintergrund */
html.dark body {
  background: radial-gradient(circle at top left, #0f2540 0%, #091929 35%, #060d18 100%);
}

/* Seiten-spezifische Gradients */
html.dark .conferences-page,
html.dark .participation-page,
html.dark .mun-page {
  background: radial-gradient(circle at top, #0f2540 0%, #091929 45%, #060d18 100%);
}

/* ── Navbar ── */
html.dark .navbar {
  background: rgba(9, 20, 42, 0.97);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

html.dark .nav-links a {
  color: #8bafc9;
}

html.dark .nav-links a.router-link-active,
html.dark .nav-links a.router-link-exact-active {
  color: #dde9f5;
}

html.dark .nav-links li:hover a {
  color: #dde9f5;
}

html.dark .language-button,
html.dark .theme-button {
  background: rgba(255, 255, 255, 0.08);
  color: #dde9f5;
}

html.dark .menu-button {
  background: rgba(255, 255, 255, 0.08);
}

html.dark .line {
  background: #c5d8ee;
}

html.dark .mobile-menu {
  background: rgba(9, 20, 42, 0.98);
}

html.dark .mobile-menu a {
  color: #c5d8ee;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

html.dark .mobile-menu a:hover {
  color: #dde9f5;
}

/* ── Footer ── */
html.dark .footer-bottom {
  background: #060d18;
}

html.dark .footer-column h4 {
  color: #dde9f5;
}

html.dark .footer-column a {
  color: #7a9fc0;
}

html.dark .socials a {
  color: #7a9fc0;
}

/* ── ConferenceList ── */
html.dark .conference-list {
  background: linear-gradient(to bottom, rgba(17, 38, 72, 0.97), rgba(13, 28, 55, 0.94));
}

html.dark .conference-list h2 {
  color: #dde9f5;
}

html.dark .no-results p {
  color: #8bafc9;
}

/* ── ConferenceCard & InfoCard (.card) ── */
html.dark .card {
  background: rgba(18, 40, 76, 0.97);
  color: #dde9f5;
}

html.dark .card h3 {
  color: #dde9f5;
}

html.dark .card .long-title,
html.dark .card .meta-item,
html.dark .card .description,
html.dark .card .first-conference,
html.dark .card .expand-hint {
  color: #8bafc9;
}

html.dark .card .expand-hint .chevron {
  color: #6a94b8;
}

html.dark .card .tag {
  background: rgba(255, 255, 255, 0.07);
  color: #b8d2e8;
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .card .website-btn {
  background: rgba(255, 255, 255, 0.07);
  color: #c5d8ee;
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .card .close-btn {
  color: #8bafc9;
}

html.dark .card p {
  color: #8bafc9;
}

/* ── ConferenceFilters ── */
html.dark .filters {
  background: linear-gradient(to bottom, rgba(17, 38, 72, 0.97), rgba(13, 28, 55, 0.94));
}

html.dark .filters h2,
html.dark .filters h3 {
  color: #dde9f5;
}

html.dark .filters .sort-row span {
  color: #8bafc9;
}

html.dark .filters input[type="text"] {
  background: rgba(255, 255, 255, 0.06);
  color: #dde9f5;
  border-color: rgba(255, 255, 255, 0.12);
}

html.dark .filters input[type="text"]::placeholder {
  color: #5a7a96;
}

html.dark .filter-group button,
html.dark .view-toggle button,
html.dark .sort-buttons button {
  background: rgba(255, 255, 255, 0.06);
  color: #8bafc9;
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .filter-group button.active,
html.dark .view-toggle button.active,
html.dark .sort-buttons button.active {
  background: #1a5494;
  color: white;
  border-color: #1a5494;
}

/* ── ParticipationBlock ── */
html.dark .block {
  background: rgba(18, 40, 76, 0.97);
}

html.dark .block h2 {
  color: #dde9f5;
}

html.dark .block .text,
html.dark .block .text-item {
  color: #8bafc9;
}

html.dark .block .text :deep(a),
html.dark .block .text a {
  color: #7bbde8;
  border-bottom-color: rgba(123, 189, 232, 0.4);
}

/* ── MunIntroCard ── */
html.dark .intro-card {
  background: linear-gradient(to bottom, rgba(17, 38, 72, 0.97), rgba(13, 28, 55, 0.94));
}

html.dark .intro-card h1,
html.dark .intro-card h2,
html.dark .intro-card h3 {
  color: #dde9f5;
}

html.dark .intro-card p {
  color: #8bafc9;
}

/* ── MunInfoLinks (.info-card) ── */
html.dark .info-card {
  background: rgba(18, 40, 76, 0.82);
}

html.dark .info-card h2 {
  color: #dde9f5;
}

html.dark .info-card li,
html.dark .info-card ul {
  color: #8bafc9;
}

html.dark .info-card a {
  color: #7bbde8;
}

/* ── ServiceBlock ── */
html.dark .service-block {
  background: rgba(18, 40, 76, 0.97);
}

html.dark .service-block h2,
html.dark .service-block strong {
  color: #dde9f5;
}

html.dark .service-block p,
html.dark .service-block .text,
html.dark .service-block .contact-item {
  color: #8bafc9;
}

html.dark .service-block a {
  color: #7bbde8;
}

/* ── ContactBackgroundBlock ── */
html.dark .left-section,
html.dark .right-section {
  background: rgba(18, 40, 76, 0.97);
}

html.dark .left-section h2,
html.dark .right-section h2,
html.dark .contact-bg-block h3 {
  color: #dde9f5;
}

html.dark .text-content,
html.dark .text-content p,
html.dark .questions-list,
html.dark .questions-list li {
  color: #8bafc9;
}

html.dark .cta-link {
  color: #7bbde8;
}

html.dark .cta-link:hover {
  background: #1a5494;
  color: white;
}

html.dark .cta-section {
  border-top-color: rgba(255, 255, 255, 0.08);
}

html.dark .contact-link {
  color: #7bbde8;
}

html.dark .contact-details h3 {
  color: #dde9f5;
}

/* ── HeroSection Suchfeld ── */
html.dark .search-box {
  background: rgba(255, 255, 255, 0.08);
}

html.dark .search-box input {
  background: transparent;
  color: #dde9f5;
}

html.dark .search-box input::placeholder {
  color: #5a7a96;
}

html.dark .search-box button {
  background: #1a5494;
}

html.dark .search-box button:hover {
  background: #2677b5;
}

html.dark .search-icon {
  color: #c5d8ee;
}

/* ── Map Sidebar (EventSidebar) ── */
html.dark .sidebar {
  background: linear-gradient(135deg, rgba(14, 32, 64, 0.99), rgba(10, 24, 50, 0.96)) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

html.dark .sidebar h3 {
  color: #dde9f5;
}

html.dark .sidebar .badge {
  color: #7bbde8;
  background: rgba(123, 189, 232, 0.12);
  border-color: rgba(123, 189, 232, 0.2);
}

html.dark .sidebar .info div {
  color: #8bafc9;
}

html.dark .sidebar button {
  background: #1a5494;
  color: white;
  border-color: #1a5494;
}

html.dark .sidebar .placeholder {
  color: #5a7a96;
}

/* ── EventMobileSheet ── */
html.dark .popup {
  background: #0d1e3a;
}

html.dark .popup h3 {
  color: #dde9f5;
}

html.dark .popup .long-title,
html.dark .popup .meta {
  color: #8bafc9;
}

html.dark .popup .badge {
  background: rgba(123, 189, 232, 0.12);
  color: #7bbde8;
  border-color: rgba(123, 189, 232, 0.2);
}

html.dark .goto-btn {
  background: #1a5494;
  color: white;
}

/* ── FullCalendar ── */
html.dark .fc {
  color: #dde9f5;
}

html.dark .fc-toolbar-title {
  color: #dde9f5;
}

html.dark .fc-theme-standard .fc-scrollgrid,
html.dark .fc-theme-standard td,
html.dark .fc-theme-standard th {
  border-color: rgba(255, 255, 255, 0.08);
}

html.dark .fc-daygrid-day-number,
html.dark .fc-col-header-cell-cushion {
  color: #8bafc9;
}

html.dark .fc-button-primary {
  background-color: rgba(255, 255, 255, 0.07) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  color: #c5d8ee !important;
}

html.dark .fc-button-primary:not(:disabled).fc-button-active,
html.dark .fc-button-primary:not(:disabled):active {
  background-color: #1a5494 !important;
  border-color: #1a5494 !important;
}

html.dark .fc-daygrid-day.fc-day-today {
  background: rgba(255, 255, 255, 0.04) !important;
}

html.dark .fc-day-other .fc-daygrid-day-number {
  color: #3d5a72;
}

html.dark .calendar-section .legend-item {
  color: #8bafc9;
}
</style>
