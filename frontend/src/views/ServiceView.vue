<template>
  <main class="service-page">
    <Navbar />

    <section class="page-content">
      <!-- BLOCK 1: Hintergrund & Kontakt -->
      <ContactBackgroundBlock
        :backgroundContent="backgroundContent"
        :questions="questions"
      />

      <!-- BLOCK 2: IMPRESSUM -->
      <ServiceBlock
        title="Impressum"
        :content="impressumContent"
        :contactInfo="impressumDetails"
      />

      <!-- BLOCK 3: DATENSCHUTZ -->
      <ServiceBlock
        title="Datenschutz"
        :content="datenschutzContent"
      />
    </section>

    <Footer />
  </main>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ServiceBlock from '@/components/service/ServiceBlock.vue'
import ContactBackgroundBlock from '@/components/service/ContactBackgroundBlock.vue'

/* BLOCK 1: HINTERGRUND & KONTAKT */
const backgroundContent = [
  'Diese Seite soll eine <strong>offene Plattform</strong> bieten, um MUN-interessierte Jugendliche in Deutschland besser über das Angebot an MUNs in Deutschland und deutschen MUN-Gruppen zu informieren.',
  'Die Seite ist ein Projekt des Vereins Deutsche MUN e.V., ist jedoch für alle <strong>Wünsche und Ideen</strong> anderer Vereine, Gruppen oder interessierter Jugendlicher offen!'
]

const questions = [
  'Haben Sie Fragen zu Model-United-Nations-Konferenzen oder -Delegationen?',
  'Fehlt Ihre MUN-Konferenz oder Ihre Delegation zu internationalen MUNs in den Listen?',
  'Möchten Sie Daten aktualisieren oder ergänzen?',
  'Haben Sie Vorschläge zur Verbesserung oder Erweiterung der Seiten?'
]

/* BLOCK 2: IMPRESSUM */
const impressumContent = [
  'Deutsche Model United Nations (DMUN) e.V. ist als <strong>gemeinnütziger Verein</strong> eingetragen im Vereinsregister des Amtsgerichts Stuttgart unter der Registernummer VR 6921. Die USt-IdNr lautet DE238582245.',
  '<strong>Vertretungsberechtigter Vorstand:</strong><br>Tade Strehk (Vors.), Jasper Dannenbaum, Emilia Hummel, Maximilian Ilzhöfer, Joshua Mayer, Frederik Schissler, Emily Siegel, Wiebke Wacker',
  '<strong>Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV:</strong><br>Klaas Ole Kürtz, Birkenweg 1, 24235 Laboe, k.o.kuertz@dmun.de',
  'Der Verein Deutsche Model United Nations (DMUN) e.V. ist, ebenso wie seine Projekte, Mitglied im <a href="http://www.junges-uno-netzwerk.de/" target="_blank" rel="noopener noreferrer">Jungen UNO-Netzwerk Deutschland</a>.'
]

const impressumDetails = {
  organization: {
    type: 'text',
    label: 'Deutsche Model United Nations (DMUN) e.V.'
  },
  address: {
    type: 'text',
    label: 'Birkenweg 1, 24235 Laboe'
  },
  email: {
    type: 'link',
    label: 'info@dmun.de',
    value: 'mailto:info@dmun.de'
  },
  website: {
    type: 'link',
    label: 'www.dmun.de',
    value: 'http://www.dmun.de/'
  }
}

/* BLOCK 3: DATENSCHUTZ */
const datenschutzContent = [
  'Für diese Website gilt die <a href="https://www.dmun.de/impressum/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von DMUN e.V.</a>.',
  'Die vollständige Datenschutzerklärung finden Sie auf der Website des Vereins unter www.dmun.de/impressum/.',
  'Diese Website (model-un.de) verwendet <strong>keine Cookies</strong>. Andere Websites, die vom Verein Deutsche Model United Nations (DMUN) e.V. betrieben werden, können Cookies einsetzen. Bitte beachten Sie hierfür die jeweiligen Datenschutzerklärungen der entsprechenden Websites.',
  'Bei Fragen zum Datenschutz kontaktieren Sie bitte den Verein Deutsche Model United Nations (DMUN) e.V. direkt per E-Mail unter info@dmun.de.'
]
</script>

<style scoped>
.service-page {
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #0f3b66 0%, #1a5a8c 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  margin: 0 0 16px 0;
  font-weight: 800;
}

.page-header p {
  font-size: 1.25rem;
  opacity: 0.95;
  margin: 0;
}

.page-content {
  width: min(1200px, 92%);
  margin: 70px auto 120px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 20px;
    margin-bottom: 40px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .page-content {
    width: 92%;
    margin-bottom: 60px;
  }
}
</style>
