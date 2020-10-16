import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/components/page/login')
const Register = () => import('@/components/page/register')
const Home = () => import('@/components/page/home')
Vue.use(Router)
const router =new Router({
  routes: [
    {
      path: '/',
      name: 'Login',//登陆
      component: Login,
      beforeEnter: (to, from, next) => {
        // const tokenStr = window.localStorage.getItem('token')
        // 如果 token 存在， 直接放行
        // if (tokenStr) return next("/home")
        next()
      }
    },
    {
      path: '/register',
      name: 'register',//注册
      component: Register
    },
    {
      path: '/home',
      name: 'home',//主页
      component: Home
    }
  ]
  
})
// router.beforeEach((to, from, next) => {
//   // 如果用户访问的是 登录页面，则直接放行
//   if (to.path === '/') return next()
//   // 获取 token

// })

export default router