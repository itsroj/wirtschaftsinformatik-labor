<template>

<section class="intro-wrapper">

  <section class="intro-card">

    <!-- Text -->
    <div class="content">

      <h1>
        Was bedeutet “Model United Nations” ?
      </h1>

      <div class="text">

        <p>
          Model-United-Nations-Konferenzen (MUNs) sind Planspiele, bei denen die Teilnehmer 
          in die Rolle von Delegierten bei den Vereinten Nationen schlüpfen. In simulierten 
          Gremien wie dem Sicherheitsrat oder der Generalversammlung debattieren die Delegierten 
          über weltpolitische Themen, handeln Kompromisse aus und verabschieden Resolutionen.
        </p>

        <p>
          Jeder der Teilnehmer vertritt einen Staat, in dessen Position er oder sie sich vor der 
          Konferenz eingearbeitet hat. Dabei zählt nicht die persönliche Meinung, sondern es ist 
          das erklärte Ziel, die offizielle Position des zu vertretenden Staates möglichst realistisch 
          wiederzugeben.
        </p>

        <p>
          Die Arbeit in den Gremien besteht zum einen aus formalen Debatten auf Grundlage einer 
          Geschäftsordnung, die an die echten Regelungen der Vereinten Nationen und die UN-Charta 
          angelehnt ist, zum anderen aus informellen Arbeitsphasen, in denen im Dialog verhandelt 
          wird und in denen gemeinsam Entwürfe für Resolutionen erarbeitet werden.
        </p>

        <p>
          Die Teilnehmer lernen dabei nicht nur die Arbeitsweisen der internationalen Politik kennen, 
          sondern trainieren auch ihre rhetorischen Fähigkeiten und können sich in Verhandlungssituationen 
          erproben.
        </p>

        <p>
          MUNs gibt es auf der ganzen Welt in vielen Sprachen und für unterschiedliche Altersgruppen. 
          In Deutschland gibt es eine ganze Reihe großer, meist jährlich veranstalteter Konferenzen für 
          SchülerInnen und Studierende, deren offizielle Arbeitssprache meist Deutsch oder Englisch ist.
        </p>

        <p>
          Darüberhinaus gibt es viele Gruppen in Deutschland, die gemeinsam als Delegation regelmäßig an 
          den internationalen MUN-Konferenzen teilnehmen.
        </p>

        <p>
          Jede Konferenz hat ihre Besonderheiten – gemein ist ihnen aber das Ziel, den Teilnehmern die 
          Arbeit der Vereinten Nationen näher zu bringen, das Interesse und Verständnis für fremde Kulturen 
          zu stärken und eine spannende, bereichernde Erfahrung zu bieten.
        </p>

      </div>

    </div>

    <!-- Bilder -->
    <div class="gallery">

      <img src="@/assets/images/mun1.jpg" alt="">
      <img src="@/assets/images/mun2.jpg" alt="">
      <img src="@/assets/images/mun3.jpg" alt="">
      <img src="@/assets/images/mun4.jpg" alt="">
      <img src="@/assets/images/mun5.jpg" alt="">
      <img src="@/assets/images/mun6.jpg" alt="">

    </div>

  </section>

</section>

</template>

<style scoped>

.intro-wrapper {
  width: min(1200px, 92%);
  margin: 0 auto;
}

.intro-card {
  background:
    rgba(255,255,255,0.94);

  border-radius: 28px;

  padding: 60px;

  display: flex;
  justify-content: space-between;

  gap: 60px;

  backdrop-filter: blur(4px);

  box-shadow:
  0 8px 18px rgba(0,0,0,0.08);

  will-change: transform;

  transform: translateZ(0);

  backface-visibility: hidden;
}

.content {
  flex: 1;
}

h1 {
  font-size: clamp(32px, 4vw, 36px);

  margin-bottom: 40px;

  color: #121212;
}

.text {
  display: flex;
  flex-direction: column;

  gap: 28px;

  color: #2d2d2d;

  line-height: 1.65;

  font-size: 1.08rem;
}

.gallery {
  width: 260px;

  display: flex;
  flex-direction: column;

  gap: 18px;
}

.gallery img {
  width: 100%;

  border-radius: 14px;

  object-fit: cover;

  box-shadow:
    0 8px 22px rgba(0,0,0,0.12);
}

@media (max-width: 1100px) {

  .intro-card {
    flex-direction: column;
  }

  .gallery {
    width: 100%;

    display: grid;

    grid-template-columns:
      repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 700px) {

  .intro-card {
    padding: 32px;
  }

  h1 {
    font-size: 2rem;
  }
}

</style>