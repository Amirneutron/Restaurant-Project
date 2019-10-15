import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Camels from './views/Camels.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Contact from './views/Contact.vue'
import Products from './views/Products.vue'
import Info from './views/Info.vue'
import Master from './views/Master.vue'
import AdminLogin from './views/AdminLogin.vue'
import UsersList from './views/UsersList.vue'
import CreateProduct from './views/CreateProduct.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',
      name:'home',
      component: Home
    },
    {
      path: `/users/:id`,
      name: 'home',
      component: Home
    },
    {
      path: '/camels',
      name: 'camels',
      component: Camels
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/:Pid',
      name: 'info',
      component: Info
    },
    {
      path: '/admins/:id',
      name: 'master',
      component: Master
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/admins/:id/users',
      name: 'usersList',
      component: UsersList
    },
    {
      path: '/admins/:id/products',
      name: 'createProduct',
      component: CreateProduct
    }

  ]
})
