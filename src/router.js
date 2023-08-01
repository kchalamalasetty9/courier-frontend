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
      children: [
        { path: "/admin", component: () => import("./views/admin/Users.vue") },
        { path: "/admin/users", component: () => import("./views/admin/Users.vue") },
        {
          path: "/admin/add-order",
          component: () => import("./views/clerk/AddTicket.vue"),
        },
        {
          path: "/admin/orders",
          component: () => import("./views/clerk/Tickets.vue"),
        },
        {
          path: "/admin/customers",
          component: () => import("./views/clerk/Customers.vue"),
        },
        {
          path: "/admin/couriers",
          component: () => import("./views/admin/Couriers.vue"),
        },
        {
          path: "/admin/company-info",
          component: () => import("./views/admin/CompanyInfo.vue"),
        },
        { path: "/admin/map", component: () => import("./views/admin/Map.vue") },
      ],
    },
    {
      path: "/courier",
      name: "courier",
      component: () => import("./views/courier/CourierHomePage.vue"),
      children: [
        {
          path: "/courier/",
          component: () => import("./views/courier/MyTickets.vue"),
        },
        {
          path: "/courier/my-orders",
          component: () => import("./views/courier/MyTickets.vue"),
        },
        {
          path: "/courier/available-orders",
          component: () => import("./views/courier/AvailableTickets.vue"),
        },
      ]
      
    },
    {
      path: "/clerk",
      name: "clerk",
      component: () => import("./views/clerk/ClerkHomePage.vue"),
      children: [
        {
          path: "/clerk",
          component: () => import("./views/clerk/AddTicket.vue"),
        },
        {
          path: "/clerk/add-order",
          component: () => import("./views/clerk/AddTicket.vue"),
        },
        {
          path: "/clerk/orders",
          component: () => import("./views/clerk/Tickets.vue"),
        },
        {
          path: "/clerk/customers",
          component: () => import("./views/clerk/Customers.vue"),
        },
        { path: "/clerk/couriers", component: () => import("./views/clerk/Couriers.vue"), },
      ],
    },
  ],
});

export default router;
