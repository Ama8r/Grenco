<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const activeIndex = ref<number | null>(0);

const toggleFaq = (index: number) => {
  // إذا ضغطت على نفس السؤال يغلقه، وإلا يفتح الجديد ويغلق القديم
  activeIndex.value = activeIndex.value === index ? null : index;
};

const rawFaqs = [
  {
    en: {
      question: "What types of plastic can Grenco machines process?",
      answer:
        "Our machines are engineered to process a wide range of thermoplastics including PET, HDPE, LDPE, PP, and PS. We can also customize the shredding and granulation systems for specific material properties.",
    },
    ar: {
      question: "ما هي أنواع البلاستيك التي يمكن لماكينات جرينكوا معالجتها؟",
      answer:
        "تم تصميم ماكيناتنا لمعالجة مجموعة واسعة من اللدائن الحرارية بما في ذلك PET و HDPE و LDPE و PP و PS. يمكننا أيضًا تخصيص أنظمة الفرم والجرش لتناسب خصائص مواد محددة.",
    },
  },
  {
    en: {
      question: "Do you offer warranty and after-sales support?",
      answer:
        "Yes, all Grenco machines come with a standard 1-year warranty covering manufacturing defects. We also provide comprehensive after-sales support, including spare parts availability, maintenance services, and remote technical assistance.",
    },
    ar: {
      question: "هل تقدمون ضمانًا وخدمة ما بعد البيع؟",
      answer:
        "نعم، تأتي جميع ماكينات جرينكوا بضمان قياسي لمدة عام يغطي عيوب التصنيع. نقدم أيضًا دعمًا شاملاً لما بعد البيع، بما في ذلك توفر قطع الغيار، وخدمات الصيانة، والدعم الفني عن بُعد.",
    },
  },
  {
    en: {
      question: "Are your machines energy efficient?",
      answer:
        "Absolutely. Energy efficiency is a core pillar of our design. We integrate smart control systems and optimized motors to reduce power consumption by up to 30% compared to traditional machinery without compromising performance.",
    },
    ar: {
      question: "هل الماكينات موفرة للطاقة؟",
      answer:
        "بالتأكيد. كفاءة الطاقة هي ركيزة أساسية في تصميمنا. نقوم بدمج أنظمة تحكم ذكية ومحركات محسّنة لتقليل استهلاك الطاقة بنسبة تصل إلى 30% مقارنة بالماكينات التقليدية دون التأثير على الأداء.",
    },
  },
  {
    en: {
      question: "Can you build a custom recycling line for my factory?",
      answer:
        "Yes, customization is our specialty. We analyze your production requirements, space constraints, and target output to design and manufacture a tailored recycling solution that fits your business needs perfectly.",
    },
    ar: {
      question: "هل يمكنكم بناء خط إعادة تدوير مخصص لمصنعي؟",
      answer:
        "نعم، التخصيص هو تخصصنا. نقوم بتحليل متطلبات الإنتاج الخاصة بك، ومساحة المصنع، والمخرجات المستهدفة لتصميم وتصنيع حل إعادة تدوير مفصل يناسب احتياجات عملك تمامًا.",
    },
  },
  {
    en: {
      question: "How does the Smart Monitoring system work?",
      answer:
        "Our IoT-enabled machines connect to the Grenco mobile app, allowing you to monitor production rates, energy usage, and machine health in real-time. You receive instant alerts for maintenance or operational anomalies.",
    },
    ar: {
      question: "كيف يعمل نظام المراقبة الذكي؟",
      answer:
        "تتصل ماكيناتنا المزودة بتقنية IoT بتطبيق جرينكوا، مما يسمح لك بمراقبة معدلات الإنتاج واستهلاك الطاقة وحالة الماكينة في الوقت الفعلي. ستتلقى تنبيهات فورية للصيانة أو أي مشاكل تشغيلية.",
    },
  },
];

const faqs = computed(() => {
  return rawFaqs.map((item) => (locale.value === "ar" ? item.ar : item.en));
});
</script>

<template>
  <div class="page-wrapper">
    <div class="container section">
      <h1 class="page-title text-center" data-aos="fade-up">
        {{ locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions" }}
      </h1>
      <p
        class="page-subtitle text-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{
          locale === "ar"
            ? "إجابات على استفساراتكم حول منتجات وخدمات جرينكوا"
            : "Answers to your inquiries about Grenco products and services"
        }}
      </p>

      <div class="faq-grid" data-aos="fade-up" data-aos-delay="200">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-card"
          :class="{ 'is-open': activeIndex === index }"
        >
          <div class="faq-header" @click="toggleFaq(index)">
            <h3 class="question-text">{{ faq.question }}</h3>
            <span class="toggle-icon">
              <i
                class="pi"
                :class="activeIndex === index ? 'pi-minus' : 'pi-plus'"
              ></i>
            </span>
          </div>

          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <p class="answer-text">{{ faq.answer }}</p>
            </div>
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

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.faq-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden; /* يحافظ على الحواف الدائرية */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.faq-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* حالة الفتح: إضافة حدود ملونة */
.faq-card.is-open {
  border-color: var(--color-primary-light);
  background-color: var(--color-white);
}

/* === Header Styles === */
.faq-header {
  padding: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: var(--color-white);
  transition: background-color 0.3s ease;
}

/* تغيير لون الهيدر قليلاً عند الفتح */
.faq-card.is-open .faq-header {
  background-color: rgba(
    var(--color-primary-rgb),
    0.02
  ); /* اختياري: لون خفيف جداً */
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
}

/* تلوين السؤال عند الفتح */
.faq-card.is-open .question-text {
  color: var(--color-primary);
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--color-gray-100);
  border-radius: 50%;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-left: var(--space-3); /* مسافة في الإنجليزي */
  transition: all 0.3s ease;
}

.faq-card.is-open .toggle-icon {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: rotate(180deg);
}

/* === Body Animation (The Fix) === */
.faq-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease-out;
}

.faq-card.is-open .faq-body-wrapper {
  grid-template-rows: 1fr;
}

.faq-body-inner {
  overflow: hidden;
  /* فصلنا الـ padding هنا لضمان عدم اختفاء النص */
}

.answer-text {
  padding: 0 var(--space-4) var(--space-4) var(--space-4);
  margin: 0;
  color: var(--color-gray-600);
  line-height: 1.7;
  /* إضافة خط فاصل خفيف من الأعلى */
  border-top: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.faq-card.is-open .answer-text {
  border-top-color: var(--color-gray-100);
  padding-top: var(--space-3); /* مسافة إضافية عند الفتح */
}

/* === RTL Support === */
:deep(.rtl) .toggle-icon {
  margin-left: 0;
  margin-right: var(--space-3);
}

.page-title {
  color: var(--color-secondary);
  margin-bottom: var(--space-2);
}

.page-subtitle {
  color: var(--color-gray-600);
}
</style>
