import Vue from "vue";
import babelpolyfill from "@babel/polyfill";
import { Plan } from "../../../src/pages";
import { shallowMount } from "@vue/test-utils";
import * as my_axios from "../../../src/axios";
import {
  listPlan
} from "../createDataTest";
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

describe("Plan", () => {
  describe("Func notify vue", () => {
    const wrapper = shallowMount(Plan,{
      mocks: { $notify: msg => msg, $t:msg => msg }
    });
    wrapper.vm.notifyVue();
  });

  describe("Get List plan", () => {
    beforeAll(() => {
      my_axios.get = jest.fn(api => {
        return Promise.resolve({
          success: true,
          data: listPlan
        });
      });
    });

    afterAll(() => {
      my_axios.get.mockReset();
    });

    it("It can get list plan", done => {
      const wrapper = shallowMount(Plan,{
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      const promise = wrapper.vm.getListPlan();
      promise.then(() => {
        expect(wrapper.vm.plans.length).toBe(listPlan.length);
        expect(wrapper.vm.plans_show.length).toBe(listPlan.length);
        done();
      });
    });
  });

  describe("Search", () => {
    const text_search = "duy-key";
    let plans_found = [];
    it("Search with text search fully", () => {
      listPlan.forEach(plan => {
        if (plan.valueObjectPlan === text_search) plans_found.push(plan);
      });
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.setData({
        text_search: text_search,
        plans: listPlan
      });
      wrapper.vm.doSearch();
      expect(wrapper.vm.plans_show.length).toBe(plans_found.length);
    });

    it("Search with text search empty", () => {
      const wrapper = shallowMount(Plan, {
        mocks: { $notify: msg => msg, $t:msg => msg }
      });
      wrapper.setData({
        text_search: "",
        plans: listPlan
      });
      wrapper.vm.doSearch();
      expect(wrapper.vm.plans_show.length).toBe(wrapper.vm.plans.length);
    });
  });

  describe("Click add plan", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, plan) => {
        if(!plan.dateTime){
          return Promise.resolve({
            success: false,
            message: ""
          });  
        }
        return Promise.resolve({
          success: true,
          data: listPlan
        });
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("Info for plan is empty", () => {
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.setData({
        valueObjectPlan: ""
      });
      const mock_notifyVue= jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue
      wrapper.vm.click_add_plan();
      expect(mock_notifyVue.mock.calls[0][3]).toBe(3)
    });

    it("Time is not invalid", () => {
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.setData({
        valueObjectPlan: "asdf",
        dateTime: "1/1/2019"
      });
      const mock_notifyVue= jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue
      wrapper.vm.click_add_plan();
      expect(mock_notifyVue.mock.calls[0][3]).toBe(3)
    });

    it("Make success a plan", async done => {
      const valueObjectPlan = "fasdfasdfasd";
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.setData({
        typePlan: "instance_id",
        valueObjectPlan: valueObjectPlan,
        dateTime: "2020-8-9T1:1"
      });
      const mock_notifyVue= jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue
      const promise = wrapper.vm.click_add_plan();
      promise.then(() => {
        expect(wrapper.vm.valueObjectPlan).toBe(
          valueObjectPlan + "&&" + wrapper.vm.accountName
        );
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      }).catch(()=>{ done() })
    });
  });

  describe("Click a plan", () => {
    it("Click a plan success", async () => {
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.vm.click_a_plan(listPlan[0]);
      expect(wrapper.vm.plan_choosed).toBe(listPlan[0]);
    });
  });

  describe("Click delete a plan", () => {
    beforeAll(() => {
      my_axios.deleteAxios = jest.fn(api => {
        return Promise.resolve({
          success: true
        });
      });
    });

    afterAll(() => {
      my_axios.deleteAxios.mockReset();
    });

    it("Delete without plan", done => {
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      const mock_notifyVue= jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue
      const promise = wrapper.vm.click_delete();
      promise.then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(3)
        done()
      })
    })

    it("Delete success", done => {
      global.confirm = jest.fn(() => true);
      const wrapper = shallowMount(Plan, {         mocks: { $notify: msg => msg, $t:msg => msg }       });
      wrapper.setData({
        plan_choosed: listPlan[0]
      });
      const mock_notifyVue= jest.fn();
      const mock_getListPlan = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue
      wrapper.vm.getListPlan = mock_getListPlan;
      const promise = wrapper.vm.click_delete();
      promise.then(() => {
        expect(mock_getListPlan.mock.calls.length).toBe(1);
        // expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      }).catch(()=>{})
    });
  });
});
