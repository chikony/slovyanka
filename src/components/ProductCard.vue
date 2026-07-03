<template>
  <div class="product-card card" @click="goToProduct">
    <div class="product-image">{{ product.image }}</div>
    <div class="product-body">
      <span class="badge">{{ product.category }}</span>
      <span class="product-name">{{ product.name }}</span>
      <div class="rating">★ {{ product.rating }}</div>
      <div class="product-price">{{ product.price }} ₽</div>
      <button class="btn btn-primary btn-sm" @click.stop="addToCart" :disabled="!authStore.isAuthenticated">
        {{ authStore.isAuthenticated ? 'В корзину' : 'Войдите чтобы купить' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const props = defineProps({ product: { type: Object, required: true } })
const cartStore = useCartStore()
const authStore = useAuthStore()

function goToProduct() {
  router.push(`/catalog/${props.product.id}`)
}

function addToCart() {
  if (authStore.isAuthenticated) {
    cartStore.addToCart(props.product)
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.product-image {
  font-size: 64px;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}
.product-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.product-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
}
.product-card:hover .product-name {
  color: var(--primary);
}
.product-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-dark);
}
</style>
