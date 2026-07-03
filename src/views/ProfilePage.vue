<template>
  <div class="profile">
    <h1 class="page-title">Личный кабинет</h1>

    <div v-if="!authStore.isAuthenticated" class="auth-section">
      <div class="tabs">
        <button :class="['tab', { active: tab === 'login' }]" @click="tab = 'login'">Вход</button>
        <button :class="['tab', { active: tab === 'register' }]" @click="tab = 'register'">Регистрация</button>
      </div>

      <div class="card form-card" v-if="tab === 'login'">
        <h2>Вход</h2>
        <div class="form-group">
          <label>Email</label>
          <input v-model="loginForm.email" type="email" placeholder="email@example.com" />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="loginForm.password" type="password" placeholder="Ваш пароль" />
        </div>
        <p v-if="loginError" class="error">{{ loginError }}</p>
        <button class="btn btn-primary" @click="doLogin">Войти</button>
      </div>

      <div class="card form-card" v-if="tab === 'register'">
        <h2>Регистрация</h2>
        <div class="form-group">
          <label>Имя</label>
          <input v-model="registerForm.name" placeholder="Иван Иванов" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="registerForm.email" type="email" placeholder="email@example.com" />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="registerForm.password" type="password" placeholder="Придумайте пароль" />
        </div>
        <p v-if="registerError" class="error">{{ registerError }}</p>
        <button class="btn btn-primary" @click="doRegister">Зарегистрироваться</button>
      </div>
    </div>

    <div v-else class="profile-content">
      <div class="card profile-info">
        <div class="profile-avatar">{{ authStore.user.name[0] }}</div>
        <div>
          <h2>{{ authStore.user.name }}</h2>
          <p>{{ authStore.user.email }}</p>
          <span v-if="authStore.isAdmin" class="badge">Администратор</span>
        </div>
        <button class="btn btn-outline" @click="authStore.logout">Выйти</button>
      </div>

      <div class="card orders-section">
        <h2>Мои заказы</h2>
        <div v-if="userOrders.length > 0" class="orders-list">
          <div class="order-card" v-for="order in userOrders" :key="order.id">
            <div class="order-header">
              <strong>Заказ #{{ order.id }}</strong>
              <span class="badge" :class="statusClass(order.status)">{{ order.status }}</span>
              <span>{{ order.date }}</span>
            </div>
            <div class="order-items">
              <div class="order-item" v-for="item in order.items" :key="item.productId">
                <span>{{ item.image }}</span>
                <span>{{ item.name }} × {{ item.quantity }}</span>
                <span>{{ item.price * item.quantity }} ₽</span>
              </div>
            </div>
            <div class="order-total">
              <span>Итого</span>
              <strong>{{ order.total }} ₽</strong>
            </div>
            <div class="order-details">
              <small>{{ order.address }}</small>
              <small>{{ order.phone }}</small>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <div class="icon"></div>
          <h3>У вас пока нет заказов</h3>
          <router-link to="/catalog" class="btn btn-primary">Начать покупки</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useOrdersStore } from '../stores/orders'

const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const tab = ref('login')

const loginForm = ref({ email: '', password: '' })
const loginError = ref('')
function doLogin() {
  loginError.value = ''
  const result = authStore.login(loginForm.value.email, loginForm.value.password)
  if (!result.success) loginError.value = result.error
}

const registerForm = ref({ name: '', email: '', password: '' })
const registerError = ref('')
function doRegister() {
  registerError.value = ''
  const result = authStore.register(registerForm.value.name, registerForm.value.email, registerForm.value.password)
  if (!result.success) registerError.value = result.error
}

const userOrders = computed(() => ordersStore.userOrders)

function statusClass(status) {
  const map = {
    'Оформлен': 'badge',
    'В обработке': 'badge',
    'Отправлен': 'badge',
    'Доставлен': 'badge',
    'Отменен': 'badge',
  }
  return map[status] || 'badge'
}
</script>

<style scoped>
.auth-section {
  max-width: 440px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 0;
}
.tab {
  flex: 1;
  padding: 12px;
  border: 1px solid var(--border);
  background: #f8f9fa;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}
.tab:first-child { border-radius: 8px 0 0 0; }
.tab:last-child { border-radius: 0 8px 0 0; }
.tab.active {
  background: #fff;
  border-bottom-color: #fff;
  color: var(--primary);
}
.form-card {
  border-top-left-radius: 0;
}
.form-card h2 {
  margin-bottom: 20px;
  text-align: center;
}
.error {
  color: #dc3545;
  font-size: 14px;
  margin-bottom: 12px;
}
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 20px;
}
.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.profile-info h2 {
  font-size: 20px;
}
.profile-info p {
  color: var(--text-light);
  font-size: 14px;
}
.orders-section h2 {
  margin-bottom: 16px;
}
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.order-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
}
.order-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
}
.order-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
.order-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.order-item span:last-child {
  margin-left: auto;
  font-weight: 600;
}
.order-total {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  padding-top: 8px;
  font-size: 16px;
}
.order-details {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  color: var(--text-light);
}
</style>
