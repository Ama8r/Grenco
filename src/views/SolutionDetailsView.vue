<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useSolutionsStore } from "../stores/solutions";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const solutionsStore = useSolutionsStore();

// جلب الحل بناءً على الـ ID
const solution = computed(() => {
  const id = Number(route.params.id);
  if (isNaN(id)) return undefined;
  return solutionsStore.getSolutionById(id);
});

const getBackgroundImage = (imageUrl: string) => {
  const cleanPath = imageUrl.replace("/public", "");
  return `url('${cleanPath}')`;
};

// --- منطق الأنيميشن المتجاوب (Responsive Animation) ---
const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 0);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// تحديد نوع الأنيميشن بناءً على العرض
// نستخدم 992px لأنها نقطة التحول في الـ CSS الخاص بك (عندما تتحول الشبكة لعمود واحد)
const mainInfoAnimation = computed(() => {
  return windowWidth.value >= 992 ? "fade-right" : "fade-up";
});

const cardAnimation = computed(() => {
  return windowWidth.value >= 992 ? "fade-left" : "fade-up";
});

onMounted(() => {
  // إضافة مستمع لتغيير حجم الشاشة
  window.addEventListener("resize", updateWidth);

  // إعادة التوجيه إذا لم يتم العثور على الحل
  if (!solution.value && !isNaN(Number(route.params.id))) {
    router.push({ name: "solutions" });
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div
    v-if="solution"
    class="solution-details-page"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <div class="solution-hero">
      <div
        class="hero-bg"
        :style="{ backgroundImage: getBackgroundImage(solution.image) }"
      ></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-icon" data-aos="zoom-in">
          <i :class="`pi ${solution.icon}`"></i>
        </div>
        <h1 class="hero-title" data-aos="fade-up">
          {{ t(`solutions.${solution.translationKey}.title`) }}
        </h1>
        <div class="hero-breadcrumb" data-aos="fade-up" data-aos-delay="100">
          <router-link :to="{ name: 'home' }">{{ t("nav.home") }}</router-link>
          <i class="pi pi-chevron-right"></i>
          <router-link :to="{ name: 'solutions' }">{{
            t("nav.solutions")
          }}</router-link>
          <i class="pi pi-chevron-right"></i>
          <span>{{ t(`solutions.${solution.translationKey}.title`) }}</span>
        </div>
      </div>
    </div>

    <section class="section content-section">
      <div class="container">
        <div class="content-grid">
          <div class="main-info" :data-aos="mainInfoAnimation">
            <h2>{{ t("solutionDetails.overview") }}</h2>
            <p class="description-text">
              {{ t(`solutions.${solution.translationKey}.content`) }}
            </p>
          </div>

          <div class="benefits-card-wrapper" :data-aos="cardAnimation">
            <div class="benefits-card">
              <h3>{{ t("solutionDetails.keyAdvantages") }}</h3>
              <ul class="benefits-list">
                <li v-for="(benefit, index) in solution.benefits" :key="index">
                  <div class="check-icon">
                    <i class="pi pi-check"></i>
                  </div>
                  <span>{{ locale === "ar" ? benefit.ar : benefit.en }}</span>
                </li>
              </ul>
              <router-link
                :to="{ name: 'contact' }"
                class="btn btn-primary full-width"
              >
                {{ t("solutionDetails.requestConsultation") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero Section Styles */
.solution-hero {
  position: relative;
  height: 50vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  margin-top: 80px;
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
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 77, 32, 0.9)
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hero-icon {
  width: 70px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  font-size: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-3);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  padding: 0 var(--space-3);
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  opacity: 0.9;
  flex-wrap: wrap;
  justify-content: center;
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
    grid-template-columns: 1.6fr 1fr;
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
  content: "";
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
  line-height: 1.9;
  color: var(--color-gray-700);
  margin-bottom: var(--space-5);
  white-space: pre-line;
}

/* Benefits Card */
.benefits-card {
  background-color: var(--color-gray-50);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-gray-200);
  position: sticky;
  top: 100px;
}

.benefits-card h3 {
  font-size: 1.4rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  text-align: center;
  font-weight: 700;
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
  border-bottom: 1px solid var(--color-gray-200);
}

.benefits-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.check-icon {
  background-color: var(--color-white);
  color: var(--color-primary);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-3);
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.benefits-list li span {
  color: var(--color-gray-800);
  font-weight: 500;
  line-height: 1.5;
  font-size: 0.95rem;
}

.full-width {
  width: 100%;
  justify-content: center;
  padding: 1rem;
  margin-top: var(--space-4);
}

/* =========================================
   RTL Fixes (إصلاحات اللغة العربية)
   ========================================= */
.solution-details-page[dir="rtl"] .main-info h2::after {
  left: auto;
  right: 0;
}

.solution-details-page[dir="rtl"] .check-icon {
  margin-right: 0;
  margin-left: var(--space-3);
}

.solution-details-page[dir="rtl"] .hero-breadcrumb i {
  transform: rotate(180deg);
}

/* =========================================
   Responsive Styles (تحسينات الموبايل)
   ========================================= */

/* Tablets & Mobile (Max width 991px) */
@media (max-width: 991px) {
  /* إلغاء الـ sticky في الموبايل لأن العناصر ستكون فوق بعضها */
  .benefits-card {
    position: static;
    margin-top: var(--space-4);
  }

  .hero-title {
    font-size: 2rem;
  }
}

/* Mobile (Max width 768px) */
@media (max-width: 768px) {
  .solution-hero {
    margin-top: 60px;
    height: auto;
    min-height: 300px;
    padding: var(--space-6) 0;
  }

  .content-section {
    padding: var(--space-5) 0;
  }

  .main-info h2 {
    font-size: 1.75rem;
  }

  .description-text {
    font-size: 1rem;
    line-height: 1.7;
  }

  .benefits-card {
    padding: var(--space-4);
  }

  .benefits-card h3 {
    font-size: 1.25rem;
  }
}

/* Small Mobile (Max width 480px) */
@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}
</style>
