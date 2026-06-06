<template>

  <section class="info-card">

    <h2>
      Weitere Informationen
    </h2>

    <br>

    <ul>

      <li>
        <a
          href="https://de.wikipedia.org/wiki/Model_United_Nations"
          target="_blank"
          rel="noopener noreferrer"
        >
          Artikel „Model United Nations“ bei Wikipedia
        </a>
      </li>

      <li>
        <a
          href="https://galerie.dmun.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MUN-Galerie des Vereins „Deutsche MUN e.V.“
        </a>
        – mit Fotos und Filmen von mehreren Schüler-MUNs
      </li>

      <li>
        <a
          href="https://junges-uno-netzwerk.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Junges UNO-Netzwerk Deutschland e.V.
        </a>
        – ein Verein, in dessen Rahmen u.a. die deutschen MUNs zusammenarbeiten
      </li>

    </ul>

  </section>

</template>

<style scoped>

.info-card {
  flex: 0.7;

  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
  );

  border-radius: 24px;

  padding: 60px;

/*  backdrop-filter: blur(12px); */

  box-shadow:
    0 12px 30px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 30px;

  font-size: 2rem;
}

ul {
  display: flex;
  flex-direction: column;

  gap: 22px;

  padding-left: 20px;

  line-height: 1.6;
}

li {
  font-weight: 700;
}

.info-card li a {
  color: #0f3b66;
  text-decoration: none;

  border-bottom: 1px solid rgba(15, 59, 102, 0.4);
  font-weight: 800;

  transition: all 0.2s ease;
}

.info-card li a:hover {
  opacity: 0.7;
  border-bottom-color: rgba(15, 59, 102, 0.9);
}

</style>