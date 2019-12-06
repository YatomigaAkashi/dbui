import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '../views/Student.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/student'
  },
  {
    path: '/student',
    name: 'student',
    component: Student
  },
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/Teacher.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('../views/Course.vue')
  },
  {
    path: '/class',
    name: 'class',
    component: () => import('../views/Class.vue')
  },
  {
    path: '/sm',
    name: 'sm',
    component: () => import('../views/Sm.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
