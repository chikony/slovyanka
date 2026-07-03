import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CatalogPage from '../views/CatalogPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import AdminPage from '../views/AdminPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/catalog', name: 'Catalog', component: CatalogPage },
  { path: '/catalog/:id', name: 'ProductDetail', component: ProductDetailPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/admin', name: 'Admin', component: AdminPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
