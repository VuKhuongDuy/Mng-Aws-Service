import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { InstanceTable } from "../../../src/components";
import { mount, shallowMount } from "@vue/test-utils";
import { get, post } from "../../../src/axios";
import url from "../../../config/url";
import routes from "../../../src/routes/routes";
import { listInstance } from "../createDataTest";

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

describe("Plan table", () => {
  describe("Get instance show", () => {
    it("instance show have length to be pagination.counts", () => {
      const wrapper = shallowMount(InstanceTable, {
        mocks: { $notify: msg => msg, $t: mgs => msg }
      });
      wrapper.setProps({ instances_choosed: listInstance });
      wrapper.vm.getInstancesShow(1);
      if (listInstance.length > wrapper.vm.pagination.counts)
        expect(wrapper.vm.instances_show.length).toBe(
          wrapper.vm.pagination.counts
        );
      else expect(wrapper.vm.instances_show.length).toBe(listInstance.length);
    });

    it("instance show should empty", () => {
      const wrapper = shallowMount(InstanceTable, {
        mocks: { $notify: msg => msg, $t: mgs => msg }
      });
      wrapper.setProps({ instances_choosed: listInstance });
      wrapper.vm.getInstancesShow(100);
      expect(wrapper.vm.instances_show.length).toBe(0);
    });
  });
});
