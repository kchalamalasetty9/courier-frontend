import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/",
      name: "admin",
      component: () => import("./views/admin/AdminHomePage.vue"),
    },
    {
      path: "/",
      name: "courier",
      component: () => import("./views/courier/CourierHomePage.vue"),
    },
    {
      path: "/",
      name: "clerk",
      component: () => import("./views/clerk/ClerkHomePage.vue"),
    },
  ],
});

export default router;
