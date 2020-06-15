import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCloud,
  faSun,
  faCloudSun,
  faSnowflake,
  faSmog,
  faCloudRain,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Buefy from "buefy";
import Vue from "vue";
import App from "./App.vue";
import "./assets/styles/theme.scss";
import router from "./router";
import store from "./store";

library.add(
  faUserSecret,
  faCloud,
  faSun,
  faCloudSun,
  faSmog,
  faSnowflake,
  faCloudRain,
  faBolt
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultIconComponent: "font-awesome-icon"
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
