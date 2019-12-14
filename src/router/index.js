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
        path: 'department',
        name: 'department',
        meta: {
          auth: true,
        },
        component: () => import('../views/Department.vue')
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
      {
        path: 'queryCourse',
        name: 'queryCourse',
        meta: {
          auth: true
        },
        component: () => import('../views/student/queryCourse')
      }
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
      next({ path: '/login' })
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
});


export default router
