<template>
  <div class="app">
    <AppHeader />
    <CartModal v-if="showCart" @close="showCart = false" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import CartModal from './components/CartModal.vue'

const showCart = ref(false)
function openCart() { showCart.value = true }
function closeCart() { showCart.value = false }
provide('openCart', openCart)
</script>
