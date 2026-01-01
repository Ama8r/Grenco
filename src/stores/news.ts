import { defineStore } from "pinia";
import { ref } from "vue";

export interface NewsEntry {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: {
    url: string;
    title: string;
  };
  category: string;
}

// بيانات ثابتة
const MOCK_NEWS = {
  "en-US": [
    {
      id: "1",
      title:
        "Grenco Wins 2nd Place at Smart Industry Hackathon, Creativa Beni Suef",
      excerpt:
        "After 4 days of fierce competition, Grenco secured 2nd place at the Smart Industry Hackathon.",
      content: `
        <p>After 4 days full of challenges and innovation and fierce competition among 17 teams, Grenco stood out and secured 2nd place at the Smart Industry Hackathon held at Creativa Beni Suef!</p>
        <p>The competition was intense, with every team presenting innovative ideas and remarkable technical solutions, but Grenco’s project captured attention with its practical innovation and real-world impact.</p>
        <p>The Smart Industry Hackathon journey was more than just a competition—it was an experience of intensive learning and preparation for the judges, filled with challenges that tested teams’ skills in design, execution, and creativity.</p>
        <p>This achievement reflects the dedication, skill, and ingenuity of the Grenco team.</p>
        <p>We are proud of this accomplishment, which highlights Grenco’s commitment to smart, sustainable recycling solutions and supports our ongoing journey toward continuous innovation. 🏆♻️</p>
      `,
      date: "2025-02-17",
      image: {
        url: "/assets/images/News/1.jpg",
        title: "Grenco Team",
      },
      category: "Awards",
    },
  ],
  ar: [
    {
      id: "1",
      title:
        "جرينكواا تفوز بالمركز الثاني في هاكاثون الصناعة الذكية، كريتيفا بني سويف",
      excerpt:
        "بعد 4 أيام من المنافسة القوية، حصلت جرينكواا على المركز الثاني في هاكاثون الصناعة الذكية.",
      content: `
        <p>بعد 4 أيام مليئة بالتحديات والابتكار والمنافسة الشرسة بين 17 فريقًا، تميزت جرينكواا وحصلت على المركز الثاني في هاكاثون الصناعة الذكية الذي أقيم في كريتيفا بني سويف!</p>
        <p>كانت المنافسة شديدة، حيث قدم كل فريق أفكارًا مبتكرة وحلولًا تقنية رائعة، لكن مشروع جرينكواا لفت الأنظار بابتكاره العملي وتأثيره الواقعي.</p>
        <p>لم تكن رحلة هاكاثون الصناعة الذكية مجرد مسابقة - بل كانت تجربة تعلم مكثف وتحضير للجنة التحكيم، مليئة بالتحديات التي اختبرت مهارات الفرق في التصميم والتنفيذ والإبداع.</p>
        <p>يعكس هذا الإنجاز تفاني ومهارة وبراعة فريق جرينكواا.</p>
        <p>نحن فخورون بهذا الإنجاز الذي يسلط الضوء على التزام جرينكواا بحلول إعادة التدوير الذكية والمستدامة ويدعم رحلتنا المستمرة نحو الابتكار المتواصل. 🏆♻️</p>
      `,
      date: "2025-02-17",
      image: {
        url: "/assets/images/News/1.jpg",
        title: "فريق جرينكواا",
      },
      category: "جوائز",
    },
  ],
};

export const useNewsStore = defineStore("news", () => {
  const news = ref<NewsEntry[]>([]);
  // 1. إعادة تعريف المتغيرات المفقودة لإصلاح الأخطاء في القوالب (Templates)
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 2. تحويل الدالة إلى async لكي تعيد Promise وتعمل مع .then() في NewsDetailsView
  const fetchNews = async (currentLocale = "en-US") => {
    loading.value = true;
    error.value = null;

    try {
      // محاكاة بسيطة للعملية (اختياري)
      const localeKey = currentLocale === "ar" ? "ar" : "en-US";
      // @ts-ignore
      news.value = MOCK_NEWS[localeKey] || MOCK_NEWS["en-US"];
    } catch (err) {
      error.value = "Failed to load news";
    } finally {
      loading.value = false;
    }
  };

  const getArticleById = (
    id: string,
    currentLocale = "en-US"
  ): NewsEntry | undefined => {
    const localeKey = currentLocale === "ar" ? "ar" : "en-US";
    // @ts-ignore
    const articles = MOCK_NEWS[localeKey] || MOCK_NEWS["en-US"];
    return articles.find((article: NewsEntry) => article.id === id);
  };

  // 3. تصدير المتغيرات الجديدة
  return { news, loading, error, fetchNews, getArticleById };
});

// import { defineStore } from "pinia";
// import { ref } from "vue";

// export interface NewsEntry {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   image: {
//     url: string;
//     title: string;
//   };
//   category: string;
// }

// // بيانات ثابتة للخبر الجديد (مأخوذة من الملف النصي 1.txt)
// const MOCK_NEWS = {
//   "en-US": [
//     {
//       id: "1",
//       title:
//         "Grenco Wins 2nd Place at Smart Industry Hackathon, Creativa Beni Suef",
//       excerpt:
//         "After 4 days of fierce competition, Grenco secured 2nd place at the Smart Industry Hackathon.",
//       content: `
//         <p>After 4 days full of challenges and innovation and fierce competition among 17 teams, Grenco stood out and secured 2nd place at the Smart Industry Hackathon held at Creativa Beni Suef!</p>
//         <p>The competition was intense, with every team presenting innovative ideas and remarkable technical solutions, but Grenco’s project captured attention with its practical innovation and real-world impact.</p>
//         <p>The Smart Industry Hackathon journey was more than just a competition—it was an experience of intensive learning and preparation for the judges, filled with challenges that tested teams’ skills in design, execution, and creativity.</p>
//         <p>This achievement reflects the dedication, skill, and ingenuity of the Grenco team.</p>
//         <p>We are proud of this accomplishment, which highlights Grenco’s commitment to smart, sustainable recycling solutions and supports our ongoing journey toward continuous innovation. 🏆♻️</p>
//       `,
//       date: "2025-02-17",
//       image: {
//         url: "/assets/images/News/1.jpg",
//         title: "Grenco Team",
//       },
//       category: "Awards",
//     },
//   ],
//   ar: [
//     {
//       id: "1",
//       title:
//         "جرينكواا تفوز بالمركز الثاني في هاكاثون الصناعة الذكية، كريتيفا بني سويف",
//       excerpt:
//         "بعد 4 أيام من المنافسة القوية، حصلت جرينكواا على المركز الثاني في هاكاثون الصناعة الذكية.",
//       content: `
//         <p>بعد 4 أيام مليئة بالتحديات والابتكار والمنافسة الشرسة بين 17 فريقًا، تميزت جرينكواا وحصلت على المركز الثاني في هاكاثون الصناعة الذكية الذي أقيم في كريتيفا بني سويف!</p>
//         <p>كانت المنافسة شديدة، حيث قدم كل فريق أفكارًا مبتكرة وحلولًا تقنية رائعة، لكن مشروع جرينكواا لفت الأنظار بابتكاره العملي وتأثيره الواقعي.</p>
//         <p>لم تكن رحلة هاكاثون الصناعة الذكية مجرد مسابقة - بل كانت تجربة تعلم مكثف وتحضير للجنة التحكيم، مليئة بالتحديات التي اختبرت مهارات الفرق في التصميم والتنفيذ والإبداع.</p>
//         <p>يعكس هذا الإنجاز تفاني ومهارة وبراعة فريق جرينكواا.</p>
//         <p>نحن فخورون بهذا الإنجاز الذي يسلط الضوء على التزام جرينكواا بحلول إعادة التدوير الذكية والمستدامة ويدعم رحلتنا المستمرة نحو الابتكار المتواصل. 🏆♻️</p>
//       `,
//       date: "2025-02-17",
//       image: {
//         url: "/assets/images/News/1.jpg",
//         title: "فريق جرينكواا",
//       },
//       category: "جوائز",
//     },
//   ],
// };

// export const useNewsStore = defineStore("news", () => {
//   const news = ref<NewsEntry[]>([]);
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   const fetchNews = async (currentLocale = "en-US") => {
//     loading.value = true;
//     error.value = null;

//     // محاكاة جلب البيانات (يمكنك إرجاع كود Contentful لاحقاً)
//     try {
//       // نستخدم Timeout لمحاكاة الاتصال بالشبكة
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const localeKey = currentLocale === "ar" ? "ar" : "en-US";
//       news.value = MOCK_NEWS[localeKey] || MOCK_NEWS["en-US"];
//     } catch (err: any) {
//       error.value = `Failed to fetch news: ${err.message || "Unknown error"}`;
//     } finally {
//       loading.value = false;
//     }
//   };

//   // دالة جديدة لجلب خبر معين
//   const getArticleById = (
//     id: string,
//     currentLocale = "en-US"
//   ): NewsEntry | undefined => {
//     const localeKey = currentLocale === "ar" ? "ar" : "en-US";
//     const articles = MOCK_NEWS[localeKey] || MOCK_NEWS["en-US"];
//     return articles.find((article) => article.id === id);
//   };

//   return { news, loading, error, fetchNews, getArticleById };
// });
