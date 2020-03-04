import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { Instances } from "../../../src/pages";
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
  "paginate"
];

describe("Instance", () => {
  const email = "vukhuongduy2305@gmail.com";
  const glo_account_name = "account-test";
  const glo_key_name = "duy-key";

  describe("Func notify vue", () => {
    const wrapper = shallowMount(Instances, {
      mocks: { $notify: msg => msg, $t: msg => msg }
    });
    wrapper.vm.notifyVue();
  });

  describe("Get list account", () => {
    beforeAll(() => {
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
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const mock_getListInstance = jest.fn();
      wrapper.vm.getListInstance = mock_getListInstance;

      const promise = wrapper.vm.getListAccount();

      promise.then(() => {
        expect(wrapper.vm.accounts.length).toBe(listAccount.length);
        expect(wrapper.vm.instances.length).toBe(0);
        expect(wrapper.vm.instances_show.length).toBe(0);
        done();
      });
    });
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
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      const promise = wrapper.vm.getListInstance(listAccount[0]);
      promise.then(() => {
        expect(wrapper.vm.instances.length).toBe(listInstance.length);
        expect(wrapper.vm.instances_show.length).toBe(listInstance.length);
        done();
      });
    });

    it("Get list instance fail", done => {
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
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
    });
  });

  describe("Search by key", () => {
    it("Search with key not empty", done => {
      let key_name = "duy-key";
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      wrapper.setData({
        text_search_key: key_name,
        instances: listInstance
      });

      let instances_show = [];
      wrapper.vm.instances.forEach(instance => {
        if (instance.KeyName === key_name) instances_show.push(instance);
      });
      wrapper.vm.doSearchByKey();
      expect(wrapper.vm.instances_show.length).toBe(instances_show.length);
      done();
    });

    it("Search with key empty", () => {
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      let key_name = "";
      wrapper.setData({
        text_search_key: key_name,
        instances: listInstance
      });

      wrapper.vm.doSearchByKey();
      expect(wrapper.vm.instances_show.length).toBe(
        wrapper.vm.instances.length
      );
    });
  });

  describe("Search by account name", () => {
    jest.setTimeout(30000);

    it("Search with full account name", () => {
      let account_name = "account_test";
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      wrapper.setData({
        text_search_account: account_name,
        instances: listInstance
      });

      let instances_show = [];
      listInstance.forEach(instance => {
        if (instance.account_name === account_name)
          instances_show.push(instance);
      });
      wrapper.vm.doSearchByAccount();
      expect(wrapper.vm.instances_show.length).toBe(instances_show.length);
    });

    it("Search with empty account name", () => {
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      let account_name = "";
      wrapper.setData({
        text_search_account: account_name,
        instances: listInstance
      });

      wrapper.vm.doSearchByAccount();
      expect(wrapper.vm.instances_show.length).toBe(
        wrapper.vm.instances.length
      );
    });
  });

  describe("Click add instance", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, instance) => {
        if (instance.ImageId === "imageid") {
          return Promise.resolve({
            success: true,
            data: listInstance
          });
        } else {
          return Promise.resolve({
            success: false,
            message: "fdasdfasdfasdfsaf"
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("Add account successfully", done => {
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      wrapper.setData({
        account_name: glo_account_name,
        instance_name: "vm-test",
        image_id: "ami-0b37e9efc396e4c38",
        instance_type: "t2.micro",
        key_name: glo_key_name,
        min_count: 1,
        max_count: 1
      });
      const mock_getListInstance = jest.fn();
      wrapper.vm.getListInstance = mock_getListInstance;
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      // const btnAddInstance = wrapper.find("#btn_add_instance")
      // btnAddInstance.trigger('click')

      const promise = wrapper.vm.click_add_instance();
      promise
        .then(() => {
          expect(mock_notifyVue.mock.calls[0][3]).toBe(2);
          expect(mock_getListInstance.mock.calls.length).toBeGreaterThan(0);
          done();
        })
        .catch(() => done());
    });

    it("Add account fail", done => {
      const wrapper = shallowMount(Instances, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      wrapper.setData({
        account_name: glo_account_name,
        instance_name: "vm-test",
        image_id: "ami-0b37e9e",
        instance_type: "t2.mro",
        key_name: glo_key_name,
        min_count: 1,
        max_count: 1
      });
      const mock_getListInstance = jest.fn();
      wrapper.vm.getListInstance = mock_getListInstance;
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      // const btnAddInstance = wrapper.find("#btn_add_instance")
      // btnAddInstance.trigger('click')

      const promise = wrapper.vm.click_add_instance();
      promise
        .then(() => {
          expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
          expect(mock_getListInstance.mock.calls.length).toBe(0);
          done();
        })
        .catch(() => done());
    });
  });
});
