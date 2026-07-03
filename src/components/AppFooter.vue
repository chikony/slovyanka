<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-section">
        <h4>Словянка</h4>
        <p>Ваш надежный продуктовый магазин. Свежие продукты каждый день!</p>
      </div>
      <div class="footer-section">
        <h4>Контакты</h4>
        <p>+7 (800) 123-45-67</p>
        <p>info@slovyanka.ru</p>
        <p>г. Москва, ул. Примерная, д. 1</p>
      </div>
      <div class="footer-section">
        <h4>Часы работы</h4>
        <p>Пн-Пт: 08:00 - 22:00</p>
        <p>Сб-Вс: 09:00 - 21:00</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Магазин "Словянка". Все права защищены.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary-dark);
  color: rgba(255,255,255,0.85);
  margin-top: auto;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
.footer-section h4 {
  margin-bottom: 12px;
  font-size: 16px;
  color: #fff;
}
.footer-section p {
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 1.6;
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 16px;
  text-align: center;
  font-size: 13px;
}
</style>
