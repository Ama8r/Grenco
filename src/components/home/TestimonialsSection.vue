<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const rawTestimonials = [
  {
    id: 1,
    image: "/assets/images/Testimonials/Man-Avatar.webp",
    ar: {
      name: "م. إبراهيم سيد",
      position: "مهندس ميكاترونيكس",
      company: "",
      quote: " ما شاء الله شركه جرينكوا شركه متميزه بالتوفيق ليها دايما يارب",
    },
    en: {
      name: "Eng. Ibrahim Sayed",
      position: "Mechatronics Engineer",
      company: "",
      quote:
        "Grenco is truly a distinguished company. I wish them continued success and prosperity.",
    },
  },
  {
    id: 2,
    image: "/assets/images/Testimonials/Man-Avatar.webp",
    ar: {
      name: "م. أحمد عبدالسلام",
      position: "مدير تشغيل",
      company: "مصنع بلاستيك",
      quote:
        " بصراحة تعاملنا مع جرينكوا كان مريح جدًا، الماكينة صغيرة الحجم وقوية في نفس الوقت، والإنتاجية أعلى من اللي كنا متوقعينه. فريق محترم ودعم فني ممتاز 👌",
    },
    en: {
      name: "Eng. Ahmed Abdelsalam",
      position: "Operations Manager",
      company: "Plastic Factory",
      quote:
        "Dealing with Grenco was very comfortable. The machine is compact yet powerful, and productivity exceeded our expectations. A respectful team with excellent technical support.",
    },
  },
  {
    id: 3,
    image: "/assets/images/Testimonials/Man-Avatar.webp",
    ar: {
      name: "م. محمد فؤاد",
      position: "صاحب ورشة",
      company: "إعادة تدوير",
      quote:
        " جربنا أكتر من ماكينة قبل كده، لكن جرينكوا فرقت معانا في الجودة والتصميم الذكي وتوفير المساحة. اختيار موفق لأي حد عايز يبدأ أو يطوّر شغله 🔧♻️",
    },
    en: {
      name: "Eng. Mohamed Fouad",
      position: "Owner",
      company: "Recycling Workshop",
      quote:
        "We tried several machines before, but Grenco made a difference in quality, smart design, and space saving. A successful choice for anyone looking to start or upgrade their business.",
    },
  },
];

const testimonials = computed(() => {
  return rawTestimonials.map((item) => ({
    id: item.id,
    image: item.image,
    ...item[locale.value === "ar" ? "ar" : "en"],
  }));
});

const activeTestimonial = ref(0);

const nextTestimonial = () => {
  activeTestimonial.value =
    (activeTestimonial.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  activeTestimonial.value =
    (activeTestimonial.value - 1 + testimonials.value.length) %
    testimonials.value.length;
};

let autoplayInterval: any = null;

const startAutoplay = () => {
  if (autoplayInterval) return;
  autoplayInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <section class="section testimonials-section">
    <div class="container">
      <h2 class="section-title text-center" data-aos="fade-up">
        {{ t("testimonials.title") }}
      </h2>
      <p
        class="section-subtitle text-center mb-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {{ t("testimonials.subtitle") }}
      </p>

      <div
        class="testimonials-wrapper"
        data-aos="fade-up"
        data-aos-delay="200"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <button
          @click="prevTestimonial"
          class="nav-btn prev-btn hide-on-mobile"
        >
          <i
            class="pi"
            :class="locale === 'ar' ? 'pi-arrow-right' : 'pi-arrow-left'"
          ></i>
        </button>

        <div class="slider-container">
          <div
            class="testimonials-track"
            :style="{ transform: `translateX(-${activeTestimonial * 100}%)` }"
            dir="ltr"
          >
            <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="testimonial-slide"
            >
              <div
                class="testimonial-card"
                :dir="locale === 'ar' ? 'rtl' : 'ltr'"
              >
                <i class="pi pi-quote-right quote-watermark"></i>

                <div class="content-body">
                  <p class="quote-text">"{{ testimonial.quote }}"</p>

                  <div class="author-block">
                    <div class="author-img-wrapper">
                      <img :src="testimonial.image" :alt="testimonial.name" />
                    </div>
                    <div class="author-info">
                      <h4 class="name">{{ testimonial.name }}</h4>
                      <span class="role">{{ testimonial.position }}</span>
                      <span v-if="testimonial.company" class="company">
                        - {{ testimonial.company }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="nextTestimonial"
          class="nav-btn next-btn hide-on-mobile"
        >
          <i
            class="pi"
            :class="locale === 'ar' ? 'pi-arrow-left' : 'pi-arrow-right'"
          ></i>
        </button>
      </div>

      <div class="dots-container">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          class="dot"
          :class="{ active: index === activeTestimonial }"
          @click="activeTestimonial = index"
          aria-label="Go to testimonial"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: var(--space-7) 0;
  background: linear-gradient(to bottom, var(--color-white), #f8f9fa);
  overflow: hidden;
}

.section-title {
  margin-bottom: var(--space-2);
}

.section-subtitle {
  max-width: 600px;
  margin: 0 auto var(--space-6);
  color: var(--color-gray-600);
}

/* حاوية السلايدر الرئيسية */
.testimonials-wrapper {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* Slider Mechanics */
.slider-container {
  overflow: hidden;
  width: 100%;
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
  background: var(--color-white);
  flex: 1;
  /* إضافة مهمة: تمنع تمدد الفليكس خارج الحدود */
  min-width: 0;
}

.testimonials-track {
  display: flex;
  width: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform; /* تحسين الأداء */
}

.testimonial-slide {
  min-width: 100%;
  width: 100%; /* تأكيد العرض */
  flex-shrink: 0;
  box-sizing: border-box; /* يضمن احتساب البادينج داخل العرض */
}

/* Card Design */
.testimonial-card {
  padding: var(--space-6) var(--space-5);
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  width: 100%;
  box-sizing: border-box; /* مهم جداً لمنع الخروج عن الحواف */
}

/* Watermark Quote */
.quote-watermark {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8rem;
  color: var(--color-primary);
  opacity: 0.05;
  pointer-events: none;
  z-index: 0;
}

.content-body {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.quote-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--color-secondary);
  font-style: italic;
  margin-bottom: var(--space-5);
  font-weight: 500;
  word-wrap: break-word;
  padding: 0 10px; /* هوامش جانبية بسيطة للنص */
}

/* Author Section */
.author-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.author-img-wrapper {
  width: 70px;
  height: 70px;
  padding: 3px;
  border: 2px dashed var(--color-primary);
  border-radius: 50%;
}

.author-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.author-info .name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin: 0;
}

.author-info .role,
.author-info .company {
  font-size: 0.9rem;
  color: var(--color-gray-600);
}

/* Navigation Buttons */
.nav-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid var(--color-gray-200);
  background: var(--color-white);
  color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 2; /* التأكد من ظهور الأزرار فوق الكارد */
}

.nav-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  transform: scale(1.1);
}

/* Dots */
.dots-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: var(--space-4);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-gray-300);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 30px;
  border-radius: 5px;
  background: var(--color-primary);
}

/* =========================================
   Mobile Optimization (التعديلات الجذرية)
   ========================================= */
@media (max-width: 768px) {
  .hide-on-mobile {
    display: none !important;
  }

  .testimonials-section {
    padding: var(--space-5) 0; /* تقليل بادينج السكشن */
  }

  .testimonials-wrapper {
    gap: 0;
    padding: 0; /* إزالة البادينج الجانبي للحاوية */
    width: 100%;
  }

  .slider-container {
    border-radius: var(--radius-lg); /* تقليل نصف القطر قليلاً */
    box-shadow: none; /* تخفيف الظل في الموبايل لزيادة المساحة البصرية */
    background: transparent; /* دمج الخلفية */
  }

  /* تعديل الكارد في الموبايل */
  .testimonial-card {
    /* تقليل البادينج بشكل كبير جداً لمنع القص */
    padding: var(--space-4) var(--space-3);
    min-height: auto; /* السماح للكارد بالتقلص حسب المحتوى */
  }

  /* تصغير حجم خط الاقتباس */
  .quote-text {
    font-size: 1rem; /* تصغير الخط */
    line-height: 1.5;
    margin-bottom: var(--space-4);
    padding: 0; /* إزالة أي بادينج جانبي للنص نفسه */
  }

  .quote-watermark {
    font-size: 4rem; /* تصغير العلامة المائية */
    top: 0;
  }

  /* تصغير صورة واسم العميل */
  .author-img-wrapper {
    width: 55px;
    height: 55px;
  }

  .author-info .name {
    font-size: 1rem;
  }

  .author-info .role {
    font-size: 0.8rem;
  }
}
</style>
