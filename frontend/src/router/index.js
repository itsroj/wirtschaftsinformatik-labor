import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import WasIstMunView from '@/views/WasIstMunView.vue'
import KonferenzenView from '@/views/KonferenzenView.vue'
import TeilnahmeView from '@/views/TeilnahmeView.vue'
import ServiceView from '@/views/ServiceView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'DMUN | Startseite',
      description: 'Model United Nations in Deutschland – Konferenzen und Teilnahmeinformationen.'
    }
  },

  {
    path: '/was-ist-mun',
    name: 'was-ist-mun',
    component: WasIstMunView,
    meta: {
      title: 'DMUN | Was ist MUN?',
      description: 'Erklärung von Model United Nations und wie das Planspiel funktioniert.'
    }
  },

  {
    path: '/konferenzen',
    name: 'konferenzen',
    component: KonferenzenView,
    meta: {
      title: 'DMUN | Konferenzen',
      description: 'Übersicht aller Model United Nations Konferenzen in Deutschland und international.'
    }
  },

  {
    path: '/teilnahme',
    name: 'teilnahme',
    component: TeilnahmeView,
    meta: {
      title: 'DMUN | Teilnahme',
      description: 'Informationen zur Teilnahme an Model United Nations Konferenzen.'
    }
  },

  {
    path: '/service',
    name: 'service',
    component: ServiceView,
    meta: {
      title: 'DMUN | Service',
      description: 'Kontakt, Impressum und Datenschutz von DMUN.'
    }
  },

  {
    // Alle anderen Pfade → 404-Seite
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'DMUN | Seite nicht gefunden'
    }
  }
]

// scrollBehavior auf false: eigene Scroll-Logik in main.js übernimmt das Scrollen
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return false
  }
})

// Nach jeder Navigation: Seitentitel und Meta-Description aus den Route-Metadaten setzen.
// Falls kein description-Tag existiert, wird er dynamisch erstellt.
router.afterEach((to) => {
  document.title = to.meta.title || 'DMUN'

  const description = to.meta.description

  if (description) {
    let tag = document.querySelector('meta[name="description"]')

    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }

    tag.setAttribute('content', description)
  }
})

export default router