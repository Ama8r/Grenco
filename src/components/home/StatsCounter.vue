<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const stats = ref([
  {
    // التعديل 1: نستخدم المفتاح بدلاً من النص المترجم مباشرة
    translationKey: "stats.machines",
    value: 0,
    target: 150,
    icon: "pi-cog",
    suffix: "+",
  },
  {
    translationKey: "stats.plasticType",
    value: 0,
    target: 5,
    icon: "pi-filter",
    suffix: "",
  },
  {
    translationKey: "stats.customers",
    value: 0,
    target: 75,
    icon: "pi-users",
    suffix: "+",
  },
]);

const startCounting = () => {
  stats.value.forEach((stat) => {
    let startValue = 0;
    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    const stepTime = duration / steps;

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= stat.target) {
        stat.value = stat.target;
        clearInterval(counter);
      } else {
        stat.value = Math.floor(startValue);
      }
    }, stepTime);
  });
};

onMounted(() => {
  setTimeout(startCounting, 500);
});
</script>

<template>
  <section class="stats-section">
    <div class="stats-background"></div>

    <div class="container">
      <div class="stats-grid" data-aos="fade-up">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
          :data-aos-delay="index * 100"
        >
          <div class="stat-icon">
            <i :class="`pi ${stat.icon}`"></i>
          </div>
          <div class="stat-value">
            <span class="counter">{{ stat.value }}</span>
            <span class="suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ t(stat.translationKey) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: var(--space-6) 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.stats-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: -1;
}

.stats-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.stat-item {
  text-align: center;
  padding: var(--space-4);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-normal) ease;
  flex: 0 1 250px;
  min-width: 200px;
}

.stat-item:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-2);
  opacity: 0.8;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-2);
}

.suffix {
  font-size: 2rem;
}

.stat-label {
  font-size: var(--font-size-lg);
  opacity: 0.9;
}
</style>
