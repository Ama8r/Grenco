<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const content = computed(() => {
  if (locale.value === "ar") {
    return {
      title: "شروط الخدمة",
      intro:
        "أهلاً بك في جرينكو. باستخداك لموقعنا أو طلب منتجاتنا، فإنك توافق على الشروط التالية.",
      sections: [
        {
          heading: "الملكية الفكرية",
          text: "جميع المحتويات، التصاميم، الصور، والتقنيات المعروضة على هذا الموقع هي ملكية حصرية لشركة جرينكو ومحمية بموجب قوانين حقوق النشر والملكية الفكرية.",
        },
        {
          heading: "استخدام المنتجات",
          text: "يجب تشغيل ماكينات جرينكو وفقاً لدليل المستخدم وإرشادات السلامة المرفقة. الشركة غير مسؤولة عن الأضرار الناتجة عن سوء الاستخدام أو التعديلات غير المصرح بها.",
        },
        {
          heading: "طلبات الشراء والتسعير",
          text: "تخضع جميع عروض الأسعار للتأكيد النهائي. نحتفظ بالحق في تعديل المواصفات أو الأسعار قبل إتمام التعاقد بناءً على توفر المواد وتكاليف التصنيع.",
        },
        {
          heading: "القانون الواجب التطبيق",
          text: "تخضع هذه الشروط وتفسر وفقاً لقوانين جمهورية مصر العربية.",
        },
      ],
    };
  } else {
    return {
      title: "Terms of Service",
      intro:
        "Welcome to Grenco. By using our website or ordering our products, you agree to the following terms.",
      sections: [
        {
          heading: "Intellectual Property",
          text: "All content, designs, images, and technologies displayed on this website are the exclusive property of Grenco and are protected by copyright and intellectual property laws.",
        },
        {
          heading: "Product Usage",
          text: "Grenco machines must be operated in accordance with the user manual and safety guidelines provided. The company is not liable for damages resulting from misuse or unauthorized modifications.",
        },
        {
          heading: "Orders and Pricing",
          text: "All quotations are subject to final confirmation. We reserve the right to modify specifications or prices prior to contract conclusion based on material availability and manufacturing costs.",
        },
        {
          heading: "Governing Law",
          text: "These terms shall be governed by and construed in accordance with the laws of the Arab Republic of Egypt.",
        },
      ],
    };
  }
});
</script>

<template>
  <div class="page-wrapper">
    <div class="container section">
      <div class="legal-content" data-aos="fade-up">
        <h1 class="page-title">{{ content.title }}</h1>
        <p class="intro-text">{{ content.intro }}</p>

        <div class="content-body">
          <div
            v-for="(section, index) in content.sections"
            :key="index"
            class="term-item"
          >
            <h3>{{ section.heading }}</h3>
            <p>{{ section.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  padding-top: 100px;
  background-color: var(--color-gray-100);
  min-height: 100vh;
  padding-bottom: var(--space-7);
  margin-bottom: var(--space-10);
}

.legal-content {
  background: var(--color-white);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  color: var(--color-secondary);
  margin-bottom: var(--space-3);
  text-align: center;
}

.intro-text {
  text-align: center;
  color: var(--color-gray-600);
  margin-bottom: var(--space-6);
  font-size: 1.1rem;
}

.term-item {
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-gray-100);
}

.term-item:last-child {
  border-bottom: none;
}

.term-item h3 {
  font-size: 1.3rem;
  color: var(--color-secondary);
  margin-bottom: var(--space-2);
}

.term-item p {
  color: var(--color-gray-700);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .legal-content {
    padding: var(--space-4);
  }
}
</style>
