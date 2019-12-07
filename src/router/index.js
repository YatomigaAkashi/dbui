import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../pages/Index.vue'),
    redirect: '/index/student',
    meta: {
      auth: true,
    },
    children: [
      {
        path: 'student',
        name: 'student',
        meta: {
          auth: true,
        },
        component: () => import('../views/Student.vue')
      },
      {
        path: 'teacher',
        name: 'teacher',
        meta: {
          auth: true,
        },
        component: () => import('../views/Teacher.vue')
      },
      {
        path: 'course',
        name: 'course',
        meta: {
          auth: true,
        },
        component: () => import('../views/Course.vue')
      },
      {
        path: 'class',
        name: 'class',
        meta: {
          auth: true,
        },
        component: () => import('../views/Class.vue')
      },
      {
        path: 'sm',
        name: 'sm',
        meta: {
          auth: true,
        },
        component: () => import('../views/Sm.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    if (localStorage.getItem('token')) { //读取token值
      //  成功
      next()
    } else {
      next({path:'/login'})
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
});


export default router
