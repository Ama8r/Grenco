<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

// Sample products data  
const products = ref([
  // {
  //   id: 1,
  //   name: "EcoGrind S100",
  //   image: "assets/images/products/machine1.jpeg",
  //   description:
  //     "Compact plastic grinding machine optimized for small workshops",
  //   plasticTypes: ["PET", "HDPE", "LDPE"],
  //   features: [
  //     "Smart energy management",
  //     "Remote monitoring",
  //     "Customizable grinding settings",
  //   ],
  // }
  {
    id: 1,
    name: "Screws & Barrels",
    image: "https://iili.io/fRnRayb.md.png",
    description:
      "Grenco’s Screws & Barrels are engineered to deliver exceptional performance in injection molding, extrusion, and recycling applications.  ",
    //plasticTypes: ["PET", "HDPE", "LDPE"],
    features: [
      "Precision-crafted design",
      "High-strength steel",
      "Advanced heat-treatment",
      "Fully customized manufacturing",    ],  
  },
  {
    id: 2,
    name: "Plastic Shredder Machines",
    image: "https://iili.io/fRois0G.md.png",
    description: "Medium capacity recycling solution for diverse plastic types",
    plasticTypes: ["PET", "HDPE", "LDPE", "PP", "PS"],
    features: [
        'Efficient plastic shredding',
        'Multiple customizable sizes',
        'Reinforced steel structure',
        'Smart overload protection',
        'Low energy consumption',
        'Quick maintenance access'
    ],
  },
  {
    id: 3,
    name: "Mini Plastic Recycling Machines",
    image: "https://iili.io/fRoIWAv.md.png",
    description:
      "Compact, smart recycling machines supporting multiple processes with intelligent monitoring for continuous operation",
    plasticTypes: ["All major plastic types"],
    features: [
      "Compact versatile design",
      "Perfect for workshops",
      "Smart IIoT control",
      "User-friendly interface",
      "Energy-efficient performance",
    ],
  },
]);

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
            <p class="product-description">{{ product.description }}</p>

            <div class="product-features">
              <h4>{{ t("products.featureTitle") }}</h4>
              <ul>
                <li v-for="(feature, index) in product.features" :key="index">
                  <i class="pi pi-check"></i> {{ feature }}
                </li>
              </ul>
            </div>

            <div class="product-actions">
              <button @click="viewProduct(product.id)" class="btn btn-primary">
                {{ t("products.learnMore") }}
              </button>
              <button class="btn btn-outline">
                {{ t("products.requestQuote") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up">
        <button @click="viewAllProducts" class="btn btn-primary">
          {{ t("products.title") }}
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
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: var(--space-1);
  color: var(--color-gray-700);
}

.product-features li i {
  color: var(--color-primary);
  margin-right: var(--space-2);
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
</style>