import Vue from 'vue'
import Router from 'vue-router'
const LoginContainer = () => import('./views/login/LoginContainer.vue')
const LoginForm = () => import('./views/login/LoginForm.vue')
const RegisterForm = () => import('./views/login/RegisterForm.vue')

const Home = () => import('./views/Home.vue')
const Team = () => import('./views/Team.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: LoginContainer,
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
      component: Home,
      meta: {
        requireAuth: true,
      },
      children: [],
    },
  ],
})
