<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Корзина</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body" v-if="cartStore.cartItems.length > 0">
        <div class="cart-item" v-for="item in cartStore.cartItems" :key="item.productId">
          <span class="cart-item-icon">{{ item.image }}</span>
          <div class="cart-item-info">
            <strong>{{ item.name }}</strong>
            <span>{{ item.price }} ₽ × {{ item.quantity }}</span>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" @click="cartStore.updateQuantity(item.productId, item.quantity - 1)">−</button>
            <span class="qty-value">{{ item.quantity }}</span>
            <button class="qty-btn" @click="cartStore.updateQuantity(item.productId, item.quantity + 1)">+</button>
            <button class="btn btn-danger btn-sm" @click="cartStore.removeFromCart(item.productId)">X</button>
          </div>
        </div>
        <div class="cart-total">
          <span>Итого</span>
          <strong>{{ cartStore.totalPrice }} ₽</strong>
        </div>
        <div class="order-form" v-if="showOrderForm">
          <h3>Оформление заказа</h3>
          <div class="form-group">
            <label>Адрес доставки</label>
            <input v-model="address" placeholder="г. Москва, ул. Примерная, д. 1, кв. 1" />
          </div>
          <div class="form-group">
            <label>Телефон</label>
            <input v-model="phone" type="tel" inputmode="numeric" placeholder="+7 (900) 123-45-67" @input="phone = phone.replace(/\D/g, '')" />
          </div>
          <button class="btn btn-primary" @click="placeOrder" :disabled="!address || !phone">
            Подтвердить заказ
          </button>
        </div>
        <button v-else class="btn btn-accent" @click="showOrderForm = true">
          Оформить заказ
        </button>
      </div>
      <div class="modal-body" v-else>
        <div class="empty-state">
          <div class="icon"></div>
          <h3>Корзина пуста</h3>
          <p>Добавьте товары из каталога</p>
          <router-link to="/catalog" class="btn btn-primary" @click="$emit('close')">В каталог</router-link>
        </div>
      </div>
      <div v-if="orderMessage" class="order-message">{{ orderMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useOrdersStore } from '../stores/orders'

defineEmits(['close'])
const cartStore = useCartStore()
const ordersStore = useOrdersStore()

const showOrderForm = ref(false)
const address = ref('')
const phone = ref('')
const orderMessage = ref('')

function placeOrder() {
  const result = ordersStore.placeOrder(address.value, phone.value)
  if (result.success) {
    orderMessage.value = `Заказ #${result.orderId} оформлен!`
    showOrderForm.value = false
    address.value = ''
    phone.value = ''
  } else {
    orderMessage.value = `${result.error}`
  }
  setTimeout(() => orderMessage.value = '', 4000)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}
.modal-content {
  width: 460px;
  max-width: 100%;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.15);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
}
.modal-header h2 { font-size: 20px; }
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--text-light);
}
.close-btn:hover { background: #f0f0f0; }
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}
.cart-item-icon { font-size: 28px; }
.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
}
.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}
.qty-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  background: #fff;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
.qty-btn:hover { background: #f0f0f0; }
.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}
.cart-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 18px;
  border-top: 2px solid var(--primary);
  margin-top: 8px;
}
.order-form {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.order-form h3 {
  margin-bottom: 12px;
  font-size: 16px;
}
.order-message {
  padding: 12px 24px;
  text-align: center;
  font-weight: 600;
  border-top: 1px solid var(--border);
}
</style>
