<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useSolutionsStore } from "../stores/solutions";

const { t, locale } = useI18n();
const router = useRouter();
const solutionsStore = useSolutionsStore();

const solutions = computed(() => solutionsStore.solutions);

// ... (يمكنك إبقاء Features computed logic إذا كنت تستخدمها في قسم آخر) ...

const viewSolution = (id: number) => {
  router.push({ name: "solution-details", params: { id } });
};
</script>

<template>
  <div class="solutions-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up">
          {{ t("solutions.title") }}
        </h1>
        <p class="page-subtitle" data-aos="fade-up" data-aos-delay="100">
          {{ t("solutions.subtitle") }}
        </p>
      </div>
    </div>

    <section class="section solutions-section">
      <div class="container">
        <div class="solutions-grid">
          <div
            v-for="solution in solutions"
            :key="solution.id"
            class="solution-card"
            data-aos="fade-up"
            :data-aos-delay="solution.id * 100"
          >
            <div class="solution-image">
              <img
                :src="solution.image"
                :alt="t(`solutions.${solution.translationKey}.title`)"
              />
              <div class="solution-icon">
                <i :class="`pi ${solution.icon}`"></i>
              </div>
            </div>

            <div class="solution-content">
              <h2 class="solution-title">
                {{ t(`solutions.${solution.translationKey}.title`) }}
              </h2>
              <p class="solution-description line-clamp-3">
                {{ t(`solutions.${solution.translationKey}.content`) }}
              </p>

              <div class="benefits-list">
                <h3>{{ t("solutionsPage.keyBenefits") }}</h3>
                <ul>
                  <li
                    v-for="(benefit, index) in solution.benefits.slice(0, 2)"
                    :key="index"
                  >
                    <i class="pi pi-check"></i>
                    <span>{{ locale === "ar" ? benefit.ar : benefit.en }}</span>
                  </li>
                </ul>
              </div>

              <button
                @click="viewSolution(solution.id)"
                class="btn btn-outline full-width"
              >
                {{ t("solutionsPage.learnMore") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-content" data-aos="fade-up">
          <h2>{{ t("solutionsPage.ctaTitle") }}</h2>
          <p>{{ t("solutionsPage.ctaText") }}</p>
          <router-link to="/contact" class="btn btn-primary">
            {{ t("hero.contactUs") }}
            <i class="pi pi-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* إضافة كلاس لقص النص */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.full-width {
  width: 100%;
  margin-top: var(--space-3);
  cursor: pointer;
}

.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-7) 0 var(--space-5);
  text-align: center;
  position: relative;
  margin-top: 80px;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.page-title {
  position: relative;
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-2);
}

.page-subtitle {
  position: relative;
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

.solutions-section {
  padding: var(--space-6) 0;
  background-color: var(--color-white);
}

.solutions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

.solution-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease,
    box-shadow var(--transition-normal) ease;
  display: flex;
  flex-direction: column;
}

.solution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.solution-image {
  height: 250px;
  position: relative;
  overflow: hidden;
}

.solution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;
}

.solution-card:hover .solution-image img {
  transform: scale(1.05);
}

.solution-icon {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  width: 60px;
  height: 60px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.solution-content {
  padding: var(--space-4);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.solution-title {
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
  line-height: 1.3;
}

.solution-description {
  color: var(--color-gray-600);
  margin-bottom: var(--space-4);
  line-height: 1.6;
}

.benefits-list {
  flex-grow: 1;
  margin-bottom: var(--space-3);
}

.benefits-list h3 {
  font-size: var(--font-size-base);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
  font-weight: 700;
}

.benefits-list ul {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  color: var(--color-gray-700);
  font-size: 0.9rem;
}

.benefits-list li i {
  color: var(--color-primary);
}

.cta-section {
  padding: var(--space-6) 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-3);
}

.cta-content p {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  opacity: 0.9;
}

.cta-content .btn {
  font-size: var(--font-size-lg);
  padding: 0.75rem 2rem;
  background-color: var(--color-white);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.cta-content .btn:hover {
  background-color: var(--color-gray-100);
}

@media (min-width: 768px) {
  .solutions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .solutions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

:deep(.rtl) .solution-icon {
  right: auto;
  left: var(--space-4);
}

:deep(.rtl) .cta-content .btn i {
  transform: scaleX(-1);
}
</style>
