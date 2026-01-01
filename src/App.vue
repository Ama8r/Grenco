<script setup lang="ts">
import { computed, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import AOS from "aos"; // 1. استيراد AOS هنا

// Get i18n composable
const { locale } = useI18n();
const route = useRoute();

// Compute document direction based on current locale
const direction = computed(() => {
  return locale.value === "ar" ? "rtl" : "ltr";
});

// Update document direction and language when locale changes
watch(
  () => locale.value,
  (newLocale) => {
    document.documentElement.setAttribute("dir", direction.value);
    document.documentElement.setAttribute("lang", newLocale);
    localStorage.setItem("locale", newLocale);

    // 2. تحديث الانميشن عند تغيير اللغة لأن الاتجاه يتغير
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  },
  { immediate: true }
);

// Set page title based on route & Refresh AOS
watch(
  () => route.path, // نراقب المسار بدلاً من العنوان فقط
  (path) => {
    // تحديث العنوان
    const title = route.meta.title;
    document.title = title
      ? `${title} | Grenco`
      : "Grenco - Smart Plastic Recycling Solutions";

    // 3. الحل لمشكلة الاختفاء: إعادة تهيئة الانميشن بعد الانتقال
    // نستخدم nextTick للتأكد من أن الـ DOM تم تحديثه
    nextTick(() => {
      // ننتظر انتهاء انميشن الـ Fade (300ms) + وقت إضافي بسيط
      setTimeout(() => {
        AOS.refreshHard(); // refreshHard أقوى من refresh العادية
      }, 400);
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="app-container" :class="{ rtl: locale === 'ar' }">
    <TheHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-container.rtl {
  font-family: "Tajawal", sans-serif;
  text-align: right;
}

main {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
