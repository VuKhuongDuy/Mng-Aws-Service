import Vue from "vue";
import axios from "axios";
import babelpolyfill from "@babel/polyfill";
import { Pagination } from "../../../src/components";
import { mount, shallowMount } from "@vue/test-utils";
import { get, post } from "../../../src/axios";
import url from "../../../config/url";
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

describe("Pagination", () => {
  it("Change page", () => {
    const wrapper = mount(Pagination);
    const pagination = {
      total: 1,
      per_page: 2,
      last_page: 0,
      from: 1,
      to: 1,
      current_page: 1,
      counts: 8
    };
    wrapper.setProps({
      pagination: pagination
    });
    wrapper.vm.changePage(4)
    expect(wrapper.vm.pagination.current_page).toBe(4)
  });
  
//   it('to = 0', ()=>{
//     const wrapper = mount(Pagination);
//     const pagination = {
//       total: 1,
//       per_page: 2,
//       last_page: 0,
//       from: 1,
//       to: 0,
//       current_page: 1,
//       counts: 8
//     };
//     wrapper.setProps({
//       pagination: pagination
//     });
//     wrapper.vm.pagesNumber()

//   })

//   it('from < 1', ()=>{
//     const wrapper = mount(Pagination);
//     const pagination = {
//       total: 1,
//       per_page: 2,
//       last_page: 0,
//       from: 0,
//       to: 0,
//       current_page: 1,
//       counts: 8
//     };
//     wrapper.setProps({
//       pagination: pagination
//     });
//     const button = wrapper.find('#current')
//     button.trigger('click')
//     // wrapper.vm.pagesNumber()
//     expect(wrapper.vm.pagination.from).toBe(1)
//   })

//   it('to greater than ', ()=>{
//     const wrapper = mount(Pagination);
//     const pagination = {
//       total: 1,
//       per_page: 2,
//       last_page: 2,
//       from: 0,
//       to: 0,
//       current_page: 1,
//       counts: 8
//     };
//     wrapper.setProps({
//       pagination: pagination
//     });
//     wrapper.vm.pagesNumber()
//     expect(wrapper.vm.pagination.to).toBe(pagination.last_page)
//   })

//   it('to greater than ', ()=>{
//     const wrapper = mount(Pagination);
//     const pagination = {
//       total: 1,
//       per_page: 2,
//       last_page: 2,
//       from: 0,
//       to: 0,
//       current_page: 1,
//       counts: 8
//     };
//     wrapper.setProps({
//       pagination: pagination
//     });
//     const arr = wrapper.vm.pagesNumber()
//     expect(arr).toBe('array')
//   })
});
