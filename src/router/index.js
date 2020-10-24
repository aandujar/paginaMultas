import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'Index',
    redirect: "apps",//aqui tienes que meter la ruta que quieras meter de las pagina de apps que me has dicho
    children: [
      {
        path: '/apps', // la ruta que sea
        name: 'Apps',
        component: () => import('@/views/Apps.vue'), //meter la vista que sea
        meta: {
          requiresAuth: true, //meter esto en todas las rutas que se necesite estar logueado,
          notAllowed: ["aa"/* meter aqui strings con los nombres de los roles que no pueden acceder   */]
        }
      },
      //meter aqui todas las demas rutas
    ]
  },
  {
    path: '*',
    redirect: "" // esta ruta es el 404 del front, cuando no se encuentra la ruta, por si quieres meter pantalla de error o algo
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters["auth/isAuthenticated"]) next({ name: 'Login' })
 /*else if (to.meta.hasOwnProperty("notAllowed") && to.meta.notAllowed.findIndex(rol => rol == store.getters["auth/getUserRole"]) > -1)
    next(false)*/
 else next()
})

export default router
