<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const company = ref({
  founded: 2024,
  employees: 15,
  machines: 150,
});

const team = computed(() =>
  [
    {
      name: "Rabeh Yaser",
      position: t("about.team.roles.ceo"),
      image: "https://iili.io/fuHwCkQ.md.jpg",
      link: "https://www.linkedin.com/in/rabeh-yaser/",
    },
    {
      name: "Ammar Abd Elbari",
      position: t("about.team.roles.cto"),
      image: "https://iili.io/fTmWRlS.md.jpg",
      link: "https://www.linkedin.com/in/ama8r/",
    },
    {
      name: "Mahmoud Hussin",
      position: t("about.team.roles.devops"),
      image: "https://iili.io/fuHwcpp.md.png",
      link: "https://www.linkedin.com/in/mahmoud-hussein37/",
    },
    {
      name: "Ahmed Farrag",
      position: t("about.team.roles.appDev"),
      image: "https://iili.io/fuHjQBn.md.jpg",
      link: "https://www.linkedin.com/in/ahmedfarragtantawy/",
    },
    {
      name: "Aliaa Ahmed",
      position: t("about.team.roles.dataAnalyst"),
      image: "/assets/images/Team/Aliaa.jpg",
      link: "https://www.linkedin.com/in/aliaa-ahmed-zaki-918873274/",
    },
    {
      name: "Yasmen Essam",
      position: t("about.team.roles.hr"),
      image: "https://iili.io/fuHwEQt.md.jpg",
      link: "https://www.linkedin.com/in/yasmeen-essam-212308323/",
    },
    {
      name: "Salma Mostafa",
      position: t("about.team.roles.cad"),
      image: "https://iili.io/fuHwIQ1.md.jpg",
      link: "https://www.linkedin.com/in/salma-mostafa2001/",
    },
    {
      name: "Magda Atef",
      position: t("about.team.roles.pr"),
      image: "https://iili.io/fuHjm74.md.jpg",
      link: "https://www.linkedin.com/in/magda-atef-277158249/",
    },
  ].filter((member) => member && member.name && member.position && member.image)
);

const values = computed(() => [
  {
    title: t("about.values.sustainability"),
    icon: "pi-globe",
    description: t("about.values.sustainabilityDesc"),
  },
  {
    title: t("about.values.innovation"),
    icon: "pi-bolt",
    description: t("about.values.innovationDesc"),
  },
  {
    title: t("about.values.quality"),
    icon: "pi-check-circle",
    description: t("about.values.qualityDesc"),
  },
  {
    title: t("about.values.integrity"),
    icon: "pi-shield",
    description: t("about.values.integrityDesc"),
  },
]);

// --- منطق الأنيميشن المتجاوب ---
const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 0);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// تحديد نوع الأنيميشن بناءً على العرض
// نستخدم 1024px كنقطة تحول لأن الشبكة (grid) تتغير عندها من عمود واحد لعمودين
const contentAnimation = computed(() => {
  return windowWidth.value >= 1024 ? "fade-right" : "fade-up";
});

const imageAnimation = computed(() => {
  return windowWidth.value >= 1024 ? "fade-left" : "fade-up";
});

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div class="about-page" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up">{{ t("about.title") }}</h1>
      </div>
    </div>

    <section class="section about-mission">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-content" :data-aos="contentAnimation">
            <h2>{{ t("about.mission.title") }}</h2>
            <p class="mission-text">{{ t("about.mission.content") }}</p>

            <h2 class="mt-5 mission-vision-title">
              {{ t("about.vision.title") }}
            </h2>
            <p class="mission-text">{{ t("about.vision.content") }}</p>

            <div class="company-stats">
              <div class="stat-item">
                <div class="stat-value">{{ company.founded }}</div>
                <div class="stat-label">{{ t("about.stats.founded") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ company.employees }}+</div>
                <div class="stat-label">{{ t("about.stats.employees") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ company.machines }}+</div>
                <div class="stat-label">{{ t("about.stats.machines") }}</div>
              </div>
            </div>
          </div>

          <div class="mission-image" :data-aos="imageAnimation">
            <img
              src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg"
              alt="Grenco mission"
              class="image-rounded"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section values-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">
          {{ t("about.values.title") }}
        </h2>

        <div class="values-grid">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="value-card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="value-icon">
              <i :class="`pi ${value.icon}`"></i>
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section team-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">
          {{ t("about.team.title") }}
        </h2>

        <div class="team-grid">
          <a
            v-for="(member, index) in team"
            :key="index"
            :href="member.link"
            target="_blank"
            class="team-card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="team-image">
              <img v-if="member" :src="member.image" :alt="member.name" />
            </div>
            <div class="team-info">
              <h3 class="team-name">{{ member.name }}</h3>
              <p class="team-position">{{ member.position }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-7) 0 var(--space-5);
  text-align: center;
  position: relative;
  margin-top: 80px;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.page-title {
  position: relative;
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-2);
}

.about-mission {
  padding: var(--space-6) 0;
  background-color: var(--color-white);
  /* منع خروج العناصر أثناء الأنيميشن */
  overflow-x: hidden;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

.mission-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mission-text {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  color: var(--color-gray-700);
  line-height: 1.7;
}

.company-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.stat-item {
  flex: 1;
  min-width: 120px;
  background-color: var(--color-gray-100);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform var(--transition-normal) ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background-color: var(--color-primary);
  color: var(--color-white);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.mission-image {
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.image-rounded {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;
}

.mission-image:hover .image-rounded {
  transform: scale(1.05);
}

.values-section {
  padding: var(--space-7) 0;
  background-color: var(--color-gray-100);
  /* منع خروج العناصر أثناء الأنيميشن */
  overflow-x: hidden;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.value-card {
  background-color: var(--color-white);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease;
  text-align: center;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  margin: 0 auto var(--space-3);
}

.value-icon i {
  font-size: 2rem;
}

.value-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
}

.value-description {
  color: var(--color-gray-600);
  line-height: 1.5;
}

.team-section {
  padding: var(--space-7) 0;
  background-color: var(--color-white);
  /* منع خروج العناصر أثناء الأنيميشن */
  overflow-x: hidden;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-4);
}

.team-card {
  background-color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease;
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.team-image {
  height: 250px;
  position: relative;
  overflow: hidden;
}

.team-image::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, #205414, transparent);
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;
}

.team-card:hover .team-image img {
  transform: scale(1.1);
}

.team-info {
  padding: var(--space-3);
  text-align: center;
}

.team-name {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-1);
  color: var(--color-secondary);
}

.team-position {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .mission-grid {
    grid-template-columns: 3fr 2fr;
  }

  .values-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* =========================================
   Mobile Optimizations (تحسينات الموبايل)
   ========================================= */
@media (max-width: 768px) {
  .page-header {
    margin-top: 60px;
    padding: var(--space-5) 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .about-mission,
  .values-section,
  .team-section {
    padding: var(--space-5) 0;
  }

  h2,
  .section-title {
    font-size: 1.75rem;
  }

  .mission-vision-title {
    margin-top: var(--space-4) !important;
  }

  .mission-text {
    font-size: 1rem;
  }

  .company-stats {
    gap: var(--space-3);
  }

  .stat-item {
    padding: var(--space-2);
    min-width: 100px;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .team-image {
    height: 220px;
  }
}
</style>

<!-- <script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const company = ref({
  founded: 2024,
  employees: 15,
  machines: 150,
});

const team = computed(() =>
  [
    {
      name: "Rabeh Yaser",
      position: t("about.team.roles.ceo"),
      image: "https://iili.io/fuHwCkQ.md.jpg",
      link: "https://www.linkedin.com/in/rabeh-yaser/",
    },
    {
      name: "Ammar Abd Elbari",
      position: t("about.team.roles.cto"),
      image: "https://iili.io/fTmWRlS.md.jpg",
      link: "https://www.linkedin.com/in/ama8r/",
    },
    {
      name: "Mahmoud Hussin",
      position: t("about.team.roles.devops"),
      image: "https://iili.io/fuHwcpp.md.png",
      link: "https://www.linkedin.com/in/mahmoud-hussein37/",
    },
    {
      name: "Ahmed Farrag",
      position: t("about.team.roles.appDev"),
      image: "https://iili.io/fuHjQBn.md.jpg",
      link: "https://www.linkedin.com/in/ahmedfarragtantawy/",
    },
    {
      name: "Aliaa Ahmed",
      position: t("about.team.roles.dataAnalyst"),
      image: "/assets/images/Team/Aliaa.jpg",
      link: "https://www.linkedin.com/in/aliaa-ahmed-zaki-918873274/",
    },
    {
      name: "Yasmen Essam",
      position: t("about.team.roles.hr"),
      image: "https://iili.io/fuHwEQt.md.jpg",
      link: "https://www.linkedin.com/in/yasmeen-essam-212308323/",
    },
    {
      name: "Salma Mostafa",
      position: t("about.team.roles.cad"),
      image: "https://iili.io/fuHwIQ1.md.jpg",
      link: "https://www.linkedin.com/in/salma-mostafa2001/",
    },
    {
      name: "Magda Atef",
      position: t("about.team.roles.pr"),
      image: "https://iili.io/fuHjm74.md.jpg",
      link: "https://www.linkedin.com/in/magda-atef-277158249/",
    },
  ].filter((member) => member && member.name && member.position && member.image)
);

const values = computed(() => [
  {
    title: t("about.values.sustainability"),
    icon: "pi-globe",
    description: t("about.values.sustainabilityDesc"),
  },
  {
    title: t("about.values.innovation"),
    icon: "pi-bolt",
    description: t("about.values.innovationDesc"),
  },
  {
    title: t("about.values.quality"),
    icon: "pi-check-circle",
    description: t("about.values.qualityDesc"),
  },
  {
    title: t("about.values.integrity"),
    icon: "pi-shield",
    description: t("about.values.integrityDesc"),
  },
]);

// --- منطق الأنيميشن المتجاوب ---
const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 0);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

const contentAnimation = computed(() => {
  return windowWidth.value >= 1024 ? "fade-right" : "fade-up";
});

const imageAnimation = computed(() => {
  return windowWidth.value >= 1024 ? "fade-left" : "fade-up";
});

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div class="about-page" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up">{{ t("about.title") }}</h1>
      </div>
    </div>

    <section class="section about-mission">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-content" :data-aos="contentAnimation">
            <h2>{{ t("about.mission.title") }}</h2>
            <p class="mission-text">{{ t("about.mission.content") }}</p>

            <h2 class="mt-5 mission-vision-title">
              {{ t("about.vision.title") }}
            </h2>
            <p class="mission-text">{{ t("about.vision.content") }}</p>

            <div class="company-stats">
              <div class="stat-item">
                <div class="stat-value">{{ company.founded }}</div>
                <div class="stat-label">{{ t("about.stats.founded") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ company.employees }}+</div>
                <div class="stat-label">{{ t("about.stats.employees") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ company.machines }}+</div>
                <div class="stat-label">{{ t("about.stats.machines") }}</div>
              </div>
            </div>
          </div>

          <div class="mission-image" :data-aos="imageAnimation">
            <img
              src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg"
              alt="Grenco mission"
              class="image-rounded"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section values-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">
          {{ t("about.values.title") }}
        </h2>

        <div class="values-grid">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="value-card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="value-icon">
              <i :class="`pi ${value.icon}`"></i>
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section team-section">
      <div class="container">
        <div class="team-header text-center" data-aos="fade-up">
          <h2 class="team-main-title">
            {{ t("about.team.title") }}
          </h2>
          <p class="team-subtitle">We are proud of you</p>
        </div>

        <div class="team-grid">
          <a
            v-for="(member, index) in team"
            :key="index"
            :href="member.link"
            target="_blank"
            class="team-card-design"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="card-content-wrapper">
              <div class="team-image-bw">
                <img v-if="member" :src="member.image" :alt="member.name" />
              </div>
              <div class="team-info-overlay">
                <h3 class="team-name-bold">{{ member.name }}</h3>
                <p class="team-role-small">{{ member.position }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* استيراد الخطوط لتطابق التصميم (خط عريض للعنوان وخط يدوي للجملة) */
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Oswald:wght@700&display=swap");

/* --- باقي الستايلات القديمة للصفحة --- */
.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-7) 0 var(--space-5);
  text-align: center;
  position: relative;
  margin-top: 80px;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg");
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.page-title {
  position: relative;
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-2);
}

.about-mission {
  padding: var(--space-6) 0;
  background-color: var(--color-white);
  overflow-x: hidden;
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

.mission-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mission-text {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-4);
  color: var(--color-gray-700);
  line-height: 1.7;
}

.company-stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.stat-item {
  flex: 1;
  min-width: 120px;
  background-color: var(--color-gray-100);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform var(--transition-normal) ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background-color: var(--color-primary);
  color: var(--color-white);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.mission-image {
  overflow: hidden;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.image-rounded {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) ease;
}

.mission-image:hover .image-rounded {
  transform: scale(1.05);
}

.values-section {
  padding: var(--space-7) 0;
  background-color: var(--color-gray-100);
  overflow-x: hidden;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.value-card {
  background-color: var(--color-white);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) ease;
  text-align: center;
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  margin: 0 auto var(--space-3);
}

.value-icon i {
  font-size: 2rem;
}

.value-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
  color: var(--color-secondary);
}

.value-description {
  color: var(--color-gray-600);
  line-height: 1.5;
}

/* =========================================================
   NEW TEAM DESIGN (CSS Clip-path & Typography)
   ========================================================= */

.team-section {
  padding: var(--space-7) 0;
  background-color: #fff; /* خلفية بيضاء نظيفة */
  overflow-x: hidden;
}

.team-header {
  margin-bottom: 50px;
}

.team-main-title {
  font-family: "Oswald", sans-serif; /* خط عريض وقوي */
  font-size: 3.5rem;
  font-weight: 700;
  color: #333; /* لون رمادي غامق/أسود */
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

.team-subtitle {
  font-family: "Dancing Script", cursive; /* خط يدوي */
  font-size: 2rem;
  color: #2ebd00; /* اللون الأخضر الفاقع المشابه للصورة */
  margin-top: -10px; /* تداخل بسيط */
  font-weight: 700;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  justify-content: center;
}

/* تصميم الكارت الجديد */
.team-card-design {
  display: block;
  text-decoration: none;
  position: relative;
  /* اللون الأخضر الفاقع للخلفية */
  background-color: #2ebd00;
  /* هذا السطر السحري الذي يقص الزاوية العلوية اليسرى */
  /* الأرقام تعني: ابدأ من 60 بكسل يساراً، اذهب للنهاية، انزل، ارجع، اطلع لـ 60 بكسل */
  clip-path: polygon(60px 0, 100% 0, 100% 100%, 0 100%, 0 60px);
  padding: 0 0 20px 0; /* مساحة للنص في الأسفل */
  transition: transform 0.3s ease, filter 0.3s ease;
  overflow: hidden;
}

.team-card-design:hover {
  transform: translateY(-10px);
}

.team-image-bw {
  width: 100%;
  height: 280px; /* ارتفاع الصورة */
  overflow: hidden;
  background-color: #ddd; /* خلفية رمادية في حال تأخر التحميل */
}

.team-image-bw img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* تحويل الصورة للأبيض والأسود */
  filter: grayscale(100%);
  transition: transform 0.5s ease, filter 0.3s ease;
}

/* عند الهوفر، ترجع الصورة ملونة (اختياري، أو تظل أبيض وأسود حسب رغبتك) */
.team-card-design:hover .team-image-bw img {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.team-info-overlay {
  text-align: center;
  padding: 15px 10px 5px;
  color: #fff;
}

.team-name-bold {
  font-family: "Oswald", sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  color: #fff;
}

.team-role-small {
  font-family: sans-serif;
  font-size: 0.8rem;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.9);
  text-transform: capitalize;
}

/* =========================================
   Responsive Adjustments
   ========================================= */

@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .mission-grid {
    grid-template-columns: 3fr 2fr;
  }

  .values-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    margin-top: 60px;
    padding: var(--space-5) 0;
  }

  .page-title {
    font-size: 2rem;
  }

  .about-mission,
  .values-section,
  .team-section {
    padding: var(--space-5) 0;
  }

  /* تصغير عناوين الفريق في الموبايل */
  .team-main-title {
    font-size: 2.5rem;
  }
  .team-subtitle {
    font-size: 1.5rem;
  }

  .mission-vision-title {
    margin-top: var(--space-4) !important;
  }

  .mission-text {
    font-size: 1rem;
  }

  .company-stats {
    gap: var(--space-3);
  }

  .stat-item {
    padding: var(--space-2);
    min-width: 100px;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  /* تحسين الشبكة في الموبايل */
  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .team-image-bw {
    height: 240px;
  }
}
</style> -->
