import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { InstanceFullTable } from "../../../src/components";
import { mount, shallowMount } from "@vue/test-utils";
import { get, post } from "../../../src/axios";
import url from "../../../config/url";
import { createDataTest } from "../createDataTest";
import routes from "../../../src/routes/routes";
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
  "md-dialog-confirm",
  "md-input",
  "md-table",
  "md-icon",
  "md-tooltip",
  "md-card-actions",
  "paginate"
];

describe("Account table", () => {
  const email = "vukhuongduy2305@gmail.com";
  const glo_account_name = "account-test";
  const glo_key_name = "duy-key";

  describe("Func notify vue", () => {
    it("", () => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.notifyVue();
    });
  });

  //   describe("Click button start", () => {
  //     it("click button start success", () => {
  //       global.confirm = jest.fn(() => true);
  //       const wrapper = shallowMount(InstanceFullTable, {
  //         mocks: { $notify: msg => msg, $t: msg=>msg }
  //       });
  //       wrapper.setProps({ instances: listInstance });
  //       const mock_clickStart = jest.fn();
  //       wrapper.vm.startInstance = mock_clickStart;
  //       const btn_add_account = wrapper.find("#btnStart");
  //       btn_add_account.trigger("click");
  //       expect(mock_clickStart.mock.calls.length).toBe(1);
  //     });
  //   });

  describe("Get instance show", () => {
    it("instance show have length to be pagination.counts", () => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setProps({ instances: listInstance });
      wrapper.vm.getInstancesShow(1);
      if (listInstance.length > wrapper.vm.pagination.counts)
        expect(wrapper.vm.instances_show.length).toBe(
          wrapper.vm.pagination.counts
        );
      else expect(wrapper.vm.instances_show.length).toBe(listInstance.length);
    });

    it("instance show should empty", () => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setProps({ instances: listInstance });
      wrapper.vm.getInstancesShow(100);
      expect(wrapper.vm.instances_show.length).toBe(0);
    });
  });

  describe("Implement instance", () => {
    it("Click Start instance",()=>{
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.implementInstance('start', '11', 'stopped', 'idaccount')
      expect(wrapper.vm.start).toBe(true)
      expect(wrapper.vm.instanceId).toBe('11')
      expect(wrapper.vm.instanceStatus).toBe('stopped')
      expect(wrapper.vm.idAccount).toBe('idaccount')
      
    })

    it("Click stop instance",()=>{
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.implementInstance('stop', '11', 'running', 'idaccount')
      expect(wrapper.vm.stop).toBe(true)
      expect(wrapper.vm.instanceId).toBe('11')
      expect(wrapper.vm.instanceStatus).toBe('running')
      expect(wrapper.vm.idAccount).toBe('idaccount')
    })

    it("Click remove instance",()=>{
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.vm.implementInstance('remove', '11', 'running', 'idaccount')
      expect(wrapper.vm.remove).toBe(true)
      expect(wrapper.vm.instanceId).toBe('11')
      expect(wrapper.vm.instanceStatus).toBe('running')
      expect(wrapper.vm.idAccount).toBe('idaccount')
    })
  })

  describe("func start", () => {
    beforeAll(async () => {
      global.confirm = jest.fn(() => true);
      my_axios.putAxios = jest.fn(api => {
        if (api.indexOf("idAccount") > 0 && api.indexOf("idInstance") > 0) {
          return Promise.resolve({
            success: true
          });
        } else {
          return Promise.resolve({
            success: false
          });
        }
      });
    });

    afterAll(() => {
      my_axios.putAxios.mockReset();
    });

    it("Status instance is terminated", () => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.setData({
        instanceId: "idInstance",
        idAccount: "idAccount",
        instanceStatus: "terminated"
      })
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.startInstance("dfasdf", "terminated", "ewrqwe");
      expect(mock_notifyVue.mock.calls[0][3]).toBe(4)
    });

    it("Start instance is success", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.setData({
        instanceId: "idInstance",
        idAccount: "idAccount",
        instanceStatus: "stopped"
      })
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.startInstance("idInstance", "stopped", "idAccount").then(function(){
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      }.bind(this));
    });

    it("Start instance wrong id", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setData({
        instanceId: "asdfasd",
        idAccount: "dsfdsf",
        instanceStatus: "stopped"
      })
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm
        .startInstance("dsfsdfasdfasdfasdf", "stopped", "asdfasdfsadfasd")
        .then(function(){
          expect(mock_notifyVue.mock.calls[0][3]).toBe(4)
          done();
        }.bind(this));
    });
  });

  describe("func stop", () => {
    beforeAll(async () => {
      global.confirm = jest.fn(() => true);
      my_axios.putAxios = jest.fn(api => {
        if (api.indexOf("idAccount") > 0 && api.indexOf("idInstance") > 0) {
          return Promise.resolve({
            success: true
          });
        } else {
          return Promise.resolve({
            success: false
          });
        }
      });
    });

    afterAll(() => {
      my_axios.putAxios.mockReset();
    });

    it("Status instance is terminated", () => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.setData({
        instanceId: "idInstance",
        idAccount: "idAccount",
        instanceStatus: "terminated"
      })
      wrapper.vm.stopInstance();
      expect(mock_notifyVue.mock.calls[0][3]).toBe(4)
    });

    it("Stop instance is success", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setData({
        instanceId: "idInstance",
        idAccount: "idAccount",
        instanceStatus: "stopped"
      })
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.stopInstance().then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      });
    });

    it("Stop instance wrong id", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg =>msg }
      });
      wrapper.setData({
        instanceId: "dfads",
        idAccount: listAccount[0].idAccount,
        instanceStatus: 'stopped'
      })
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm
        .stopInstance()
        .then(() => {
          expect(mock_notifyVue.mock.calls[0][3]).toBe(4)
          done();
        });
    });
  });

  describe("Remove instance", () => {
    beforeAll(() => {
      my_axios.deleteAxios = jest.fn(api => {
        if ((api.indexOf("idInstance") > 0) & (api.indexOf("idAccount") > 0)) {
          return Promise.resolve({
            success: true
          });
        } else {
          return Promise.resolve({
            success: false
          });
        }
      });
    });

    it("Remove a instance success", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      wrapper.setData({
        instanceId: "idInstance",
        idAccount: "idAccount"
      })
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.removeInstance().then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(2)
        done();
      });
    });

    it("Remove a instance failed", done => {
      const wrapper = shallowMount(InstanceFullTable, {
        mocks: { $notify: msg => msg, $t: msg=>msg }
      });
      const mock_notifyVue = jest.fn();
      wrapper.vm.notifyVue = mock_notifyVue;
      wrapper.vm.removeInstance("asdfsad", "dsfasd").then(() => {
        expect(mock_notifyVue.mock.calls[0][3]).toBe(3);
        done();
      });
    });
  });
});
