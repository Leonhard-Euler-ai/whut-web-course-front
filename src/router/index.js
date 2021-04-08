import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import("views/login/LoginView"),
    children: [
      {
        path: '',
        component: () => import("views/login/LoginViewComps/LoginPart"),
      },
      {
        path: 'toRegister',
        component: () => import("views/login/LoginViewComps/RegisterView"),
      }
    ]
  },
  {
    path: '/main',
    component: () => import("views/main/MainView"),
    children: [
      {
        path: "",
        redirect: "home"
      },
      {
        path: "home",
        component: () => import("views/main/mainViewComps/BodyView/HomeView")
      },
      {
        path: "profile",
        component: () => import("views/main/mainViewComps/BodyView/ProfileView")
      },
      {
        path: "user-management",
        component: () => import("views/main/mainViewComps/BodyView/UserManagementView")
      },
      {
        path: "article-management",
        component: () => import("views/main/mainViewComps/BodyView/ArticleManagementView")
      }
    ]
  },
  {
    path: '/notfound',
    component: () => import('components/NotFound')
  }, {
    path: '/*',
    component: () => import('components/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置导航守卫
router.beforeEach(((to, from, next) => {
  if (to.path === '/login'||to.path === '/login/toRegister'||to.path === '/findPassword') {
    return next()
  }
  if (!(window.sessionStorage.getItem("authorization") === "success")) {
    return next('/login')
  }
  next()
}))

export default router
