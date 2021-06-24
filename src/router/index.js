import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import RegisterTodo from '../views/RegisterTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/create',
    name: 'create',
    component: RegisterTodo
  }
]

const router = new VueRouter({
  routes
})

export default router
