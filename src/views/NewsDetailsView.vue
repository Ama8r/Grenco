<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useNewsStore, type NewsEntry } from "../stores/news";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const newsStore = useNewsStore();

const article = ref<NewsEntry | undefined>(undefined);
const loading = ref(true);

// دالة لجلب المقال بناءً على اللغة والـ ID
const loadArticle = () => {
  loading.value = true;
  const id = route.params.id as string;
  // نحاول جلب المقال من الستور
  // ملاحظة: في التطبيق الحقيقي قد نحتاج لطلب API خاص بالـ ID إذا لم تكن البيانات محملة مسبقاً
  article.value = newsStore.getArticleById(
    id,
    locale.value === "ar" ? "ar" : "en-US"
  );

  // إذا لم نجد المقال، نعيد توجيه المستخدم أو نظهر خطأ (هنا مجرد إيقاف التحميل)
  if (!article.value) {
    // يمكن إضافة منطق لجلب البيانات مرة أخرى إذا كانت الـ news array فارغة
    newsStore.fetchNews(locale.value === "ar" ? "ar" : "en-US").then(() => {
      article.value = newsStore.getArticleById(
        id,
        locale.value === "ar" ? "ar" : "en-US"
      );
      loading.value = false;
    });
  } else {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale.value === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const goBack = () => {
  router.push({ name: "news" });
};

onMounted(() => {
  loadArticle();
});

// مراقبة تغيير اللغة لتحديث المحتوى
watch(
  () => locale.value,
  () => {
    loadArticle();
  }
);
</script>

<template>
  <div class="news-details-page">
    <div class="header-spacer"></div>

    <div class="container" v-if="loading">
      <div class="loading-state">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
    </div>

    <div class="container" v-else-if="article">
      <button @click="goBack" class="back-btn">
        <i
          class="pi"
          :class="locale === 'ar' ? 'pi-arrow-right' : 'pi-arrow-left'"
        ></i>
        {{
          t("news.backToNews") ||
          (locale === "ar" ? "العودة للأخبار" : "Back to News")
        }}
      </button>

      <article class="single-article" data-aos="fade-up">
        <div class="article-header">
          <div class="category-badge">{{ article.category }}</div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="date">
              <i class="pi pi-calendar"></i>
              {{ formatDate(article.date) }}
            </span>
          </div>
        </div>

        <div class="article-image">
          <img :src="article.image.url" :alt="article.image.title" />
        </div>

        <div class="article-content" v-html="article.content"></div>
      </article>
    </div>

    <div class="container" v-else>
      <div class="not-found">
        <h2>{{ locale === "ar" ? "الخبر غير موجود" : "Article Not Found" }}</h2>
        <button @click="goBack" class="btn btn-primary mt-3">
          {{ locale === "ar" ? "العودة" : "Go Back" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-details-page {
  background-color: var(--color-gray-100);
  min-height: 100vh;
  padding-bottom: var(--space-7);
}

.header-spacer {
  height: 100px; /* مسافة للهيدر الثابت */
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: none;
  border: none;
  color: var(--color-gray-600);
  font-weight: 500;
  margin-bottom: var(--space-4);
  cursor: pointer;
  transition: color 0.3s;
  font-size: 1.1rem;
}

.back-btn:hover {
  color: var(--color-primary);
}

.single-article {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.article-header {
  padding: var(--space-5) var(--space-5) var(--space-3);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.category-badge {
  display: inline-block;
  background-color: var(
    --color-primary-light
  ); /* تأكد من وجود هذا اللون أو استخدم لون فاتح */
  color: var(--color-primary);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.article-title {
  font-size: 2.5rem;
  color: var(--color-secondary);
  line-height: 1.3;
  margin-bottom: var(--space-3);
}

.article-meta {
  color: var(--color-gray-500);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
}

.article-image {
  width: 100%;
  height: 400px;
  margin: var(--space-4) 0;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: var(--space-5);
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-gray-700);
}

/* تنسيق الفقرات داخل المحتوى */
.article-content :deep(p) {
  margin-bottom: var(--space-3);
}

.loading-state,
.not-found {
  text-align: center;
  padding: var(--space-7);
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }
  .article-image {
    height: 250px;
  }
}
</style>
