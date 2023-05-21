import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import ProjectSettings from '../views/ProjectSettings.vue'; // Import the ProjectSettings component

// Define the routes for your application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresUnauth: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/create',
    name: 'create',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/CreateProject.vue')
  },
  {
    path: '/list',
    name: 'list',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ProjectList.vue')
  },
  {
    path: '/:id',
    name: 'detail',
    component: () => import('../views/ProjectDetail.vue')
  },
  {
    path: '/:id/settings',
    name: 'ProjectSettings',
    component: ProjectSettings,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add a global navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    next({ name: 'Login' });
  } else if (to.meta.requiresUnauth && auth.isAuthenticated) {
    // Redirect to the dashboard page if the user is authenticated
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

// Redirect to the login page by default
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
