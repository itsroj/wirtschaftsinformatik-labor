<template>
  <section class="map-section">

    <img
      src="@/assets/images/map.svg"
      class="map"
      alt="Deutschland Karte"
    >

  </section>
</template>

<style scoped>
.map-section {
  width: min(1200px, 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 120px;
  padding-bottom: 120px;
}

.map {
  width: min(700px, 100%);
  object-fit: cover;
  object-position: center top;

}

@media (max-width: 700px) {

  .map-section {
    padding-top: 80px;
  }
}
</style>