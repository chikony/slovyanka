import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { useAuthStore } from './auth'

const ORDERS_KEY = 'slovyanka_orders'

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []
  } catch {
    return []
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: loadOrders(),
  }),
  getters: {
    userOrders: (state) => {
      const authStore = useAuthStore()
      return state.orders.filter(o => o.userId === authStore.user?.id)
    },
    allOrders: (state) => state.orders,
    getOrderById: (state) => (id) => state.orders.find(o => o.id === id),
  },
  actions: {
    placeOrder(address, phone) {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) return { success: false, error: 'Необходимо авторизоваться' }
      const cartStore = useCartStore()
      if (cartStore.cartItems.length === 0) return { success: false, error: 'Корзина пуста' }

      const order = {
        id: Date.now(),
        userId: authStore.user.id,
        items: [...cartStore.cartItems],
        total: cartStore.totalPrice,
        address,
        phone,
        status: 'Оформлен',
        date: new Date().toLocaleDateString('ru-RU'),
      }
      this.orders.push(order)
      saveOrders(this.orders)
      cartStore.clearCart()
      return { success: true, orderId: order.id }
    },
    updateOrderStatus(orderId, status) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status
        saveOrders(this.orders)
      }
    },
  },
})
