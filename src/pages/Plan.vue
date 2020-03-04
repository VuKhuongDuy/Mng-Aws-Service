<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <md-dialog-confirm
          :md-active.sync="delete_"
          :md-title="$t('plan.delete')"
          :md-content="$t('plan.deletePlan')"
          :md-confirm-text="$t('plan.delete')"
          @md-confirm="click_delete()"
        />
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>{{ $t("plan.searchByAccountOrKeyName") }}</label>
              <md-input
                type="text"
                v-model="text_search"
                v-on:keyup.enter="doSearch"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-button
              id="btnRemovePlan"
              class="md-raised md-danger"
              @click="delete_ = true"
            >
              {{ $t("plan.delete") }}
            </md-button>
          </div>
        </div>
        <div
          class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
        >
          <md-card class="md-card-plain">
            <md-card-header style="background-color:#29a3a3">
              <h4 class="title">{{ $t("plan.plan") }}</h4>
            </md-card-header>
            <md-card-content>
              <plan-table
                :plans="plans_show"
                v-on:click_a_plan="click_a_plan($event)"
              ></plan-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div
        id="formAddInstance"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      >
        <md-card class="md-card-plain">
          <md-card-header style="background-color:#7979d2">
            <h4 class="title">{{ $t("plan.addPlan") }}</h4>
          </md-card-header>
          <md-card-content>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div>
                <input
                  type="radio"
                  v-model="typePlan"
                  name="type_plan"
                  value="instance_id"
                />
                {{ $t("plan.instanceId") }}
                <br />
                <input
                  type="radio"
                  v-model="typePlan"
                  name="type_plan"
                  value="account_name"
                />
                {{ $t("plan.nameAcc") }}
                <br />
                <input
                  type="radio"
                  v-model="typePlan"
                  name="type_plan"
                  value="key_name"
                />
                {{ $t("plan.keyName") }}
                <br />
              </div>
              <md-field>
                <label>{{ typePlan }}</label>
                <md-input type="text" v-model="valueObjectPlan">{{
                  typePlan
                }}</md-input>
              </md-field>
              <md-field v-show="typePlan === 'instance_id'">
                <label>{{ $t("plan.nameAcc") }}</label>
                <md-input type="text" v-model="accountName">
                  {{ $t("plan.nameAcc") }}
                </md-input>
              </md-field>
            </div>
            <div>
              <input
                type="radio"
                v-model="action"
                name="action"
                value="start"
              />
              {{ $t("plan.start") }}
              <br />
              <input type="radio" v-model="action" name="action" value="stop" />
              {{ $t("plan.stop") }}
              <br />
              <br />
            </div>
            <hr />
            <div>
              <br />
              <input
                type="radio"
                v-model="schedule"
                name="daily"
                value="daily"
              />
              {{ $t("plan.daily") }}
              <br />
              <input
                type="radio"
                v-model="schedule"
                name="daily"
                value="nodaily"
              />
              {{ $t("plan.noDaily") }}
              <br />
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <md-input type="datetime-local" v-model="dateTime"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-center">
              <md-button
                class="md-raised md-success"
                id="btnCreate"
                @click="click_add_plan"
              >
                {{ $t("plan.btnAdd") }}
              </md-button>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import { PlanTable } from "@/components";
import { get, post, deleteAxios } from "../axios.js";
import url from "../../config/url";
export default {
  components: {
    PlanTable
  },

  data: () => {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      action: "start",
      typePlan: "instance_id",
      valueObjectPlan: "",
      dateTime: "",
      plans: [],
      plans_show: [],
      plan_choosed: "",
      accountName: "",
      text_search: "",
      schedule: "daily",
      delete_: false
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
      /* istanbul ignore else */

      if (data &&  data.success) {
        this.plans = data.data;
        this.plans_show = data.data;
      } else {
        this.notifyVue("top", "right", this.$t("common.serverError"), 4);
      }
    },

    // checkPlan: async function() {
    //   const api = url.url + "/api/vms/check_plan";
    //   const data = await get(api);
    // },

    doSearch: function() {
      this.plans_show = [];

      if (this.text_search.length === 0) {
        this.plans_show = this.plans;
      }
      this.plans.forEach(plan => {
        /* istanbul ignore next */
        if (this.text_search === plan.valueObjectPlan) {
          this.plans_show.push(plan);
        }
      });
    },

    click_add_plan: async function() {
      if (this.valueObjectPlan.length === 0 || !this.dateTime) {
        this.notifyVue("top", "right", this.$t("common.inputEmpty"), 3);

        return;
      }
      const dateTime = new Date(this.dateTime);

      if (dateTime.getTime() < Date.now()) {
        this.notifyVue("top", "right", this.$t("common.datePlanInPast"), 3);

        return;
      }

      /* istanbul ignore next */
      if (this.typePlan === "instance_id") {
        this.valueObjectPlan = this.valueObjectPlan + "&&" + this.accountName;
      }
      var plan = {
        typePlan: this.typePlan,
        valueObjectPlan: this.valueObjectPlan,
        action: this.action,
        dateTime: dateTime,
        schedule: this.schedule
      };
      const api = url.url + "/api/vms/make-plan";

      await post(api, plan);

      this.getListPlan();
      this.notifyVue("top", "right", this.$t("common.makePlanSuccess"), 2);
    },

    click_a_plan: function(plan) {
      this.plan_choosed = plan;
    },

    /* istanbul ignore next */
    click_delete: async function() {
      if (this.plan_choosed === "") {
        this.notifyVue("top", "right", this.$t("plan.letChoosePlan"), 3);

        return;
      }
      const api = url.url + "/api/vms/delete-plan?id=" + this.plan_choosed._id;

      await deleteAxios(api);
      this.notifyVue("top", "right", this.$t("common.deleteSuccess"), 2);
      this.getListPlan();
      // else this.notifyVue("top", "right", "Xóa thất bại, đã xảy ra lỗi", 4);
    }
  },

  mounted: function() {
    this.getListPlan();
    // this.checkPlan();
  },

  watch: {
    dateTime: function() {
      console.log(this.dateTime);
    }
  }
};
</script>
<style scoped>
small {
  display: block;
}

input[type="radio"] {
  width: 20%;
  font-size: 22px;
  font-weight: bold;
}
</style>
