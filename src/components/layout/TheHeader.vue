<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../../stores/products'
import { useSolutionsStore } from '../../stores/solutions'

const { t, locale } = useI18n()
const route = useRoute()
const productsStore = useProductsStore()
const solutionsStore = useSolutionsStore()

const mobileMenuOpen = ref(false)
// متغير لتخزين اسم القائمة المفتوحة حالياً في الموبايل
const openMobileDropdown = ref<string | null>(null)

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'ar' : 'en'
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  // إغلاق القوائم الفرعية عند غلق القائمة الرئيسية
  if (!mobileMenuOpen.value) {
    openMobileDropdown.value = null
  }
}

// دالة لفتح/غلق القائمة الفرعية في الموبايل
const toggleDropdown = (name: string) => {
  if (openMobileDropdown.value === name) {
    openMobileDropdown.value = null // إغلاق إذا كانت مفتوحة
  } else {
    openMobileDropdown.value = name // فتح الجديدة
  }
}

const isActiveRoute = computed(() => {
  return (routeName: string) => route.name === routeName
})


const navLinks = computed(() => [
  { name: t('nav.home'), route: 'home' },
  { name: t('nav.about'), route: 'about' },
  { 
    name: t('nav.products'), 
    route: 'products',
    children: productsStore.products.map(product => ({
      id: product.id,
      name: product.name,
      route: 'product-details'
    }))
  },
  { 
    name: t('nav.solutions'), 
    route: 'solutions',
    children: solutionsStore.solutions.map(solution => ({
      id: solution.id,
      name: t(`solutions.${solution.translationKey}.title`),
      route: 'solution-details'
    }))
  },
  { name: t('nav.news'), route: 'news' },
  { name: t('nav.contact'), route: 'contact' }
])
</script>

<template>
  <header class="header" :class="{ 'header-scrolled': true }">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img src="/src/assets/images/grencoLogo.png" alt="Grenco" width="120" />
      </router-link>
      
      <div 
        class="mobile-overlay" 
        :class="{ 'show': mobileMenuOpen }"
        @click="mobileMenuOpen = false"
      ></div>

      <nav class="main-nav" :class="{ 'mobile-nav-open': mobileMenuOpen }">
        <ul class="nav-list">
          <li 
            v-for="link in navLinks" 
            :key="link.route" 
            class="nav-item"
            :class="{ 
              'has-dropdown': link.children,
              'dropdown-active': openMobileDropdown === link.name // كلاس للتحكم في الفتح
            }" 
          >
            <router-link
              v-if="!link.children"
              :to="{ name: link.route }"
              class="nav-link"
              :class="{ 'active': isActiveRoute(link.route) }"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </router-link>

            <div v-else class="dropdown-wrapper">
              <div 
                class="nav-link dropdown-trigger"
                :class="{ 'active': isActiveRoute(link.route) }"
                @click="toggleDropdown(link.name)"
              >
                <span>{{ link.name }}</span>
                <i class="pi pi-angle-down dropdown-icon"></i>
              </div>

              <ul class="dropdown-menu">
                <li class="mobile-only-item">
                   <!-- <router-link 
                    :to="{ name: link.route }"
                    class="dropdown-item view-all"
                    @click="mobileMenuOpen = false"
                  >
                    {{ t('nav.viewAll') || 'View All' }}
                  </router-link> -->
                </li>

                <li v-for="child in link.children" :key="child.id">
                  <router-link 
                    :to="{ name: child.route, params: { id: child.id } }"
                    class="dropdown-item"
                    @click="mobileMenuOpen = false"
                  >
                    {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <button @click="toggleLanguage" class="lang-switcher">
          {{ locale === 'en' ? 'AR' : 'EN' }}
        </button>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-expanded="mobileMenuOpen">
          <span class="hamburger" :class="{ 'is-active': mobileMenuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* --- Base Styles --- */
.header {
  position: fixed;
  top: 0; left: 0; width: 100%;
  z-index: 1000;
  background-color: transparent;
  transition: all 0.3s ease;
  padding: 15px 0;
}

.header-scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 10px 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px; /* حماية المحتوى من الحواف في الموبايل */
}

.logo img {
  height: auto;
  max-height: 40px;
  transition: max-height 0.3s;
}

/* --- Navigation & Links --- */
.nav-list {
  display: flex;
  list-style: none;
  gap: 25px;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item { position: relative; }

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s;
  cursor: pointer;
  text-decoration: none;
  padding: 5px 0;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-primary);
}

.dropdown-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

/* --- Dropdown (Desktop) --- */
.dropdown-menu {
  display: block; /* التغيير هنا: نستخدم opacity للإخفاء بدلاً من display */
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-white);
  min-width: 240px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 10px 0;
  list-style: none;
  z-index: 100;
  
  /* تأثير الظهور */
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: var(--color-gray-700);
  font-size: 0.9rem;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(0,0,0,0.03);
}

.dropdown-item:hover {
  background-color: var(--color-gray-50);
  color: var(--color-white);
  padding-left: 25px; /* حركة بسيطة لليمين */
  background-color: var(--color-primary);
}

/* Desktop Hover Effect */
@media (min-width: 1024px) {
  .has-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .has-dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
  }

  .mobile-only-item {
    display: none;
  }
}

/* --- Header Actions --- */
.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.lang-switcher {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.lang-switcher:hover {
  background-color: var(--color-primary);
  color: white;
}

/* --- Mobile Menu Toggle --- */
.mobile-menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001; /* فوق القائمة */
  padding: 0;
  align-items: center;
  justify-content: center;
}

.hamburger {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: var(--color-secondary);
  transition: all 0.3s ease;
}

.hamburger::before, .hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-secondary);
  transition: all 0.3s ease;
  left: 0;
}

.hamburger::before { top: -7px; }
.hamburger::after { top: 7px; }

.hamburger.is-active { background-color: transparent; }
.hamburger.is-active::before { top: 0; transform: rotate(45deg); }
.hamburger.is-active::after { top: 0; transform: rotate(-45deg); }

/* --- Mobile Overlay --- */
.mobile-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}
.mobile-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* --- Responsive (Mobile) Styles --- */
@media (max-width: 1023px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 0;
    right: -100%; /* مخفية لليمين */
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: white;
    z-index: 999;
    padding: 80px 20px 20px;
    transition: right 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0);
    overflow-y: auto;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  }

  .main-nav.mobile-nav-open {
    right: 0; /* إظهار القائمة */
  }

  /* RTL Support for Slide */
  :deep(.rtl) .main-nav {
    right: auto;
    left: -100%;
  }
  :deep(.rtl) .main-nav.mobile-nav-open {
    left: 0;
  }

  .nav-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    border-bottom: 1px solid var(--color-gray-100);
  }

  .nav-link, .dropdown-trigger {
    padding: 15px 0;
    font-size: 1.1rem;
    width: 100%;
    justify-content: space-between;
  }

  /* Mobile Dropdown Logic */
  .dropdown-menu {
    position: static; /* ليست عائمة */
    background-color: var(--color-gray-50);
    box-shadow: none;
    width: 100%;
    padding: 0;
    
    /* Animation for height */
    max-height: 0;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    transform: none;
    transition: all 0.4s ease;
  }

  /* عند تفعيل الكلاس Active */
  .nav-item.dropdown-active .dropdown-menu {
    max-height: 500px; /* رقم كبير يكفي المحتوى */
    opacity: 1;
    visibility: visible;
    padding-bottom: 10px;
  }

  .nav-item.dropdown-active .dropdown-icon {
    transform: rotate(180deg);
  }

  .dropdown-item {
    padding: 12px 20px 12px 30px;
    font-size: 1rem;
    color: var(--color-gray-600);
  }

  .view-all {
    font-weight: 600;
    color: var(--color-primary);
  }

  /* RTL Padding adjustment */
  :deep(.rtl) .dropdown-item {
    padding: 12px 30px 12px 20px;
  }
}
</style>