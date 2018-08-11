import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const LoginContainer = () => import('./views/login/LoginContainer.vue')
const LoginForm = () => import('./views/login/LoginForm.vue')
const RegisterForm = () => import('./views/login/RegisterForm.vue')

const Home = () => import('./views/Home.vue')
const Team = () => import('./views/Team.vue')

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: LoginContainer,
      beforeEnter: (to, from, next) => {
        if (store.state.user) {
          next({name: 'Home'})
        } else {
          next()
        }
      },
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginForm,
        },
        {
          path: '/register',
          name: 'Register',
          component: RegisterForm,
        },
      ],
    },
    {
      name: 'Team',
      path: '/team/:teamId',
      props: true,
      component: Team,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true,
      },
      children: [],
    },
  ],
})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.user) {
    next({name: 'Login'})
  } else {
    next()
  }
})


export default router
