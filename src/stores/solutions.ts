import { defineStore } from "pinia";
import { ref } from "vue";

export interface Solution {
  id: number;
  translationKey: string;
  icon: string;
  image: string;
  benefits: { en: string; ar: string }[];
}

export const useSolutionsStore = defineStore("solutions", () => {
  const solutions = ref<Solution[]>([
    {
      id: 1,
      translationKey: "training", // ورش العمل والتدريب
      icon: "pi-book", // أيقونة تعبر عن التعليم
      image: "/assets/images/Services/3.png", // تأكد من أن هذا المسار للصورة المناسبة
      benefits: [
        {
          en: "Professional plastic recycling training programs",
          ar: "برامج تدريبية احترافية في إعادة تدوير البلاستيك",
        },
        {
          en: "Courses for factories, universities, and schools",
          ar: "دورات للمصانع والجامعات والمدارس",
        },
        {
          en: "Hands-on workshops and real industrial case studies",
          ar: "ورش عمل عملية ودراسات حالة صناعية واقعية",
        },
        {
          en: "Improved technical skills and safety awareness",
          ar: "تحسين المهارات الفنية والوعي بالسلامة",
        },
        {
          en: "Customizable training aligned with industry needs",
          ar: "تدريب قابل للتخصيص يتماشى مع احتياجات الصناعة",
        },
        {
          en: "Workforce development for the recycling sector",
          ar: "تطوير القوى العاملة لقطاع إعادة التدوير",
        },
      ],
    },
    {
      id: 2,
      translationKey: "automation", // حلول الأتمتة
      icon: "pi-cog", // أيقونة التروس/الأتمتة
      image: "/assets/images/Services/2.jpg",
      benefits: [
        {
          en: "Reduced labor costs through automation",
          ar: "تقليل تكاليف العمالة من خلال الأتمتة",
        },
        {
          en: "Increased productivity and process stability",
          ar: "زيادة الإنتاجية واستقرار العمليات",
        },
        {
          en: "Improved quality control and reduced waste",
          ar: "تحسين مراقبة الجودة وتقليل الهدر",
        },
        {
          en: "Enhanced industrial safety standards",
          ar: "تعزيز معايير السلامة الصناعية",
        },
        {
          en: "Scalable automation systems for future growth",
          ar: "أنظمة أتمتة قابلة للتوسع للنمو المستقبلي",
        },
      ],
    },
    {
      id: 3,
      translationKey: "consulting", // الاستشارات الهندسية
      icon: "pi-briefcase", // أيقونة الاستشارات
      image: "/assets/images/Services/1.jpg",
      benefits: [
        {
          en: "Expert consulting for plastic recycling facilities",
          ar: "استشارات الخبراء لمنشآت إعادة تدوير البلاستيك",
        },
        {
          en: "Optimized machine and equipment selection",
          ar: "اختيار أمثل للماكينات والمعدات",
        },
        {
          en: "Reduced project risks and investment costs",
          ar: "تقليل مخاطر المشروع وتكاليف الاستثمار",
        },
        {
          en: "Efficient and scalable recycling line design",
          ar: "تصميم خطوط إعادة تدوير فعالة وقابلة للتوسع",
        },
        {
          en: "Improved energy efficiency and operational performance",
          ar: "تحسين كفاءة الطاقة والأداء التشغيلي",
        },
      ],
    },
  ]);

  function getSolutionById(id: number) {
    return solutions.value.find((s) => s.id === id);
  }

  return { solutions, getSolutionById };
});
