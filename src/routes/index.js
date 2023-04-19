import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
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
  history: createWebHistory(),
  routes,
});

export default router;
