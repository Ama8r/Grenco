<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useProductsStore } from "../../stores/products"; // استيراد الستور

const { t, locale } = useI18n();
const router = useRouter();
const productsStore = useProductsStore(); // استخدام الستور

// جلب المنتجات من الستور وتهيئتها حسب اللغة الحالية
const products = computed(() => {
  const currentLang = locale.value === "ar" ? "ar" : "en";

  // نأخذ أول 3 منتجات فقط للعرض في الصفحة الرئيسية
  return productsStore.products.slice(0, 3).map((product) => ({
    ...product,
    name: product.name[currentLang],
    description: product.description[currentLang],
    // تحويل مصفوفة الميزات المترجمة إلى نصوص
    features: product.features.map((f) => f[currentLang]),
  }));
});

const navigateToContact = () => {
  router.push({ name: "contact" });
};

const viewProduct = (id: number) => {
  router.push({ name: "product-details", params: { id } });
};

const viewAllProducts = () => {
  router.push({ name: "products" });
};
</script>

<template>
  <section class="section products-preview">
    <div class="container">
      <h2 class="section-title" data-aos="fade-up">
        {{ t("products.title") }}
      </h2>
      <p
        class="section-subtitle text-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ t("products.subtitle") }}
      </p>

      <div class="products-grid">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
          data-aos="fade-up"
          :data-aos-delay="100 + product.id * 100"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-content">
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-description line-clamp-2">
              {{ product.description }}
            </p>

            <div class="product-features">
              <h4>{{ t("products.featureTitle") }}</h4>
              <ul>
                <li
                  v-for="(feature, index) in product.features.slice(0, 3)"
                  :key="index"
                >
                  <i class="pi pi-check"></i> {{ feature }}
                </li>
              </ul>
            </div>

            <div class="product-actions">
              <button @click="viewProduct(product.id)" class="btn btn-primary">
                {{ t("products.learnMore") }}
              </button>
              <button @click="navigateToContact" class="btn btn-outline">
                {{ t("products.requestQuote") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up">
        <button @click="viewAllProducts" class="btn btn-primary view-all-btn">
          <span>{{ t("products.title") }}</span>
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-preview {
  padding: var(--space-7) 0;
  background-color: var(--color-white);
}

.section-subtitle {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-gray-600);
}

.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.product-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease,
    box-shadow var(--transition-normal) ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 240px;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* عرض الصورة بالكامل دون قص */
  transition: transform var(--transition-slow) ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-content {
  padding: var(--space-4);
}

.product-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
}

.product-description {
  color: var(--color-gray-600);
  margin-bottom: var(--space-3);
  min-height: 3rem; /* لضمان تساوي الارتفاعات تقريباً */
}

/* كلاس مساعد لقص النص الزائد */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-features {
  margin-bottom: var(--space-3);
}

.product-features h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
}

.product-features ul {
  list-style: none;
  padding: 0;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: var(
    --space-2
  ); /* هذه الخاصية تضمن وجود مسافة بين الأيقونة والنص في اللغتين */
  margin-bottom: var(--space-1);
  color: var(--color-gray-700);
}

.product-features li i {
  color: var(--color-primary);
  /* تم إزالة الهوامش (margins) لأن gap تقوم بالمهمة الآن */
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

@media (min-width: 640px) {
  .product-actions {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

:deep(.rtl) .product-features li i {
  margin-right: 0;
  margin-left: var(--space-2);
}

/* تنسيق الزر "عرض الكل" */
.view-all-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.view-all-btn:hover i {
  transform: translateX(4px);
}

:deep(.rtl) .view-all-btn i {
  transform: scaleX(-1);
}

:deep(.rtl) .view-all-btn:hover i {
  transform: scaleX(-1) translateX(4px);
}
</style>
