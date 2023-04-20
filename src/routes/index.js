import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";

let routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    meta: { index: 1 },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    meta: { index: 1 },
    component: () => import("@/views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
