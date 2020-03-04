import Vue from 'vue'

// Vue.config.productionTip = false

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();

jest.setTimeout(30000)
Object.defineProperty(window, "localStorage", { value: localStorageMock })

// Object.defineProperty(Vue.prototype, "$notify", {
//       get() {
//         return "dfaasdfasdfasdf";
//       }
// });
