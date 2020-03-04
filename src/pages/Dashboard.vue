<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout md-medium-size-100 md-xsmall-size-100 md-size-50">
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-45"
        >
          <stats-card data-background-color="green">
            <template slot="header">
              <i class="fa fa-user"></i>
            </template>

            <template slot="content">
              <p class="category">{{ $t("dashboard.titleAccTab") }}</p>
              <h3 class="num-account">{{ accounts.length }}</h3>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-45"
        >
          <stats-card data-background-color="blue">
            <template slot="header">
              <i class="fa fa-laptop"></i>
            </template>

            <template slot="content">
              <p class="category">{{ $t("dashboard.instance") }}</p>
              <h3 class="num-instance">{{ instances.length }}</h3>
            </template>
          </stats-card>
        </div>
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card class="md-card-plain">
            <md-card-header data-background-color="green">
              <h4 class="title">{{ $t("dashboard.titleAccTab") }}</h4>
            </md-card-header>
            <md-card-content>
              <account-table
                :accounts="accounts"
                :instances="instances"
              ></account-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="orange">
            <h4 class="title">{{ $t("dashboard.plan") }}</h4>
          </md-card-header>
          <md-card-content>
            <plan-table :plans="plans"></plan-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard, AccountTable, PlanTable } from "@/components";
import { get, post } from "../axios.js";
import url from "../../config/url";
export default {
  components: {
    StatsCard,
    AccountTable,
    PlanTable
  },
  props: {
    update: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      accounts: [],
      instances: [],
      plans: []
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

    getListPlan: async function() {
      const api = url.url + "/api/vms/plans";
      const data = await get(api);
      
      this.plans = data.data;
    },

    getListAccount: async function() {
      const api = url.url + "/api/accountaws";
      const data = await get(api);

      /* istanbul ignore else */
      if (data && data.success) {
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
          data.data[i].Instances[0].account_name = account.name;
          this.instances.push(data.data[i].Instances[0]);
        }
      } else {
        this.notifyVue("top", "right", data.message, 4);
      }
    }
  },

  mounted: async function() {
    await this.getListAccount();
    this.getListPlan();
  }
};
</script>
