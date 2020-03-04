import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { TopNavbar } from "../../../src/pages";
import { mount, shallowMount } from "@vue/test-utils";
import { get, post } from "../../../src/axios";
import url from "../../../config/url";
import { createDataTest } from "../createDataTest";
import routes from "../../../src/routes/routes";

Vue.config.ignoredElements = [
  "md-card",
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
  "md-list-item",
  "md-list",
  "md-toolbar"
];

describe("Top navbar", () => {
  describe("Log out", () => {
    it("", () => {
      const $router = {
        push: jest.fn(),
      }
      const wrapper = shallowMount(TopNavbar, {
        mocks: { $notify: msg => msg, $route: msg => msg, $sidebar: msg => msg,  $router, $t: msg=>msg, $i18n: msg=>msg}
      });
      wrapper.vm.click_logout();
      expect($router.push.mock.calls.length).toBe(1)
      expect($router.push).toHaveBeenCalledWith('login')
    });
  });

  describe("", () => {
    it("", () => {
      const $sidebar = {
        displaySidebar: jest.fn(),
        showSidebar: jest.fn(),
      };
      const wrapper = shallowMount(TopNavbar, {
        mocks: {
          $notify: msg => msg,
          $route: msg => msg,
          $sidebar,
          $t: msg=>msg,
          $i18n: msg=>msg
        }
      });
      wrapper.vm.toggleSidebar();
    });
  });
});
