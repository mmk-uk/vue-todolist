import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import RegisterTodo from '../views/RegisterTodo.vue'
import RegisterCategory from '../views/RegisterCategory.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Reset from '../views/Reset.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/todolist',
    name: 'todolist',
    component: TodoList,
    props: true,
  },
  {
    path: '/create',
    name: 'create',
    component: RegisterTodo,
    props: true
  },
  {
    path: '/edit',
    name: 'edit',
    component: RegisterTodo,
    props: true
  },
  {
    path: '/makecategory',
    name: 'makecategory',
    component: RegisterCategory,
    props: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    props: true
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    props: true
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset,
    props: true
  }

]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {

  const userinfo = JSON.parse(localStorage.getItem('userinfo')) || false;
  const isAuthenticated = userinfo?true:false;

  if ((to.name == 'todolist' || to.name == 'create'|| to.name == 'edit'|| to.name == 'makecategory') && !isAuthenticated){
    next({ name: 'home' })
  }
  else if ((to.name == 'home' || to.name == 'signin'|| to.name == 'signup'|| to.name == 'reset') && isAuthenticated){
    next({ name: 'todolist' })
  }
  else{
    next()
  }


})


export default router
