<template>
    <main class="not-found">
        <Navbar />

        <section class="content">
            <div class="code">404</div>
            <h1>{{ languageStore.t('notFound.title') }}</h1>
            <p>{{ languageStore.t('notFound.message') }}</p>
            <router-link to="/" class="home-button">
                {{ languageStore.t('notFound.button') }}
            </router-link>
        </section>

        <Footer />
    </main>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
</script>

<style scoped>
.not-found {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 24px;
    gap: 16px;
}

.code {
    font-size: clamp(80px, 15vw, 160px);
    font-weight: 900;
    color: rgba(255, 255, 255, 0.08);
    line-height: 1;
    letter-spacing: -4px;
}

h1 {
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 700;
    color: white;
    margin: 0;
}

p {
    color: rgba(255, 255, 255, 0.65);
    font-size: 16px;
    max-width: 400px;
    margin: 0;
}

.home-button {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 999px;
    background: white;
    color: #0f3b66;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: opacity 0.2s ease;
}

.home-button:hover {
    opacity: 0.85;
}
</style>
