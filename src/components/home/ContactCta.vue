<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const navigateToContact = () => {
  router.push({ name: "contact" });
};
</script>

<template>
  <section class="contact-cta-section" data-aos="fade-up">
    <div class="container">
      <div class="cta-content">
        <h2 class="cta-title">{{ t("contact.title") }}</h2>
        <p class="cta-subtitle">{{ t("contact.subtitle") }}</p>

        <button @click="navigateToContact" class="btn btn-primary cta-button">
          <span>{{ t("hero.contactUs") }}</span>
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-cta-section {
  padding: var(--space-6) 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.contact-cta-section::before {
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
  z-index: 1;
}

.cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-2);
}

.cta-subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  opacity: 0.9;
}

.cta-button {
  background-color: var(--color-white);
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  padding: 0.75rem 2rem;

  /* --- الإضافات الجديدة للهندلة --- */
  display: inline-flex; /* استخدام الفليكس لضبط العناصر */
  align-items: center; /* توسيط عمودي */
  justify-content: center; /* توسيط أفقي */
  gap: var(--space-2); /* مسافة ثابتة بين النص والأيقونة */
  transition: all var(--transition-normal); /* نعومة في الحركة */
}

.cta-button:hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary-dark);
}

/* تحريك السهم قليلاً عند الوقوف على الزر */
.cta-button:hover i {
  transform: translateX(4px);
  transition: transform var(--transition-normal);
}

/* --- تنسيقات اللغة العربية (RTL) --- */

/* قلب السهم لليسار في حالة اللغة العربية */
:deep(.rtl) .cta-button i {
  transform: scaleX(-1);
}

/* المحافظة على اتجاه القلب مع الحركة عند الوقوف عليه في العربي */
:deep(.rtl) .cta-button:hover i {
  transform: scaleX(-1) translateX(4px);
}
</style>
