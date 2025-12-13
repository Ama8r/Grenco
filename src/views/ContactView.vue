<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useProductsStore } from "../stores/products";
import { useSolutionsStore } from "../stores/solutions";

const { t } = useI18n();
const productsStore = useProductsStore();
const solutionsStore = useSolutionsStore();

// --- إعدادات الدول (كما هي) ---
const countries = [
  { name: "Egypt", code: "+20", iso: "eg" },
  { name: "Saudi Arabia", code: "+966", iso: "sa" },
  { name: "UAE", code: "+971", iso: "ae" },
  { name: "Kuwait", code: "+965", iso: "kw" },
  { name: "Qatar", code: "+974", iso: "qa" },
  { name: "Bahrain", code: "+973", iso: "bh" },
  { name: "Oman", code: "+968", iso: "om" },
  { name: "Jordan", code: "+962", iso: "jo" },
  { name: "USA", code: "+1", iso: "us" },
  { name: "UK", code: "+44", iso: "gb" },
  { name: "Germany", code: "+49", iso: "de" },
];

const isCountryDropdownOpen = ref(false);
const selectedCountry = ref(countries[1]);

const toggleCountryDropdown = () => {
  isCountryDropdownOpen.value = !isCountryDropdownOpen.value;
};

const selectCountry = (country: any) => {
  selectedCountry.value = country;
  form.countryCode = country.code;
  isCountryDropdownOpen.value = false;
};

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.custom-country-select')) {
    isCountryDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown);
});

// --- إعدادات النموذج ---
const form = reactive({
  name: "",
  email: "",
  countryCode: "+966",
  phone: "",
  serviceType: "product",
  specificService: [] as string[], // التعديل 1: تحويلها لمصفوفة
  subject: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  phone: "",
  specificService: "",
  subject: "",
  message: "",
});

// دالة لتبديل الاختيار المتعدد
const toggleServiceSelection = (name: string) => {
  const index = form.specificService.indexOf(name);
  if (index === -1) {
    form.specificService.push(name); // إضافة العنصر إذا لم يكن موجوداً
  } else {
    form.specificService.splice(index, 1); // حذفه إذا كان موجوداً
  }
};

// عند تغيير النوع الرئيسي، نقوم بتفريغ المصفوفة
const setServiceType = (type: string) => {
  form.serviceType = type;
  form.specificService = []; 
};

const availableOptions = computed(() => {
  if (form.serviceType === 'product') {
    return productsStore.products.map(p => ({ id: p.id, name: p.name }));
  } else if (form.serviceType === 'solution') {
    return solutionsStore.solutions.map(s => ({ 
      id: s.id, 
      name: t(`solutions.${s.translationKey}.title`)
    }));
  }
  return [];
});

const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = "");

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  
  if (form.phone && !/^\d+$/.test(form.phone)) errors.phone = "Numbers only";
  
  // التحقق من المصفوفة بدلاً من النص
  if (form.specificService.length === 0) errors.specificService = "Please select at least one item";
  
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) errors.message = "Message is required";

  return isValid && !errors.name && !errors.email && !errors.phone && !errors.specificService && !errors.subject && !errors.message;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  const submissionData = {
    ...form,
    full_phone: `${selectedCountry.value.code} ${form.phone}`,
    // تحويل المصفوفة لنص مقروء للإيميل
    service_details: `${form.serviceType}: ${form.specificService.join(', ')}`
  };

  try {
    const response = await fetch("https://formspree.io/f/movdegng", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    if (response.ok) {
      successMessage.value = t("contact.success");
      form.name = ""; form.email = ""; form.phone = "";
      form.specificService = []; form.subject = ""; form.message = "";
    } else {
      errorMessage.value = t("contact.error");
    }
  } catch (error) {
    errorMessage.value = t("contact.error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title" data-aos="fade-up">{{ t("contact.title") }}</h1>
        <p class="page-subtitle" data-aos="fade-up" data-aos-delay="100">
          {{ t("contact.subtitle") }}
        </p>
      </div>
    </div>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper" data-aos="fade-right">
            <form class="contact-form" @submit.prevent="handleSubmit">
              
              <div class="form-success" v-if="successMessage">{{ successMessage }}</div>
              <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>

              <div class="form-group">
                <label for="name">{{ t("contact.name") }} *</label>
                <input type="text" id="name" v-model="form.name" :class="{ error: errors.name }" />
                <div class="error-message" v-if="errors.name">{{ errors.name }}</div>
              </div>

              <div class="form-group">
                <label for="email">{{ t("contact.email") }} *</label>
                <input type="email" id="email" v-model="form.email" :class="{ error: errors.email }" />
                <div class="error-message" v-if="errors.email">{{ errors.email }}</div>
              </div>

              <div class="form-group">
                <label for="phone">{{ t("contact.phone") }}</label>
                <div class="phone-input-wrapper">
                  <div class="custom-country-select" :class="{ open: isCountryDropdownOpen }">
                    <div class="selected-option" @click.stop="toggleCountryDropdown">
                      <img :src="`https://flagcdn.com/w40/${selectedCountry.iso}.png`" :alt="selectedCountry.name" class="country-flag" />
                      <span class="country-code">{{ selectedCountry.code }}</span>
                      <i class="pi pi-chevron-down dropdown-arrow"></i>
                    </div>
                    <ul class="options-list" v-show="isCountryDropdownOpen">
                      <li v-for="country in countries" :key="country.iso" @click="selectCountry(country)" :class="{ selected: country.iso === selectedCountry.iso }">
                        <img :src="`https://flagcdn.com/w40/${country.iso}.png`" :alt="country.name" class="country-flag" />
                        <span class="country-name">{{ country.name }}</span>
                        <span class="country-code-list">{{ country.code }}</span>
                      </li>
                    </ul>
                  </div>
                  <input type="tel" id="phone" v-model="form.phone" :class="{ error: errors.phone }" placeholder="123 456 789" />
                </div>
                <div class="error-message" v-if="errors.phone">{{ errors.phone }}</div>
              </div>

              <div class="form-group">
                <label>{{ t('contact.interest') }} *</label>
                <div class="service-toggle-container">
                  <div class="toggle-slider" :class="{ 'slide-right': form.serviceType === 'solution' }"></div>
                  <div class="toggle-option" :class="{ active: form.serviceType === 'product' }" @click="setServiceType('product')">
                    <i class="pi pi-box"></i> {{ t('nav.products') }}
                  </div>
                  <div class="toggle-option" :class="{ active: form.serviceType === 'solution' }" @click="setServiceType('solution')">
                    <i class="pi pi-cog"></i> {{ t('nav.solutions') }}
                  </div>
                </div>
              </div>

              <div class="form-group fade-in" v-if="availableOptions.length">
                <label>
                  {{ form.serviceType === 'product' ? 'Select Products' : 'Select Solutions' }} 
                  <span class="optional-text">(You can select multiple)</span> *
                </label>
                
                <div class="options-grid">
                  <div 
                    v-for="item in availableOptions" 
                    :key="item.id"
                    class="option-card"
                    :class="{ active: form.specificService.includes(item.name) }"
                    @click="toggleServiceSelection(item.name)"
                  >
                    <div class="checkbox-indicator">
                      <i class="pi pi-check" v-show="form.specificService.includes(item.name)"></i>
                    </div>
                    <span class="option-name">{{ item.name }}</span>
                  </div>
                </div>

                <div class="error-message" v-if="errors.specificService">{{ errors.specificService }}</div>
              </div>

              <div class="form-group">
                <label for="subject">{{ t("contact.subject") }} *</label>
                <input type="text" id="subject" v-model="form.subject" :class="{ error: errors.subject }" />
                <div class="error-message" v-if="errors.subject">{{ errors.subject }}</div>
              </div>

              <div class="form-group">
                <label for="message">{{ t("contact.message") }} *</label>
                <textarea id="message" v-model="form.message" rows="5" :class="{ error: errors.message }"></textarea>
                <div class="error-message" v-if="errors.message">{{ errors.message }}</div>
              </div>

              <button type="submit" class="btn btn-primary submit-btn" :disabled="isLoading">
                <span v-if="isLoading"><i class="pi pi-spin pi-spinner"></i> Sending...</span>
                <span v-else>{{ t("contact.submit") }} <i class="pi pi-send"></i></span>
              </button>
            </form>
          </div>

          <div class="contact-info" data-aos="fade-left">
             <div class="info-card">
              <h3>{{ t("contact.office") }}</h3>
              <div class="info-item">
                <i class="pi pi-map-marker"></i>
                <p>{{ t("footer.address") }}</p>
              </div>
              <div class="info-item">
                <i class="pi pi-phone"></i>
                <p>+20 11 52338718</p>
              </div>
              <div class="info-item">
                <i class="pi pi-envelope"></i>
                <p>info@grenco.org</p>
              </div>

              <h3 class="mt-5">{{ t("contact.followUs") }}</h3>
              <div class="social-links">
                <a href="https://www.linkedin.com/company/grenco" target="_blank"><i class="pi pi-linkedin"></i></a>
                <a href="https://www.facebook.com/Grenco.Company" target="_blank"><i class="pi pi-facebook"></i></a>
                <!-- <a href="#" target="_blank"><i class="pi pi-instagram"></i></a> -->
                <a href="https://wa.me/201152338718" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i class="pi pi-whatsapp"></i>
                </a>
              </div>
            </div>
            <div class="map-container">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55805.67127046134!2d31.06078463387912!3d29.050885762042995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a25e1064f72af%3A0xbacfa92a1eed60ea!2sBeni%20Suef%2C%20Qism%20Bani%20Sweif%2C%20Beni%20Suef%2C%20Beni%20Suef%20Governorate!5e0!3m2!1sen!2seg!4v1765587592841!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* --- تصميم شبكة الاختيارات (Options Grid Style) --- */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 5px;
}

.option-card {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background-color: var(--color-gray-50);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;
}

.option-card:hover {
  background-color: white;
  border-color: var(--color-gray-400);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.option-card.active {
  background-color: rgba(0, 200, 83, 0.08); /* لون أخضر فاتح جداً */
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(0, 200, 83, 0.2);
}

.checkbox-indicator {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid var(--color-gray-400);
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.2s;
  flex-shrink: 0;
}

.option-card.active .checkbox-indicator {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.checkbox-indicator i {
  font-size: 0.7rem;
  font-weight: bold;
}

.option-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-gray-700);
  line-height: 1.3;
}

.option-card.active .option-name {
  color: var(--color-primary);
  font-weight: 600;
}

.optional-text {
  font-size: 0.8rem;
  color: var(--color-gray-500);
  font-weight: normal;
  margin-left: 5px;
}

/* RTL Adjustment for Grid */
:deep(.rtl) .checkbox-indicator {
  margin-right: 0;
  margin-left: 12px;
}

/* --- (باقي الستايلات السابقة كما هي) --- */

/* تصميم زر التبديل (Toggle Switch) */
.service-toggle-container {
  display: flex; position: relative;
  background-color: var(--color-gray-100);
  border-radius: var(--radius-full);
  padding: 5px; cursor: pointer; user-select: none;
  border: 1px solid var(--color-gray-300); height: 55px;
}
.toggle-option {
  flex: 1; display: flex; align-items: center; justify-content: center;
  gap: 8px; z-index: 2; font-weight: 600; color: var(--color-gray-600);
  transition: color 0.3s ease; border-radius: var(--radius-full);
}
.toggle-option.active { color: var(--color-white); }
.toggle-slider {
  position: absolute; top: 5px; left: 5px;
  width: calc(50% - 5px); height: calc(100% - 10px);
  background: linear-gradient(135deg, var(--color-primary) 0%, #00a844 100%);
  border-radius: var(--radius-full); transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  z-index: 1; box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.toggle-slider.slide-right { transform: translateX(100%); }
:deep(.rtl) .toggle-slider { right: 5px; left: auto; }
:deep(.rtl) .toggle-slider.slide-right { transform: translateX(-100%); }

/* تصميم قائمة الدول */
.phone-input-wrapper { display: flex; gap: 10px; position: relative; }
.custom-country-select {
  position: relative; width: 140px; flex-shrink: 0; background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); cursor: pointer; transition: all 0.3s;
}
.custom-country-select:hover { border-color: var(--color-primary); }
.selected-option { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3); height: 100%; }
.country-flag { width: 24px; height: auto; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
.country-code { font-weight: 600; color: var(--color-secondary); font-size: 0.9rem; }
.dropdown-arrow { font-size: 0.8rem; color: var(--color-gray-600); transition: transform 0.3s; }
.custom-country-select.open .dropdown-arrow { transform: rotate(180deg); }
.options-list {
  position: absolute; top: 110%; left: 0; width: 250px; max-height: 250px; overflow-y: auto;
  background-color: white; border: 1px solid var(--color-gray-200); border-radius: var(--radius-md);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15); z-index: 100; list-style: none; padding: 5px 0; animation: slideDown 0.2s ease;
}
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.options-list li { display: flex; align-items: center; padding: 10px 15px; gap: 10px; transition: background 0.2s; border-bottom: 1px solid var(--color-gray-50); }
.options-list li:hover { background-color: var(--color-gray-50); }
.options-list li.selected { background-color: rgba(0, 200, 83, 0.05); color: var(--color-primary); }
.country-name { flex: 1; font-size: 0.9rem; color: var(--color-gray-700); }
.country-code-list { font-size: 0.8rem; color: var(--color-gray-500); font-weight: 500; }
.phone-input-wrapper input { flex: 1; border-radius: var(--radius-md); border: 1px solid var(--color-gray-300); background-color: var(--color-gray-100); padding: var(--space-3); transition: all 0.3s; }
.phone-input-wrapper input:focus { outline: none; border-color: var(--color-primary); background-color: white; box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1); }

/* General Form Styles */
.contact-form { background-color: var(--color-white); padding: var(--space-5); border-radius: var(--radius-lg); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); border: 1px solid var(--color-gray-100); }
.form-group { margin-bottom: var(--space-4); }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: var(--color-secondary); font-size: 0.95rem; }
.form-group input:not([type="tel"]), .form-group textarea { width: 100%; padding: 12px 15px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); background-color: var(--color-gray-100); transition: all 0.3s; font-size: 1rem; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--color-primary); background-color: white; box-shadow: 0 0 0 4px rgba(0, 200, 83, 0.1); }
.submit-btn { width: 100%; padding: 14px; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px; }
.fade-in { animation: fadeIn 0.4s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

/* Base Styles */
.page-header { background-color: var(--color-primary); color: var(--color-white); padding: var(--space-7) 0 var(--space-5); text-align: center; position: relative; margin-top: 80px; }
.page-header::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url("https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg"); background-size: cover; background-position: center; opacity: 0.1; }
.contact-section { padding: var(--space-6) 0; background-color: var(--color-gray-50); }
.contact-grid { display: grid; gap: var(--space-5); }
.contact-info { display: flex; flex-direction: column; gap: var(--space-4); }
.info-card { background: white; padding: var(--space-4); border-radius: var(--radius-lg); box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
.info-item { display: flex; align-items: center; margin-bottom: 15px; gap: 15px; }
.info-item i { color: var(--color-primary); font-size: 1.4rem; }
.social-links { display: flex; gap: 10px; margin-top: 15px; }
.social-links a { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: var(--color-gray-100); border-radius: 50%; color: var(--color-primary); transition: 0.3s; }
.social-links a:hover { background: var(--color-primary); color: white; transform: translateY(-3px); }
.map-container { height: 300px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
.error-message { color: var(--color-error); font-size: 0.85rem; margin-top: 5px; }
.form-success, .form-error { padding: 15px; border-radius: var(--radius-md); margin-bottom: 20px; text-align: center; }
.form-success { background: rgba(0,200,83,0.1); color: var(--color-success); border: 1px solid var(--color-success); }
.form-error { background: rgba(255,0,0,0.1); color: var(--color-error); border: 1px solid var(--color-error); }

@media (min-width: 1024px) {
  .contact-grid { grid-template-columns: 1.5fr 1fr; }
  .map-container { height: 100%; min-height: 400px; }
}
</style>