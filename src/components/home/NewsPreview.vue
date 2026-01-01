<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useNewsStore } from "../../stores/news";

const { t, locale } = useI18n();
const router = useRouter();
const newsStore = useNewsStore();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const viewAllNews = () => {
  router.push({ name: "news" });
};

// دالة للانتقال للتفاصيل
const viewNewsDetails = (id: string) => {
  router.push({ name: "news-details", params: { id } });
};

onMounted(() => {
  newsStore.fetchNews(locale.value === "ar" ? "ar" : "en-US");
});

watch(
  () => locale.value,
  (newLocale) => {
    newsStore.fetchNews(newLocale === "ar" ? "ar" : "en-US");
  }
);
</script>

<template>
  <section class="section news-section">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up">{{ t("news.title") }}</h2>
      <p
        class="section-subtitle text-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ t("news.subtitle") }}
      </p>

      <div v-if="newsStore.loading" class="loading-state">...</div>
      <div v-else-if="newsStore.error" class="error-state">...</div>

      <div v-else class="news-grid">
        <div
          v-for="article in newsStore.news.slice(0, 3)"
          :key="article.id"
          class="news-card"
          data-aos="fade-up"
        >
          <div
            class="news-image"
            @click="viewNewsDetails(article.id)"
            style="cursor: pointer"
          >
            <img :src="article.image.url" :alt="article.image.title" />
            <div class="news-category">{{ article.category }}</div>
          </div>
          <div class="news-content">
            <div class="news-date">{{ formatDate(article.date) }}</div>
            <h3
              class="news-title"
              @click="viewNewsDetails(article.id)"
              style="cursor: pointer"
            >
              {{ article.title }}
            </h3>
            <p class="news-excerpt">{{ article.excerpt }}</p>

            <a
              href="javascript:void(0)"
              @click.prevent="viewNewsDetails(article.id)"
              class="news-link"
            >
              {{ t("news.readMore") }}
              <i
                class="pi"
                :class="locale === 'ar' ? 'pi-arrow-left' : 'pi-arrow-right'"
              ></i>
            </a>
          </div>
        </div>
      </div>

      <div
        v-if="
          !newsStore.loading && !newsStore.error && newsStore.news.length === 0
        "
        class="empty-state"
      ></div>

      <div class="text-center mt-5" data-aos="fade-up">
        <button @click="viewAllNews" class="btn btn-primary view-all-btn">
          <span>{{ t("news.allNews") }}</span>
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: var(--space-7) 0;
  background-color: var(--color-gray-100);
}

.section-subtitle {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-gray-600);
}

.news-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.news-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease,
    box-shadow var(--transition-normal) ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.news-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-category {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  z-index: 1;
}

.news-content {
  padding: var(--space-4);
}

.news-date {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-bottom: var(--space-2);
}

.news-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
  line-height: 1.3;
}

.news-excerpt {
  color: var(--color-gray-600);
  margin-bottom: var(--space-3);
  line-height: 1.5;
}

.news-link {
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  transition: gap var(--transition-normal);
}

.news-link:hover {
  gap: var(--space-2);
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: var(--space-6);
  color: var(--color-gray-600);
}

.loading-state i,
.error-state i,
.empty-state i {
  margin-bottom: var(--space-3);
}

.error-state button {
  margin-top: var(--space-3);
}

@media (min-width: 768px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

:deep(.rtl) .news-category {
  left: auto;
  right: var(--space-3);
}

:deep(.rtl) .news-link {
  flex-direction: row-reverse;
}

/* ... باقي الستايلات الموجودة مسبقاً ... */

/* تنسيق الزر الجديد */
.view-all-btn {
  display: inline-flex; /* يجعل العناصر داخل الزر مرنة */
  align-items: center; /* توسيط عمودي للنص والأيقونة */
  justify-content: center; /* توسيط أفقي */
  gap: var(--space-2); /* مسافة آمنة بين النص والأيقونة لا تتأثر باللغة */
  padding-left: var(--space-4); /* تحسين الحشوة الداخلية */
  padding-right: var(--space-4);
}

/* تحسين حركة السهم عند الوقوف على الزر */
.view-all-btn:hover i {
  transform: translateX(4px); /* تحريك السهم لليمين قليلاً */
}

/* تنسيقات خاصة باللغة العربية (RTL) */
:deep(.rtl) .view-all-btn i {
  transform: scaleX(-1); /* قلب السهم ليشير لليسار في العربي */
}

/* عكس حركة السهم في العربي عند الوقوف عليه */
:deep(.rtl) .view-all-btn:hover i {
  transform: scaleX(-1) translateX(4px); /* الحفاظ على القلب مع الحركة */
}

.news-title:hover {
  color: var(--color-primary);
  transition: color 0.3s;
}
</style>
