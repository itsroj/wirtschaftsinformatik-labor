<template>

  <section class="info-card">

    <h2>
      Weitere Informationen
    </h2>

    <br>

    <ul>

      <li>
        Artikel „Model United Nations“ bei Wikipedia
      </li>

      <li>
        MUN-Galerie des Vereins „Deutsche MUN e.V.“. Mit Fotos und Filmen von mehreren Schüler-MUNs
      </li>

      <li>
        Junges UNO-Netzwerk Deutschland e.V. – ein Verein, in dessen Rahmen u.a. die deutschen MUNs zusammenarbeiten
      </li>

    </ul>

  </section>

</template>

<style scoped>

.info-card {
  flex: 0.7;

  background:
    rgba(255,255,255,0.94);

  border-radius: 24px;

  padding: 60px;

  backdrop-filter: blur(12px);

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

</style>