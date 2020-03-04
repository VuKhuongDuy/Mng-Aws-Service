<template>
  <div class="page-wrapper bg-gra-03 p-t-45 p-b-50">
    <notifications></notifications>
    <div id="lang">
      <select v-model="lang">
        <option value="en">English</option>
        <option value="vi">Vietnamese</option>
      </select>
    </div>
    <div class="wrapper wrapper--w790">
      <div class="card card-5">
        <div class="card-heading">
          <h2 class="title">Event Registration Form</h2>
        </div>
        <div class="card-body">
          <div class="form-row m-b-55">
            <div class="name">{{ $t("registry.name") }}</div>
            <div class="value">
              <div class="row row-space">
                <div class="col-2">
                  <div class="input-group">
                    <input
                      class="input--style-5"
                      type="text"
                      name="first_name"
                      v-bind:style="{ width: '800px' }"
                      v-model="username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="name">{{ $t("registry.email") }}</div>
            <div class="value">
              <div class="input-group">
                <input
                  class="input--style-5"
                  type="email"
                  name="email"
                  v-model="email"
                />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="name">{{ $t("registry.password") }}</div>
            <div class="value">
              <div class="input-group">
                <input
                  class="input--style-5"
                  type="password"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="name">{{ $t("registry.passwordConfirm") }}</div>
            <div class="value">
              <div class="input-group">
                <input
                  class="input--style-5"
                  type="password"
                  name="confirmpassword"
                  v-model="confirm_password"
                />
              </div>
            </div>
          </div>
          <div class="form-row" v-show="this.verify_code">
            <div class="name">{{ $t("registry.code") }}</div>
            <div class="value">
              <div class="input-group">
                <input
                  class="input--style-5"
                  type="text"
                  name="code"
                  v-model="code"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              class="btn btn--radius-2 btn--red"
              id="btnRegister"
              @click="click_register"
            >
              {{ $t("registry.registry") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../config/url";
import { post } from "../axios.js";
import { setGlo_MyLocale } from "../lang/locale";
export default {
  name: "Register",
  data: () => {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      verify_code: false,
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      code: "",
      users: [],
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

    click_register: function() {
      if (
        this.username.length === 0 ||
        this.password.length === 0 ||
        this.email.length === 0
      ) {
        this.notifyVue("top", "center", this.$t("common.inputEmpty"), 4);

        return;
      }
      /* istanbul ignore next */
      if (this.password != this.confirm_password) {
        this.notifyVue("top", "center", this.$t("common.confirmWrong"), 4);

        return;
      }
      /* istanbul ignore next */
      if (!this.verify_code) {
        this.send_a_code_to_email();

        return;
      }
      /* istanbul ignore next */
      this.create();
    },

    create: async function() {
      let user = {
        email: this.email,
        code: this.code
      };
      const api = url.url + "/api/logup/";
      const data = await post(api, user);

      /* istanbul ignore else */
      if (data.success) {
        this.notifyVue("top", "center", this.$t("common.createUserSuccess"), 2);
        /* istanbul ignore next */
        this.$router.push("/login");
      } else if (data.success === false) {
        this.notifyVue("top", "center", data.message, 4);
        this.code = "";
      } else {
        this.notifyVue("top", "center", this.$t("common.serverError"), 4);
      }
    },

    send_a_code_to_email: async function() {
      let user = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      const api = url.url + "/api/logup/email";
      const data = await post(api, user);
      /* istanbul ignore else */

      if (!data.success && data.active) {
        this.notifyVue("top", "center", data.message, 3);
      } else if (!data.success && data.active === false) {
        this.notifyVue("top", "center", data.message, 4);
        this.verify_code = true;
      } else if (!data.success) {
        this.notifyVue("top", "center", this.$t("common.serverError"), 4);
      } else {
        this.notifyVue("top", "center", this.$t("common.sendEmailSuccess"), 2);
        this.verify_code = true;
      }
    }
  },
  mounted: function() {
    this.lang = this.$i18n.locale;
  },
  watch: {
    lang: function() {
      this.$i18n.locale = this.lang;
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

@import "../../template/Register/vendor/mdi-font/css/material-design-iconic-font.min.css";
@import "../../template/Register/vendor/font-awesome-4.7/css/font-awesome.min.css";
@import "../../template/Register/vendor/select2/select2.min.css";
@import "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i";
@import "../../template/Register/vendor/select2/select2.min.css";
@import "../../template/Register/vendor/datepicker/daterangepicker.css";
@import "../../template/Register/css/main.css";
</style>
