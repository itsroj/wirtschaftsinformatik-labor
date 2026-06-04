<template>

  <main class="participation-page">

    <Navbar />

    <section class="page-content">

      <!-- BLOCK 1 -->
      <ParticipationBlock
        title="Infos zur Teilnahme"
        :text="block1"
        :images="[
            '/src/assets/images/mun10.jpg',
            '/src/assets/images/mun11.jpg',
            '/src/assets/images/mun12.jpg'
        ]"
      />

      <!-- BLOCK 2 -->
      <ParticipationBlock
        title="Teilnahme an internationalen MUNs"
        :text="block2"
        :images="[
            '/src/assets/images/mun7.jpg',
            '/src/assets/images/mun8.jpg',
            '/src/assets/images/mun9.jpg'
        ]"
        reverse
      />

      <!-- BLOCK 3 -->
      <ParticipationBlock
        title="Mini-MUNs für Schüler:innen"
        :text="block3"
        :images="[
            '/src/assets/images/mun6.jpg',
            '/src/assets/images/mun5.jpg'
        ]"
      />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ParticipationBlock from '@/components/participation/ParticipationBlock.vue'

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
"Eine Übersicht über internationale Konferenzen bieten beispielsweise",
"• European Model United Nations Network,",
"• United Nations Association of USA,",
"• Wikipedia,",
"• Global Model United Nations.",

"Außerdem kann man auch als Teil einer Delegation beispielsweise mit folgenden Gruppen an internationalen Konferenzen teilnehmen:",
"überregionale Gruppen",
"• Bundesverband Sicherheitspolitik an Hochschulen (BSH)",
"• be.boosted / eMUN-fellows",
"• Deutsche MUN e.V. (DMUN)",
"• Jugendbildung in Gesellschaft und Wissenschaft e.V. (JGW e.V.)",
"• Model United Nations Initiative Cusaner und Haus Villigst",
"• Stiftung der Deutschen Wirtschaft (sdw)"

]

/* BLOCK 3 */
const block3 = [
  "Mini-MUNs bringen die Weltpolitik ins eigene Klassenzimmer. Statt regulärem Unterricht werden die SchülerInnen so selbst aktiv und für einen Tag zu jungen Nachwuchsdiplomaten. Mini-MUNs werden meist in Schulen angeboten für Klassen, Kurse oder einen ganzen Jahrgang und dauern von zwei Schulstunden bis zu einem ganzen Projekttag.",
  "Die Deutsche Gesellschaft für die Vereinten Nationen e.V. (DGVN) hat in Kooperation mit dem Jungen UNO-Netzwerk (JUNON) das Projekt 'UN im Klassenzimmer' gestartet. Durch zwei unterschiedliche Module wird das Thema Vereinte Nationen von Studentinnen und Studenten 'ins Klassenzimmer gebracht.'",
  "Zuvor hatte die AG Model United Nations des Jungen-UNO-Netzwerks Deutschland e.V. 2008 eine umfangreiche Toolbox für Mini-UNO-Planspiele an Schulen erstellt. Diese Toolbox enthält alle Materialien, die eine UNO-Gruppe braucht um ein Mini-UNO-Planspiel an einer Schule durchzuführen, insb. zwei Leitfäden und 16 Anhänge (Handbücher, Präsentationen, Zeitplan etc.)."
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

</style>