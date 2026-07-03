<template>
  <div class="about">
    <h1 class="page-title">О нас</h1>
    <div class="card about-hero">
      <h2>Магазин "Словянка" — ваш надежный продуктовый партнер</h2>
      <p>Добро пожаловать в "Словянку"! Мы — семейный продуктовый магазин, который работает для вас с 2010 года. За это время мы выросли из небольшого ларька в один из самых популярных продуктовых магазинов в нашем районе.</p>
    </div>

    <div class="about-grid">
      <div class="card">
        <h3>Наша история</h3>
        <p>Всё началось с маленькой семейной лавки, где работали только члены одной семьи. Благодаря любви к своему делу и уважению к клиентам, мы постепенно расширялись. Сегодня "Словянка" — это современный продуктовый магазин с широким ассортиментом, но мы по-прежнему сохраняем тёплую семейную атмосферу.</p>
      </div>
      <div class="card">
        <h3>Наша миссия</h3>
        <p>Мы стремимся сделать качественные продукты доступными каждому. Наша цель — чтобы каждый покупатель уходил из магазина с улыбкой и возвращался к нам снова и снова.</p>
      </div>
      <div class="card">
        <h3>Наши ценности</h3>
        <ul>
          <li><strong>Качество</strong> — мы тщательно отбираем поставщиков</li>
          <li><strong>Честность</strong> — честные цены без скрытых наценок</li>
          <li><strong>Удобство</strong> — делаем покупки комфортными</li>
          <li><strong>Забота</strong> — каждый клиент — часть нашей семьи</li>
        </ul>
      </div>
      <div class="card">
        <h3>Наши партнеры</h3>
        <p>Мы сотрудничаем только с проверенными производителями и фермерскими хозяйствами. Каждый продукт на наших полках проходит строгий контроль качества.</p>
      </div>
    </div>

    <div class="card stats">
      <div class="stat">
        <span class="stat-number">15+</span>
        <span class="stat-label">Лет работы</span>
      </div>
      <div class="stat">
        <span class="stat-number">50 000+</span>
        <span class="stat-label">Довольных клиентов</span>
      </div>
      <div class="stat">
        <span class="stat-number">24/7</span>
        <span class="stat-label">Поддержка</span>
      </div>
    </div>

    <div class="card contacts">
      <h2>Контакты</h2>
      <div class="contacts-grid">
        <div><strong>Телефон:</strong> +7 (800) 123-45-67</div>
        <div><strong>Email:</strong> info@slovyanka.ru</div>
        <div><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1</div>
        <div><strong>Режим работы:</strong> Пн-Пт 08:00-22:00, Сб-Вс 09:00-21:00</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-hero {
  text-align: center;
  padding: 40px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #f0fdf4, #fff);
}
.about-hero h2 {
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-size: 22px;
}
.about-hero p {
  line-height: 1.7;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto;
}
.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.about-grid .card h3 {
  margin-bottom: 12px;
  color: var(--primary-dark);
}
.about-grid .card p {
  line-height: 1.6;
  color: var(--text-light);
}
.about-grid .card ul {
  list-style: none;
  padding: 0;
}
.about-grid .card ul li {
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.5;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  text-align: center;
  padding: 32px;
  margin-bottom: 24px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
}
.stat-label {
  font-size: 14px;
  color: var(--text-light);
}
.contacts {
  padding: 32px;
}
.contacts h2 {
  margin-bottom: 16px;
}
.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.contacts-grid div {
  font-size: 14px;
}
</style>
