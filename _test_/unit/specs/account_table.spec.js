import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { AccountTable } from "../../../src/components";
import { mount, shallowMount } from "@vue/test-utils";
import url from "../../../config/url";
import routes from "../../../src/routes/routes";
import * as my_axios from "../../../src/axios";
import { listAccount, listUser, listInstance } from "../createDataTest";

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

describe("Account table", () => {

  describe("Func notify vue", () => {
    it("", () => {
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.notifyVue();
    });
  });

  describe("Get account show", ()=>{
    it('Account show have length to be pagination.counts', ()=>{
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setProps({accounts: listAccount})
      wrapper.vm.getAccountsShow(1);
      if (listAccount.length > wrapper.vm.pagination.counts)
        expect(wrapper.vm.accounts_show.length).toBe(
          wrapper.vm.pagination.counts
        );
      else expect(wrapper.vm.accounts_show.length).toBe(listAccount.length);
    })

    it('Account show should empty', ()=>{
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setProps({accounts: listAccount})
      wrapper.vm.getAccountsShow(100);
      expect(wrapper.vm.accounts_show.length).toBe(0)
    })
  })

  describe("Click account", () => {

    it("click account", () => {
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.click_account(listAccount[0]);
      expect(wrapper.vm.id_choosed).toBe(listAccount[0]._id);
      // expect(wrapper.emitted.click_an_account)
    }, 29000);
  });

  describe("Click remove", () => {

    it("click remove", () => {
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.click_remove();
      expect(wrapper.vm.first).toBe(true)
    }, 29000);
  });

  describe("Remove an account", () => {

    beforeAll(()=>{
        my_axios.deleteAxios = jest.fn((api)=>{
            if(api.indexOf(listAccount[0]._id)>0){
                return Promise.resolve({
                    success: true,
                })
            }else {
                return Promise.resolve({
                    success: false,
                })
            }
        })
    })

    it("remove account success", done => {
      global.confirm = jest.fn(() => true);
      const wrapper = shallowMount(AccountTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setData({
        id_choosed: listAccount[0]._id
      })
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;

      wrapper.vm.removePlan().then(function(){
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      }.bind(this));
    }, 29000);
  });
});
