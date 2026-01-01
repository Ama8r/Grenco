<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const heroImages = [
  "/assets/images/Hero/1.png",
  "/assets/images/Hero/2.jpg",
  "https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg",
];

const currentImageIndex = ref(0);
let slideInterval: number | undefined;

const startSlideShow = () => {
  // التأكد من عدم وجود مؤقت سابق
  if (slideInterval) clearInterval(slideInterval);

  // التصحيح هنا: استخدام window.setInterval للتأكد من إرجاع رقم (number)
  slideInterval = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 5000);
};

// دالة للانتقال اليدوي عند الضغط على الشريط
const jumpToSlide = (index: number) => {
  currentImageIndex.value = index;
  // إعادة تشغيل المؤقت حتى لا تتغير الصورة فوراً بعد الضغط
  startSlideShow();
};

const navigateToProducts = () => {
  router.push({ name: "products" });
};

const navigateToContact = () => {
  router.push({ name: "contact" });
};

onMounted(() => {
  startSlideShow();
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
});
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg-slider">
      <div
        v-for="(image, index) in heroImages"
        :key="index"
        class="hero-bg-item"
        :class="{ active: index === currentImageIndex }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
    </div>

    <div class="hero-overlay"></div>

    <div class="container hero-container">
      <div class="hero-content" data-aos="fade-up">
        <h1 class="hero-title">{{ t("hero.title") }}</h1>
        <p class="hero-subtitle">{{ t("hero.subtitle") }}</p>
        <div class="hero-buttons">
          <button @click="navigateToProducts" class="btn btn-primary">
            {{ t("hero.cta") }}
            <i class="pi pi-arrow-right"></i>
          </button>
          <button @click="navigateToContact" class="btn btn-outline">
            {{ t("hero.contactUs") }}
          </button>
        </div>
      </div>
    </div>

    <div class="hero-indicators">
      <div
        v-for="(_, index) in heroImages"
        :key="index"
        class="indicator-bar"
        :class="{ active: index === currentImageIndex }"
        @click="jumpToSlide(index)"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  /* أزلنا الصورة الثابتة من هنا */
  display: flex;
  align-items: center;
  color: var(--color-white);
  overflow: hidden;
}

/* --- تنسيقات السلايدر الجديد --- */
.hero-bg-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* خلف الأوفرلاي */
}

.hero-bg-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0; /* مخفي افتراضياً */
  transform: scale(1);
  transition: opacity 1.5s ease-in-out, transform 6s linear; /* انميشن التلاشي والتكبير */
}

.hero-bg-item.active {
  opacity: 1; /* ظاهر */
  transform: scale(1.1); /* تكبير بطيء (Ken Burns Effect) */
  z-index: 1;
}

/* --- باقي التنسيقات --- */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  z-index: 2; /* فوق الصور */
}

.hero-container {
  position: relative;
  z-index: 3; /* فوق كل شيء */
  padding-top: var(--space-7);
}

.hero-content {
  max-width: 700px;
}

.hero-title {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  margin-bottom: var(--space-3);
  line-height: 1.2;
  font-weight: 700;
}

.hero-subtitle {
  font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-xl));
  margin-bottom: var(--space-5);
  max-width: 600px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
  }

  .hero-content {
    text-align: center;
    margin: 0 auto;
  }

  .hero-buttons {
    justify-content: center;
  }
}

/* --- تنسيقات شريط المؤشرات (Indicators) --- */
.hero-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10; /* للتأكد من ظهوره فوق كل شيء */
}

.indicator-bar {
  height: 6px; /* سمك الشريط */
  width: 20px; /* العرض الافتراضي (صغير) */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator-bar:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.indicator-bar.active {
  width: 50px; /* العرض عند التفعيل (كبير) */
  background-color: var(--color-primary); /* لون مميز (أخضر مثلاً) */
}

/* --- باقي التنسيقات --- */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  z-index: 2;
}

.hero-container {
  position: relative;
  z-index: 3;
  padding-top: var(--space-7);
}
.hero-content {
  max-width: 700px;
}
.hero-title {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  margin-bottom: var(--space-3);
  line-height: 1.2;
  font-weight: 700;
}
.hero-subtitle {
  font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-xl));
  margin-bottom: var(--space-5);
  max-width: 600px;
  opacity: 0.9;
}
.hero-buttons {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

@media (max-width: 768px) {
  .hero-section {
    height: 80vh;
  }
  .hero-content {
    text-align: center;
    margin: 0 auto;
  }
  .hero-buttons {
    justify-content: center;
  }
}
</style>
