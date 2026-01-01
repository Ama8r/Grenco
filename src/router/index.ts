import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsDetailsView from "../views/NewsDetailsView.vue"; // تأكد من إنشاء الملف لاحقاً
import FaqView from "../views/FaqView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";
import TermsView from "../views/TermsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Smart Recycling Solutions",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "About Us",
      },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
      meta: {
        title: "Our Products",
      },
    },
    {
      path: "/products/:id",
      name: "product-details",
      component: () => import("../views/ProductDetailsView.vue"),
      meta: {
        title: "Product Details",
      },
    },
    {
      path: "/solutions",
      name: "solutions",
      component: () => import("../views/SolutionsView.vue"),
      meta: {
        title: "Recycling Solutions",
      },
    },
    {
      path: "/solutions/:id",
      name: "solution-details",
      component: () => import("../views/SolutionDetailsView.vue"),
      meta: {
        title: "Solution Details",
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
      meta: {
        title: "News & Media",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: {
        title: "Contact Us",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
      meta: {
        title: "Page Not Found",
      },
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
    },
    {
      path: "/news/:id",
      name: "news-details",
      component: () => import("../views/NewsDetailsView.vue"),
      props: true, // مهم لتمرير الـ id كـ prop
    },
    {
      path: "/faq",
      name: "faq",
      component: FaqView,
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPolicyView,
    },
    {
      path: "/terms",
      name: "terms",
      component: TermsView,
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
