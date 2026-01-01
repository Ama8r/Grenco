<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const content = computed(() => {
  if (locale.value === "ar") {
    return {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 17 فبراير 2025",
      sections: [
        {
          heading: "1. مقدمة",
          text: "تحترم جرينكوا (Grenco) خصوصيتك وتلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند زيارة موقعنا الإلكتروني أو استخدام خدماتنا الذكية.",
        },
        {
          heading: "2. المعلومات التي نجمعها",
          text: "قد نجمع معلومات شخصية مثل الاسم، عنوان البريد الإلكتروني، ورقم الهاتف عند ملء نماذج التواصل. بالنسبة لمستخدمي الماكينات الذكية، قد نجمع بيانات تشغيلية تقنية لتحسين الأداء والصيانة.",
        },
        {
          heading: "3. استخدام المعلومات",
          text: "نستخدم المعلومات لتقديم خدماتنا، التواصل معك بشأن المنتجات، تحسين تجربة المستخدم، وإرسال تحديثات تقنية هامة. لا نقوم ببيع بياناتك لأطراف ثالثة.",
        },
        {
          heading: "4. أمان البيانات",
          text: "نطبق تدابير أمنية تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفصاح.",
        },
      ],
    };
  } else {
    return {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: February 17, 2025",
      sections: [
        {
          heading: "1. Introduction",
          text: "Grenco respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our smart services.",
        },
        {
          heading: "2. Information We Collect",
          text: "We may collect personal information such as name, email address, and phone number when you fill out contact forms. For smart machine users, we may collect technical operational data to improve performance and maintenance.",
        },
        {
          heading: "3. How We Use Information",
          text: "We use the information to provide our services, communicate with you regarding products, improve user experience, and send important technical updates. We do not sell your data to third parties.",
        },
        {
          heading: "4. Data Security",
          text: "We implement appropriate technical and organizational security measures to protect your data from unauthorized access, alteration, or disclosure.",
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
        <p class="last-updated">{{ content.lastUpdated }}</p>

        <div class="content-body">
          <div
            v-for="(section, index) in content.sections"
            :key="index"
            class="policy-section"
          >
            <h2>{{ section.heading }}</h2>
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
  margin-bottom: var(--space-2);
}

.last-updated {
  color: var(--color-gray-500);
  margin-bottom: var(--space-5);
  font-size: 0.9rem;
  border-bottom: 1px solid var(--color-gray-200);
  padding-bottom: var(--space-4);
}

.policy-section {
  margin-bottom: var(--space-5);
}

.policy-section h2 {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: var(--space-3);
}

.policy-section p {
  color: var(--color-gray-700);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .legal-content {
    padding: var(--space-4);
  }
}
</style>
