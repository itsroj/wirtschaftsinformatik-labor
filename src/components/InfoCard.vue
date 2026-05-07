<template>
  <div class="card">

    <div class="card-content">

      <div class="left">

        <h3>Model United Nations ?</h3>

        <p>
          Model-United-Nations-Konferenzen (MUNs)
          sind Planspiele, bei denen die Teilnehmer
          in die Rolle von Delegierten bei den
          Vereinten Nationen schlüpfen.
        </p>

        <button>
          Zur Infoseite
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

button {
  margin-top: 22px;

  height: 46px;
  padding: 0 18px;

  border-radius: 12px;
  border: 2px solid #0f3b66;

  background: white;

  font-weight: 600;

  cursor: pointer;
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