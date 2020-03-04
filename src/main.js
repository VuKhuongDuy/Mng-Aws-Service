// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// import Vuetify from "vuetify";
import VueRouter from "vue-router";
import App from "./App";
// import Paginate from "vuejs-paginate";
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueI18n from "vue-i18n";
import vnMessage from "./lang/vn.json";
import enMessage from "./lang/en.json";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VueI18n);

const messages = {
  vn: vnMessage,
  en: enMessage
};

const i18n = new VueI18n({
  locale: "en",
  messages,
  fallbackLocale: "vn"
});

router.beforeEach((to, from, next) => {
  let exist = false;
  var cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    if (cookie.indexOf("token") > 0) exist = true;
  });
  if (to.path != "/login" && to.path != "/register" && !exist) {
    next("/login");
  } else {
    next();
  }
}),
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    render: h => {
      return h(App);
    },
    i18n,
    router,
    data: {
      Chartist: Chartist
    }
  });
