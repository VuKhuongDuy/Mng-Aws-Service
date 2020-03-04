import Vue from "vue";
import babelpolyfill from "@babel/polyfill";
import { Dashboard } from "../../../src/pages";
import { mount, shallowMount } from "@vue/test-utils";
import url from "../../../config/url";
import * as my_axios from "../../../src/axios";
import {
  listAccount,
  listUser,
  listInstance,
  listPlan
} from "../createDataTest";

Vue.config.ignoredElements = [
  "md-card",
  "md-card-header",
  "md-card-content",
  "md-button",
  "md-field",
  "md-input",
  "md-dialog-confirm",
  "md-table",
  "md-icon",
  "md-tooltip",
  "md-card-actions",
  "paginate"
];

describe("Dashboard", () => {
  const _id = "5d69305f0ac076203716980c";
  const account_name = "account-test";
  const key_name = "duy-key";

  describe("Func notify vue", () => {
    const wrapper = shallowMount(Dashboard, {
      mocks: { $notify: msg => msg, $t: msg => msg, $t: msg => msg }
    });
    wrapper.vm.notifyVue();
  });

  describe("Get list plan", () => {
    beforeAll(async () => {
      my_axios.get = jest.fn(() => {
        return Promise.resolve({
          success: true,
          data: listPlan
        });
      });
    });

    afterAll(() => {
      my_axios.get.mockReset();
    });

    it("Can get list plan", done => {
      const wrapper = shallowMount(Dashboard, {
        mocks: {
          $notify: msg => msg,
          $t: msg => msg
        }
      });
      const promise = wrapper.vm.getListPlan();

      promise.then(() => {
        expect(wrapper.vm.plans.length).toBe(listPlan.length);
        done();
      });
    }, 29000);
  });

  describe("Get list account", () => {
    beforeAll(async () => {
      my_axios.get = jest.fn(api => {
        return Promise.resolve({
          success: true,
          data: listAccount
        });
      });
    });

    afterAll(() => {
      my_axios.get.mockReset();
    });

    it("Get list account successfully", async done => {
      const wrapper = shallowMount(Dashboard, {
        mocks: {
          $notify: msg => msg,
          $t: msg => msg
        }
      });
      const mock_getListInstance = jest.fn();
      wrapper.vm.getListInstance = mock_getListInstance;
      const promise = wrapper.vm.getListAccount();
      promise.then(() => {
        expect(wrapper.vm.accounts.length).toBe(listAccount.length);
        done();
      });
    }, 29000);
  });

  describe("Get list instance", () => {
    beforeAll(async () => {
      my_axios.post = jest.fn((api, idAccount) => {
        if (idAccount.id === listAccount[0]._id)
          return Promise.resolve({
            success: true,
            data: listInstance
          });
        else {
          return Promise.resolve({
            success: false
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("Get list instance successfully", done => {
      const wrapper = shallowMount(Dashboard, {
        mocks: { $notify: msg => msg, $t: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      const promise = wrapper.vm.getListInstance(listAccount[0]);
      promise.then(() => {
        expect(wrapper.vm.instances.length).toBe(listInstance.length);
        // expect(mock_notifyVue.mock.calls.length).toBe(0);
        done();
      });
    }, 29000);

    it("Get list instance fail", done => {
      const wrapper = shallowMount(Dashboard, {
        mocks: { $notify: msg => msg, $t: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const account = { _id: "adsfasdf" };

      const promise = wrapper.vm.getListInstance(account);
      promise
        .then(() => {
          expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
          done();
        })
        .catch(() => {
          done();
        });
    }, 29000);
  });
});
