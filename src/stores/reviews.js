import { defineStore } from 'pinia'

const REVIEWS_KEY = 'slovyanka_reviews'

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || []
  } catch {
    return []
  }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
}

const sampleReviews = [
  { id: 1, productId: 1, userId: 1, userName: 'Анна', text: 'Отличный хлеб, всегда свежий!', rating: 5, date: '2025-12-01' },
  { id: 2, productId: 2, userId: 1, userName: 'Анна', text: 'Молоко очень вкусное, натуральное.', rating: 4, date: '2025-12-02' },
  { id: 3, productId: 3, userId: 1, userName: 'Анна', text: 'Сыр хороший, но дороговато.', rating: 4, date: '2025-12-03' },
]

export const useReviewsStore = defineStore('reviews', {
  state: () => {
    let stored = loadReviews()
    if (stored.length === 0) {
      stored = sampleReviews
      saveReviews(stored)
    }
    return { reviews: stored }
  },
  getters: {
    getReviewsByProduct: (state) => (productId) => {
      return state.reviews.filter(r => r.productId === Number(productId))
    },
    getProductRating: (state) => (productId) => {
      const revs = state.reviews.filter(r => r.productId === Number(productId))
      if (revs.length === 0) return 0
      return +(revs.reduce((s, r) => s + r.rating, 0) / revs.length).toFixed(1)
    },
  },
  actions: {
    addReview(productId, userId, userName, text, rating) {
      const review = {
        id: Date.now(),
        productId: Number(productId),
        userId,
        userName,
        text,
        rating,
        date: new Date().toISOString().split('T')[0],
      }
      this.reviews.push(review)
      saveReviews(this.reviews)
    },
  },
})
