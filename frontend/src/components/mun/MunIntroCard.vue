<template>

    <section class="intro-wrapper">

        <section class="intro-card">

            <!-- Text -->
            <div class="content">

                <h1>
                    {{ languageStore.t('munIntro.title') }}
                </h1>

                <div class="text">
                    <p>{{ languageStore.t('munIntro.para1') }}</p>
                    <p>{{ languageStore.t('munIntro.para2') }}</p>
                    <p>{{ languageStore.t('munIntro.para3') }}</p>
                    <p>{{ languageStore.t('munIntro.para4') }}</p>
                    <p>{{ languageStore.t('munIntro.para5') }}</p>
                    <p>{{ languageStore.t('munIntro.para6') }}</p>
                    <p>{{ languageStore.t('munIntro.para7') }}</p>
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

<script setup>
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
</script>

<style scoped>
.intro-wrapper {
    width: min(1200px, 92%);
    margin: 0 auto;
}

.intro-card {
    background: linear-gradient(to bottom,
            rgba(255, 255, 255, 0.96),
            rgba(255, 255, 255, 0.88));

    border-radius: 28px;

    padding: 60px;

    display: flex;
    justify-content: space-between;

    gap: 60px;

    /* backdrop-filter: blur(4px);  */

    box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.08);

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
        0 8px 22px rgba(0, 0, 0, 0.12);
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