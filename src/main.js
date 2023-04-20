/* import相关文件 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routes/index.js";
import "./assets/styles/index.scss";

/* vant函数式组件手动引入样式 */
import "vant/es/toast/style"; // Toast
import "vant/es/dialog/style"; // Dialog
import "vant/es/notify/style"; // Notify
import "vant/es/image-preview/style"; // ImagePreview

/* pinia 注册和初始化 */
import { createPinia } from "pinia";
const pinia = createPinia();

/* app初始化 */
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
