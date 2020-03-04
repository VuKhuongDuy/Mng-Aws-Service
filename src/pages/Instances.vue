<template>
  <div class="content">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      v-if="!loaded"
    >
      <h1>{{ $t("instance.waitting") }}</h1>
    </div>
    <div class="md-layout" v-if="loaded">
      <div class="md-layout-item md-small-size-30 md-size-30">
        <md-field>
          <label>{{ $t("instance.searchByKeyName") }}</label>
          <md-input
            type="text"
            v-model="text_search_key"
            v-on:keyup.enter="doSearchByKey"
          ></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-small-size-30 md-size-30">
        <md-field>
          <label>{{ $t("instance.searchByAccountName") }}</label>
          <md-input
            type="text"
            v-model="text_search_account"
            v-on:keyup.enter="doSearchByAccount"
          ></md-input>
        </md-field>
      </div>
      <div
        v-show="!add"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">{{ $t("instance.instance") }}</h4>
          </md-card-header>
          <md-card-content>
            <instance-full-table
              :instances="instances_show"
            ></instance-full-table>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-100 text-left">
        <md-button
          class="md-raised md-success"
          v-show="!add"
          @click="add = true"
          id="btn-add-instance"
          >{{ $t("instance.addInstance") }}</md-button
        >
      </div>
      <div
        id="formAddInstance"
        class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50"
        v-show="add"
      >
        <md-card class="md-card-plain">
          <md-card-header style="background-color:#7979d2">
            <h4 class="title">{{ $t("instance.addInstance") }}</h4>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.nameAcc") }}</label>
                <md-input type="text" v-model="account_name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.nameInstance") }}</label>
                <md-input type="text" v-model="instance_name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.imageId") }}</label>
                <md-input type="text" v-model="image_id"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.instanceType") }}</label>
                <md-input type="text" v-model="instance_type"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.keyName") }}</label>
                <md-input type="text" v-model="key_name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.minCount") }}</label>
                <md-input type="number" v-model="min_count"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>{{ $t("instance.maxCount") }}</label>
                <md-input type="number" v-model="max_count"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-center">
              <md-button
                id="btn_add_instance"
                class="md-raised md-success"
                @click="click_add_instance"
                >{{ $t("instance.btnAdd") }}</md-button
              >
              <md-button class="md-raised md-danger" @click="add = false">{{
                $t("instance.btnClose")
              }}</md-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { InstanceFullTable } from "@/components";
import { get, post } from "../axios.js";
import url from "../../config/url";
export default {
  components: {
    InstanceFullTable
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      loaded: false,
      instances: [],
      instances_show: [],
      accounts: [],
      account_name: "",
      instance_name: "",
      image_id: "",
      instance_type: "",
      key_name: "",
      min_count: 1,
      max_count: 1,
      text_search_account: "",
      text_search_key: "",
      add: false
    };
  },
  methods: {
    notifyVue(top_or_down, right_or_left, message, iColor) {
      var color = iColor;

      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: right_or_left,
        verticalAlign: top_or_down,
        type: this.type[color]
      });
    },

    getListAccount: async function() {
      const api = url.url + "/api/accountaws";
      const data = await get(api);
      
      /* istanbul ignore else */
      if (data && data.success) {
        this.accounts = data.data;
        this.instances = [];
        this.instances_show = [];
        if (this.accounts.length === 0) this.loaded = true;
        this.accounts.forEach(async account => {
          await this.getListInstance(account);
        });
      } else {
        this.loaded = true;
        this.notifyVue("top", "right", this.$t("common.serverError"), 4);
      }
    },

    getListInstance: async function(account) {
        const api = url.url + "/api/vms";
        const data = await post(api, { id: account._id });

        this.loaded = true;
        if (data.success) {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].Instances[0].account_name = account.name;
            data.data[i].Instances[0].idAccount = account._id;
            this.instances.push(data.data[i].Instances[0]);
            this.instances_show = this.instances;
          }
        } else {
          this.notifyVue("top", "right", data.message, 4);
        }
    },

    doSearchByKey: function() {
      this.instances_show = [];

      if (this.text_search_key.length === 0) {
        this.instances_show = this.instances;
      } else
        this.instances.forEach(instance => {
          /* istanbul ignore next */
          if (this.text_search_key === instance.KeyName) {
            this.instances_show.push(instance);
          }
        });
    },

    doSearchByAccount: function() {
      this.instances_show = [];

      if (this.text_search_account.length === 0) {
        this.instances_show = this.instances;
      }
      this.instances.forEach(instance => {
        /* istanbul ignore next */
        if (this.text_search_account === instance.account_name) {
          /* istanbul ignore next */
          this.instances_show.push(instance);
        }
      });
    },

    click_add_instance: async function() {
      const instance = {
        AccountName: this.account_name,
        Name: this.instance_name,
        ImageId: this.image_id,
        InstanceType: this.instance_type,
        KeyName: this.key_name,
        MinCount: this.min_count,
        MaxCount: this.max_count
      };
      const api = url.url + "/api/vms/create";

      const data = await post(api, instance);
      /* istanbul ignore next */

      if (data.success) {
        /* istanbul ignore next */
        this.notifyVue("top", "right", this.$t("common.addSuccess"), 2);

        /* istanbul ignore next */
        this.getListInstance();
      } else {
        this.notifyVue("top", "right", data.message, 4);
      }
    }
  },
  mounted: function() {
    this.getListAccount();
  }
};
</script>
