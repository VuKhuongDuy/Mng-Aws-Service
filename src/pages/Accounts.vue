<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <div
          v-show="!show_form_add"
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card class="md-card-plain">
            <md-card-header data-background-color="blue">
              <h4 class="title">{{ $t("accounts.titleAccTab") }}</h4>
            </md-card-header>
            <md-card-content>
              <account-table
                :accounts="accounts"
                :instances="instances"
                v-on:click_an_account="click_an_account($event)"
              ></account-table>
            </md-card-content>
          </md-card>
        </div>
        <div
          v-show="!show_form_add"
          class="md-layout-item md-size-100 text-left"
        >
          <md-button
            class="md-raised md-success"
            id="btn-add-account"
            @click="show_form_add = true"
            >{{ $t("accounts.btnAddAcc") }}</md-button
          >
        </div>
        <div
          v-show="show_form_add"
          class="form-add-account md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card class="md-card-plain">
            <md-card-header data-background-color="orange">
              <h4 class="title">{{ $t("accounts.btnAddAcc") }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>{{ $t("accounts.nameAcc") }}</label>
                  <md-input v-model="name_account" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>{{ $t("accounts.accessKey") }}</label>
                  <md-input v-model="new_access_key" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>{{ $t("accounts.secretKeyId") }}</label>
                  <md-input
                    v-model="new_secret_access_key"
                    type="text"
                  ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>{{ $t("accounts.region") }}</label>
                  <md-input v-model="new_region" type="text"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-center">
                <md-button
                  id="btn-add"
                  class="md-raised md-success"
                  @click="click_accept_add"
                  >{{ $t("accounts.btnAdd") }}</md-button
                >
                <md-button
                  v-show="show_form_add"
                  id="btn-close"
                  class="md-raised md-danger"
                  @click="show_form_add = false"
                  >{{ $t("accounts.btnClose") }}</md-button
                >
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">{{ $t("accounts.instances") }}</h4>
          </md-card-header>
          <md-card-content>
            <instance-table
              :instances_choosed="instances_choosed"
            ></instance-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountTable, InstanceTable } from "@/components";
import url from "../../config/url";
import { post, get } from "../axios.js";
export default {
  components: {
    AccountTable,
    InstanceTable
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      name_account: "",
      new_access_key: "",
      new_secret_access_key: "",
      new_region: "",
      accounts: [],
      instances: [],
      instances_choosed: [],
      idUser: "",
      show_form_add: false
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

    click_accept_add: function() {
      let account = {
        name: this.name_account,
        accessKeyId: this.new_access_key,
        secretAccessKey: this.new_secret_access_key,
        region: this.new_region
      };

      this.verifyAccountAws(account);
    },

    verifyAccountAws: async function(account) {
      var api = url.url + "/api/accountaws/add";
      const data = await post(api, account);

      if (data.success) {
        this.getListAccount();
        this.notifyVue("top", "right", this.$t("common.addSuccess"), 2);
      } else {
        this.notifyVue("top", "right", data.message, 4);
      }
    },

    click_an_account: function(accountId) {
      this.instances_choosed = [];
      /* istanbul ignore next */
      this.instances.forEach(instance => {
        if (instance.idAccount === accountId)
          this.instances_choosed.push(instance);
      });
    },

    getListAccount: async function() {
      const api = url.url + "/api/accountaws";
      const data = await get(api);
      /* istanbul ignore else */

      if (data &&  data.success) {
        this.accounts = data.data;

        this.accounts.forEach(async account => {
          await this.getListInstance(account);
        });
      } else this.notifyVue("top", "right", this.$t("common.serverError"), 4);
    },

    getListInstance: async function(account) {
      const api = url.url + "/api/vms";
      const data = await post(api, { id: account._id });

      if (data.success) {
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].Instances[0].idAccount = account._id;
          this.instances.push(data.data[i].Instances[0]);
        }
      } else {
        this.notifyVue("top", "right", data.message, 4);
      }
    }
  },

  mounted: function() {
    this.getListAccount();
  }

  // watch: {
  //   pagination: function() {
  //     this.getAccountsShow(this.pagination.current_page);
  //   }
  // }
};
</script>
