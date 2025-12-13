<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSolutionsStore } from '../stores/solutions'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const solutionsStore = useSolutionsStore()

// جلب الحل بناءً على الـ ID
const solution = computed(() => {
  const id = Number(route.params.id)
  if (isNaN(id)) return undefined
  return solutionsStore.getSolutionById(id)
})

// إعادة التوجيه إذا لم يتم العثور على الحل
onMounted(() => {
  if (!solution.value && !isNaN(Number(route.params.id))) {
     router.push({ name: 'solutions' })
  }
})
</script>

<template>
  <div v-if="solution" class="solution-details-page">
    <div class="solution-hero">
      <div class="hero-bg" :style="{ backgroundImage: `url(${solution.image})` }"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-icon" data-aos="zoom-in">
          <i :class="`pi ${solution.icon}`"></i>
        </div>
        <h1 class="hero-title" data-aos="fade-up">
          {{ t(`solutions.${solution.translationKey}.title`) }}
        </h1>
        <div class="hero-breadcrumb" data-aos="fade-up" data-aos-delay="100">
          <router-link :to="{ name: 'home' }">{{ t('nav.home') }}</router-link>
          <i class="pi pi-chevron-right"></i>
          <router-link :to="{ name: 'solutions' }">{{ t('nav.solutions') }}</router-link>
          <i class="pi pi-chevron-right"></i>
          <span>{{ t(`solutions.${solution.translationKey}.title`) }}</span>
        </div>
      </div>
    </div>

    <section class="section content-section">
      <div class="container">
        <div class="content-grid">
          <div class="main-info" data-aos="fade-right">
            <h2>Overview</h2>
            <p class="description-text">
              {{ t(`solutions.${solution.translationKey}.content`) }}
            </p>
            
            <div class="impact-box">
              <h3>Why this matters?</h3>
              <p>Implementing this solution directly impacts your operational efficiency and long-term sustainability goals. Our technology ensures seamless integration with your existing workflow.</p>
            </div>
          </div>

          <div class="benefits-card-wrapper" data-aos="fade-left">
            <div class="benefits-card">
              <h3>Key Advantages</h3>
              <ul class="benefits-list">
                <li v-for="(benefit, index) in solution.benefits" :key="index">
                  <div class="check-icon">
                    <i class="pi pi-check"></i>
                  </div>
                  <span>{{ benefit }}</span>
                </li>
              </ul>
              <router-link :to="{ name: 'contact' }" class="btn btn-primary full-width">
                Request Consultation
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="section visual-cta-section">
      <div class="container">
        <div class="visual-box" data-aos="fade-up">
          <div class="visual-text">
            <h2>Ready to upgrade your facility?</h2>
            <p>Join hundreds of recycling plants that have optimized their production with Grenco solutions.</p>
          </div>
          <div class="visual-action">
             <router-link :to="{ name: 'contact' }" class="btn btn-white">
               Get Started Now
               <i class="pi pi-arrow-right"></i>
             </router-link>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
/* Hero Section Styles */
.solution-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  margin-top: 80px; /* Header Height */
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
  transform: scale(1.1); /* Slight zoom for effect */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,77,32,0.8));
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-icon {
  width: 80px;
  height: 80px;
  background-color: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  font-size: 2.5rem;
  border: 2px solid rgba(255,255,255,0.4);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--space-3);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

.hero-breadcrumb a {
  color: var(--color-white);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.hero-breadcrumb a:hover {
  border-color: var(--color-white);
}

.hero-breadcrumb i {
  font-size: 0.8rem;
}

/* Content Section */
.content-section {
  padding: var(--space-7) 0;
  background-color: var(--color-white);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 992px) {
  .content-grid {
    grid-template-columns: 1.5fr 1fr;
    align-items: start;
  }
}

.main-info h2 {
  font-size: 2rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  position: relative;
  padding-bottom: var(--space-2);
}

.main-info h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.description-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-gray-700);
  margin-bottom: var(--space-5);
}

.impact-box {
  background-color: var(--color-gray-50);
  border-left: 5px solid var(--color-primary);
  padding: var(--space-4);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.impact-box h3 {
  font-size: 1.2rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-2);
}

.impact-box p {
  color: var(--color-gray-600);
  margin: 0;
}

/* Benefits Card */
.benefits-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 1px solid var(--color-gray-100);
  position: sticky;
  top: 100px; /* Sticky effect on scroll */
}

.benefits-card h3 {
  font-size: 1.5rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  text-align: center;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-5);
}

.benefits-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-gray-100);
}

.benefits-list li:last-child {
  border-bottom: none;
}

.check-icon {
  background-color: rgba(0, 200, 83, 0.1);
  color: var(--color-primary);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-3);
  flex-shrink: 0;
}

.benefits-list li span {
  color: var(--color-gray-700);
  font-weight: 500;
  line-height: 1.5;
}

.full-width {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

/* Visual CTA Section */
.visual-cta-section {
  padding: var(--space-6) 0;
  background-color: var(--color-gray-100);
}

.visual-box {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #2c3e50 100%);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .visual-box {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
}

.visual-text h2 {
  font-size: 1.8rem;
  margin-bottom: var(--space-2);
}

.visual-text p {
  opacity: 0.9;
  margin: 0;
}

.btn-white {
  background-color: var(--color-white);
  color: var(--color-secondary);
  padding: 0.75rem 2rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.btn-white:hover {
  transform: translateY(-3px);
  background-color: var(--color-gray-100);
}

/* RTL Support */
:deep(.rtl) .main-info h2::after {
  left: auto;
  right: 0;
}

:deep(.rtl) .impact-box {
  border-left: none;
  border-right: 5px solid var(--color-primary);
  border-radius: var(--radius-md) 0 0 var(--radius-md);
}

:deep(.rtl) .check-icon {
  margin-right: 0;
  margin-left: var(--space-3);
}

:deep(.rtl) .hero-breadcrumb i {
  transform: rotate(180deg);
}
</style>