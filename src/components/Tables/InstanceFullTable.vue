<template>
  <div>
    <div :style="{ width: '100%', maxHeight: '500px' }">
      <md-table
        v-model="instances_show"
        :table-header-color="tableHeaderColor"
        md-sort="account_name"
        md-sort-order="asc"
      >
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-dialog-confirm
            :md-active.sync="start"
            :md-title="$t('instanceFullTable.start')"
            :md-content="$t('instanceFullTable.confirmStart')"
            md-confirm-text="OK"
            @md-confirm="startInstance"
          />
          <md-dialog-confirm
            :md-active.sync="stop"
            :md-title="$t('instanceFullTable.stop')"
            :md-content="$t('instanceFullTable.confirmStop')"
            md-confirm-text="OK"
            @md-confirm="stopInstance"
          />
          <md-dialog-confirm
            :md-active.sync="remove"
            :md-title="$t('instanceFullTable.remove')"
            :md-content="$t('instanceFullTable.confirmRemove')"
            md-confirm-text="OK"
            @md-confirm="removeInstance"
          />

          <md-table-cell
            :md-label="$t('instanceFullTable.nameAcc')"
            md-sort-by="account_name"
            >{{ item.account_name }}</md-table-cell
          >
          <md-table-cell :md-label="$t('instanceFullTable.nameInstance')">{{
            item.Tags.length > 0 ? item.Tags[0].Value : ""
          }}</md-table-cell>
          <md-table-cell
            :md-label="$t('instanceFullTable.instanceId')"
            md-sort-by="InstanceId"
            >{{ item.InstanceId }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('instanceFullTable.status')"
            md-sort-by="State.Name"
            >{{ item.State.Name }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('instanceFullTable.instanceType')"
            md-sort-by="InstanceType"
            >{{ item.InstanceType }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('instanceFullTable.imageId')"
            md-sort-by="ImageId"
            >{{ item.ImageId }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('instanceFullTable.keyName')"
            md-sort-by="KeyName"
            >{{ item.KeyName }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('instanceFullTable.launchTime')"
            md-sort-by="LaunchTime"
            >{{ item.LaunchTime }}</md-table-cell
          >
          <md-table-cell :md-label="$t('instanceFullTable.region')">{{
            item.Placement.AvailabilityZone
          }}</md-table-cell>
          <md-table-cell md-label>
            <md-button
              id="btnStart"
              class="md-raised md-success"
              @click="
                implementInstance(
                  'start',
                  item.InstanceId,
                  item.State.Name,
                  item.idAccount
                )
              "
              >{{ $t("instanceFullTable.start") }}</md-button
            >
          </md-table-cell>
          <md-table-cell md-label>
            <md-button
              id="btnStop"
              class="md-raised md-warning"
              @click="
                implementInstance(
                  'stop',
                  item.InstanceId,
                  item.State.Name,
                  item.idAccount
                )
              "
              >{{ $t("instanceFullTable.stop") }}</md-button
            >
          </md-table-cell>
          <md-table-cell md-label>
            <md-button
              id="btnRemove"
              class="md-raised md-danger"
              @click="
                implementInstance(
                  'remove',
                  item.InstanceId,
                  item.State.Name,
                  item.idAccount
                )
              "
              >{{ $t("instanceFullTable.remove") }}</md-button
            >
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <pagination
      v-bind:pagination="pagination"
      v-on:click.native="getInstancesShow(pagination.current_page)"
      :offset="4"
    ></pagination>
  </div>
</template>

<script>
import url from "../../../config/url";
import { deleteAxios, putAxios } from "../../axios.js";
import Pagination from "../Pagination.vue";

export default {
  name: "instance-full-table",
  components: {
    Pagination
  },

  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    instances: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      instanceId: "",
      instanceStatus: "",
      idAccount: "",
      selected: [],
      start: false,
      stop: false,
      remove: false,

      pagination: {
        total: 1,
        per_page: 2,
        last_page: 0,
        from: 1,
        to: 1,
        current_page: 1,
        counts: 5
      },
      offset: 4,

      instances_show: []
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

    getInstancesShow: function(current_page) {
      this.instances_show = [];
      // const index = current_page * this.pagination.counts - this.pagination.counts;
      for (let i = 0; i < this.pagination.counts; i++) {
        const index =
          current_page * this.pagination.counts - this.pagination.counts + i;

        if (index < this.instances.length) {
          this.instances_show.push(this.instances[index]);
        }
      }
    },

    implementInstance: function(action, id, status, idAccount) {
      if (action === "start") this.start = true;
      else if (action === "stop") this.stop = true;
      else this.remove = true;
      this.instanceId = id;
      this.instanceStatus = status;
      this.idAccount = idAccount;
    },

    startInstance: async function() {
      if (this.instanceStatus === "terminated") {
        this.notifyVue(
          "top",
          "right",
          this.$t("common.startInstanceTerminated"),
          4
        );

        return;
      }
      const api =
        url.url +
        "/api/vms/start/?id=" +
        this.instanceId +
        "&&idAccount=" +
        this.idAccount;

      console.log(api);
      const data = await putAxios(api);

      /* istanbul ignore else */
      if (data.success) {
        this.notifyVue(
          "top",
          "right",
          this.$t("common.startInstanceSuccess"),
          2
        );
      } else if (data.success === false) {
        this.notifyVue("top", "right", data.message, 4);
      } else this.notifyVue("top", "right", this.$t("common.serverError"), 4);
    },

    stopInstance: async function() {
      if (this.instanceStatus === "terminated") {
        this.notifyVue(
          "top",
          "right",
          this.$t("common.stopInstanceTerminated"),
          4
        );

        return;
      }
      const api =
        url.url +
        "/api/vms/stop/?id=" +
        this.instanceId +
        "&&idAccount=" +
        this.idAccount;
      const data = await putAxios(api);

      /* istanbul ignore else */
      if (data.success) {
        this.notifyVue(
          "top",
          "right",
          this.$t("common.stopInstanceSuccess"),
          2
        );
      } else if (data.success === false)
        this.notifyVue("top", "right", data.message, 4);
      else this.notifyVue("top", "right", this.$t("common.serverError"), 4);
    },

    removeInstance: async function() {
      const api =
        url.url +
        "/api/vms?id=" +
        this.instanceId +
        "&&idAccount=" +
        this.idAccount;
      const data = await deleteAxios(api);
      /* istanbul ignore else */

      if (data.success === false) {
        this.notifyVue("top", "right", data.message, 3);
      } else if (data.success) {
        this.notifyVue("top", "right", this.$t("common.deleteSuccess"), 2);
      } else this.notifyVue("top", "right", this.$t("common.serverError"), 4);
    }

    // compare_instance: function(instance) {
    //   if (
    //     this.instance_choosed.InstanceId ===
    //       instance.InstanceId &&
    //     this.instance_choosed.account_name === instance.account_name
    //   )
    //     return true;

    //   return false;
    // }
  },

  mounted: function() {
    const x = this.instances.length / this.pagination.counts;

    if (x > parseInt(x) && x >= 1) this.pagination.last_page = parseInt(x) + 1;
    else this.pagination.last_page = parseInt(x);
    this.getInstancesShow(this.pagination.current_page);
  },

  watch: {
    instances: function() {
      const x = this.instances.length / this.pagination.counts;

      if (x > parseInt(x) && x >= 1)
        this.pagination.last_page = parseInt(x) + 1;
      else this.pagination.last_page = parseInt(x);
      this.getInstancesShow(this.pagination.current_page);
    }
  }
};
</script>

<style scoped>
.choosed {
  background-color: gray;
}
</style>
