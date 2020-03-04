import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { Login, Register } from "../../../src/pages";
import { mount, shallowMount } from "@vue/test-utils";
import url from "../../../config/url";
import routes from "../../../src/routes/routes";
import * as my_axios from "../../../src/axios";
import { listAccount, listUser, listInstance } from "../createDataTest";

Vue.config.ignoredElements = [
  "md-card",
  "md-dialog-confirm",
  "md-card-header",
  "md-card-content",
  "md-button",
  "md-field",
  "md-input",
  "md-table",
  "md-icon",
  "md-tooltip",
  "md-card-actions",
  "paginate",
  "notifications"
];

describe("Register", () => {
  const email = "vukhuongduy23@gmail.com";

  describe("Func notify vue", () => {
    it("", () => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.vm.notifyVue();
    });
  });

  describe("Func notify vue", () => {
    it("", () => {
      const wrapper = shallowMount(Login, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.vm.notifyVue();
    });
  });

  describe("Click register", () => {
    it("Thiếu thông tin", () => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.setData({
        username: "",
        password: "",
        email: ""
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      wrapper.vm.click_register();
      expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
    });

    it("password confirm wrong", () => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.setData({
        username: "vuduy",
        password: "vuduy",
        email: email,
        confirm_password: "duy"
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      wrapper.vm.click_register();
      expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
    });

    // it("Send a code to email", () => {
    //   const wrapper = shallowMount(Register, {
    //     mocks: { $notify: msg => msg, $t: msg=>msg,  $i18n: msg=>msg }
    //   });
    //   wrapper.setData({
    //     username: "vuduy",
    //     password: "vuduy",
    //     email: email,
    //     confirm_password: "vuduy",
    //     verify_code: false
    //   });
    //   const mock_send_a_code_to_email = jest.fn();
    //   wrapper.vm.send_a_code_to_email = mock_send_a_code_to_email;

    //   wrapper.vm.click_register();
    //   expect(mock_send_a_code_to_email.mock.calls.length).toBe(1);
    //   expect(wrapper.vm.verify_code).toBe(true);
    // });

    // it("Create user", (done) => {
    //   const wrapper = shallowMount(Register, {
    //     mocks: { $notify: msg => msg, $t: msg=>msg,  $i18n: msg=>msg }
    //   });
    //   wrapper.setData({
    //     username: "vuduy",
    //     password: "vuduy",
    //     email: email,
    //     confirm_password: "vuduy",
    //     verify_code: true
    //   });
    //   const mock_create = jest.fn();
    //   wrapper.vm.create = mock_create;

    //   wrapper.vm.click_register();
    //   expect(mock_create.mock.calls.length).toBe(1);
    //   done()
    // });
  });

  describe("Send a code to email", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, user) => {
        if (user.email === "vukhuongduy2305@gmail.com") {
          return Promise.resolve({
            success: false,
            active: true,
            message: "Email đã tồn tại, hãy dùng email khác"
          });
        } else if (user.email === "vukhuongduy23@gmail.com") {
          return Promise.resolve({
            success: false,
            active: false,
            message:
              "Email này chưa được xác nhận. Chúng tôi đã gửi 1 mã code tới email của bạn, hãy xác nhận nó vào ô code"
          });
        } else {
          return Promise.resolve({
            success: true
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("User was exist", done => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.setData({
        username: "duyvu",
        password: "duyvu",
        email: "vukhuongduy2305@gmail.com"
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const promise = wrapper.vm.send_a_code_to_email();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(3);
        done();
      });
    }, 29000);

    it("User haven't verify yet", async done => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      wrapper.setData({
        username: "duyvu",
        password: "duyvu",
        confirm_password: "duyvu",
        email: "vukhuongduy23@gmail.com"
      });

      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      const promise = wrapper.vm.send_a_code_to_email();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
        done();
      });
    }, 29000);

    it("Send successfully", done => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });

      let code = parseInt(Math.random() * 10000 + 1);
      wrapper.setData({
        username: "duyvu",
        password: "duyvu",
        email: "vukhuongduy" + code + "@gmail.com"
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const promise = wrapper.vm.send_a_code_to_email();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2);
        expect(wrapper.vm.verify_code).toBe(true);
        done();
      });
    }, 29000);
  });

  describe("Create user", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, user) => {
        if (user.code === "123456") {
          return Promise.resolve({
            success: true
          });
        } else {
          return Promise.resolve({
            success: false,
            message: "Code không chính xác"
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("Create user successfully", done => {
      const push = jest.fn();
      const $router = {
        push: jest.fn()
      };
      const wrapper = shallowMount(Register, {
        mocks: {
          $notify: msg => msg,
          $router,
          $t: msg => msg,
          $i18n: msg => msg
        }
      });
      wrapper.setData({
        email: email,
        code: "123456"
      });

      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      const promise = wrapper.vm.create();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2);
        expect($router.push).toHaveBeenCalledWith("/login");
        done();
      });
    });

    it("Code not correct", done => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });

      wrapper.setData({
        email: email,
        code: "asdfasd"
      });

      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      const promise = wrapper.vm.create();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
        done();
      });
    });
  });

  describe("Register", () => {
    it("Watch lang", () => {
      const wrapper = shallowMount(Register, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });

      wrapper.vm.lang = "asdf";
    });
  });

  describe("Login", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, user) => {
        if (user.username === "duyvu" && user.password === "duyvu") {
          return Promise.resolve({
            success: true,
            email: "vukhuongduy2305@gmail.com"
          });
        } else {
          return Promise.resolve({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng"
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("click_login successfully", done => {
      const push = jest.fn();
      const $router = {
        push: jest.fn()
      };
      const wrapper = shallowMount(Login, {
        mocks: {
          $notify: msg => msg,
          $router,
          $t: msg => msg,
          $i18n: msg => msg
        }
      });
      wrapper.setData({
        username: "duyvu",
        password: "duyvu"
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const pro = wrapper.vm.click_login();
      pro.then(() => {
        expect($router.push).toHaveBeenCalledWith("/");
        done();
      });
    });

    it("click_login failed", done => {
      const wrapper = shallowMount(Login, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });
      expect(wrapper.vm.data);
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.setData({
        username: "duyafsdf",
        password: "duyadsf"
      });
      const pro = wrapper.vm.click_login();
      pro.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
        done();
      });
    });
  });

  describe("Login", () => {
    it("Watch lang", () => {
      const wrapper = shallowMount(Login, {
        mocks: { $notify: msg => msg, $t: msg => msg, $i18n: msg => msg }
      });

      wrapper.vm.lang = "sadf";
    });
  });
});
