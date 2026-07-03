import { defineStore } from 'pinia'
import { useReviewsStore } from './reviews'

const defaultProducts = [
  { id: 1, name: 'Хлеб белый', category: 'Хлебобулочные', price: 45, image: '', description: 'Свежий белый хлеб из пшеничной муки высшего сорта.', rating: 4.5 },
  { id: 2, name: 'Молоко 3.2%', category: 'Молочные', price: 85, image: '', description: 'Цельное пастеризованное молоко 3.2% жирности.', rating: 4.7 },
  { id: 3, name: 'Сыр Российский', category: 'Молочные', price: 320, image: '', description: 'Твердый сыр "Российский" 50% жирности, 1 кг.', rating: 4.6 },
  { id: 4, name: 'Яйца куриные', category: 'Яйца', price: 95, image: '', description: 'Яйца куриные отборные, 10 шт.', rating: 4.4 },
  { id: 5, name: 'Масло сливочное', category: 'Молочные', price: 180, image: '', description: 'Сливочное масло 82.5% жирности, 200 г.', rating: 4.8 },
  { id: 6, name: 'Гречка', category: 'Крупы', price: 70, image: '', description: 'Гречневая крупа ядрица, 1 кг.', rating: 4.3 },
  { id: 7, name: 'Рис круглозерный', category: 'Крупы', price: 65, image: '', description: 'Рис круглозерный шлифованный, 1 кг.', rating: 4.2 },
  { id: 8, name: 'Макароны', category: 'Макаронные', price: 55, image: '', description: 'Макаронные изделия из твердых сортов пшеницы, 400 г.', rating: 4.1 },
  { id: 9, name: 'Сахар песок', category: 'Бакалея', price: 50, image: '', description: 'Сахар-песок, 1 кг.', rating: 4.0 },
  { id: 10, name: 'Масло подсолнечное', category: 'Бакалея', price: 120, image: '', description: 'Масло подсолнечное рафинированное, 1 л.', rating: 4.5 },
  { id: 11, name: 'Курица охлажденная', category: 'Мясо', price: 250, image: '', description: 'Тушка курицы охлажденная, 1 кг.', rating: 4.6 },
  { id: 12, name: 'Колбаса Докторская', category: 'Колбасные', price: 280, image: '', description: 'Колбаса вареная "Докторская", 500 г.', rating: 4.3 },
  { id: 13, name: 'Помидоры свежие', category: 'Овощи', price: 110, image: '', description: 'Помидоры свежие грунтовые, 1 кг.', rating: 4.4 },
  { id: 14, name: 'Огурцы свежие', category: 'Овощи', price: 95, image: '', description: 'Огурцы свежие короткоплодные, 1 кг.', rating: 4.2 },
  { id: 15, name: 'Картофель', category: 'Овощи', price: 40, image: '', description: 'Картофель мытый, 1 кг.', rating: 4.1 },
  { id: 16, name: 'Яблоки', category: 'Фрукты', price: 130, image: '', description: 'Яблоки красные, 1 кг.', rating: 4.5 },
  { id: 17, name: 'Бананы', category: 'Фрукты', price: 115, image: '', description: 'Бананы свежие, 1 кг.', rating: 4.3 },
  { id: 18, name: 'Апельсины', category: 'Фрукты', price: 140, image: '', description: 'Апельсины сочные, 1 кг.', rating: 4.4 },
  { id: 19, name: 'Чай черный', category: 'Напитки', price: 160, image: '', description: 'Чай черный листовой, 100 г.', rating: 4.5 },
  { id: 20, name: 'Кофе растворимый', category: 'Напитки', price: 350, image: '', description: 'Кофе растворимый сублимированный, 100 г.', rating: 4.6 },
  { id: 21, name: 'Сок яблочный', category: 'Напитки', price: 90, image: '', description: 'Сок яблочный восстановленный, 1 л.', rating: 4.0 },
  { id: 22, name: 'Вода минеральная', category: 'Напитки', price: 40, image: '', description: 'Вода минеральная столовая негазированная, 1.5 л.', rating: 4.2 },
  { id: 23, name: 'Печенье Овсяное', category: 'Кондитерские', price: 75, image: '', description: 'Печенье овсяное с изюмом, 300 г.', rating: 4.3 },
  { id: 24, name: 'Шоколад молочный', category: 'Кондитерские', price: 95, image: '', description: 'Шоколад молочный с орехами, 100 г.', rating: 4.7 },
  { id: 25, name: 'Кефир 2.5%', category: 'Молочные', price: 70, image: '', description: 'Кефир 2.5% жирности, 1 л.', rating: 4.4 },
  { id: 26, name: 'Сметана 20%', category: 'Молочные', price: 90, image: '', description: 'Сметана 20% жирности, 300 г.', rating: 4.3 },
  { id: 27, name: 'Творог 5%', category: 'Молочные', price: 150, image: '', description: 'Творог 5% жирности рассыпчатый, 400 г.', rating: 4.6 },
  { id: 28, name: 'Мука пшеничная', category: 'Бакалея', price: 45, image: '', description: 'Мука пшеничная высшего сорта, 2 кг.', rating: 4.1 },
  { id: 29, name: 'Сосиски молочные', category: 'Колбасные', price: 200, image: '', description: 'Сосиски молочные, 400 г.', rating: 4.2 },
  { id: 30, name: 'Рыба минтай', category: 'Рыба', price: 180, image: '', description: 'Минтай свежемороженый тушка, 1 кг.', rating: 4.0 },
]

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [...defaultProducts],
  }),
  getters: {
    allProducts: (state) => state.products,
    allCategories: (state) => {
      return [...new Set(state.products.map(p => p.category))]
    },
    getProductById: (state) => (id) => {
      return state.products.find(p => p.id === Number(id))
    },
    productsByCategory: (state) => (category) => {
      if (!category || category === 'Все') return state.products
      return state.products.filter(p => p.category === category)
    },
  },
  actions: {
    addProduct(product) {
      const maxId = Math.max(...this.products.map(p => p.id), 0)
      this.products.push({ ...product, id: maxId + 1 })
    },
    updateProduct(updated) {
      const idx = this.products.findIndex(p => p.id === updated.id)
      if (idx !== -1) this.products[idx] = updated
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    },
    updateProductRating(productId) {
      const reviewsStore = useReviewsStore()
      const reviews = reviewsStore.getReviewsByProduct(productId)
      const product = this.products.find(p => p.id === productId)
      if (product && reviews.length > 0) {
        product.rating = +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      } else if (product) {
        product.rating = 0
      }
    },
  },
})
