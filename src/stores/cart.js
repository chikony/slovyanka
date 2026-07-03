import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((s, i) => s + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    cartItems: (state) => state.items,
  },
  actions: {
    addToCart(product, quantity = 1) {
      const existing = this.items.find(i => i.productId === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        })
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(i => i.productId !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.productId === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      } else if (item) {
        this.removeFromCart(productId)
      }
    },
    clearCart() {
      this.items = []
    },
  },
})
