<template>
  <div class="card">

    <div class="card-content">

      <div class="left">

        <h3>Model United Nations ?</h3>

        <p>
          Model-United-Nations-Konferenzen (MUNs)
          sind Planspiele, bei denen die Teilnehmer
          in die Rolle von Delegierten bei den
          Vereinten Nationen schlüpfen. In simulierten 
          Gremien wie dem Sicherheitsrat oder der 
          Generalversammlung debattieren die Delegierten
          über weltpolitische Themen, handeln Kompromisse 
          aus und verabschieden Resolutionen.
        </p>

        <button
          class="info-button"
          @click="goToMunPage"
        >
          Mehr erfahren
        </button>

      </div>

      <div class="images">

        <img src="@/assets/images/mun1.jpg">
        <img src="@/assets/images/mun2.jpg">
        <img src="@/assets/images/mun3.jpg">

      </div>

    </div>

  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToMunPage = () => {
    router.push('/was-ist-mun')
  }
</script>

<style scoped>
.card {
  width: 600px;

  background: #f4f4f4;

  border-radius: 24px;

  padding: 22px;

  box-shadow:
    0 12px 30px rgba(0,0,0,0.16);
}

.card-content {
  display: flex;
  gap: 20px;
}

.left {
  flex: 1;
}

h3 {
  font-size: 36px;
  line-height: 1.1;
}

p {
  margin-top: 18px;

  font-size: 18px;
  line-height: 1.45;

  color: #202020;
}

.info-button {
  margin-top: 22px;

  height: 46px;
  padding: 0 18px;

  border-radius: 12px;
  border: 2px solid #0f3b66;

  background: white;
  color: #0f3b66;

  font-weight: 600;
  font-size: 0.95rem;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.info-button:hover {
  background: #0f3b66;
  color: white;

  transform: translateY(-2px);

  box-shadow:
    0 10px 22px rgba(15, 59, 102, 0.25);
}

.info-button:active {
  transform: translateY(0);
}

.images {
  width: 110px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.images img {
  width: 100%;
  height: 92px;

  object-fit: cover;

  border-radius: 10px;
}

@media (max-width: 600px) {

  .card {
    width: 100%;
  }

  .card-content {
    flex-direction: column;
  }

  .images {
    width: 100%;
    max-width: 90px;
    flex-direction: row;
  }

  .images img {
    flex: 1;
  }

  h3 {
    font-size: 28px;
  }
}
</style>