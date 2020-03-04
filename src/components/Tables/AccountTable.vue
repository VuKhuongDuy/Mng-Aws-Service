<template>
  <div>
    <div :style="{ maxWidth: '100%', maxHeight: '500px', overflow: 'auto' }">
      <md-table
        v-model="accounts_show"
        :table-header-color="tableHeaderColor"
        md-sort="name"
        md-sort-order="asc"
      >
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :class="item._id === id_choosed ? 'choosed' : ''"
          @click="click_account(item)"
        >
          <md-table-cell
            :md-label="$t('accountTable.name')"
            md-sort-by="name"
            >{{ item.name }}</md-table-cell
          >
          <md-table-cell :md-label="$t('accountTable.region')">{{
            item.region
          }}</md-table-cell>
          <md-table-cell :md-label="$t('accountTable.running/all')"
            >{{ item.running }}/{{ item.countInstance }}</md-table-cell
          >
          <md-dialog-confirm
            :md-active.sync="first"
            :md-title="$t('accountTable.delete')"
            :md-content="$t('accountTable.confirm')"
            :md-confirm-text="$t('accountTable.delete')"
            @md-confirm="removePlan"
          />
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="click_remove()"
            id="btnRemove"
          >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">{{
              $t("accountTable.delete")
            }}</md-tooltip>
          </md-button>
        </md-table-row>
      </md-table>
    </div>
    <pagination
      v-bind:pagination="pagination"
      v-on:click.native="getAccountsShow(pagination.current_page)"
      :offset="4"
    ></pagination>
  </div>
</template>

<script>
import { deleteAxios } from "../../axios.js";
import Pagination from "../Pagination";
import url from "../../../config/url";
export default {
  name: "account-table",
  components: {
    Pagination
  },
  props: {
    tableHeaderColor: { type: String, default: "" },
    accounts: {
      type: Array,
      default: () => {
        return [];
      }
    },
    instances: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    /* istanbul ignore else */
    return {
      first: false,
      second: false,
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      selected: [],

      /* istanbul ignore next */
      id_choosed: this.accounts.length > 0 ? this.accounts[0]._id : "",

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
      accounts_show: []
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

    getAccountsShow: function(current_page) {
      this.accounts_show = [];
      // const index = current_page * this.pagination.counts - this.pagination.counts;
      for (let i = 0; i < this.pagination.counts; i++) {
        const index =
          current_page * this.pagination.counts - this.pagination.counts + i;

        if (index < this.accounts.length)
          this.accounts_show.push(this.accounts[index]);
      }
    },

    click_account: function(account) {
      this.id_choosed = account._id;
      this.$emit("click_an_account", account._id);
    },
    /* istanbul ignore next */
    click_remove: function() {
      this.first = true;
    },

    removePlan: async function() {
      const api = url.url + "/api/accountaws?id=" + this.id_choosed;
      const data = await deleteAxios(api);
      /* istanbul ignore else */

      if (data.success)
        this.notifyVue("top", "right", this.$t("common.deleteSuccess"), 2);
      else this.notifyVue("top", "right", this.$t("common.serverError"), 4);
    }
  },

  watch: {
    accounts: function() {
      const x = this.accounts.length / this.pagination.counts;

      if (x > parseInt(x) && x >= 1)
        this.pagination.last_page = parseInt(x) + 1;
      else this.pagination.last_page = parseInt(x);
      this.getAccountsShow(this.pagination.current_page);
    }
  }
};
</script>

<style scoped>
.choosed {
  background-color: gray;
}
</style>

<!-- <div>
            <md-dialog-confirm
              :md-active.sync="first"
              md-content=""
              md-confirm-text="Cool!"
            />

            <md-dialog-alert
              :md-active.sync="second"
              md-title="Post created!"
              md-content="Your post <strong>Material Design is awesome</strong> has been created."
            />

            <md-button class="md-accent md-raised" @click="first = true">Alert</md-button>
            <md-button class="md-primary md-raised" @click="second = true">Alert</md-button>
      </div> -->
