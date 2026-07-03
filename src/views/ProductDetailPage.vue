<template>
  <div class="product-detail" v-if="product">
    <router-link to="/catalog" class="back-link">← Назад к каталогу</router-link>
    <div class="card product-main">
      <div class="product-image"><img :src="`${base}${product.image}`" :alt="product.name" class="product-img" /></div>
      <div class="product-info">
        <span class="badge">{{ product.category }}</span>
        <h1>{{ product.name }}</h1>
        <div class="rating">★ {{ product.rating }}</div>
        <p class="description">{{ product.description }}</p>
        <div class="price">{{ product.price }} ₽</div>
        <button class="btn btn-primary" @click="addToCart" :disabled="!authStore.isAuthenticated">
          {{ authStore.isAuthenticated ? 'Добавить в корзину' : 'Войдите чтобы купить' }}
        </button>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Отзывы ({{ reviews.length }})</h2>
      <div class="reviews-list" v-if="reviews.length > 0">
        <div class="card review-card" v-for="r in reviews" :key="r.id">
          <div class="review-header">
            <strong>{{ r.userName }}</strong>
            <span class="rating">★ {{ r.rating }}</span>
          </div>
          <p>{{ r.text }}</p>
          <small>{{ r.date }}</small>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>Пока нет отзывов. Будьте первым!</p>
      </div>

      <div class="card add-review" v-if="authStore.isAuthenticated">
        <h3>Оставить отзыв</h3>
        <div class="form-group">
          <label>Оценка</label>
          <div class="star-rating">
            <span v-for="s in 5" :key="s" class="star" :class="{ filled: s <= newRating }" @click="newRating = s">★</span>
          </div>
        </div>
        <div class="form-group">
          <label>Текст отзыва</label>
          <textarea v-model="newText" rows="3" placeholder="Поделитесь впечатлениями о товаре..."></textarea>
        </div>
        <button class="btn btn-primary" @click="submitReview" :disabled="!newText || newRating === 0">Отправить</button>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">
    <h3>Товар не найден</h3>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { useReviewsStore } from '../stores/reviews'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const base = import.meta.env.BASE_URL
const route = useRoute()
const productsStore = useProductsStore()
const reviewsStore = useReviewsStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const product = computed(() => productsStore.getProductById(route.params.id))
const reviews = computed(() => reviewsStore.getReviewsByProduct(route.params.id))

const newRating = ref(0)
const newText = ref('')

function addToCart() {
  if (authStore.isAuthenticated && product.value) {
    cartStore.addToCart(product.value)
  }
}

function submitReview() {
  if (!newText.value || newRating.value === 0 || !authStore.isAuthenticated) return
  reviewsStore.addReview(
    product.value.id,
    authStore.user.id,
    authStore.user.name,
    newText.value,
    newRating.value
  )
  productsStore.updateProductRating(product.value.id)
  newText.value = ''
  newRating.value = 0
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 16px;
  font-weight: 500;
}
.product-main {
  display: flex;
  gap: 32px;
  padding: 32px;
  margin-bottom: 24px;
}
.product-image {
  width: 300px;
  min-height: 300px;
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.product-info h1 {
  font-size: 28px;
}
.description {
  color: var(--text-light);
  line-height: 1.6;
  font-size: 15px;
}
.price {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-dark);
}
.reviews-section h2 {
  margin-bottom: 16px;
}
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.review-card p {
  margin: 8px 0;
  line-height: 1.5;
}
.review-card small {
  color: var(--text-light);
}
.review-header {
  display: flex;
  justify-content: space-between;
}
.add-review {
  margin-top: 16px;
}
.add-review h3 {
  margin-bottom: 16px;
}
.star-rating {
  display: flex;
  gap: 4px;
}
.star {
  font-size: 28px;
  cursor: pointer;
  color: #ddd;
  transition: color 0.15s;
}
.star.filled {
  color: var(--accent);
}
.star:hover {
  color: var(--accent);
}
</style>
