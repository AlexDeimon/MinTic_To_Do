import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SignIn from './components/SignIn'
import Task from './components/Task'
import Category from './components/Category'
import User from './components/User'

const routes = [{
  path: '/',
  name: 'root',
  component: App
},
{
  path: '/singIn',
  name: 'signIn',
  component: SignIn
},
{
  path: '/user/:username',
  name: 'user',
  component: User
},
{
  path: '/category/:username',
  name: 'category',
  component: Category
},
{
  path: '/task/:username',
  name: 'task',
  component: Task
}
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router