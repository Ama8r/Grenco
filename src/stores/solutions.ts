// src/stores/solutions.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Solution {
  id: number
  translationKey: string // مفتاح الترجمة (مثلاً 'costSaving')
  icon: string
  image: string
  benefits: string[] // يمكن تخزين المفاتيح هنا أو النصوص المباشرة
}

export const useSolutionsStore = defineStore('solutions', () => {
  const solutions = ref<Solution[]>([
    {
      id: 1,
      translationKey: 'costSaving', // سيتم استخدامه كـ t('solutions.costSaving.title')
      icon: 'pi-dollar',
      image: '/public/assets/images/products/machine3.jpeg',
      benefits: [
        "Reduce raw material costs by up to 40%",
        "Lower waste disposal expenses",
        "Quick return on investment",
        "Minimize production downtime",
      ]
    },
    {
      id: 2,
      translationKey: 'environmental',
      icon: 'pi-globe',
      image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
      benefits: [
        "Reduce carbon footprint",
        "Meet sustainability goals",
        "Minimize landfill waste",
        "Support circular economy",
      ]
    },
    {
      id: 3,
      translationKey: 'comparison',
      icon: 'pi-chart-bar',
      image: '/public/assets/images/products/machine2.jpeg',
      benefits: [
        "Smart monitoring systems",
        "Higher processing efficiency",
        "Reduced energy consumption",
        "Advanced sorting capabilities",
      ]
    },
  ])

  function getSolutionById(id: number) {
    return solutions.value.find(s => s.id === id)
  }

  return { solutions, getSolutionById }
})