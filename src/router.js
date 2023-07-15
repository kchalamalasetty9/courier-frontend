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
      path: "/admin",
      name: "admin",
      component: () => import("./views/admin/AdminHomePage.vue"),
    },
    {
      path: "/courier",
      name: "courier",
      component: () => import("./views/courier/CourierHomePage.vue"),
    },
    {
      path: "/clerk",
      name: "clerk",
      component: () => import("./views/clerk/ClerkHomePage.vue"),
    },
  ],
});

export default router;
