<script setup lang="ts">
import { useI18n } from "vue-i18n";

// 1. نحتاج لاستيراد locale لمعرفة اللغة الحالية
const { t, locale } = useI18n();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="/assets/grencoLogo.png" alt="Grenco" class="footer-logo" />
          <p class="footer-desc">{{ t("footer.description") }}</p>
          <div class="social-links">
            <a
              href="https://www.linkedin.com/company/grenco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i class="pi pi-linkedin"></i>
            </a>
            <a
              href="https://www.facebook.com/Grenco.Company"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i class="pi pi-facebook"></i>
            </a>
            <a
              href="https://wa.me/201152338718"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i class="pi pi-whatsapp"></i>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <h4>{{ t("footer.quickLinks") }}</h4>
          <ul>
            <li>
              <router-link to="/">{{ t("nav.home") }}</router-link>
            </li>
            <li>
              <router-link to="/about">{{ t("nav.about") }}</router-link>
            </li>
            <li>
              <router-link to="/products">{{ t("nav.products") }}</router-link>
            </li>
            <li>
              <router-link to="/solutions">{{
                t("nav.solutions")
              }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>{{ t("footer.support") }}</h4>
          <ul>
            <li>
              <router-link to="/contact">{{ t("nav.contact") }}</router-link>
            </li>
            <li>
              <a href="/faq">{{ t("footer.faq") }}</a>
            </li>
            <li>
              <a href="/privacy-policy">{{ t("footer.privacy") }}</a>
            </li>
            <li>
              <a href="/terms">{{ t("footer.terms") }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-contact">
          <h4>{{ t("footer.contactUs") }}</h4>
          <address>
            <p><i class="pi pi-map-marker"></i> {{ t("footer.address") }}</p>
            <p><i class="pi pi-phone"></i> +20 11 52338718</p>
            <p><i class="pi pi-envelope"></i> info@grenco.org</p>
          </address>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Grenco. {{ t("footer.rights") }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-secondary);
  color: var(--color-white);
  padding: var(--space-6) 0 var(--space-4);
  margin-top: var(--space-6);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

.footer-logo {
  width: 150px;
  height: auto;
  margin-bottom: var(--space-3);
  filter: brightness(0) invert(1);
}

.footer-desc {
  margin-bottom: var(--space-3);
  opacity: 0.8;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: var(--space-2);
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  transition: background-color var(--transition-normal),
    transform var(--transition-normal);
}

.social-links a:hover {
  background-color: var(--color-primary);
  transform: translateY(-3px);
}

/* Common Header Styles */
.footer-links h4,
.footer-contact h4 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-3);
  position: relative;
  padding-bottom: var(--space-2);
}

/* 3. الخط الأخضر (الوضع الافتراضي LTR) */
.footer-links h4::after,
.footer-contact h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0; /* يبدأ من اليسار */
  width: 50px;
  height: 2px;
  background-color: var(--color-primary);
  transition: all 0.3s ease;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--space-2);
}

.footer-links a {
  color: var(--color-gray-300);
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
}

/* Hover Effect (Default LTR) */
.footer-links a:hover {
  color: var(--color-primary);
  padding-left: var(--space-2);
  padding-right: 0;
}

.footer-contact address {
  font-style: normal;
}

.footer-contact p {
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-gray-300);
}

.footer-contact p i {
  color: var(--color-primary);
}

.footer-bottom {
  margin-top: var(--space-5);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: var(--font-size-sm);
  opacity: 0.7;
}

/* =========================================
   RTL Fixes (إصلاحات اللغة العربية)
   ========================================= */

/* 4. استهداف العنصر الذي يحمل dir="rtl" مباشرة */
.footer[dir="rtl"] .footer-links h4::after,
.footer[dir="rtl"] .footer-contact h4::after {
  left: auto; /* يلغي خاصية اليسار */
  right: 0; /* يجبر الخط على البدء من اليمين */
}

/* إصلاح حركة الروابط في العربي */
.footer[dir="rtl"] .footer-links a:hover {
  padding-left: 0;
  padding-right: var(--space-2); /* يتحرك لليسار */
}

/* Responsive styles */
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
  }
}
</style>
