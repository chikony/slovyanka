<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon"></span>
        <span class="logo-text">Словянка</span>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active">Главная</router-link>
        <router-link to="/catalog" class="nav-link" active-class="active">Каталог</router-link>
        <router-link to="/about" class="nav-link" active-class="active">О нас</router-link>
        <router-link to="/profile" class="nav-link" active-class="active">
          <span v-if="authStore.isAuthenticated">{{ authStore.user.name }}</span>
          <span v-else>Войти</span>
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin" class="nav-link admin-link" active-class="active">Админ</router-link>
      </nav>
      <div class="header-actions">
        <button class="cart-btn" @click="openCart">
          <img :src="iconPath('cart-icon.png')" alt="Корзина" class="cart-img" />
          <span class="cart-count" v-if="cartStore.totalItems">{{ cartStore.totalItems }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const iconPath = (name) => `${import.meta.env.BASE_URL}icons/${name}`

const authStore = useAuthStore()
const cartStore = useCartStore()
const openCart = inject('openCart')
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  color: #fff;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
}
.logo:hover { color: #fff; }
.logo-icon { font-size: 28px; }
.nav {
  display: flex;
  gap: 4px;
  flex: 1;
}
.nav-link {
  color: rgba(255,255,255,0.85);
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
}
.nav-link:hover {
  color: #fff;
  background: rgba(255,255,255,0.15);
}
.nav-link.active {
  color: #fff;
  background: rgba(255,255,255,0.2);
}
.admin-link {
  background: var(--accent);
  color: #2c2c2c !important;
}
.admin-link:hover {
  background: #d49530;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cart-btn {
  background: rgba(255,255,255,0.15);
  border: none;
  color: #fff;
  font-size: 22px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}
.cart-btn:hover {
  background: rgba(255,255,255,0.25);
}
.cart-img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}
.cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent);
  color: #2c2c2c;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
