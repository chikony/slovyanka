<template>
  <div class="catalog">
    <h1 class="page-title">Каталог товаров</h1>
    <div class="catalog-controls">
      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Поиск товаров..." />
      </div>
      <div class="price-filter">
        <input v-model.number="priceMin" type="number" placeholder="Цена от" class="price-input" />
        <span>—</span>
        <input v-model.number="priceMax" type="number" placeholder="Цена до" class="price-input" />
      </div>
      <div class="category-tabs">
        <button
          v-for="cat in ['Все', ...productsStore.allCategories]"
          :key="cat"
          :class="['tab-btn', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>
    <div class="grid" v-if="filteredProducts.length > 0">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <div v-else class="empty-state">
      <div class="icon"></div>
      <h3>Товары не найдены</h3>
      <p>Попробуйте изменить параметры поиска</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const searchQuery = ref('')
const selectedCategory = ref('Все')
const priceMin = ref(null)
const priceMax = ref(null)

const filteredProducts = computed(() => {
  let items = productsStore.productsByCategory(selectedCategory.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }
  if (priceMin.value !== null && priceMin.value !== '') {
    items = items.filter(p => p.price >= priceMin.value)
  }
  if (priceMax.value !== null && priceMax.value !== '') {
    items = items.filter(p => p.price <= priceMax.value)
  }
  return items
})
</script>

<style scoped>
.catalog-controls {
  margin-bottom: 24px;
}
.search-bar {
  margin-bottom: 16px;
}
.search-bar input {
  max-width: 400px;
}
.price-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.price-input {
  width: 140px;
}
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tab-btn {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}
.tab-btn:hover { border-color: var(--primary); color: var(--primary); }
.tab-btn.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
</style>
