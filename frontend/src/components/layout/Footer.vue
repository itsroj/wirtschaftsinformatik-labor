<template>
  <footer class="footer-top">

    <img src="@/assets/images/flags.png" class="flags" alt="Flags">

    <div class="divider"></div>

    <div class="footer-bottom">

      <div class="footer-content">

        <div class="footer-logo">

          <img src="@/assets/images/logo.png">

          <SocialIcons facebook="https://www.facebook.com/deutschemodelunitednations/?locale=de_DE"
            instagram="https://www.instagram.com/munsh_dmun/" x="https://x.com/DMUN_eV" />

        </div>

        <div class="footer-column">
          <h4>{{ languageStore.t('footer.conferences') }}</h4>
          <RouterLink :to="{
            name: 'konferenzen',
            query: { type: 'student' }
          }">
            {{ languageStore.t('footer.students') }}
          </RouterLink>

          <RouterLink :to="{
            name: 'konferenzen',
            query: { type: 'pupil' }
          }">
            {{ languageStore.t('footer.pupils') }}
          </RouterLink>

          <RouterLink :to="{
            name: 'konferenzen',
            query: { type: 'mini-mun' }
          }">
            {{ languageStore.t('footer.miniMuns') }}
          </RouterLink>
        </div>

        <div class="footer-column">
          <h4>{{ languageStore.t('footer.participate') }}</h4>

          <RouterLink :to="{
            name: 'teilnahme',
            hash: '#infos'
          }">
            Infos zur Teilnahme
          </RouterLink>

          <RouterLink :to="{
            name: 'teilnahme',
            hash: '#internationale-muns'
          }">
            Internationale MUNs
          </RouterLink>

          <RouterLink :to="{
            name: 'teilnahme',
            hash: '#mini-muns'
          }">
            Mini MUNs
          </RouterLink>
        </div>

        <div class="footer-column">
          <h4>Service</h4>

          <RouterLink :to="{
            name: 'service',
            hash: '#kontakt'
          }">
            Kontakt
          </RouterLink>

          <RouterLink :to="{
            name: 'service',
            hash: '#impressum'
          }">
            Impressum
          </RouterLink>

          <RouterLink :to="{
            name: 'service',
            hash: '#datenschutz'
          }">
            Datenschutz
          </RouterLink>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import SocialIcons from '@/components/icons/SocialIcons.vue'
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
</script>

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

  margin-top: 20px;
  /* Abstand unter Logo */
  align-items: center;
}

.socials a {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #1f2a37;

  width: auto;
  height: auto;

  background: transparent;
  /* 👈 wichtig */
  border-radius: 0;
  /* kein Kreis mehr */

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