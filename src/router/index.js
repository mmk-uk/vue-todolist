import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from '../views/TodoList.vue'
import RegisterTodo from '../views/RegisterTodo.vue'
import RegisterCategory from '../views/RegisterCategory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
    props: true
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
  }
]

const router = new VueRouter({
  routes
})

export default router
