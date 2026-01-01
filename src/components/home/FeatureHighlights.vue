<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// البيانات الخام تحتوي على اللغتين معاً
const rawFeatures = [
  {
    icon: "pi-bolt",
    color: "#00c853",
    en: {
      title: "Energy Efficient",
      description:
        "The machine optimizes power use without affecting performance, reducing operating costs while staying efficient.",
    },
    ar: {
      title: "كفاءة في استهلاك الطاقة",
      description:
        "تحسين استهلاك الطاقة دون التأثير على الأداء، مما يقلل تكاليف التشغيل مع الحفاظ على الكفاءة العالية.",
    },
  },
  {
    icon: "pi-cog",
    color: "#1e88e5",
    en: {
      title: "Customizable Manufacturing",
      description:
        "We customize the machine’s manufacturing process to suit the plastic types used by each workshop or factory.",
    },
    ar: {
      title: "تصنيع قابل للتخصيص",
      description:
        "نقوم بتخصيص عملية تصنيع الماكينة لتناسب أنواع البلاستيك المستخدمة في كل ورشة أو مصنع.",
    },
  },
  {
    icon: "pi-mobile",
    color: "#7b1fa2",
    en: {
      title: "Smart Controls",
      description:
        "The machine can be fully monitored and controlled remotely through the Grenco app with instant alerts.",
    },
    ar: {
      title: "تحكم ذكي عن بُعد",
      description:
        "يمكن مراقبة الماكينة والتحكم فيها بالكامل عن بُعد من خلال تطبيق Grenco مع تنبيهات فورية.",
    },
  },
  {
    icon: "pi-chart-line",
    color: "#ff6d00",
    en: {
      title: "Machine Performance Analytics",
      description:
        "A smart dashboard shows real-time productivity, efficiency, and waste data to improve quality and decisions.",
    },
    ar: {
      title: "تحليلات أداء الماكينة",
      description:
        "لوحة تحكم ذكية تعرض بيانات الإنتاجية والكفاءة والهدر لحظياً لتحسين الجودة واتخاذ القرارات.",
    },
  },
  {
    icon: "pi-filter",
    color: "#2962ff",
    en: {
      title: "Multi-material Equipment",
      description:
        "We design equipment capable of processing plastics like PET, PP, and HDPE with tuning for each material.",
    },
    ar: {
      title: "معدات متعددة المواد",
      description:
        "نصمم معدات قادرة على معالجة أنواع مختلفة من البلاستيك مثل PET و PP و HDPE مع ضبط دقيق لكل مادة.",
    },
  },
  {
    icon: "pi-check-circle",
    color: "#00bcd4",
    en: {
      title: "Quality Assurance",
      description:
        "An intelligent system remotely monitors final product quality to ensure stability and reduce operational errors.",
    },
    ar: {
      title: "ضمان الجودة",
      description:
        "نظام ذكي يراقب جودة المنتج النهائي عن بُعد لضمان استقرار الإنتاج وتقليل أخطاء التشغيل.",
    },
  },
];

// خاصية محسوبة لتبديل اللغة تلقائياً
const features = computed(() => {
  return rawFeatures.map((feature) => ({
    icon: feature.icon,
    color: feature.color,
    title: locale.value === "ar" ? feature.ar.title : feature.en.title,
    description:
      locale.value === "ar" ? feature.ar.description : feature.en.description,
  }));
});
</script>

<template>
  <section class="section features-section">
    <div class="container">
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-card"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
        >
          <div class="feature-icon" :style="{ backgroundColor: feature.color }">
            <i :class="`pi ${feature.icon}`"></i>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: var(--space-7) 0;
  background-color: var(--color-gray-100);
  position: relative;
  overflow: hidden;
}

.features-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.05;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  position: relative;
}

.feature-card {
  background-color: var(--color-white);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-3);
  color: var(--color-white);
}

.feature-icon i {
  font-size: 2rem;
}

.feature-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
}

.feature-description {
  color: var(--color-gray-600);
  line-height: 1.5;
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
