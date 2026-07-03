<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Добро пожаловать в <span class="highlight">Словянку</span>!</h1>
        <p>Свежие продукты, низкие цены, быстрая доставка.</p>
        <router-link to="/catalog" class="btn btn-accent">Перейти в каталог</router-link>
      </div>
    </section>

    <section class="features">
      <div class="feature-card card">
        <span class="feature-icon"></span>
        <h3>Свежие продукты</h3>
        <p>Ежедневные поставки от проверенных фермеров</p>
      </div>
      <div class="feature-card card">
        <span class="feature-icon"></span>
        <h3>Бесплатная доставка</h3>
        <p>При заказе от 1500 ₽ доставим бесплатно</p>
      </div>
      <div class="feature-card card">
        <span class="feature-icon"></span>
        <h3>Низкие цены</h3>
        <p>Мы гарантируем лучшие цены в районе</p>
      </div>
      <div class="feature-card card">
        <span class="feature-icon"></span>
        <h3>Акции и скидки</h3>
        <p>Постоянные акции и программа лояльности</p>
      </div>
    </section>

    <section class="popular">
      <h2 class="section-title">Популярные товары</h2>
      <div class="grid">
        <ProductCard v-for="product in popularProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="info">
      <div class="card info-card">
        <h2>О магазине "Словянка"</h2>
        <p>Мы работаем с 2010 года и за это время завоевали доверие тысяч покупателей. В нашем ассортименте представлены товары от свежих овощей до эксклюзивных деликатесов.</p>
        <p>Мы ценим каждого клиента и стремимся сделать покупки максимально комфортными. Присоединяйтесь к числу наших довольных покупателей!</p>
        <router-link to="/about" class="btn btn-outline">Подробнее о нас</router-link>
      </div>
    </section>

    <section class="reviews-preview">
      <h2 class="section-title">Отзывы наших клиентов</h2>
      <div class="reviews-grid">
        <div class="card review-card" v-for="r in sampleReviews" :key="r.id">
          <div class="review-header">
            <strong>{{ r.userName }}</strong>
            <span class="rating">★ {{ r.rating }}</span>
          </div>
          <p>{{ r.text }}</p>
          <small>{{ r.date }}</small>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'
import { useReviewsStore } from '../stores/reviews'

const productsStore = useProductsStore()
const reviewsStore = useReviewsStore()

const popularProducts = productsStore.allProducts
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 8)

const sampleReviews = reviewsStore.reviews.slice(-3).reverse()
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: #fff;
  border-radius: 16px;
  padding: 60px 40px;
  margin-bottom: 40px;
  text-align: center;
}
.hero h1 {
  font-size: 36px;
  margin-bottom: 12px;
}
.hero .highlight {
  color: var(--accent);
}
.hero p {
  font-size: 18px;
  margin-bottom: 24px;
  opacity: 0.9;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.feature-card {
  text-align: center;
  padding: 32px 20px;
}
.feature-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}
.feature-card h3 {
  margin-bottom: 8px;
  color: var(--primary-dark);
}
.feature-card p {
  font-size: 14px;
  color: var(--text-light);
}
.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--primary-dark);
}
.popular {
  margin-bottom: 40px;
}
.info {
  margin-bottom: 40px;
}
.info-card {
  text-align: center;
  padding: 40px;
}
.info-card h2 {
  margin-bottom: 16px;
  color: var(--primary-dark);
}
.info-card p {
  margin-bottom: 12px;
  line-height: 1.7;
  color: var(--text-light);
}
.reviews-preview {
  margin-bottom: 40px;
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}
.review-card p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.5;
}
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.review-card small {
  color: var(--text-light);
  font-size: 12px;
}
</style>
