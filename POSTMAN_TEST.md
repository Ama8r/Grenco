# اختبار API من Postman - دعم اللغتين العربية والإنجليزية

## URL

```
POST https://grenco.athrcode.site/api/contact
```

## Headers

```
Content-Type: application/json
Accept: application/json
```

## Body (JSON) - أمثلة مع دعم اللغتين

### مثال 1: باللغة العربية (افتراضي) - مع منتجات

```json
{
    "name": "أحمد محمد",
    "email": "test@example.com",
    "phone": "+966 123 456 789",
    "interest": "products",
    "products": [
        "Screws & Barrels",
        "Plastic Shredder Machines",
        "Mini Plastic Recycling Machines"
    ],
    "subject": "استفسار عن المنتجات",
    "message": "أريد معرفة المزيد عن منتجاتكم",
    "language": "ar"
}
```

### مثال 2: باللغة الإنجليزية - مع منتجات

```json
{
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1 555 123 4567",
    "interest": "products",
    "products": [
        "Screws & Barrels",
        "Plastic Shredder Machines",
        "Mini Plastic Recycling Machines"
    ],
    "subject": "Product Inquiry",
    "message": "I would like to know more about your products",
    "language": "en"
}
```

### مثال 3: باللغة العربية - مع حلول (بدون منتجات)

```json
{
    "name": "سارة أحمد",
    "email": "sara@example.com",
    "phone": "+966 987 654 321",
    "interest": "solutions",
    "subject": "استفسار عن الحلول",
    "message": "أريد معرفة المزيد عن حلولكم",
    "language": "ar"
}
```

### مثال 4: باللغة الإنجليزية - مع حلول

```json
{
    "name": "Sarah Johnson",
    "email": "sarah@example.com",
    "phone": "+1 555 987 6543",
    "interest": "solutions",
    "subject": "Solutions Inquiry",
    "message": "I would like to know more about your solutions",
    "language": "en"
}
```

### مثال 5: بدون تحديد اللغة (سيكون افتراضي عربي)

```json
{
    "name": "محمد علي",
    "email": "mohamed@example.com",
    "subject": "استفسار عام",
    "message": "رسالة عامة"
}
```

### مثال 6: باللغة الإنجليزية - استفسار عام

```json
{
    "name": "Mike Wilson",
    "email": "mike@example.com",
    "subject": "General Inquiry",
    "message": "General message",
    "language": "en"
}
```

## النتائج المتوقعة

### نجاح - باللغة العربية (افتراضي)

```json
{
    "success": true,
    "message": "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
}
```

### نجاح - باللغة الإنجليزية

```json
{
    "success": true,
    "message": "Your message has been sent successfully! We will contact you soon."
}
```

### خطأ في التحقق - باللغة العربية

```json
{
    "success": false,
    "message": "خطأ في البيانات المرسلة",
    "errors": {
        "name": ["الاسم مطلوب"],
        "email": ["البريد الإلكتروني غير صحيح"]
    }
}
```

### خطأ في التحقق - باللغة الإنجليزية

```json
{
    "success": false,
    "message": "Validation error in submitted data",
    "errors": {
        "name": ["Name is required"],
        "email": ["Email is invalid"]
    }
}
```

## خطوات الاختبار في Postman

1. افتح Postman
2. اختر **POST** من القائمة المنسدلة
3. أدخل الـ URL: `https://grenco.athrcode.site/api/contact`
4. اذهب إلى تبويب **Headers** وأضف:
    - Key: `Content-Type` → Value: `application/json`
    - Key: `Accept` → Value: `application/json`
5. اذهب إلى تبويب **Body**
6. اختر **raw** ثم **JSON**
7. الصق أحد الأمثلة أعلاه
8. اضغط **Send**

## ملاحظات مهمة

-   الحقول المطلوبة: `name`, `email`, `subject`, `message`
-   الحقول الاختيارية: `phone`, `interest`, `products`, `language`
-   `interest` يمكن أن يكون أي قيمة (مرن)
-   `products` يجب أن يكون مصفوفة من النصوص
-   `language` يمكن أن يكون `ar` (عربي) أو `en` (إنجليزي) - الافتراضي: `ar`
-   الإيميل سيصل على: `info@grenco.org`

## دعم اللغات

### اللغة العربية (ar)
- هي اللغة الافتراضية
- يمكن إرسال `"language": "ar"` أو عدم إرسال حقل `language` نهائياً
- جميع رسائل الخطأ والنجاح ستكون باللغة العربية

### اللغة الإنجليزية (en)
- يجب إرسال `"language": "en"` في الطلب
- جميع رسائل الخطأ والنجاح ستكون باللغة الإنجليزية

### أمثلة سريعة للاختبار

#### اختبار عربي سريع:
```json
{
    "name": "أحمد",
    "email": "test@example.com",
    "subject": "اختبار",
    "message": "رسالة اختبار"
}
```

#### اختبار إنجليزي سريع:
```json
{
    "name": "John",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message",
    "language": "en"
}
```
