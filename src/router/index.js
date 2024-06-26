import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Home from '../views/HomeView.vue'
import Cart from '../views/CartView.vue'
import AddCategory from '../views/add/AddCategory.vue'
import AddProduct from '../views/add/AddProduct.vue'
import Payment from '../views/PaymentView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/add-category',
      name: 'add-category',
      component: AddCategory
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: AddProduct
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    }
  ]
})

export default router
