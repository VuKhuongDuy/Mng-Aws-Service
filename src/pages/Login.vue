<template>
  <div class="limiter">
    <notifications></notifications>
    <div class="container-login100">
      <div id="lang">
        <select v-model="lang">
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
        </select>
      </div>
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../../template/Login_v1/images/img-01.png" alt="IMG" />
        </div>
        <div class="login100-form validate-form">
          <span class="login100-form-title">{{ $t("login.login") }}</span>
          <div
            class="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              class="input100"
              type="text"
              name="username"
              :placeholder="$t('login.username')"
              v-model="username"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              class="input100"
              type="password"
              name="pass"
              :placeholder="$t('login.password')"
              v-model="password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="click_login">
              {{ $t("login.login") }}
            </button>
          </div>

          <div class="text-center p-t-12">
            <span class="txt1">{{ $t("login.forgot") }}</span>
            <a class="txt2" href="#"
              >{{ $t("login.username") }} / {{ $t("login.password") }}?</a
            >
          </div>

          <div class="text-center p-t-136">
            <a class="txt2" href="#/register">
              {{ $t("login.createAnAccount") }}
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import BaseDialog from './dialog/basedialog.vue'
import { post } from "../axios.js";
import url from "../../config/url";
import { setGlo_MyLocale } from "../lang/locale";
export default {
  name: "Login",

  data: () => {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      username: "",
      password: "",
      show: false,
      title: "Thông báo",
      lang: "en"
    };
  },

  methods: {
    notifyVue(top_or_down, right_or_left, message, iColor) {
      var color = iColor;

      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: right_or_left,
        verticalAlign: top_or_down,
        type: this.type[color]
      });
    },

    click_login: async function() {
      const api = url.url + "/api/login";

      let user = {
        username: this.username,
        password: this.password
      };

      const data = await post(api, user);

      if (data.success) {
        /* istanbul ignore else */
        var d = new Date();

        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toGMTString();

        document.cookie =
          escape("username") +
          "=" +
          escape(this.username) +
          ";" +
          expires +
          ";path=/";
        document.cookie =
          escape("token") + "=JWT " + escape(data.token) + "; path=/";

        this.$router.push("/");
      } else if (data.success === false) {
        this.notifyVue("top", "center", data.message, 4);
      } else {
        /* istanbul ignore next */
        this.notifyVue("top", "right", this.$t("common.serverError"), 4);
      }
    }
  },
  mounted: function() {
    /* istanbul ignore next */
    this.lang = this.$i18n.locale;
  },
  watch: {
    lang: function() {
      /* istanbul ignore next */
      this.$i18n.locale = this.lang;
      /* istanbul ignore next */
      setGlo_MyLocale(this.lang);
    }
  }
};
</script>

<style scoped>
select {
  width: 100px;
  height: 30px;
  border: none;
  margin-top: 15px;
}

#lang {
  position: absolute;
  right: 150px;
  top: 40px;
}

@import "../../template/Login_v1/vendor/bootstrap/css/bootstrap.min.css";
@import "../../template/Login_v1/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
@import "../../template/Login_v1/vendor/select2/select2.min.css";
@import "../../template/Login_v1/vendor/css-hamburgers/hamburgers.min.css";
@import "../../template/Login_v1/vendor/animate/animate.css";
@import "../../template/Login_v1/css/main.css";
@import "../../template/Login_v1/css/util.css";
</style>
