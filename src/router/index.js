import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home
  },
  {
    path: '/home',
    name: 'Home1',
    component:Home,
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path:"/search",
    name:"Search",
    component:() => import('@/views/Search.vue'),
    redirect:"/search/index",
    children:[
      {
        path:"index",
        name:"Search_index",
        component:() => import('@/views/Search/Search_index.vue')
      },
      {
        path: "list",
        name: "Search_List",
        component: () => import('@/views/Search/Search-list.vue'),
      },
    ],
  },
  {
    path: "/details",
    name: "Details",
    component: () => import('@/views/Details.vue'),
  },
  {
    path:"/login",
    name:"UserLogin",
    component: ()=> import("@/views/Login/Login.vue")
  },
  {
    path: "/userlogin",
    name: "UserLogin",
    component: () => import('@/views/Login/UserLogin.vue'),
  },
  {
    path: "/registered",
    name: "Registered",
    component: () => import('@/views/Login/Registered.vue'),
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () => import('@/views/Recovery/Recovery.vue'),
    children:[
      {
        path:"/",
        name:"Recovery_index",
        component:() => import('@/views/Recovery/Recovery_index.vue')
      },
      {
        path: "recovery_view",
        name: "Recovery_view",
        component: () => import('@/views/Recovery/Recovery_view.vue'),
      },
    ],
  },
  {
    path:"/address",
    name:"Address",
    component:()=> import("@/views/Address.vue"),
    children:[
      {
        path:"/",
        name:"address_index",
        component:() => import('@/views/Address/address_index.vue')
      },
      {
        path:"addAddress",
        name:"AddAddress",
        component:() => import("@/views/Address/addAddress.vue")
      },
      {
        path:"editAddAddress",
        name:"EditAddAddress",
        component:() => import("@/views/Address/editAddAddress.vue")
      }
    ],
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
