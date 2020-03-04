<template>
  <div>
    <div :style="{ width: '100%', maxHeight: '450px' }">
      <md-table v-model="instances_show" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell :md-label="$t('instanceFullTable.instanceId')">
            {{ item.InstanceId }}
          </md-table-cell>
          <md-table-cell :md-label="$t('instanceFullTable.nameInstance')">
            {{ item.Tags.length > 0 ? item.Tags[0].Value : "" }}
          </md-table-cell>
          <md-table-cell :md-label="$t('instanceFullTable.status')">
            {{ item.State.Name }}
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
import Pagination from "../Pagination.vue";
export default {
  name: "instance-table",
  components: {
    Pagination
  },

  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    instances_choosed: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selected: [],
      pagination: {
        total: 1,
        per_page: 2,
        last_page: 1,
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
    getInstancesShow: function(current_page) {
      this.instances_show = [];
      // const index = current_page * this.pagination.counts - this.pagination.counts;
      for (let i = 0; i < this.pagination.counts; i++) {
        const index =
          current_page * this.pagination.counts - this.pagination.counts + i;

        if (index < this.instances_choosed.length) {
          this.instances_show.push(this.instances_choosed[index]);
        }
      }
    }
  },

  mounted: function() {
    const x = this.instances_choosed.length / this.pagination.counts;

    if (x > parseInt(x) && x >= 1) this.pagination.last_page = parseInt(x) + 1;
    else this.pagination.last_page = parseInt(x);
    this.getInstancesShow(this.pagination.current_page);
  },

  watch: {
    instances_choosed: function() {
      const x = this.instances_choosed.length / this.pagination.counts;

      if (x > parseInt(x) && x >= 1)
        this.pagination.last_page = parseInt(x) + 1;
      else this.pagination.last_page = parseInt(x);
      this.getInstancesShow(this.pagination.current_page);
    }
  }
};
</script>
