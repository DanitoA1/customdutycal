import Vue from 'vue';
import VueRouter from 'vue-router';
// import firebase from 'firebase';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Admin from '../views/Admin/Admin.vue';
import Overview from '../views/Admin/Overview.vue';
import Rates from '../views/Admin/Rates.vue';
import Manager from '../views/Admin/Manager.vue';
import Update from '../views/Admin/Update.vue';
import User from '../views/User/User.vue';
import Advisory from '../views/User/Advisory.vue';
import Freight from '../views/User/Freight.vue';
import Logistics from '../views/User/Logistics.vue';
import PostClearance from '../views/User/PostClearance.vue';
import PreImport from '../views/User/PreImport.vue';
import Warehousing from '../views/User/Warehousing.vue';
import UserLogin from '../views/User/Login.vue';
import { auth } from '../firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    redirect: {
      name: 'Overview',
    },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: 'rates',
        name: 'Rates',
        component: Rates,
      },
      {
        path: 'manager',
        name: 'Manager',
        component: Manager,
      },
      {
        path: 'update',
        name: 'Update',
        component: Update,
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      {
        path: '',
        name: 'Advisory',
        component: Advisory,
      },
      {
        path: 'freight',
        name: 'Freight',
        component: Freight,
      },
      {
        path: 'logistics',
        name: 'Logistics',
        component: Logistics,
      },
      {
        path: 'postclearance',
        name: 'PostClearance',
        component: PostClearance,
      },
      {
        path: 'preimport',
        name: 'PreImport',
        component: PreImport,
      },
      {
        path: 'warehousing',
        name: 'Warehousing',
        component: Warehousing,
      },
    ],
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: UserLogin,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
/* router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((userAuth) => {
    if (userAuth) {
      firebase.auth().currentUser.getIdTokenResult()
        .then(({
          claims,
        }) => {
          if (claims.user) {
            if (to.path !== '/') {
              return next({
                path: '/',
              });
            }
          } else if (claims.admin) {
            if (to.path !== '/admin') {
              return next({
                path: '/admin',
              });
            }
          } else if (claims.driver) {
            if (to.path !== '/driver') {
              return next({
                path: '/driver',
              });
            }
          }
          return next();
        });
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  });

  next();
}); */
/* eslint-disable */
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      auth.currentUser.getIdTokenResult()
        .then(({ claims }) => {
          if (claims.admin) {
            if (to.path !== '/admin' && from.path === '/login') {
              return next({
                path: '/admin',
              });
            }
          }
          else {
            if (to.path !== '/') {
              return next({
                path: '/',
              });
            }
          }
        });
    }
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = auth.currentUser;
    if (requiresAuth && !isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });
  next();
});
export default router;
