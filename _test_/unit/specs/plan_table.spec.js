import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { PlanTable } from "../../../src/components";
import { mount, shallowMount } from "@vue/test-utils";
import url from "../../../config/url";
import * as my_axios from "../../../src/axios";
import {
  listAccount,
  listUser,
  listInstance,
  listPlan
} from "../createDataTest";
import routes from "../../../src/routes/routes";

Vue.config.ignoredElements = [
  "md-dialog-confirm",
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
  "paginate"
];

describe("Register", () => {
  const email = "vukhuongduy23@gmail.com";

  describe("Emit event click row", () => {
    it("erasdf", async () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.vm.emit_event_click_row(listPlan[0]);
      const event = wrapper.emitted();
      expect(typeof event.click_a_plan).toBe("object");
      expect(wrapper.vm.plan_active).toBe(listPlan[0]);
    });
  });

  describe("Get plan show", () => {
    it("Plan show have length to be pagination.counts", () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.setProps({ plans: listPlan });
      wrapper.vm.getPlanShow(1);
      if (listPlan.length > wrapper.vm.pagination.counts)
        expect(wrapper.vm.plans_show.length).toBe(
          wrapper.vm.pagination.counts
        );
      else expect(wrapper.vm.plans_show.length).toBe(listPlan.length);
    });

    it("Plan show should empty", () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.setProps({ plans: listPlan });
      wrapper.vm.getPlanShow(100);
      expect(wrapper.vm.plans_show.length).toBe(0);
    });
  });

  describe("Choose a plan", () => {

    it("Plan choosing return true", () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.setData({
        plan_active: listPlan[0]
      });
      expect(wrapper.vm.plan_choosing(listPlan[0])).toBe(true);
    });

    it("Plan choosing return false", () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.setData({
        plan_active: { _id: "dfasfasdf" }
      });
      expect(wrapper.vm.plan_choosing(listPlan[0])).toBe(false);
    });
  });

  describe("Set pages", () => {
    it("", () => {
      const wrapper = shallowMount(PlanTable, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.vm.setPages();
    });
  });
});
