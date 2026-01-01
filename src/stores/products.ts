import { defineStore } from "pinia";
import { ref } from "vue";

// واجهة لتعريف النصوص المترجمة
export interface LocalizedString {
  en: string;
  ar: string;
}

// واجهة المنتج المحدثة
export interface Product {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  fullDescription?: LocalizedString;
  // الحقول الجديدة المطلوبة
  customizationText: LocalizedString;
  videoNotSupported: LocalizedString;
  // تسميات المواصفات (Labels) الخاصة بكل منتج
  specsLabels: {
    [key: string]: LocalizedString;
  };
  // قيم المواصفات
  specs: {
    [key: string]: string | number;
  };
  plasticTypes: LocalizedString[];
  features: LocalizedString[];
  image: string;
  gallery?: string[];
}

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([
    {
      id: 1,
      name: {
        en: "Screws & Barrels",
        ar: "الفتيل والشميز (Screws & Barrels)",
      },
      description: {
        en: "Durable, customized screws and barrels designed to enhance efficiency and stability in injection molding, extrusion, and recycling.",
        ar: "فتيل وشميز متين ومخصص مصمم لتعزيز الكفاءة والاستقرار في عمليات الحقن والبثق وإعادة التدوير.",
      },
      fullDescription: {
        en: "Grenco delivers high-quality screws and barrels engineered for superior performance in injection molding, extrusion, and recycling applications. Each unit is manufactured from premium alloy steel and undergoes advanced heat-treatment processes to ensure maximum strength and stability during continuous operation. With full customization available for all dimensions and specifications, the company provides tailored solutions that enhance production efficiency and deliver long-term reliability across industrial environments.",
        ar: "تقدم جرينكوا براغي (فتيل) وسبائك (شميز) عالية الجودة مصممة لأداء فائق في تطبيقات الحقن والبثق وإعادة التدوير. يتم تصنيع كل وحدة من سبائك الصلب الممتازة وتخضع لعمليات معالجة حرارية متقدمة لضمان أقصى قدر من القوة والاستقرار أثناء التشغيل المستمر. مع توفر التخصيص الكامل لجميع الأبعاد والمواصفات، توفر الشركة حلولاً مصممة خصيصًا تعزز كفاءة الإنتاج وتوفر موثوقية طويلة الأمد في البيئات الصناعية.",
      },
      customizationText: {
        en: "We offer flexible customization options to meet different operational requirements, including dimension selection, material selection, and the application of various types of treatments, in addition to design modifications based on the intended use and machine capacity.",
        ar: "نوفّر خيارات تخصيص مرنة لتلبية متطلبات التشغيل المختلفة، بما في ذلك اختيار الأبعاد، واختيار المواد، وتطبيق أنواع متعددة من المعالجات، بالإضافة إلى إجراء تعديلات على التصميم وفقًا لغرض الاستخدام وسعة الماكينة.",
      },
      videoNotSupported: {
        en: "Video preview is not available for this component.",
        ar: "معاينة الفيديو غير متاحة لهذا المكون.",
      },
      specs: {
        capacity: "50 kg/hour",
        power: "3.5 kW",
        dimensions: "1.2m x 0.8m x 1.5m",
        weight: "180 kg",
        noise: "65 dB",
      },
      specsLabels: {
        capacity: { en: "Screws", ar: "البراغي" },
        power: { en: "Barrels", ar: "البراميل" },
        dimensions: { en: "End Caps", ar: "أغطية النهايات" },
        weight: { en: "Nozzles", ar: "الفوهات" },
        noise: { en: "Valves", ar: "الصمامات" },
      },
      plasticTypes: [
        { en: "PET", ar: "PET" },
        { en: "PP", ar: "PP" },
        { en: "PS", ar: "PS" },
        { en: "HDPE", ar: "HDPE" },
        { en: "LDPE", ar: "LDPE" },
        { en: "EVA", ar: "EVA" },
      ],
      features: [
        { en: "Precision-crafted design", ar: "تصميم دقيق الصنع" },
        { en: "High-strength steel", ar: "فولاذ عالي القوة" },
        { en: "Advanced heat-treatment", ar: "معالجة حرارية متقدمة" },
        { en: "Fully customized manufacturing", ar: "تصنيع مخصص بالكامل" },
      ],
      image: "/assets/images/products/Screws_Barrels/1.png",
      gallery: [
        "/assets/images/products//Screws_Barrels/1-1.jpg",
        "/assets/images/products/Screws_Barrels/2.jpg",
        "/assets/images/products/Screws_Barrels/3.jpg",
        "/assets/images/products/Screws_Barrels/4.jpg",
      ],
    },
    {
      id: 2,
      name: {
        en: "Plastic Shredder Machines",
        ar: "ماكينات تكسير البلاستيك ",
      },
      description: {
        en: "Robust and safe plastic shredders delivering stable performance and cost-effective solutions for recycling plants.",
        ar: "كسارات بلاستيك قوية وآمنة تقدم أداءً مستقرًا وحلولاً فعالة من حيث التكلفة لمصانع إعادة التدوير.",
      },
      fullDescription: {
        en: "Grenco provides high-reliability plastic shredding machines engineered for strong and consistent performance in recycling facilities and industrial workshops. With customizable sizes and capacities, the machines efficiently process various plastic materials while maintaining a stable and uniform shredded output. The reinforced construction ensures smooth operation under heavy workloads, while the intelligent safety system reduces downtime and enhances operator protection. Thanks to its maintenance-friendly design, the shredder offers a durable and cost-effective solution tailored for modern recycling operations.",
        ar: "توفر جرينكوا ماكينات تكسير بلاستيك عالية الموثوقية مصممة لأداء قوي ومتسق في منشآت إعادة التدوير والورش الصناعية. مع أحجام وقدرات قابلة للتخصيص، تعالج الماكينات مواد بلاستيكية مختلفة بكفاءة مع الحفاظ على مخرجات تكسير مستقرة وموحدة. يضمن البناء المقوى التشغيل السلس تحت أحمال العمل الثقيلة، بينما يقلل نظام الأمان الذكي من وقت التوقف ويعزز حماية المشغل. بفضل تصميمها الصديق للصيانة، توفر الكسارة حلاً متينًا وفعالاً من حيث التكلفة مصممًا لعمليات إعادة التدوير الحديثة.",
      },
      customizationText: {
        en: "We offer a wide range of plastic shredders designed to handle various types of plastics, accommodating different shapes and sizes. Each machine can be customized according to the client’s specific requirements, including the number of blades, cutting dimensions, and overall design. This ensures optimal performance and efficiency for every type of plastic processing need.",
        ar: "نقدّم مجموعة واسعة من ماكينات فرم البلاستيك المصمّمة للتعامل مع أنواع مختلفة من البلاستيك وبمختلف الأشكال والأحجام. ويمكن تخصيص كل ماكينة حسب متطلبات العميل الخاصة، بما في ذلك عدد الشفرات، وأبعاد التقطيع، والتصميم العام. ويضمن ذلك أداءً مثاليًا وكفاءة عالية لتلبية جميع احتياجات معالجة البلاستيك.",
      },
      videoNotSupported: {
        en: "Video demonstration coming soon.",
        ar: "فيديو توضيحي قريباً.",
      },
      specs: {
        capacity: "120 kg/hour",
        power: "7.5 kW",
        dimensions: "2.1m x 1.2m x 1.8m",
        weight: "350 kg",
        noise: "70 dB",
      },
      specsLabels: {
        capacity: { en: "20*30", ar: "20*30" },
        power: { en: "40*50", ar: "40*50" },
        dimensions: { en: "50*60", ar: "50*60" },
        weight: { en: "50*70", ar: "50*70" },
        noise: { en: "60*70", ar: "60*70" },
        noise1: { en: "60*80", ar: "60*80" },
        noise2: { en: "60*90", ar: "60*90" },
        noise3: { en: "70*100", ar: "70*100" },
        noise4: { en: "90*140", ar: "90*140" },
      },
      plasticTypes: [
        { en: "PET", ar: "PET" },
        { en: "PP", ar: "PP" },
        { en: "PS", ar: "PS" },
        { en: "HDPE", ar: "HDPE" },
        { en: "LDPE", ar: "LDPE" },
        { en: "EVA", ar: "EVA" },
      ],
      features: [
        { en: "Efficient plastic shredding", ar: "تكسير بلاستيك فعال" },
        { en: "Multiple customizable sizes", ar: "أحجام متعددة قابلة للتخصيص" },
        { en: "Reinforced steel structure", ar: "هيكل فولاذي مقوى" },
        { en: "Smart overload protection", ar: "حماية ذكية من الحمل الزائد" },
        { en: "Low energy consumption", ar: "استهلاك منخفض للطاقة" },
        { en: "Quick maintenance access", ar: "سهولة الوصول للصيانة" },
      ],
      image: "/assets/images/products/Plastic_Shredder/1.jpg",
      gallery: [
        "/assets/images/products/Plastic_Shredder/1-1.jpg",
        "/assets/images/products/Plastic_Shredder/2.jpg",
        "/assets/images/products/Plastic_Shredder/3.jpg",
      ],
    },
    {
      id: 3,
      name: {
        en: "Mini Plastic Recycling Machines",
        ar: "ماكينات إعادة تدوير صغيرة",
      },
      description: {
        en: "Compact, smart recycling machines supporting multiple processes with intelligent monitoring for continuous operation",
        ar: "ماكينات إعادة تدوير صغيرة وذكية تدعم عمليات متعددة مع مراقبة ذكية للتشغيل المستمر.",
      },
      fullDescription: {
        en: "Grenco offers compact and flexible mini plastic recycling machines designed to support multiple recycling processes within a smart and efficient framework. The system enables operations such as shredding, thermal processing, and material preparation without requiring large production spaces or complex setups. Equipped with an IIoT-enabled monitoring platform, the machine provides real-time insights, productivity analytics, and maintenance alerts to ensure continuous and stable operation. This makes it an excellent solution for small facilities, R&D laboratories, and startups seeking an affordable and technologically advanced recycling system.",
        ar: "تقدم جرينكوا ماكينات إعادة تدوير بلاستيك صغيرة مدمجة ومرنة مصممة لدعم عمليات إعادة تدوير متعددة ضمن إطار ذكي وفعال. يتيح النظام عمليات مثل التكسير والمعالجة الحرارية وتجهيز المواد دون الحاجة لمساحات إنتاج كبيرة أو تجهيزات معقدة. مزودة بمنصة مراقبة تدعم تقنية إنترنت الأشياء الصناعية (IIoT)، توفر الماكينة رؤى في الوقت الفعلي وتحليلات للإنتاجية وتنبيهات للصيانة لضمان تشغيل مستمر ومستقر. هذا يجعلها حلاً ممتازًا للمنشآت الصغيرة ومختبرات البحث والتطوير والشركات الناشئة التي تبحث عن نظام إعادة تدوير متطور تقنيًا وبأسعار معقولة.",
      },
      customizationText: {
        en: "We offer compact machines in custom sizes to suit each client’s needs, including Mini Shredder Machine, Mini Extruder Machine, Mini Granulator Machine, Mini Pelletizer Machine, and Mini Injection Machine, with options to accommodate various production capacities.",
        ar: "نوفّر ماكينات مدمجة بأحجام مخصّصة لتناسب احتياجات كل عميل، وتشمل: ماكينة فرم صغيرة، ماكينة بثق صغيرة، ماكينة تحبيب صغيرة، ماكينة تكوير صغيرة، وماكينة حقن صغيرة، مع خيارات متعددة لتناسب مختلف الطاقات الإنتاجية.",
      },
      videoNotSupported: {
        en: "Your browser does not support the video tag.",
        ar: "متصفحك لا يدعم تشغيل الفيديو.",
      },
      specs: {
        capacity: "500 kg/hour",
        power: "22 kW",
        dimensions: "3.5m x 2.2m x 2.5m",
        weight: "1200 kg",
        noise: "75 dB",
      },
      specsLabels: {
        capacity: { en: "Mini Shredder", ar: "ماكينة فرم صغيرة" },
        power: { en: "Mini Extruder", ar: "ماكينة بثق صغيرة" },
        dimensions: { en: "Mini Injection", ar: "ماكينة حقن صغيرة" },
        // weight: { en: "Machine Weight", ar: "وزن الماكينة" },
        // noise: { en: "Operation Noise", ar: "ضجيج التشغيل" },
      },
      plasticTypes: [
        { en: "PET", ar: "PET" },
        { en: "PP", ar: "PP" },
        { en: "PS", ar: "PS" },
        { en: "HDPE", ar: "HDPE" },
        { en: "LDPE", ar: "LDPE" },
        { en: "EVA", ar: "EVA" },
      ],
      features: [
        { en: "Compact versatile design", ar: "تصميم مدمج متعدد الاستخدامات" },
        { en: "Perfect for workshops", ar: "مثالية للورش" },
        { en: "Smart IIoT control", ar: "تحكم ذكي عبر إنترنت الأشياء (IIoT)" },
        { en: "User-friendly interface", ar: "واجهة سهلة الاستخدام" },
        { en: "Energy-efficient performance", ar: "أداء موفر للطاقة" },
      ],
      image: "/assets/images/products/Mini_Plastic/1.jpg",
      gallery: [
        "/assets/images/products/Mini_Plastic/1-1.jpg",
        "/assets/images/products/Mini_Plastic/2.jpg",
        "/videos/video_1.mp4",
      ],
    },
  ]);

  function getProductById(id: number): Product | undefined {
    return products.value.find((product) => product.id === id);
  }

  return { products, getProductById };
});
