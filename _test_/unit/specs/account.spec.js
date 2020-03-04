import Vue from "vue";
import babelpolyfill from "@babel/polyfill";
import { mount, shallowMount } from "@vue/test-utils";
import { Accounts, Instances } from "@/pages";
import { AccountTable } from "@/components";
import axios from "axios";
// import get from "../../../src/axios";
import url from "../../../config/url";
import * as my_axios from "../../../src/axios";
import { listAccount, listUser, listInstance } from "../createDataTest";

// jest.mock(axios, () => ({
//   get: jest.fn()
// }));

Vue.config.ignoredElements = [
  "md-card",
  "md-card-header",
  "md-dialog-confirm",
  "md-card-content",
  "md-button",
  "md-field",
  "md-input",
  "md-table",
  "md-icon",
  "md-tooltip"
];

describe("Account", () => {
  const email = "vukhuongduy2305@gmail.com";
  const account_name = "account-test";

  describe("Func notify vue", () => {
    const wrapper = shallowMount(Accounts, {
      mocks: { $notify: msg => msg, $t: msg => msg }
    });
    wrapper.vm.notifyVue();
    // expect(notify)
  });

  describe("Verify account by aws", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, account) => {
        if (
          account.accessKeyId === "accessKeyId_true" &&
          account.secretAccessKey === "secretAccessKey_true" &&
          account.region === "region_true"
        ) {
          return Promise.resolve({
            success: true,
            data: {
              name: account.name,
              region: account.region
            }
          });
        } else {
          return Promise.resolve({
            success: false
          });
        }
      });
    });

    afterAll(() => {
      my_axios.post.mockReset();
    });

    it("Account is correctly", done => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const account = {
        name: account_name,
        accessKeyId: "accessKeyId_true",
        secretAccessKey: "secretAccessKey_true",
        region: "region_true",
        _id: "5d69305f0ac076203716980c"
      };

      const mock_getListAccount = jest.fn();
      const mock_notifyVue = jest.fn();
      wrapper.vm.getListAccount = mock_getListAccount;
      wrapper.vm.notifyVue = mock_notifyVue;
      const promise = wrapper.vm.verifyAccountAws(account);
      promise.then(
        function() {
          expect(mock_getListAccount.mock.calls.length).toBe(1);
          expect(mock_notifyVue.mock.calls[0][3]).toBe(2);
          done();
        }.bind()
      );
    }, 29000);

    it("Account is wrong", done => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });

      const account = {
        name: account_name,
        accessKeyId: "dfdsfsdf",
        secretAccessKey: "sadf",
        region: "sadf",
        _id: "aasdasdfadf"
      };

      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const data = wrapper.vm.verifyAccountAws(account);
      data.then(
        function() {
          expect(mock_notifyVue.mock.calls[0][3]).toBe(4);
          done();
        }.bind(this)
      );
    }, 29000);
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

    it("Get list account successfully", done => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      const mock_getListInstance = jest.fn();

      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.getListInstance = mock_getListInstance;
      const promise = wrapper.vm.getListAccount();
      promise.then(() => {
        expect(wrapper.vm.accounts.length).toBe(listAccount.length);
        done();
      });
    }, 29000);
  });

  describe("Get list instance", () => {
    beforeAll(() => {
      my_axios.post = jest.fn((api, idAccount) => {
        if (idAccount.id === listAccount[0]._id) {
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

    it("Get list instance successfully", done => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const promise = wrapper.vm.getListInstance(listAccount[0]);
      promise.then(() => {
        expect(wrapper.vm.instances.length).toBe(listInstance.length);
        done();
      });
    }, 29000);

    it("Get list instance fail", done => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      const account = {
        _id: "adsfasdf"
      };

      const promise = wrapper.vm.getListInstance(account);
      promise.then(() => {
        expect(mock_notifyVue.mock.calls.length).toBeGreaterThan(0);
        done();
      });
    }, 29000);
  });

  describe("Click an account", () => {
    let countAccount = 0;
    beforeEach(() => {
      listInstance.forEach(instance => {
        if (instance.idAccount === listAccount[0]._id) countAccount++;
      });
    });

    it("Click an account success", () => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });
      wrapper.setData({
        instances: listInstance
      });

      wrapper.vm.click_an_account(listAccount[0]._id);
      expect(wrapper.vm.instances_choosed.length).toBe(countAccount);
    });
  }, 29000);

  describe("Click accept add", () => {
    it("Click accept add", () => {
      const wrapper = shallowMount(Accounts, {
        mocks: { $notify: msg => msg, $t: msg => msg }
      });

      const mock_verifyAccountAws = jest.fn()
      wrapper.vm.verifyAccountAws = mock_verifyAccountAws
      
      wrapper.vm.click_accept_add()
      expect(mock_verifyAccountAws).toHaveBeenCalled() 
    });
  });
});
