<template>
  <div>
    <div
      :table-header-color="tableHeaderColor"
      :style="{ width: '100%', maxHeight: '500px', overflow: 'auto' }"
    >
      <md-table v-model="plans_show" md-sort="Date" md-sort-order="asc">
        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :class="[plan_choosing(item) ? 'plan-clicked' : '']"
          @click="emit_event_click_row(item)"
        >
          <md-table-cell
            :md-label="$t('planTable.type')"
            md-sort-by="typePlan"
            >{{ item.typePlan }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('planTable.owner')"
            md-sort-by="valueObjectPlan"
            >{{ item.valueObjectPlan }}</md-table-cell
          >
          <md-table-cell :md-label="$t('planTable.date')" md-sort-by="date">{{
            item.date
          }}</md-table-cell>
          <md-table-cell :md-label="$t('planTable.time')" md-sort-by="time">{{
            item.time
          }}</md-table-cell>
          <md-table-cell
            :md-label="$t('planTable.action')"
            md-sort-by="action"
            >{{ item.action }}</md-table-cell
          >
          <md-table-cell
            :md-label="$t('planTable.daily')"
            md-sort-by="schedule"
            >{{ item.schedule }}</md-table-cell
          >
        </md-table-row>
      </md-table>
    </div>
    <pagination
      v-bind:pagination="pagination"
      v-on:click.native="getPlanShow(pagination.current_page)"
      :offset="4"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "../Pagination.vue";
export default {
  name: "plan-table",
  components: {
    Pagination
  },
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    plans: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selected: [],
      plan_active: 0,
      page: 1,
      perpage: 9,
      pages: [],
      pagination: {
        total: 1,
        per_page: 2,
        last_page: 0,
        from: 1,
        to: 1,
        current_page: 1,
        counts: 8
      },
      offset: 4,

      plans_show: []
    };
  },

  methods: {
    emit_event_click_row: function(plan) {
      this.$emit("click_a_plan", plan);
      this.plan_active = plan;
    },

    plan_choosing: function(plan) {
      if (this.plan_active._id === plan._id) {
        return true;
      }

      return false;
    },

    getPlanShow: function(current_page) {
      this.plans_show = [];
      for (let i = 0; i < this.pagination.counts; i++) {
        const index =
          current_page * this.pagination.counts - this.pagination.counts + i;

        if (index < this.plans.length) {
          this.plans_show.push(this.plans[index]);
        }
      }
    },

    setPages() {
      let numberOfPages = Math.ceil(this.plans.length / this.page);

      /* istanbul ignore next */
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
  },

  watch: {
    plans: function() {
      const x = this.plans.length / this.pagination.counts;

      if (x > parseInt(x) && x >= 1)
        this.pagination.last_page = parseInt(x) + 1;
      else this.pagination.last_page = parseInt(x);
      this.getPlanShow(this.pagination.current_page);
    }
  }
};
</script>
<style scoped>
.plan-clicked {
  background-color: rgb(182, 179, 179);
}
</style>
