<template>
  <div class="admin" v-if="authStore.isAdmin">
    <h1 class="page-title">Админ панель</h1>

    <div class="admin-tabs">
      <button :class="['tab', { active: activeTab === 'products' }]" @click="activeTab = 'products'">Товары</button>
      <button :class="['tab', { active: activeTab === 'orders' }]" @click="activeTab = 'orders'">Заказы</button>
      <button :class="['tab', { active: activeTab === 'users' }]" @click="activeTab = 'users'">Пользователи</button>
    </div>

    <!-- Товары -->
    <div v-if="activeTab === 'products'" class="admin-section">
      <div class="section-header">
        <h2>Управление товарами</h2>
        <button class="btn btn-primary" @click="showAddForm = !showAddForm">
          {{ showAddForm ? 'Отмена' : '+ Добавить товар' }}
        </button>
      </div>

      <div class="card add-form" v-if="showAddForm">
        <h3>Новый товар</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Название</label>
            <input v-model="newProduct.name" placeholder="Название товара" />
          </div>
          <div class="form-group">
            <label>Категория</label>
            <input v-model="newProduct.category" placeholder="Категория" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Цена (₽)</label>
            <input v-model.number="newProduct.price" type="number" />
          </div>
          <div class="form-group">
            <label>Эмодзи</label>
            <input v-model="newProduct.image" placeholder="URL изображения" />
          </div>
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="newProduct.description" rows="2"></textarea>
        </div>
        <button class="btn btn-primary" @click="addProduct">Сохранить</button>
      </div>

      <div class="admin-table">
        <div class="table-header">
          <span>Изобр.</span><span>Название</span><span>Категория</span><span>Цена</span><span>Рейтинг</span><span>Действия</span>
        </div>
        <div class="table-row" v-for="p in productsStore.allProducts" :key="p.id">
          <span>{{ p.image }}</span>
          <span>{{ p.name }}</span>
          <span>{{ p.category }}</span>
          <span>{{ p.price }} ₽</span>
          <span>★ {{ p.rating }}</span>
          <span>
            <button class="btn btn-danger btn-sm" @click="productsStore.deleteProduct(p.id)">Удалить</button>
          </span>
        </div>
      </div>
    </div>

    <!-- Заказы -->
    <div v-if="activeTab === 'orders'" class="admin-section">
      <h2>Управление заказами</h2>
      <div v-if="ordersStore.allOrders.length > 0" class="admin-table">
        <div class="table-header orders-header">
          <span>№ заказа</span><span>Дата</span><span>Клиент</span><span>Сумма</span><span>Статус</span><span>Действия</span>
        </div>
        <div class="table-row orders-row" v-for="o in ordersStore.allOrders" :key="o.id">
          <span class="order-id">#{{ String(o.id).slice(-6) }}</span>
          <span>{{ o.date }}</span>
          <span>{{ getUserName(o.userId) }}</span>
          <span>{{ o.total }} ₽</span>
          <span><span class="badge">{{ o.status }}</span></span>
          <span>
            <select v-model="o.status" @change="ordersStore.updateOrderStatus(o.id, o.status)" class="status-select">
              <option>Оформлен</option>
              <option>В обработке</option>
              <option>Отправлен</option>
              <option>Доставлен</option>
              <option>Отменен</option>
            </select>
          </span>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>Заказов пока нет</p>
      </div>
    </div>

    <!-- Пользователи -->
    <div v-if="activeTab === 'users'" class="admin-section">
      <h2>Пользователи</h2>
      <div class="admin-table">
        <div class="table-header">
          <span>ID</span><span>Имя</span><span>Email</span><span>Роль</span>
        </div>
        <div class="table-row" v-for="u in authStore.users" :key="u.id">
          <span>{{ u.id }}</span>
          <span>{{ u.name }}</span>
          <span>{{ u.email }}</span>
          <span>{{ u.isAdmin ? 'Админ' : 'Пользователь' }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">
    <div class="icon"></div>
    <h3>Доступ запрещен</h3>
    <p>Только администратор может просматривать эту страницу.</p>
    <router-link to="/" class="btn btn-primary">На главную</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'
import { useOrdersStore } from '../stores/orders'

const authStore = useAuthStore()
const productsStore = useProductsStore()
const ordersStore = useOrdersStore()

const activeTab = ref('products')
const showAddForm = ref(false)
const newProduct = ref({ name: '', category: '', price: 0, image: '', description: '', rating: 0 })

function addProduct() {
  if (!newProduct.value.name || !newProduct.value.category || !newProduct.value.price) return
  productsStore.addProduct({ ...newProduct.value })
  newProduct.value = { name: '', category: '', price: 0, image: '', description: '', rating: 0 }
  showAddForm.value = false
}

function getUserName(userId) {
  const user = authStore.users.find(u => u.id === userId)
  return user ? user.name : 'Неизвестный'
}
</script>

<style scoped>
.admin-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border);
}
.admin-tabs .tab {
  padding: 12px 24px;
  border: none;
  background: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-light);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}
.admin-tabs .tab.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
.admin-tabs .tab:hover {
  color: var(--primary);
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.section-header h2 {
  font-size: 18px;
}
.add-form {
  margin-bottom: 20px;
}
.add-form h3 {
  margin-bottom: 16px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.admin-table {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.table-header {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 80px 80px 140px;
  background: #f8f9fa;
  font-weight: 600;
  font-size: 13px;
  padding: 12px 16px;
  gap: 8px;
}
.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 80px 80px 140px;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.orders-header {
  grid-template-columns: 90px 110px 1fr 80px 110px 140px;
}
.orders-row {
  grid-template-columns: 90px 110px 1fr 80px 110px 140px;
}
.order-id {
  font-family: monospace;
  font-size: 13px;
}
.table-row:hover {
  background: #fafafa;
}
.status-select {
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 13px;
}
</style>
