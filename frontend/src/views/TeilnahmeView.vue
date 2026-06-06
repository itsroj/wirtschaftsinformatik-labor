<template>

  <main class="participation-page">

    <Navbar />

    <section class="page-content">

      <!-- BLOCK 1 -->
      <ParticipationBlock
        id="infos"
        title="Infos zur Teilnahme"
        :text="block1"
        :images="imagesBlock1"
      />

      <!-- BLOCK 2 -->
      <ParticipationBlock
        id="internationale-muns"
        title="Teilnahme an internationalen MUNs"
        :text="block2"
        :images="imagesBlock2"
        reverse
      />

      <!-- BLOCK 3 -->
      <ParticipationBlock
        id="mini-muns"
        title="Mini-MUNs für Schüler:innen"
        :text="block3"
        :images="imagesBlock3"
      />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ParticipationBlock from '@/components/participation/ParticipationBlock.vue'

// Import images
import mun1 from '@/assets/images/mun1.jpg'
import mun2 from '@/assets/images/mun2.jpg'
import mun3 from '@/assets/images/mun3.jpg'
import mun4 from '@/assets/images/mun4.jpg'
import mun5 from '@/assets/images/mun5.jpg'
import mun6 from '@/assets/images/mun6.jpg'
import mun7 from '@/assets/images/mun7.jpg'
import mun8 from '@/assets/images/mun8.jpg'
import mun9 from '@/assets/images/mun9.jpg'
import mun10 from '@/assets/images/mun10.jpg'
import mun11 from '@/assets/images/mun11.jpg'
import mun12 from '@/assets/images/mun12.jpg'

// Image arrays for blocks
const imagesBlock1 = [mun7, mun8, mun9]
const imagesBlock2 = [mun10, mun11, mun12, mun5, mun6]
const imagesBlock3 = [mun3, mun4]

/* BLOCK 1 */
const block1 = [
    "Die Teilnahme an einer Model United Nations (MUN) Konferenz steht grundsätzlich allen interessierten Studierenden/ Schüler:innen offen – unabhängig vom Studienfach oder bisherigen Erfahrungen im Bereich internationale Politik. Viele Konferenzen richten sich ausdrücklich auch an Einsteiger:innen und bieten vorbereitende Materialien oder Einführungssitzungen an, um den Einstieg zu erleichtern.",
    "Für die Teilnahme sind in der Regel keine speziellen Vorkenntnisse erforderlich. Hilfreich sind jedoch Interesse an politischen, gesellschaftlichen und internationalen Themen sowie die Bereitschaft, sich mit der Position eines zugewiesenen Landes auseinanderzusetzen. Da viele MUN-Konferenzen international ausgerichtet sind, finden Debatten häufig auf Englisch statt. Gute Englischkenntnisse sind daher von Vorteil, insbesondere für Diskussionen, Reden und Verhandlungen.",
    "Die Dauer von MUN-Konferenzen variiert je nach Veranstaltung. Viele Konferenzen dauern zwischen zwei und fünf Tagen und finden häufig an Wochenenden oder in semesterfreien Zeiten statt. Neben den offiziellen Sitzungen gehören oft auch Workshops, Social Events oder Networking-Angebote zum Programm.",
    "Für die Teilnahme fällt bei den meisten Veranstaltungen eine Teilnahmegebühr an. Diese deckt häufig organisatorische Kosten, Konferenzmaterialien, Verpflegung oder Rahmenveranstaltungen ab. Zusätzlich können Reise- und Übernachtungskosten entstehen. Einige Konferenzen bieten vergünstigte Unterkünfte, Kooperationen mit Hotels oder die Unterbringung in Jugendherbergen an. Hochschulgruppen und Fördervereine unterstützen Teilnehmende teilweise finanziell.",
    "Die Vorbereitung auf eine MUN-Konferenz umfasst üblicherweise die Recherche zum vertretenen Land sowie zum jeweiligen Diskussionsthema. Viele Universitäten und studentische MUN-Initiativen organisieren hierfür gemeinsame Vorbereitungstreffen oder Trainings."
]

/* BLOCK 2 */
const block2 = [
  "Die Teilnahme an internationalen Model-United-Nations-Konferenzen ist sowohl als Einzelperson als auch als Mitglied einer Gruppe möglich.",

  "Eine Übersicht über internationale Konferenzen bieten beispielsweise:",

  `
  <div class="link-card">
    <a href="https://www.mun-europe.com/" target="_blank" rel="noopener noreferrer">
      European Model United Nations Network
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://unausa.org/events/" target="_blank" rel="noopener noreferrer">
      United Nations Association of USA
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://de.wikipedia.org/wiki/Model_United_Nations" target="_blank" rel="noopener noreferrer">
      Wikipedia
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://wfuna.org/program/globalmodel/" target="_blank" rel="noopener noreferrer">
      Global Model United Nations
    </a>
  </div>
  `,

  "Außerdem kann man auch als Teil einer Delegation beispielsweise mit folgenden Gruppen an internationalen Konferenzen teilnehmen:",

  "überregionale Gruppen:",

  `
  <div class="link-card">
    <a href="https://www.sicherheitspolitik.de/hochschulgruppen" target="_blank" rel="noopener noreferrer">
      Bundesverband Sicherheitspolitik an Hochschulen (BSH)
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://www.be-boosted.org/" target="_blank" rel="noopener noreferrer">
      be.boosted / eMUN-fellows
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://www.dmun.de" target="_blank" rel="noopener noreferrer">
      Deutsche MUN e.V. (DMUN)
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://www.jgw-ev.de" target="_blank" rel="noopener noreferrer">
      Jugendbildung in Gesellschaft und Wissenschaft e.V.
    </a>
  </div>
  `,

  `
  <div class="link-card">
    <a href="https://www.sdw.org" target="_blank" rel="noopener noreferrer">
      Stiftung der Deutschen Wirtschaft (sdw)
    </a>
  </div>
  `
]

/* BLOCK 3 */
const block3 = [
  `Mini-MUNs bringen die Weltpolitik ins eigene Klassenzimmer. Statt regulärem Unterricht werden die SchülerInnen so selbst aktiv und für einen Tag zu jungen Nachwuchsdiplomaten. Mini-MUNs werden meist in Schulen angeboten für Klassen, Kurse oder einen ganzen Jahrgang und dauern von zwei Schulstunden bis zu einem ganzen Projekttag.`,

  `Die Deutsche Gesellschaft für die Vereinten Nationen e.V. (DGVN) hat in Kooperation mit dem Jungen UNO-Netzwerk (JUNON) das Projekt <a href="https://dgvn.de/aktivitaeten/un-im-klassenzimmer" target="_blank" rel="noopener noreferrer">"UN im Klassenzimmer"</a> gestartet. Durch zwei unterschiedliche Module wird das Thema Vereinte Nationen von Studentinnen und Studenten "ins Klassenzimmer gebracht".`,

  `Zuvor hatte die AG Model United Nations des <a href="https://junges-uno-netzwerk.de/" target="_blank" rel="noopener noreferrer">Jungen-UNO-Netzwerks Deutschland e.V.</a> 2008 eine umfangreiche <a href="/download/MiniMUNs.zip" target="_blank" rel="noopener noreferrer">Toolbox für Mini-UNO-Planspiele an Schulen</a> erstellt. Diese Toolbox enthält alle Materialien, die eine UNO-Gruppe braucht um ein Mini-UNO-Planspiel an einer Schule durchzuführen, insb. zwei Leitfäden und 16 Anhänge (Handbücher, Präsentationen, Zeitplan etc.).`
]
</script>

<style scoped>

.participation-page {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      #66bdf5 0%,
      #3c95d1 45%,
      #2677b5 100%
    );
}

.page-content {
  width: min(1200px, 92%);
  margin: 70px auto 120px;

  display: flex;
  flex-direction: column;
  gap: 60px;
}

#infos,
#internationale-muns,
#mini-muns {
  scroll-margin-top: 120px;
}

</style>