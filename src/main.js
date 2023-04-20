// import
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routes/index.js";
import "./assets/styles/index.scss";

//pinia
import { createPinia } from "pinia";
const pinia = createPinia();

// app
const app = createApp(App);

// use
app.use(pinia);
app.use(router);
app.mount("#app");
