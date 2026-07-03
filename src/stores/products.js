import { defineStore } from 'pinia'
import { useReviewsStore } from './reviews'

const defaultProducts = [
  { id: 1, name: 'Хлеб белый', category: 'Хлебобулочные', price: 45, image: 'products/bread.jpg', description: 'Свежий белый хлеб из пшеничной муки высшего сорта.', rating: 4.5 },
  { id: 2, name: 'Молоко 3.2%', category: 'Молочные', price: 85, image: 'products/milk.webp', description: 'Цельное пастеризованное молоко 3.2% жирности.', rating: 4.7 },
  { id: 3, name: 'Сыр Российский', category: 'Молочные', price: 320, image: 'products/cheese.jpg', description: 'Твердый сыр "Российский" 50% жирности, 1 кг.', rating: 4.6 },
  { id: 5, name: 'Масло сливочное', category: 'Молочные', price: 180, image: 'products/butter.webp', description: 'Сливочное масло 82.5% жирности, 200 г.', rating: 4.8 },
  { id: 10, name: 'Масло подсолнечное', category: 'Бакалея', price: 120, image: 'products/sunflower-oil.jpg', description: 'Масло подсолнечное рафинированное, 1 л.', rating: 4.5 },
  { id: 11, name: 'Курица охлажденная', category: 'Мясо', price: 250, image: 'products/chicken.webp', description: 'Тушка курицы охлажденная, 1 кг.', rating: 4.6 },
  { id: 16, name: 'Яблоки', category: 'Фрукты', price: 130, image: 'products/apples.jpg', description: 'Яблоки красные, 1 кг.', rating: 4.5 },
  { id: 20, name: 'Кофе растворимый', category: 'Напитки', price: 350, image: 'products/coffee.jpg', description: 'Кофе растворимый сублимированный, 100 г.', rating: 4.6 },
  { id: 24, name: 'Шоколад молочный', category: 'Кондитерские', price: 95, image: 'products/chocolate.jpg', description: 'Шоколад молочный с орехами, 100 г.', rating: 4.7 },
  { id: 27, name: 'Творог 5%', category: 'Молочные', price: 150, image: 'products/tvorog.jpg', description: 'Творог 5% жирности рассыпчатый, 400 г.', rating: 4.6 },
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
